import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import LoginNavigation from './login'
import TabNav from './tab'
import { authContextProps } from '../models/authModel'

const { Navigator, Screen } = createNativeStackNavigator()


export default function Routes() {
  const authContext = useContext<authContextProps>(AuthContext)

  return (
    authContext.authState["auth"]
      ? (
        <NavigationContainer>
          <Navigator
            initialRouteName='BrowserNavigation'
            screenOptions={{ headerShown: false }}>
            <Screen name='BrowserNavigation' component={TabNav} />
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