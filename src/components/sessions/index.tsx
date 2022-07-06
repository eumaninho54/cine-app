import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Dimensions, Animated, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { ThemeContext } from 'styled-components';
import { dataDays, dataDaysProps } from '../../models/dayWeek';
import { themeModel } from '../../models/themeModel';
import { CarouselView, DayText, GradientSelected, MainSessions, SelectDateText, TicketCarouselBg, TicketCarouselBorder, TicketCarouselView, TicketDetail, TicketDetailView, TicketSelectedBorder, WeekText } from './styles';

const SLIDER_WIDTH = Dimensions.get("window").width
const ITEM_WIDTH = SLIDER_WIDTH * 0.30

const Sessions: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)
  const [indexDateSelected, setIndexDateSelected] = useState(3)
  const hoursObject = ["13:00", "15:15", "17:30"]
  const [hourSelected, setHourSelected] = useState<number>()

  const onHourSession = (props: any) => {
    console.tron.log!(props)
  }

  const HoursMap = () => {

    return (
      <View style={{
        width: '70%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
      }}>
        {
          hoursObject.map((hour, index) => {
            return (
              <TouchableOpacity
                onPress={() => setHourSelected(index)}
                style={{
                  borderColor: hourSelected == index ? themeContext.primaryColor : "white",
                  borderWidth: 4,
                  borderRadius: 2,
                  padding: 10
                }}
                key={index}>
                <Text style={{ color: "white" }}>{hour}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }

  const renderItemCarousel = ({ item, index }: { item: dataDaysProps, index: number }) => {

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
      <SelectDateText>
        {'Select '}
        <SelectDateText style={{ fontWeight: "400" }}>
          Date
        </SelectDateText>
      </SelectDateText>
      <CarouselView>
        <Carousel
          data={dataDays}
          firstItem={3}
          keyExtractor={(item) => String(item.day)}
          renderItem={renderItemCarousel}
          sliderWidth={SLIDER_WIDTH + 20}
          itemWidth={ITEM_WIDTH}
          onBeforeSnapToItem={(index) => setIndexDateSelected(index)}
        />
      </CarouselView>

      {HoursMap()}

      <View style={{marginTop: 40, width: '100%', alignItems: "center", justifyContent: "center"}}>
        <TouchableOpacity style={{ 
          backgroundColor: 'white',
          padding: 15,
          borderRadius: 5,
          width: '90%',
          justifyContent: "center",
          alignItems: "center"}}>
          <Text>Add to car</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ 
          backgroundColor: themeContext.primaryColor,
          padding: 15,
          marginTop: 20,
          borderRadius: 5,
          width: '90%',
          justifyContent: "center",
          alignItems: "center"}}>
          <Text>Purchase</Text>
        </TouchableOpacity>
      </View>

    </MainSessions>
  )
}

export default Sessions;