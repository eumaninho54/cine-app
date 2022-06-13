import React, { useContext, useRef } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Highlights from '../../components/highlights'
import Movies from '../../components/movies'
import Features from '../../components/features'
import Bag from '../../components/bag'
import { ThemeContext } from 'styled-components'
import { themeModel } from '../../models/themeModel'
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"
import { Icon } from 'react-native-elements'
import { Animated, Dimensions, View } from 'react-native'

const { Navigator, Screen } = createBottomTabNavigator()

export default function TabNav() {
  const themeContext = useContext<themeModel>(ThemeContext)
  const tabOffsetValue = useRef(new Animated.Value(0)).current

  const getWidth = () => {
    let width = Dimensions.get("window").width
    return (width + 50) / 5
  }

  return (
    <>
      <Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            borderTopColor: themeContext.tabNav,
            backgroundColor: themeContext.tabNav,
            position: "absolute",
            bottom: 20,
            marginHorizontal: 20,
            height: 60,
            borderRadius: 10,
            elevation: 10,
            shadowColor: "#000000",
            shadowOpacity: 0.07,
            shadowOffset: {
              width: 0,
              height: 5
            }
          }
        }}>
        <Screen
          name='Highlights'
          component={Highlights}
          listeners={({ navigation, route }) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true
              }).start()
            }
          })}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <FontAwesome5
                  name="star"
                  size={20}
                  color={focused ? '#FFC830' : themeContext.iconTabNav} />
              </View>
            )
          }} />
        <Screen
          name='Bag'
          component={Bag}
          listeners={({ navigation, route }) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true
              }).start()
            }
          })}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <FontAwesome5
                  name="shopping-bag"
                  size={20}
                  color={focused ? '#FFC830' : themeContext.iconTabNav} />
              </View>
            )
          }} />
        <Screen
          name='Movies'
          component={Movies}
          listeners={({ navigation, route }) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true
              }).start()
            }
          })}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <FontAwesome5
                  name="film"
                  size={20}
                  color={focused ? '#FFC830' : themeContext.iconTabNav} />
              </View>
            )
          }} />
        <Screen
          name='Features'
          component={Features}
          listeners={({ navigation, route }) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true
              }).start()
            }
          })}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <FontAwesome5
                  name="calendar"
                  size={20}
                  color={focused ? '#FFC830' : themeContext.iconTabNav}
                />
              </View>
            )
          }} />
      </Navigator>

      <Animated.View style={{
        width: getWidth() - 30,
        height: 2,
        backgroundColor: '#FFC830',
        position: 'absolute',
        bottom: 78,
        left: 33,
        borderRadius: 50,
        transform: [
          { translateX: tabOffsetValue}
        ]
      }}>

      </Animated.View>
    </>
  )
}