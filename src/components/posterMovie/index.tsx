import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, View, Image, Text } from 'react-native';
import { ThemeContext } from 'styled-components';
import { dataMoviesModel } from '../../models/moviesModel';
import { themeModel } from '../../models/themeModel';
import { MainPosterMovie, PosterGenres, PosterImage, PosterInfoView, PosterTitle, PosterView, RatingPopcorn, RatingText, RatingView, TabView } from './styles';
import popcornRating from '../../../assets/popcorn.png'
import PostMovieTab from '../../routes/postMovieTab';
import { useSelector } from 'react-redux';
import { StatesModel } from '../../models/storeModel';


const PosterMovie: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)
  const navigation = useNavigation<NavigationProp<any>>()
  const dataMovie = useSelector((state: StatesModel) => state.selectedMovie)

  return (
    <MainPosterMovie>
      <ImageBackground
        style={{ width: '100%', height: 300 }}
        source={{ uri: dataMovie.backdrop_path }}>

        <LinearGradient
          colors={['#00000060', themeContext.background]}
          style={{ height: '100%', width: '100%' }}>
        </LinearGradient>

        <PosterView>
          <PosterImage source={{ uri: dataMovie.poster_path }} key={dataMovie.id + "-posterMovie"} />

          <PosterInfoView>
            <PosterTitle>{dataMovie.title}</PosterTitle>

            <PosterGenres>
              {dataMovie.genre_ids[0] &&
                dataMovie.genre_ids[0]}
              {dataMovie.genre_ids[1] &&
                " - " + dataMovie.genre_ids[1]}
              {dataMovie.genre_ids[2] &&
                " - " + dataMovie.genre_ids[2]}
            </PosterGenres>

            <RatingView>
              <RatingPopcorn source={popcornRating} />

              <RatingText>
                {dataMovie.vote_average.toFixed(1)}
              </RatingText>
            </RatingView>
          </PosterInfoView>
        </PosterView>
      </ImageBackground>

      <TabView>
        <PostMovieTab dataMovie={dataMovie} />
      </TabView>
    </MainPosterMovie>
  )
}

export default PosterMovie;