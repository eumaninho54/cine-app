import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import LoginNavigation from './login'
import TabNav from './tab'

const {Navigator, Screen} = createNativeStackNavigator()

export default function Routes() {

  return (
    <NavigationContainer>
      <Navigator
        initialRouteName='LoginNavigation'
        screenOptions={{headerShown: false}}>
        <Screen name='LoginNavigation'   component={LoginNavigation} />
        <Screen name='BrowserNavigation' component={TabNav} />
      </Navigator>
    </NavigationContainer>

  )
}