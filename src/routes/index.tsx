import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import LoginNavigation from './login'
import TabNav from './tab'
import { authContextProps } from '../models/authModel'
import Profile from '../components/profile'
import { StyleSheet } from 'react-native'
import { themeModel } from '../models/themeModel'
import { ThemeContext } from 'styled-components'

const { Navigator, Screen } = createNativeStackNavigator()


export default function Routes() {
  const themeContext = useContext<themeModel>(ThemeContext)
  const authContext = useContext<authContextProps>(AuthContext)

  return (
    authContext.authState["auth"]
      ? (
        <NavigationContainer>
          <Navigator
            initialRouteName='BrowserNavigation'
            screenOptions={{ headerShown: false }}>
            <Screen name='BrowserNavigation' component={TabNav} />
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
            <Screen name='BrowserNavigation' component={TabNav} />
          </Navigator>
        </NavigationContainer>
      )
  )
}