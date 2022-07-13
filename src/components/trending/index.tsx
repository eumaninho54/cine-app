import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, Image, ImageBackground, Animated, FlatList, TouchableWithoutFeedback, Dimensions, StyleSheet } from 'react-native';
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

interface navigateProp {
  navigate: (route: string, { screen }: { screen?: string, dataMovie: dataMoviesModel }) => void
}

const { width, height} = Dimensions.get("screen")
const imageW = width * 0.7
const imageH = imageW * 1.54


const Trending: React.FC = () => {
  const imageUrl = "https://image.tmdb.org/t/p/original"
  const [dataTrendings, setDataTrendings] = useState<dataMoviesModel[]>([])
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
      setDataTrendings(moviesTrending.slice(0, 9))
      setIsDataFetched(true)
    }

    loadingMovies()
  }, [])

  const renderItem = ({item}: {item: dataMoviesModel}) => {
    return (
      <View style={{
        width, 
        justifyContent: "center", 
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.5,
        elevation: 10,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 20,
        }}>
        <Image 
          source={{ uri: imageUrl + item.poster_path}}
          style={{
            width: imageW,
            height: imageH,
            resizeMode: 'cover',
            borderRadius: 10,
            bottom: 30,
            
          }}/>
      </View>
    )
  }

  return (
    <>
      <LoadingScreen opacity={fadeLoading} display={displayLoading} />

      {isDataFetched &&
        <MainTrending>
          <View style={StyleSheet.absoluteFillObject}>
            {dataTrendings.map((item, index) => {
              const inputRange = [
                (index - 1) * width,
                index * width,
                (index + 1) * width
              ]
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0, 1, 0]
              })
              return (
                <Animated.Image
                  key={index}
                  source={{uri: imageUrl + item.poster_path}}
                  style={[StyleSheet.absoluteFillObject, { opacity }]}
                  blurRadius={50}/>
              )
            })}
          </View>
          <Animated.FlatList 
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              { useNativeDriver: true}
            )}
            data={dataTrendings}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            pagingEnabled
            horizontal/>
        </MainTrending>
      }
    </>

  )
}

export default Trending;