import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from 'styled-components';
import Details from '../../components/details';
import Sessions from '../../components/sessions/intex';
import { themeModel } from '../../models/themeModel';
import { ScreenTitle, ScreenView } from './styles';

const { Navigator, Screen } = createMaterialTopTabNavigator()

const PostMovieTab: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)

  return (
    <Navigator
      screenOptions={{
        tabBarPressColor: "#00000000",
        tabBarIndicator: () => <></>,
        tabBarShowLabel: false,
        tabBarIconStyle: {
          alignItems: "center",
          justifyContent: "center" 
        },
        tabBarStyle: {
          backgroundColor: "#00000000",
          marginHorizontal: 20,
          height: 50,
          borderWidth: 0,
          elevation: 0,
          shadowOpacity: 0
          
        }
      }}>

      <Screen name='Sessions'
        component={Sessions}
        options={{
          tabBarIcon: ({ focused }) => (
            <ScreenView focused={focused}>
              <ScreenTitle focused={focused}>Sessions</ScreenTitle>
            </ScreenView>
          )
        }} />

      <Screen name='Details'
        component={Details}
        options={{
          tabBarIcon: ({ focused }) => (
            <ScreenView focused={focused}>
              <ScreenTitle focused={focused}>Details</ScreenTitle>
            </ScreenView>
          )
        }} />

    </Navigator>
  )
}

export default PostMovieTab;