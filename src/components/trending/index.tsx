import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, Image, ImageBackground, Animated, FlatList, TouchableWithoutFeedback } from 'react-native';
import { ThemeContext } from 'styled-components';
import { themeModel } from '../../models/themeModel';
import { BannerTrendingView, InfoTrendingText, InfoTrendingView, MainTrending, SectionMovieTitle, TrendingRatingImage, TrendingRatingView } from './styles';
import moviesService from '../../services/moviesService';
import { dataMoviesModel } from '../../models/moviesModel';
import { LinearGradient } from 'expo-linear-gradient';
import { genreMovie, genreMovieProps } from '../../models/enumGenreMovie';
import LoadingScreen from '../../templates/loadingScreen';
import popcornRating from '../../../assets/popcorn.png'


const Trending: React.FC = () => {
  const imageUrl = "https://image.tmdb.org/t/p/original"
  const [dataTrendings, setDataTrendings] = useState<dataMoviesModel[]>([])
  const [counterImages, setCounterImages] = useState(0)
  const imagesRequested = useRef(0)
  const fadeLoading = useState(new Animated.Value(1))[0]
  const [displayLoading, setDisplayLoading] = useState(true)
  const [isDataFetched, setIsLoaded] = useState(false)
  const themeContext = useContext<themeModel>(ThemeContext)

  useEffect(() => {
    const loadingMovies = async () => {
      const moviesTrending = await moviesService.getTrending()

      if (moviesTrending == null) {
        return
      }
      setCounterImages((previus) => previus + moviesTrending.slice(0, 9).length)

      setDataTrendings(moviesTrending.slice(0, 9))
      setIsLoaded(true)
    }

    loadingMovies()
  }, [])

  const isImagesRequested = () => {
    imagesRequested.current += 1

    if (imagesRequested.current == counterImages + 1) {
      Animated.timing(fadeLoading, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start()

      setTimeout(() => {
        setDisplayLoading(false)
      }, 1000)
    }
  }

  const renderItemFlatList = ({ item, index }: { item: dataMoviesModel, index: number }) => {
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <TouchableWithoutFeedback onPress={() => console.warn("f")}>
          <Image
            onLoad={() => isImagesRequested()}
            source={{ uri: imageUrl + item.poster_path }}
            style={{ width: 100, height: 150 }}
          />
        </TouchableWithoutFeedback>
      </View>
    )
  }


  return (
    <>
      <LoadingScreen opacity={fadeLoading} display={displayLoading} />

      {isDataFetched &&
        <MainTrending>
          <BannerTrendingView>
            <ImageBackground
              onLoad={(e) => isImagesRequested()}
              style={{ width: '100%', height: 240 }}
              source={{ uri: imageUrl + dataTrendings[0].backdrop_path }}>

              <LinearGradient
                colors={['#00000000', themeContext.background]}
                style={{ height: '100%', width: '100%' }}>
              </LinearGradient>

              <InfoTrendingView>
                <InfoTrendingText style={{ fontWeight: "500" }}>
                  {dataTrendings[0].title}
                </InfoTrendingText>

                <InfoTrendingText style={{ fontSize: 14 }}>
                  {dataTrendings[0].genre_ids[0] &&
                    genreMovie[dataTrendings[0].genre_ids[0] as keyof genreMovieProps]}
                  {dataTrendings[0].genre_ids[1] &&
                    " - " + genreMovie[dataTrendings[0].genre_ids[1] as keyof genreMovieProps]}
                  {dataTrendings[0].genre_ids[2] &&
                    " - " + genreMovie[dataTrendings[0].genre_ids[2] as keyof genreMovieProps]}
                </InfoTrendingText>

                <TrendingRatingView>
                  <TrendingRatingImage source={popcornRating} />

                  <InfoTrendingText style={{ fontSize: 14, paddingBottom: 0 }}>
                    {dataTrendings[0].vote_average.toFixed(1)}
                  </InfoTrendingText>
                </TrendingRatingView>
              </InfoTrendingView>
            </ImageBackground>
          </BannerTrendingView>

          <SectionMovieTitle>Trendings</SectionMovieTitle>
          <FlatList
            horizontal
            data={dataTrendings}
            renderItem={renderItemFlatList}
            contentContainerStyle={{ flexGrow: 1 }}
            keyExtractor={(movie) => String(movie.id)}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={false}/>

        </MainTrending>
      }
    </>

  )
}

export default Trending;