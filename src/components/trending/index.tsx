import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, Animated } from 'react-native';
import { ThemeContext } from 'styled-components';
import { themeModel } from '../../models/themeModel';
import { BannerTrending, MainTrending } from './styles';
import moviesService from '../../services/moviesService';
import { dataMoviesModel } from '../../models/moviesModel';
import { LinearGradient } from 'expo-linear-gradient';


const Trending: React.FC = () => {
  const imageUrl = "https://image.tmdb.org/t/p/original"
  const [dataTrendings, setDataTrendings] = useState<dataMoviesModel[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const themeContext = useContext<themeModel>(ThemeContext)

  useEffect(() => {
    const loadingMovies = async () => {
      setDataTrendings(await moviesService.getTrending())

      setIsLoaded(true)
      console.tron.log!(await moviesService.getTrending())
    }

    loadingMovies()
  }, [])

  return (
    <MainTrending>

      {isLoaded
        ? (
          <BannerTrending>
            <ImageBackground
              style={{ width: '100%', height: 170 }}
              source={{ uri: imageUrl + dataTrendings[0].backdrop_path }}>

              <LinearGradient
                colors={['#00000000', themeContext.background]}
                style={{ height: '100%', width: '100%' }}>
              </LinearGradient>
              <View style={{
                paddingHorizontal: 15,
                flexDirection: "column",
                alignItems: 'flex-start',
                justifyContent: "center",
                position: "absolute",
                bottom: 1
              }}>
                <Text style={{ color: themeContext.color }}>
                  {dataTrendings[0].title}
                </Text>

                <Text style={{ color: themeContext.color }}>
                  {dataTrendings[0].popularity}
                </Text>

                <Text style={{ color: themeContext.color }}>
                  {dataTrendings[0].vote_average}
                </Text>

              </View>
            </ImageBackground>


          </BannerTrending>
        )
        : null}
    </MainTrending>

  )
}

export default Trending;