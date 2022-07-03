import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Dimensions, Animated } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { ThemeContext } from 'styled-components';
import { dataDays, dataDaysProps } from '../../models/dayWeek';
import { themeModel } from '../../models/themeModel';
import { TicketCarouselBg, TicketCarouselBorder, TicketCarouselView } from './styles';


const SLIDER_WIDTH = Dimensions.get("window").width
const ITEM_WIDTH = SLIDER_WIDTH * 0.30

const Sessions: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)
  const [indexDateSelected, setIndexDateSelected] = useState(3)
  const dateSelected = useState(new Animated.Value(0))[0]

  const animateCarousel = () => {
    Animated.timing(dateSelected, {
      toValue: 0,
      duration: 1,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(dateSelected, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start()
    })
    return dateSelected
  }

  const renderItemCarousel = ({ item, index }: { item: dataDaysProps, index: number }) => {
    if(index == indexDateSelected){
      Animated.timing(dateSelected, {
        toValue: 0,
        duration: 1,
        useNativeDriver: true
      }).start(() => {
        Animated.timing(dateSelected, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }).start()
      })
    }

    return (
      <TicketCarouselBorder style={{ width: ITEM_WIDTH - 20 }}>
        <LinearGradient
          colors={['#444', "#363636", "#444"]}
          style={{ height: '100%', width: '100%', position: "absolute" }}>
        </LinearGradient>

        {index == indexDateSelected &&
          <Animated.View style={{
            height: '100%',
            width: '100%',
            position: "absolute",
            opacity: dateSelected
          }}>
            <LinearGradient
              colors={[themeContext.primaryColor, themeContext.secundaryColor]}
              style={{ height: '100%', width: '100%', position: "absolute" }}>
            </LinearGradient>
          </Animated.View>
        }

        <View style={{
          borderRadius: 12,
          height: 12,
          width: 12,
          bottom: '20%',
          left: -5,
          position: "absolute",
          zIndex: 3,
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden"
        }} >
          <LinearGradient
            colors={['#363636', '#444444']}
            style={{ height: '100%', width: '100%', position: "absolute" }}>
          </LinearGradient>

          <View style={{
            backgroundColor: themeContext.background,
            width: 10,
            height: 10,
            borderRadius: 10
          }} />
        </View>

        <View style={{
          backgroundColor: "blue",
          borderRadius: 12,
          height: 12,
          width: 12,
          bottom: '20%',
          right: -5,
          position: "absolute",
          zIndex: 3,
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden"
        }} >
          <LinearGradient
            colors={['#363636', '#444444']}
            style={{ height: '100%', width: '100%', position: "absolute" }}>
          </LinearGradient>

          <View style={{
            backgroundColor: themeContext.background,
            width: 10,
            height: 10,
            borderRadius: 10
          }} />
        </View>

        <TicketCarouselBg>
          <Animated.View style={{ height: "100%", width: '100%', position: "absolute" }}>
            <LinearGradient
              colors={['#363636', '#000',]}
              style={{ height: "100%", width: '100%', position: "absolute" }}>
            </LinearGradient>

          </Animated.View>

          {index == indexDateSelected &&
            <Animated.View
              style={{
                height: "100%",
                width: '100%',
                position: "absolute",
                opacity: dateSelected
              }}>
              <LinearGradient
                colors={[themeContext.primaryColor, themeContext.secundaryColor,]}
                style={{ height: "100%", width: '100%', position: "absolute" }}>
              </LinearGradient>
            </Animated.View>
          }

          <TicketCarouselView>
            <View style={{ backgroundColor: themeContext.background, borderRadius: 10, height: 10, width: 10 }} />

            <Text style={{ fontSize: 20, color: 'white', fontWeight: "200" }}>{item.week}</Text>
            <Text style={{ fontSize: 20, color: "white", fontWeight: 'bold' }}>{item.day}</Text>


          </TicketCarouselView>
        </TicketCarouselBg>

      </TicketCarouselBorder>
    )
  }


  return (
    <View style={{ backgroundColor: themeContext.background, width: '100%', flex: 1 }}>
      <Carousel
        data={dataDays}
        firstItem={3}
        keyExtractor={(item) => String(item.day)}
        renderItem={renderItemCarousel}
        sliderWidth={SLIDER_WIDTH + 20}
        itemWidth={ITEM_WIDTH}
        onBeforeSnapToItem={(index) => setIndexDateSelected(index)}
      />
    </View>
  )
}

export default Sessions;