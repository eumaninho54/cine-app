import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, Image, ImageBackground, Animated, FlatList, TouchableWithoutFeedback } from 'react-native';
import { ThemeContext } from 'styled-components';
import { themeModel } from '../../models/themeModel';
import { BannerMoviesView, InfoMoviesText, InfoMoviesView, MainMovies, SectionMovieTitle, MoviesRatingImage, MoviesRatingView } from './styles';
import moviesService from '../../services/moviesService';
import { dataMoviesModel } from '../../models/moviesModel';
import { LinearGradient } from 'expo-linear-gradient';
import LoadingScreen from '../../templates/loadingScreen';
import popcornRating from '../../../assets/popcorn.png'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { StatesModel } from '../../models/storeModel';
import { setMovie } from "../../store/selectedMovieSlice"
import { AppDispatch } from '../../store';


const Movies: React.FC = () => {
  const [dataNowPlaying, setDataNowPlaying] = useState<dataMoviesModel[]>([])
  const [dataPopular, setDataPopular] = useState<dataMoviesModel[]>([])
  const imagesRequested = useRef(0)
  const fadeLoading = useState(new Animated.Value(1))[0]
  const [displayLoading, setDisplayLoading] = useState(true)
  const themeContext = useContext<themeModel>(ThemeContext)
  const navigation = useNavigation<NavigationProp<any>>()
  const user = useSelector((state: StatesModel) => state.user)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const loadingMovies = async () => {
      const moviesNowPlaying = await moviesService.getMovie("nowPlaying")
      const moviesPopular = await moviesService.getMovie("popular")

      if (moviesNowPlaying == null || moviesPopular == null) {
        return
      }
      setDataNowPlaying(moviesNowPlaying.slice(0, 9))
      setDataPopular(moviesPopular.slice(0, 9).reverse())
    }

    loadingMovies()
  }, [])


  const isImagesRequested = () => {
    imagesRequested.current += 1

    if (imagesRequested.current == 1) {
      Animated.timing(fadeLoading, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setDisplayLoading(false)
      })
    }
  }

  const selectedMovie = (item: dataMoviesModel) => {
    if (user.favorites.find((value) => value.id == item.id)) {
      dispatch(setMovie({ ...item, isFavorite: true }))
      navigation.navigate('PosterMovie')
      return
    }

    dispatch(setMovie({ ...item, isFavorite: false }))
    navigation.navigate('PosterMovie')
  }

  const renderItemFlatList = ({ item, index }: { item: dataMoviesModel, index: number }) => {
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <TouchableWithoutFeedback onPress={() => selectedMovie(item)}>
          <Image
            onLoad={() => isImagesRequested()}
            source={{ uri: item.poster_path }}
            style={{ width: 100, height: 150 }} />
        </TouchableWithoutFeedback>
      </View>
    )
  }

  return (
    <>
      <LoadingScreen opacity={fadeLoading} display={displayLoading} />

      {dataNowPlaying.length != 0 &&
        <MainMovies>
          <BannerMoviesView>
            <ImageBackground
              onLoad={(e) => isImagesRequested()}
              style={{ width: '100%', height: 240 }}
              source={{ uri: dataNowPlaying[0].backdrop_path }}>

              <LinearGradient
                colors={['#00000000', themeContext.background]}
                style={{ height: '100%', width: '100%' }}>
              </LinearGradient>

              <InfoMoviesView>
                <InfoMoviesText style={{ fontWeight: "500" }}>
                  {dataNowPlaying[0].title}
                </InfoMoviesText>

                <InfoMoviesText style={{ fontSize: 14 }}>
                  {dataNowPlaying[0].genre_ids[0] &&
                    dataNowPlaying[0].genre_ids[0]}
                  {dataNowPlaying[0].genre_ids[1] &&
                    " - " + dataNowPlaying[0].genre_ids[1]}
                  {dataNowPlaying[0].genre_ids[2] &&
                    " - " + dataNowPlaying[0].genre_ids[2]}
                </InfoMoviesText>

                <MoviesRatingView>
                  <MoviesRatingImage source={popcornRating} />

                  <InfoMoviesText style={{ fontSize: 14, paddingBottom: 0 }}>
                    {dataNowPlaying[0].vote_average.toFixed(1)}
                  </InfoMoviesText>
                </MoviesRatingView>
              </InfoMoviesView>
            </ImageBackground>
          </BannerMoviesView>

          <SectionMovieTitle>Now playing</SectionMovieTitle>
          <FlatList
            horizontal
            data={dataNowPlaying}
            renderItem={renderItemFlatList}
            contentContainerStyle={{ flexGrow: 1 }}
            keyExtractor={(movie) => String(movie.id)}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={true}
          />

          <SectionMovieTitle>Popular</SectionMovieTitle>
          <FlatList
            horizontal
            data={dataPopular}
            renderItem={renderItemFlatList}
            contentContainerStyle={{ flexGrow: 1 }}
            keyExtractor={(movie) => String(movie.id)}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={true}
          />
          <View style={{ height: 100 }} />
        </MainMovies>
      }
    </>

  )
}

export default Movies;