import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from 'styled-components';
import { themeModel } from '../../models/themeModel';
import { MainFeatures } from './styles';


const Features: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)

  return (
    <MainFeatures>
      <Text style={{ fontSize: 20, color: themeContext.color }}>Features</Text>
    </MainFeatures>
  )
}

export default Features;