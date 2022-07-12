import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useState } from 'react';
import { ImageBackground, View, Image, Text } from 'react-native';
import { ThemeContext } from 'styled-components';
import { genreMovie, genreMovieProps } from '../../models/enumGenreMovie';
import { dataMoviesModel } from '../../models/moviesModel';
import { themeModel } from '../../models/themeModel';
import { MainPosterMovie, PosterGenres, PosterImage, PosterInfoView, PosterTitle, PosterView, RatingPopcorn, RatingText, RatingView, TabView } from './styles';
import popcornRating from '../../../assets/popcorn.png'
import PostMovieTab from '../../routes/postMovieTab';


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
  const navigation = useNavigation<NavigationProp<any>>()
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

        <PosterView>
          <PosterImage source={{ uri: imageUrl + dataMovie.poster_path }}/>

          <PosterInfoView>
            <PosterTitle>{dataMovie.title}</PosterTitle>

            <PosterGenres>
              {dataMovie.genre_ids[0] &&
                genreMovie[dataMovie.genre_ids[0] as keyof genreMovieProps]}
              {dataMovie.genre_ids[1] &&
                " - " + genreMovie[dataMovie.genre_ids[1] as keyof genreMovieProps]}
              {dataMovie.genre_ids[2] &&
                " - " + genreMovie[dataMovie.genre_ids[2] as keyof genreMovieProps]}
            </PosterGenres>

            <RatingView>
              <RatingPopcorn source={popcornRating}/>

              <RatingText>
                {dataMovie.vote_average.toFixed(1)}
              </RatingText>
            </RatingView>
          </PosterInfoView>
        </PosterView>
      </ImageBackground>

      <TabView>
        <PostMovieTab dataMovie={dataMovie}/>
      </TabView>
    </MainPosterMovie>
  )
}

export default PosterMovie;