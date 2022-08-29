import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useContext, useEffect, useState } from 'react'
import LoginNavigation from './login'
import TabNav from './tab'
import Profile from '../components/profile'
import { themeModel } from '../models/themeModel'
import { ThemeContext } from 'styled-components'
import PosterMovie from '../components/posterMovie'
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"
import { ButtonIsFavorite } from './styles'
import Purchase from '../components/purchase'
import { useDispatch, useSelector } from 'react-redux'
import { StatesModel } from '../models/storeModel'
import { changeFavorite } from '../store/userSlice'
import { AppDispatch } from '../store'
import { setMovie } from '../store/selectedMovieSlice'

const { Navigator, Screen } = createNativeStackNavigator()


export default function Routes() {
  const themeContext = useContext<themeModel>(ThemeContext)
  const user = useSelector((state: StatesModel) => state.user)
  const movieSelected = useSelector((state: StatesModel) => state.selectedMovie)
  const dispatch = useDispatch<AppDispatch>()
  const dataMovie = useSelector((state: StatesModel) => state.selectedMovie)

  const onFavoriteMovie = async () => {
    if (user.token != null) {
      await dispatch(changeFavorite({ dataMovie, token: user.token }))
      dispatch(setMovie({ ...dataMovie, isFavorite: !dataMovie.isFavorite }))
    }
  }

  return (
    user.auth == true
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
                    style={{ display: movieSelected.isFavorite ? "none" : "flex" }} />
                  <FontAwesome
                    name="bookmark"
                    size={20}
                    color={themeContext.primaryColor}
                    style={{ display: movieSelected.isFavorite ? "flex" : "none" }} />
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
            <Screen name='Purchase' component={Purchase} options={{
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