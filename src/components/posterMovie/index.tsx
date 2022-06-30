import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext } from 'react';
import { ImageBackground, View, Image, Text } from 'react-native';
import { ThemeContext } from 'styled-components';
import { genreMovie, genreMovieProps } from '../../models/enumGenreMovie';
import { dataMoviesModel } from '../../models/moviesModel';
import { themeModel } from '../../models/themeModel';
import { MainPosterMovie } from './styles';
import popcornRating from '../../../assets/popcorn.png'

interface navigateProp {
  navigate: (route: string, { screen }: { screen?: string, dataMovie: dataMoviesModel }) => void
}

interface routeProp {
  key: string;
  name: string;
  path?: string | undefined;
  params: {
    dataMovie: dataMoviesModel
  }
}


const PosterMovie: React.FC = () => {
  const imageUrl = "https://image.tmdb.org/t/p/original"
  const themeContext = useContext<themeModel>(ThemeContext)
  const navigation = useNavigation<navigateProp>()
  const { dataMovie } = useRoute<routeProp>().params

  return (
    <MainPosterMovie>
      <ImageBackground
        style={{ width: '100%', height: 350 }}
        source={{ uri: imageUrl + dataMovie.backdrop_path }}>

        <LinearGradient
          colors={['#00000060', themeContext.background]}
          style={{ height: '100%', width: '100%' }}>
        </LinearGradient>

        <View
          style={{
            position: "absolute",
            width: '100%',
            height: '100%',
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}>
          <Image
            source={{ uri: imageUrl + dataMovie.poster_path }}
            style={{ width: 140, height: 210 }} />

          <View style={{width: 200, paddingLeft: 12}}>
            <Text style={{ color: themeContext.textColor, paddingBottom: 10 }}>{dataMovie.title}</Text>

            <Text style={{ color: themeContext.textColor, paddingBottom: 15 }}>
              {dataMovie.genre_ids[0] &&
                genreMovie[dataMovie.genre_ids[0] as keyof genreMovieProps]}
              {dataMovie.genre_ids[1] &&
                " - " + genreMovie[dataMovie.genre_ids[1] as keyof genreMovieProps]}
              {dataMovie.genre_ids[2] &&
                " - " + genreMovie[dataMovie.genre_ids[2] as keyof genreMovieProps]}
            </Text>

            <View style={{flexDirection: "row", alignItems: "center"}}>
              <Image source={popcornRating} style={{width: 25, height: 25}} />

              <Text style={{ fontSize: 14, paddingBottom: 0, color: "#fff" }}>
                {dataMovie.vote_average.toFixed(1)}
              </Text>
            </View>
          </View>
        </View>


      </ImageBackground>
    </MainPosterMovie>
  )
}

export default PosterMovie;