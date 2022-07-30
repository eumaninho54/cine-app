import React, { useContext, useState } from 'react';
import { FlatList, TouchableOpacity, View, Image, Text } from 'react-native';
import { ThemeContext } from 'styled-components';
import { AuthContext } from '../../context/authContext';
import { TicketContext } from '../../context/ticketContext';
import { authContextProps } from '../../models/authModel';
import { dataMoviesModel } from '../../models/moviesModel';
import { themeModel } from '../../models/themeModel';
import { ticketContextProps } from '../../models/ticketModel';
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"
import { ButtonFinish, MainBg, MainToBuy, RemoveButton, TextBuyTicket, TitleToBuy, ViewEmptyData } from './styles';
import { Divider } from 'react-native-elements';


const Purchase: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)
  const { infoUser, setInfoUser, authState, } = useContext<authContextProps>(AuthContext)
  const { ticketsToBuy, setTicketsToBuy } = useContext<ticketContextProps>(TicketContext)
  const [valuePurchase, setValuePurchase] = useState(0)

  const purchase = () => {

  }

  const renderItemFavorite = ({ item, index }: { item: dataMoviesModel, index: number }) => {
    return (
      <View style={{ paddingHorizontal: 10 }} >
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
      </View>
    )
  }

  return (
    <MainBg>
      <MainToBuy>
        <TitleToBuy>To buy</TitleToBuy>
        <FlatList
          horizontal
          data={ticketsToBuy}
          renderItem={renderItemFavorite}
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center', height: 200 }}
          keyExtractor={(_, index) => String(index) + '-tobuy'}
          showsHorizontalScrollIndicator={false}
        />

        <ButtonFinish
          onPress={purchase}>
          <TextBuyTicket>Purchase</TextBuyTicket>

          <Divider
            width={1}
            color={themeContext.white}
            style={{ opacity: 0.6 }}
            orientation={'vertical'} />

          <TextBuyTicket style={{}}>{valuePurchase}$</TextBuyTicket>
        </ButtonFinish>
      </MainToBuy>
    </MainBg>
  )
}

export default Purchase;