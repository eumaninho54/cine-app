import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { ThemeContext } from 'styled-components';
import { themeModel } from '../../models/themeModel';
import { MainTrending } from './styles';
import moviesService from '../../services/moviesService';
import { dataMoviesModel } from '../../models/moviesModel';

const Trending: React.FC = () => {
  const imageUrl = "https://image.tmdb.org/t/p/original"
  const [ dataTrendings, setDataTrendings] = useState<dataMoviesModel[]>()
  const themeContext = useContext<themeModel>(ThemeContext)

  useEffect(() => {
    const loadingMovies = async () => {
      setDataTrendings(await moviesService.getTrending())
    }

    loadingMovies()
  }, [])

  return (
    <MainTrending>
      <Text style={{ fontSize: 20, color: themeContext.color }}>Trending</Text>
    </MainTrending>
  )
}

export default Trending;