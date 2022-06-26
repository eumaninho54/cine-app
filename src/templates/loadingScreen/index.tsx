import { ActivityIndicator } from '@react-native-material/core';
import React, { useContext } from 'react';
import { View, Text, Animated } from 'react-native';
import { ThemeContext } from 'styled-components';
import { themeModel } from '../../models/themeModel';
import { LoadingMain } from './styles';

interface loadingScreenProps {
  opacity: Animated.Value,
  display: boolean
}

const LoadingScreen: React.FC<loadingScreenProps> = ({ opacity, display }) => {
  const themeContext = useContext<themeModel>(ThemeContext)

  return (
    <LoadingMain style={{
      opacity: opacity,
      display: display ? "flex" : "none"
    }}>
      <ActivityIndicator
        size="large"
        color={themeContext.primaryColor}
        style={{ flex: 1 }} />
    </LoadingMain>
  )
}

export default LoadingScreen;