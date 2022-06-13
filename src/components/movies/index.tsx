import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from 'styled-components';
import { themeModel } from '../../models/themeModel';
import { MainMovies } from './styles';


const Movies: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)

  return (
    <MainMovies>
      <Text style={{ fontSize: 20, color: themeContext.color }}>Movies</Text>
    </MainMovies>
  )
}

export default Movies;