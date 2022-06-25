import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, Image, ImageBackground, Animated } from 'react-native';
import { ThemeContext } from 'styled-components';
import { themeModel } from '../../models/themeModel';
import { BannerTrendingView, InfoTrendingView, MainTrending } from './styles';
import moviesService from '../../services/moviesService';
import { dataMoviesModel } from '../../models/moviesModel';
import { LinearGradient } from 'expo-linear-gradient';
import { genreMovie, genreMovieProps } from '../../models/enumGenreMovie';
import LoadingScreen from '../../templates/loadingScreen';


const Trending: React.FC = () => {
  const imageUrl = "https://image.tmdb.org/t/p/original"
  const [dataTrendings, setDataTrendings] = useState<dataMoviesModel[]>([])
  const [counterImages, setCounterImages] = useState(0)
  const imagesRequested = useRef(0)
  const fadeLoading = useState(new Animated.Value(1))[0]
  const [isDataFetched, setIsLoaded] = useState(false)
  const themeContext = useContext<themeModel>(ThemeContext)

  useEffect(() => {
    const loadingMovies = async () => {
      const moviesTrending = await moviesService.getTrending()

      if (moviesTrending == null) {
        console.tron.log!("a")
        return
      }
      setCounterImages((previus) => previus + moviesTrending.length)

      setDataTrendings(moviesTrending)
      setIsLoaded(true)
    }

    loadingMovies()
  }, [])

  const isImagesRequested = () => {
    imagesRequested.current += 1

    console.tron.log!(imagesRequested.current)
    console.tron.log!(counterImages)

    if(imagesRequested.current == 1){
      Animated.timing(fadeLoading, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }).start()
    }
  }

  return (
    <MainTrending>
      <LoadingScreen opacity={fadeLoading}/>

      {isDataFetched &&
        <BannerTrendingView>
          <ImageBackground
            onLoad={(e) => isImagesRequested()}
            onError={(e) => { console.tron.log!(e) }}
            style={{ width: '100%', height: 170 }}
            source={{ uri: imageUrl + dataTrendings[0].backdrop_path }}>
            <LinearGradient
              colors={['#00000000', themeContext.background]}
              style={{ height: '100%', width: '100%' }}>
            </LinearGradient>

            <InfoTrendingView>
              
            </InfoTrendingView>
          </ImageBackground>
        </BannerTrendingView>
}
    </MainTrending>
    
  )
}

export default Trending;