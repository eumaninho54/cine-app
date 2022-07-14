import { NavigationProp, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Carousel from 'react-native-snap-carousel';
import { ThemeContext } from 'styled-components';
import { TicketContext } from '../../context/ticketContext';
import { dataDays, dataDaysProps, hoursObject } from '../../models/dateWeek';
import { dataMoviesModel } from '../../models/moviesModel';
import { themeModel } from '../../models/themeModel';
import { ticketContextProps } from '../../models/ticketModel';
import { ButtonReservation, ButtonsGroup, DayText, GradientSelected, MainSessions, SelectDateText, TextBuyTicket, TicketCarouselBg, TicketCarouselBorder, TicketCarouselView, TicketDetail, TicketDetailView, TicketSelectedBorder, WeekText } from './styles';

const SLIDER_WIDTH = Dimensions.get("window").width
const ITEM_WIDTH = SLIDER_WIDTH * 0.30

const Sessions: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>()
  const themeContext = useContext<themeModel>(ThemeContext)
  const [indexDateSelected, setIndexDateSelected] = useState(3)
  const { setNumTicketCar } = useContext<ticketContextProps>(TicketContext)

  const addToCar = () => {
    setNumTicketCar((value) => value + 1)
    navigation.goBack()
  }

  const purchase = () => {

  }

  const renderItemDate = ({ item, index }: { item: dataDaysProps, index: number }) => {
    return (
      <TicketCarouselBorder style={{ width: ITEM_WIDTH - 20 }}>
        <LinearGradient
          colors={[themeContext.ticketLight, themeContext.ticketStrong]}
          style={{ height: '100%', width: '100%', position: "absolute" }}>
        </LinearGradient>

        {index == indexDateSelected &&
          <TicketSelectedBorder>
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
            <GradientSelected>
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
      <View>
        <SelectDateText>
          {'Select '}
          <SelectDateText style={{ fontWeight: "400" }}>
            Date
          </SelectDateText>
        </SelectDateText>
        <Carousel
          data={dataDays}
          firstItem={3}
          keyExtractor={(item) => String(item.day)}
          renderItem={renderItemDate}
          sliderWidth={SLIDER_WIDTH + 20}
          itemWidth={ITEM_WIDTH}
          onBeforeSnapToItem={(index) => setIndexDateSelected(index)}
        />
      </View>

      <ButtonsGroup>
        <ButtonReservation
          onPress={purchase}>
          <TextBuyTicket>Purchase</TextBuyTicket>
        </ButtonReservation>
      </ButtonsGroup>

    </MainSessions>
  )
}

export default Sessions;