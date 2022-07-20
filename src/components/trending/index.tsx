import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, Image, Animated, FlatList, Dimensions, Platform, TouchableWithoutFeedback } from 'react-native';
import { ThemeContext } from 'styled-components';
import { themeModel } from '../../models/themeModel';
import moviesService from '../../services/moviesService';
import { dataMoviesModel } from '../../models/moviesModel';
import { LinearGradient } from 'expo-linear-gradient';
import LoadingScreen from '../../templates/loadingScreen';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { BackdropBg, BackdropImage, BackdropView, CarouselBg, CarouselPoster, EmptyView, GenresBg, GenreText, GenreView, MainCarousel, MainTrending, OverviewPoster, TitlePoster } from './styles';
import { Rating } from 'react-native-elements';
import authService from '../../services/authService';
import { authContextProps } from '../../models/authModel';
import { AuthContext } from '../../context/authContext';

const { width, height } = Dimensions.get("screen")
const SPACING = 10
const ITEM_SIZE = width * 0.72
const imageW = width * 0.5
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2
const BACKDROP_HEIGHT = height * 0.6

const Trending: React.FC = () => {
  const [dataTrendings, setDataTrendings] = useState<any[]>([])
  const imagesRequested = useRef(0)
  const fadeLoading = useState(new Animated.Value(1))[0]
  const [displayLoading, setDisplayLoading] = useState(true)
  const themeContext = useContext<themeModel>(ThemeContext)
  const navigation = useNavigation<NavigationProp<any>>()
  const scrollX = useRef(new Animated.Value(0)).current
  const { infoUser, setIsSelectedFavorite } = useContext<authContextProps>(AuthContext)

  useEffect(() => {
    const loadingMovies = async () => {
      const moviesTrending = await moviesService.getMovie("trending")

      if (moviesTrending == null) {
        return
      }
      setDataTrendings([{ key: "left-spacer" }, ...moviesTrending, { key: "right-spacer" }])
    }

    loadingMovies()
  }, [])

  const selectedMovie = (item: dataMoviesModel) => {
    if(infoUser.favorites.find((value) => value.id == item.id)){
      setIsSelectedFavorite({isSelected: true, dataMovie: item})
      navigation.navigate('PosterMovie', { dataMovie: item })
      return
    }
    
    setIsSelectedFavorite({isSelected: false, dataMovie: item})
    navigation.navigate('PosterMovie', { dataMovie: item })
  }

  const isImagesRequested = () => {
    imagesRequested.current += 1

    if (imagesRequested.current == dataTrendings.length) {
      Animated.timing(fadeLoading, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setDisplayLoading(false)
      })
    }
  }

  const Backdrop = ({ movies, scrollX }: { movies: dataMoviesModel[], scrollX: Animated.Value }) => {
    return (
      <BackdropView width={width} BACKDROP_HEIGHT={BACKDROP_HEIGHT} >
        <FlatList
          data={movies}
          keyExtractor={(_, index) => index.toString() + '-backdrop'}
          removeClippedSubviews={false}
          contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
          renderItem={({ item, index }: { item: dataMoviesModel, index: number }) => {
            if (!item.id) return null

            const translateX = scrollX.interpolate({
              inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
              outputRange: [0, width],
            });

            return (
              <BackdropBg
                removeClippedSubviews={false}
                height={height}
                style={{ width: translateX }}>
                <BackdropImage
                  onLoad={() => isImagesRequested()}
                  width={width}
                  BACKDROP_HEIGHT={BACKDROP_HEIGHT}
                  source={{ uri: item.backdrop_path }} />
              </BackdropBg>
            )
          }} />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', themeContext.background]}
          style={{ height: BACKDROP_HEIGHT, width, position: 'absolute', bottom: 0 }} />
      </BackdropView>

    )
  }

  const renderItemCarousel = ({ item, index }: { item: dataMoviesModel, index: number }) => {
    if (!item.id) {
      return (
        <EmptyView SPACER_ITEM_SIZE={SPACER_ITEM_SIZE} />
      )
    }

    const inputRange = [
      (index - 2) * ITEM_SIZE,
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
    ]
    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [100, 50, 100],
      extrapolate: 'clamp'
    })

    return (
      <MainCarousel width={ITEM_SIZE}>
        <TouchableWithoutFeedback
          onPress={() => selectedMovie(item)}>
          <CarouselBg
            SPACING={SPACING}
            style={{ transform: [{ translateY }] }}>
            <CarouselPoster
              onLoad={() => isImagesRequested()}
              source={{ uri: item.poster_path }}
              width={ITEM_SIZE}
              style={{ resizeMode: 'cover' }} />
            <TitlePoster numberOfLines={1}>
              {item.title}
            </TitlePoster>

            {/*RATING*/}
            <Rating
              type='custom'
              imageSize={20}
              readonly
              startingValue={item.vote_average / 2}
              ratingColor={themeContext.primaryColor}
              tintColor={themeContext.background} />

            {/*GENRES*/}
            <GenresBg>
              {item.genre_ids.map((genre, index) => {
                if (index > 2) return

                return (
                  <GenreView key={`${index}-genre`}>
                    <GenreText>
                      {genre}
                    </GenreText>
                  </GenreView>
                )
              })}
            </GenresBg>
          </CarouselBg>
        </TouchableWithoutFeedback>
      </MainCarousel >
    )
  }

  return (
    <>
      <LoadingScreen opacity={fadeLoading} display={displayLoading} />

      {dataTrendings.length != 0 &&
        <MainTrending>
          <Backdrop movies={dataTrendings} scrollX={scrollX} />
          <Animated.FlatList
            snapToAlignment='start'
            snapToInterval={ITEM_SIZE}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            renderToHardwareTextureAndroid
            showsHorizontalScrollIndicator={false}
            data={dataTrendings}
            keyExtractor={(_, index) => index.toString() + '-poster'}
            renderItem={renderItemCarousel}
            horizontal
            decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
            bounces={false}
            scrollEventThrottle={16}
            contentContainerStyle={{ alignItems: "center" }} />
        </MainTrending>
      }
    </>

  )
}

export default Trending;