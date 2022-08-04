import React, { useContext, useState } from 'react';
import { FlatList, TouchableOpacity, View, Image, Text } from 'react-native';
import { ThemeContext } from 'styled-components';
import { AuthContext } from '../../context/authContext';
import { TicketContext } from '../../context/ticketContext';
import { authContextProps } from '../../models/authModel';
import { dataMoviesModel, dataMoviesToBuy } from '../../models/moviesModel';
import { themeModel } from '../../models/themeModel';
import { ticketContextProps } from '../../models/ticketModel';
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"
import { ButtonFinish, MainBg, MainToBuy, RemoveButton, TextBuyTicket, TitleToBuy, EmptyData } from './styles';
import { Divider } from 'react-native-elements';
import { NavigationProp, useNavigation } from '@react-navigation/native';


const Purchase: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)
  const { infoUser, setInfoUser, authState, } = useContext<authContextProps>(AuthContext)
  const { ticketsToBuy, setTicketsToBuy } = useContext<ticketContextProps>(TicketContext)
  const [valuePurchase, setValuePurchase] = useState(0)
  const navigation = useNavigation<NavigationProp<any>>()
  
  const purchase = () => {

  }

  const renderItemFavorite = ({ item, index }: { item: dataMoviesToBuy, index: number }) => {
    return (
      <View style={{ paddingHorizontal: 10, height: 220 }} >
        <Image
          source={{ uri: item.poster_path }}
          style={{ width: 100, height: 150 }} />
        <RemoveButton style={{ left: 10 }} onPress={() => {
          setTicketsToBuy(ticketsToBuy.filter((_, i) => i != index))
        }}>
          <FontAwesome
            name="remove"
            size={20}
            color={'#f22'}
            style={{ left: 5, top: 3 }} />
        </RemoveButton>

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: themeContext.textColor }}>
            {item.dataSession['month']}
            {item.dataSession['day'] + " - "}
            {item.dataSession['week']}
          </Text>

          <Text style={{ color: themeContext.textColor }}>$10</Text>
        </View>
      </View>
    )
  }

  return (
    <MainBg>

      <TitleToBuy>To buy</TitleToBuy>

      {ticketsToBuy.length > 0
        ?
        <FlatList
          horizontal
          data={ticketsToBuy}
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
        onPress={ticketsToBuy.length > 0 ? purchase : navigation.goBack}>
        {
          ticketsToBuy.length > 0
            ?
            <>
              <TextBuyTicket>Purchase</TextBuyTicket>

              <Divider
                width={1}
                color={themeContext.white}
                style={{ opacity: 0.6 }}
                orientation={'vertical'} />
              <TextBuyTicket>{ticketsToBuy.length * 10}$</TextBuyTicket>
            </>
            :
            <TextBuyTicket>Back</TextBuyTicket>
        }
      </ButtonFinish>
    </MainBg>
  )
}

export default Purchase;