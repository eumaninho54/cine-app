import { useRoute } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from 'styled-components';
import { dataMoviesModel } from '../../models/moviesModel';
import { themeModel } from '../../models/themeModel';
import { MainDetails, MainTitle, SectionInfo, SectionTitle, SectionView } from './styles';

interface routeProp {
  key: string;
  name: string;
  path?: string | undefined;
  params: dataMoviesModel
}


const Details: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)
  const dataMovie = useRoute<routeProp>().params
  
  return (
    <MainDetails>
      <MainTitle>Details</MainTitle>

      <SectionView>
        <SectionTitle>Original title</SectionTitle>
        <SectionInfo>{dataMovie.original_title}</SectionInfo>
      </SectionView>

      <SectionView>
        <SectionTitle>Release</SectionTitle>
        <SectionInfo>{dataMovie.release_date}</SectionInfo>
      </SectionView>

      <SectionView>
        <SectionTitle>Overview</SectionTitle>
        <SectionInfo numberOfLines={4}>{dataMovie.overview}</SectionInfo>
      </SectionView>

      <SectionView>
        <SectionTitle>Popularity</SectionTitle>
        <SectionInfo>{dataMovie.popularity}</SectionInfo>
      </SectionView>
    </MainDetails>
  )
}

export default Details;