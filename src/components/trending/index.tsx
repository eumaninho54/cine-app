import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, Image, ImageBackground, Animated, FlatList, TouchableWithoutFeedback, Dimensions, StyleSheet, Platform } from 'react-native';
import { ThemeContext } from 'styled-components';
import { themeModel } from '../../models/themeModel';
import moviesService from '../../services/moviesService';
import { dataMoviesModel } from '../../models/moviesModel';
import { LinearGradient } from 'expo-linear-gradient';
import { genreMovie, genreMovieProps } from '../../models/enumGenreMovie';
import LoadingScreen from '../../templates/loadingScreen';
import popcornRating from '../../../assets/popcorn.png'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainTrending } from './styles';
import MaskedView from '@react-native-community/masked-view'
import Svg, { Rect } from 'react-native-svg'

interface navigateProp {
  navigate: (route: string, { screen }: { screen?: string, dataMovie: dataMoviesModel }) => void
}

const { width, height } = Dimensions.get("screen")
const SPACING = 10
const ITEM_SIZE = width * 0.72
const imageW = width * 0.5
const imageH = imageW * 1.50
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2
const BACKDROP_HEIGHT = height * 0.6

const Trending: React.FC = () => {
  const imageUrl = "https://image.tmdb.org/t/p/original"
  const [dataTrendings, setDataTrendings] = useState<any[]>([])
  const [counterImages, setCounterImages] = useState(0)
  const imagesRequested = useRef(0)
  const fadeLoading = useState(new Animated.Value(1))[0]
  const [displayLoading, setDisplayLoading] = useState(false)
  const [isDataFetched, setIsDataFetched] = useState(false)
  const themeContext = useContext<themeModel>(ThemeContext)
  const navigation = useNavigation<NavigationProp<any>>()
  const scrollX = useRef(new Animated.Value(0)).current



  useEffect(() => {
    const loadingMovies = async () => {
      const moviesTrending = await moviesService.getTrending()

      if (moviesTrending == null) {
        return
      }
      setCounterImages((previus) => previus + moviesTrending.slice(0, 9).length)
      setDataTrendings([{ key: "left-spacer" }, ...moviesTrending, { key: "right-spacer" }])
      setIsDataFetched(true)
    }

    loadingMovies()
  }, [])

  const Backdrop = ({ movies, scrollX }: any) => {
    return (
      <View style={{ position: 'absolute', width, height: BACKDROP_HEIGHT }}>
        <FlatList
          data={movies.reverse()}
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
              <Animated.View
                removeClippedSubviews={false}
                style={{
                  position: 'absolute',
                  width: translateX,
                  height,
                  overflow: 'hidden'
                }}>
                <Image
                  source={{ uri: imageUrl + item.backdrop_path }}
                  style={{ width, height: BACKDROP_HEIGHT, position: 'absolute' }} />
              </Animated.View>
            )
          }} />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', themeContext.background]}
          style={{ height: BACKDROP_HEIGHT, width, position: 'absolute', bottom: 0 }} />
      </View>

    )
  }

  const renderItemCarousel = ({ item, index }: { item: dataMoviesModel, index: number }) => {
    if (!item.id) {
      return (
        <View style={{ width: SPACER_ITEM_SIZE }} />
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
      <View style={{ width: ITEM_SIZE }}>
        <Animated.View style={{
          marginHorizontal: SPACING,
          padding: SPACING * 2,
          alignItems: 'center',
          backgroundColor: themeContext.background,
          borderRadius: 34,
          transform: [{ translateY }],
          bottom: '10%'
        }}>
          <Image
            source={{ uri: imageUrl + item.poster_path }}
            style={{
              width: '100%',
              height: ITEM_SIZE * 1.1,
              resizeMode: 'cover',
              borderRadius: 24,
              margin: 0,
              marginBottom: 10,
            }} />
          <Text style={{ fontSize: 24, color: themeContext.textColor }} numberOfLines={1}>
            {item.title}
          </Text>

          {/*RATING*/}

          {/*GENRES*/}

          <Text style={{ fontSize: 12 }} numberOfLines={3}>
            {item.overview}
          </Text>
        </Animated.View>
      </View>
    )
  }

  return (
    <>
      <LoadingScreen opacity={fadeLoading} display={displayLoading} />

      {isDataFetched &&
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