import React from 'react';
import { View, Text } from 'react-native';

// import { Container } from './styles';

const LoadingScreen: React.FC = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Carregando!</Text>
    </View>
  )
}

export default LoadingScreen;