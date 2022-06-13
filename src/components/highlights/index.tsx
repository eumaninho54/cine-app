import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from 'styled-components';
import { themeModel } from '../../models/themeModel';
import { MainHighlights } from './styles';

const Highlights: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)

  return (
    <MainHighlights>
      <Text style={{ fontSize: 20, color: themeContext.color }}>Highlights</Text>
    </MainHighlights>
  )
}

export default Highlights;