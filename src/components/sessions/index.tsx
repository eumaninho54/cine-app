import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Carousel from 'react-native-snap-carousel';
import { ThemeContext } from 'styled-components';
import { dataDays, dataDaysProps } from '../../models/dateWeek';
import { FontAwesome5 } from "@expo/vector-icons"
import { dataMoviesModel } from '../../models/moviesModel';
import { themeModel } from '../../models/themeModel';
import { ButtonFinish, ButtonsGroup, DayText, GradientSelected, MainSessions, SelectDateText, TextBuyTicket, TicketCarouselBg, TicketCarouselBorder, TicketCarouselView, TicketDetail, TicketDetailView, TicketSelectedBorder, WeekText } from './styles';
import { Divider } from 'react-native-elements';
import authService from '../../services/authService';
import { StatesModel } from '../../models/storeModel';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { setToBuy } from '../../store/toBuyTickets';
import { verifyToken } from '../../store/userSlice';


interface routeProp {
  key: string;
  name: string;
  path?: string | undefined;
  params: dataMoviesModel;
}

const SLIDER_WIDTH = Dimensions.get("window").width
const ITEM_WIDTH = SLIDER_WIDTH * 0.30

const Sessions: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>()
  const themeContext = useContext<themeModel>(ThemeContext)
  const [indexDateSelected, setIndexDateSelected] = useState(1)
  const dataMovie = useRoute<routeProp>().params
  const hoursObject = ["13:00", "15:15", "17:30"]
  const [hourSelected, setHourSelected] = useState<number>()
  const toBuyTickets = useSelector((state: StatesModel) => state.toBuyTickets)
  const user = useSelector((state: StatesModel) => state.user)
  const dispatch = useDispatch<AppDispatch>()

  const addToCar = () => {
    if (hourSelected == null) {
      showMessage({
        message: "Invalid add to car",
        description: "Select hour",
        backgroundColor: themeContext.primaryColor,
        icon: 'danger',
        type: "danger",
        duration: 3000,
      })
      return
    }

    const session_date = dataDays[indexDateSelected].date
    session_date.setHours(Number(hoursObject[hourSelected].substring(0, 2)), Number(hoursObject[hourSelected].substring(3, 5)), 0)

    if(session_date < new Date()){
      showMessage({
        message: "Invalid to purchase",
        description: "Check the date",
        backgroundColor: themeContext.primaryColor,
        icon: 'warning',
        type: "warning"
      })
      return 
    }
    dispatch(setToBuy([...toBuyTickets, {
      ...dataMovie,
      session_date: session_date,
    }]))
    navigation.goBack()
  }

  const purchase = async () => {
    if (hourSelected == null) {
      showMessage({
        message: "Invalid add to car",
        description: "Select hour",
        backgroundColor: themeContext.primaryColor,
        icon: 'danger',
        type: "danger",
        duration: 3000,
      })
      return
    }

    if (user.token != null) {
      const session_date = dataDays[indexDateSelected].date
      session_date.setHours(Number(hoursObject[hourSelected].substring(0, 2)), Number(hoursObject[hourSelected].substring(3, 5)), 0)

      if(session_date < new Date()){
        showMessage({
          message: "Invalid to purchase",
          description: "Check the date",
          backgroundColor: themeContext.primaryColor,
          icon: 'warning',
          type: "warning"
        })
        return 
      }

      const req = await authService.buyTicket([
        {
          ...dataMovie,
          session_date: session_date
        }], user.token)

      if (req != null) {
        
        showMessage({
          message: "Successful",
          description: "Ticket purchase",
          backgroundColor: themeContext.primaryColor,
          icon: 'success',
          type: "success"
        })
        await dispatch(verifyToken())
        navigation.goBack()
      }
    }
  }

  const hoursRender = (value: string, index: number) => {

    return (
      <TouchableOpacity
        key={String(index) + "-hour"}
        onPress={() => setHourSelected(index)}
        style={{
          margin: 20,
          height: 40,
          width: 70,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          borderWidth: 2,
          borderColor: hourSelected == index ? themeContext.primaryColor : themeContext.textColor
        }}>
        <Text style={{ color: themeContext.textColor }}>{value}</Text>
      </TouchableOpacity>
    )
  }

  const renderItemDate = ({ item, index }: { item: dataDaysProps, index: number }) => {

    return (
      <TicketCarouselBorder style={{ width: ITEM_WIDTH - 20 }}>
        <LinearGradient
          colors={[themeContext.ticketLight, themeContext.ticketStrong]}
          style={{ height: '100%', width: '100%', position: 'absolute' }}>
        </LinearGradient>

        {index == indexDateSelected &&
          <TicketSelectedBorder>
            <LinearGradient
              colors={[themeContext.primaryColor, themeContext.secundaryColor]}
              style={{ height: '100%', width: '100%', position: 'absolute' }}>
            </LinearGradient>
          </TicketSelectedBorder>
        }

        <TicketDetailView style={{ left: -5 }}>
          <LinearGradient
            colors={[themeContext.ticketLight, themeContext.ticketStrong]}
            style={{ height: '100%', width: '100%', position: 'absolute' }}>
          </LinearGradient>

          <TicketDetail />
        </TicketDetailView>

        <TicketDetailView style={{ right: -5 }} >
          <LinearGradient
            colors={[themeContext.ticketLight, themeContext.ticketStrong]}
            style={{ height: '100%', width: '100%', position: 'absolute' }}>
          </LinearGradient>

          <TicketDetail />
        </TicketDetailView>

        <TicketCarouselBg>
          <LinearGradient
            colors={[themeContext.ticketStrong, '#000']}
            style={{ height: '100%', width: '100%', position: 'absolute' }}>
          </LinearGradient>

          {index == indexDateSelected &&
            <GradientSelected>
              <LinearGradient
                colors={[themeContext.primaryColor, themeContext.secundaryColor,]}
                style={{ height: '100%', width: '100%', position: 'absolute' }}>
              </LinearGradient>
            </GradientSelected>
          }

          <TicketCarouselView>
            <TicketDetail />

            <WeekText>{item.week}</WeekText>
            <DayText>{item.date.getDate()}</DayText>
          </TicketCarouselView>
        </TicketCarouselBg>
      </TicketCarouselBorder>
    )
  }

  return (
    <MainSessions contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
      <View>
        <SelectDateText>
          {'Select '}
          <SelectDateText style={{ fontWeight: '400' }}>
            Date
          </SelectDateText>
        </SelectDateText>

        <Carousel
          data={dataDays}
          firstItem={1}
          keyExtractor={(item) => String(item.date.getDate())}
          renderItem={renderItemDate}
          sliderWidth={SLIDER_WIDTH + 20}
          itemWidth={ITEM_WIDTH}
          onBeforeSnapToItem={(index) => setIndexDateSelected(index)} />

        <View style={{ marginVertical: 10, width: '100%', justifyContent: 'center', flexDirection: 'row' }}>
          {hoursObject.map(hoursRender)}
        </View>
      </View>

      <ButtonsGroup>
        <ButtonFinish
          style={{ backgroundColor: themeContext.white }}
          onPress={addToCar}>
          <TextBuyTicket style={{ color: themeContext.primaryColor }}>Add to car</TextBuyTicket>

          <Divider
            width={1}
            color={themeContext.primaryColor}
            style={{ opacity: 0.6 }}
            orientation={'vertical'} />

          <FontAwesome5
            name="cart-plus"
            size={20}
            color={themeContext.primaryColor}
            style={{ width: 30 }} />
        </ButtonFinish>

        <ButtonFinish
          onPress={purchase}>
          <TextBuyTicket>Purchase</TextBuyTicket>

          <Divider
            width={1}
            color={themeContext.white}
            style={{ opacity: 0.6 }}
            orientation={'vertical'} />

          <TextBuyTicket style={{}}>10$</TextBuyTicket>
        </ButtonFinish>
      </ButtonsGroup>
    </MainSessions>
  )
}

export default Sessions;