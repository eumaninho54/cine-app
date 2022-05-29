import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const {Navigator, Screen} = createBottomTabNavigator()

export default function TabNav() {

  return (
    <View style={{backgroundColor: 'red'}}>
      <Text>Oi</Text>
    </View>
  )
}