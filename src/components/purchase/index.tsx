import React, { useContext, useState } from 'react';
import { FlatList, TouchableOpacity, View, Image, Text } from 'react-native';
import { ThemeContext } from 'styled-components';
import { dataMoviesModel, dataMoviesToBuy } from '../../models/moviesModel';
import { themeModel } from '../../models/themeModel';
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"
import { ButtonFinish, MainBg, MainToBuy, RemoveButton, TextBuyTicket, TitleToBuy, EmptyData, MovieBagView, ImageMovie, ViewInfo, TextInfo } from './styles';
import { Divider } from 'react-native-elements';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { listMonth, monthProps } from '../../models/dateWeek';
import authService from '../../services/authService';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import { StatesModel } from '../../models/storeModel';
import { AppDispatch } from '../../store';
import { setToBuy } from '../../store/toBuyTickets';
import { verifyToken } from '../../store/userSlice';


const Purchase: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)
  const navigation = useNavigation<NavigationProp<any>>()
  const toBuyTickets = useSelector((state: StatesModel) => state.toBuyTickets)
  const user = useSelector((state: StatesModel) => state.user)
  const dispatch = useDispatch<AppDispatch>()

  const purchase = async () => {
    if (user.token != null) {
      const ticketsToBuyValid = toBuyTickets.filter((movie) => (
        movie.session_date > new Date() ? true : false
      ))

      if (ticketsToBuyValid.length != toBuyTickets.length) {
        showMessage({
          message: "Invalid to purchase",
          description: "Expired movies have been removed from the bag",
          backgroundColor: themeContext.primaryColor,
          icon: 'danger',
          type: "danger",
          duration: 3000,
        })
        dispatch(setToBuy(ticketsToBuyValid))
        return
      }

      const req = await authService.buyTicket(toBuyTickets, user.token)

      if (req == null) {
        showMessage({
          message: "Error to buy",
          description: "Invalid tickets",
          backgroundColor: themeContext.primaryColor,
          icon: 'danger',
          type: "danger"
        })

        return
      }

      showMessage({
        message: "Successful",
        description: "Ticket purchase",
        backgroundColor: themeContext.primaryColor,
        icon: 'success',
        type: "success"
      })
      await dispatch(verifyToken())
      dispatch(setToBuy(null))
      navigation.goBack()
    }
  }

  const renderItemFavorite = ({ item, index }: { item: dataMoviesToBuy, index: number }) => {
    return (
      <MovieBagView>
        <ImageMovie source={{ uri: item.poster_path }} />
        <RemoveButton style={{ left: 10 }} onPress={() => {
          dispatch(setToBuy(toBuyTickets.filter((_, i) => i != index)))
        }}>
          <FontAwesome
            name="remove"
            size={20}
            color={'#f22'}
            style={{ left: 5, top: 3 }} />
        </RemoveButton>

        <ViewInfo>
          <TextInfo>
            {listMonth[item.session_date.getMonth() as keyof monthProps] + " "}
            {item.session_date.getDate() + " - "}
            {`${new Date(item.session_date).getHours()}:${String(new Date(item.session_date).getMinutes()) == "0"
              ? "00" : new Date(item.session_date).getMinutes()}`}
          </TextInfo>

          <TextInfo style={{ color: themeContext.textColor }}>$10</TextInfo>
        </ViewInfo>
      </MovieBagView>
    )
  }

  return (
    <MainBg>

      <TitleToBuy>To buy</TitleToBuy>

      {toBuyTickets.length > 0
        ?
        <FlatList
          horizontal
          data={toBuyTickets}
          renderItem={renderItemFavorite}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 220
          }}
          keyExtractor={(_, index) => String(index) + '-tobuy'}
          showsHorizontalScrollIndicator={false}
        />
        :
        <EmptyData>
          <FontAwesome5
            name="shopping-bag"
            size={20}
            color={themeContext.primaryColor}
            style={{ width: 30 }} />
          <View>
            <Text style={{ color: themeContext.gray }}>You don't have movies in your bag</Text>
            <Text style={{ color: themeContext.textColor }}>Go add now!</Text>
          </View>
        </EmptyData>

      }

      <ButtonFinish
        onPress={toBuyTickets.length > 0 ? purchase : navigation.goBack}>
        {
          toBuyTickets.length > 0
            ?
            <>
              <TextBuyTicket>Purchase</TextBuyTicket>

              <Divider
                width={1}
                color={themeContext.white}
                style={{ opacity: 0.6 }}
                orientation={'vertical'} />
              <TextBuyTicket>{toBuyTickets.length * 10}$</TextBuyTicket>
            </>
            :
            <TextBuyTicket>Back</TextBuyTicket>
        }
      </ButtonFinish>
    </MainBg>
  )
}

export default Purchase;