import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from 'styled-components';
import { themeModel } from '../../models/themeModel';
import { MainBag } from './styles';

const Bag: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)

  return (
    <MainBag>
      <Text style={{ fontSize: 20, color: themeContext.color }}>Bag</Text>
    </MainBag>
  )
}

export default Bag;