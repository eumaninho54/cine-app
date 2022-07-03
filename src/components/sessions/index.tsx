import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Dimensions, Animated } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { ThemeContext } from 'styled-components';
import { dataDays, dataDaysProps } from '../../models/dayWeek';
import { themeModel } from '../../models/themeModel';
import { DayText, GradientSelected, MainSessions, TicketCarouselBg, TicketCarouselBorder, TicketCarouselView, TicketDetail, TicketDetailView, TicketSelectedBorder, WeekText } from './styles';


const SLIDER_WIDTH = Dimensions.get("window").width
const ITEM_WIDTH = SLIDER_WIDTH * 0.30

const Sessions: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)
  const [indexDateSelected, setIndexDateSelected] = useState(3)
  const dateSelected = useState(new Animated.Value(0))[0]

  const renderItemCarousel = ({ item, index }: { item: dataDaysProps, index: number }) => {
    if (index == indexDateSelected) {
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
          colors={[themeContext.ticketLight, themeContext.ticketStrong]}
          style={{ height: '100%', width: '100%', position: "absolute" }}>
        </LinearGradient>

        {index == indexDateSelected &&
          <TicketSelectedBorder style={{ opacity: dateSelected }}>
            <LinearGradient
              colors={[themeContext.primaryColor, themeContext.secundaryColor]}
              style={{ height: '100%', width: '100%', position: "absolute" }}>
            </LinearGradient>
          </TicketSelectedBorder>
        }

        <TicketDetailView style={{ left: -5 }}>
          <LinearGradient
            colors={[themeContext.ticketLight, themeContext.ticketStrong]}
            style={{ height: '100%', width: '100%', position: "absolute" }}>
          </LinearGradient>

          <TicketDetail />
        </TicketDetailView>

        <TicketDetailView style={{ right: -5 }} >
          <LinearGradient
            colors={[themeContext.ticketLight, themeContext.ticketStrong]}
            style={{ height: '100%', width: '100%', position: "absolute" }}>
          </LinearGradient>

          <TicketDetail />
        </TicketDetailView>

        <TicketCarouselBg>
          <LinearGradient
            colors={[themeContext.ticketStrong, '#000']}
            style={{ height: "100%", width: '100%', position: "absolute" }}>
          </LinearGradient>

          {index == indexDateSelected &&
            <GradientSelected style={{ opacity: dateSelected}}>
              <LinearGradient
                colors={[themeContext.primaryColor, themeContext.secundaryColor,]}
                style={{ height: "100%", width: '100%', position: "absolute" }}>
              </LinearGradient>
            </GradientSelected>
          }
          
          <TicketCarouselView>
            <TicketDetail />

            <WeekText>{item.week}</WeekText>
            <DayText>{item.day}</DayText>
          </TicketCarouselView>
        </TicketCarouselBg>
      </TicketCarouselBorder>
    )
  }


  return (
    <MainSessions>
      <Carousel
        data={dataDays}
        firstItem={3}
        keyExtractor={(item) => String(item.day)}
        renderItem={renderItemCarousel}
        sliderWidth={SLIDER_WIDTH + 20}
        itemWidth={ITEM_WIDTH}
        onBeforeSnapToItem={(index) => setIndexDateSelected(index)}
      />
    </MainSessions>
  )
}

export default Sessions;