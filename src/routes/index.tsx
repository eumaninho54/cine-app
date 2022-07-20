import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext'
import LoginNavigation from './login'
import TabNav from './tab'
import { authContextProps } from '../models/authModel'
import Profile from '../components/profile'
import { themeModel } from '../models/themeModel'
import { ThemeContext } from 'styled-components'
import PosterMovie from '../components/posterMovie'
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"
import { ButtonIsFavorite } from './styles'
import moviesService from '../services/moviesService'
import authService from '../services/authService'

const { Navigator, Screen } = createNativeStackNavigator()


export default function Routes() {
  const themeContext = useContext<themeModel>(ThemeContext)
  const {
    isSelectedFavorite,
    setIsSelectedFavorite,
    setAuthState,
    authState,
    infoUser,
    setInfoUser
  } = useContext<authContextProps>(AuthContext)

  const onFavoriteMovie = async () => {
    if (authState.token != null) {
      console.tron.log!(isSelectedFavorite)
      setIsSelectedFavorite((value) => ({ isSelected: !value.isSelected, dataMovie: value.dataMovie }))
      const isChanged = await authService.changeFavorite(
        {
          isSelected: !isSelectedFavorite.isSelected,
          dataMovie: isSelectedFavorite.dataMovie
        }, authState.token)
      console.tron.log!(isChanged?.favorites)
      if (isChanged != null) {
        setInfoUser((value) => (
          {
            ...value,
            favorites: isChanged.favorites
          }
        ))
      }
    }
  }

  return (
    authState["auth"]
      ? (
        <NavigationContainer>
          <Navigator
            initialRouteName='BrowserNavigation'
            screenOptions={{ headerShown: false }}>
            <Screen name='BrowserNavigation' component={TabNav} />
            <Screen name='PosterMovie' component={PosterMovie} options={{
              presentation: "card",
              headerShown: true,
              headerBackTitleVisible: false,
              headerTitle: () => (<></>),
              headerShadowVisible: false,
              headerTintColor: themeContext.primaryColor,
              headerTransparent: true,
              headerRight: () => (
                <ButtonIsFavorite onPress={() => onFavoriteMovie()}>
                  <FontAwesome5
                    name="bookmark"
                    size={20}
                    color={themeContext.primaryColor}
                    style={{ display: isSelectedFavorite.isSelected ? "none" : "flex" }} />
                  <FontAwesome
                    name="bookmark"
                    size={20}
                    color={themeContext.primaryColor}
                    style={{ display: isSelectedFavorite.isSelected ? "flex" : "none" }} />
                </ButtonIsFavorite>
              )
            }} />
            <Screen name='Profile' component={Profile} options={{
              presentation: "modal",
              headerShown: true,
              headerBackTitleVisible: false,
              headerTitle: () => (<></>),
              headerShadowVisible: false,
              headerTintColor: themeContext.primaryColor,
              headerStyle: {
                backgroundColor: themeContext.background
              }
            }} />
          </Navigator>
        </NavigationContainer>
      )
      : (
        <NavigationContainer>
          <Navigator
            initialRouteName='LoginNavigation'
            screenOptions={{ headerShown: false }}>
            <Screen name='LoginNavigation' component={LoginNavigation} />
          </Navigator>
        </NavigationContainer>
      )
  )
}