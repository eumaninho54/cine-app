import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, Image, FlatList, Animated, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { ThemeContext } from 'styled-components';
import { AuthContext } from '../../context/authContext';
import { authContextProps } from '../../models/authModel';
import { dataMoviesModel, dataMoviesToBuy } from '../../models/moviesModel';
import { themeModel } from '../../models/themeModel';
import authService from '../../services/authService';
import LoadingScreen from '../../templates/loadingScreen';
import { MainBag, RemoveButton, Section, SectionDivisor, SectionTitle, TitleBag, ViewEmptyData } from './styles';
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"
import { ticketContextProps } from '../../models/ticketModel';
import { TicketContext } from '../../context/ticketContext';
import MaskedView from '@react-native-masked-view/masked-view';


const { width, height } = Dimensions.get("screen")
const ITEM_SIZE = width - 30
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2

const Bag: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)
  const { ticketsToBuy, setTicketsToBuy } = useContext<ticketContextProps>(TicketContext)
  const { infoUser, setInfoUser, authState } = useContext<authContextProps>(AuthContext)
  const [dataFavorites, setDataFavorites] = useState<dataMoviesModel[]>([])
  const [isFetched, setIsFetched] = useState(false)
  const fadeLoading = useState(new Animated.Value(1))[0]
  const [displayLoading, setDisplayLoading] = useState(true)

  useEffect(() => {
    const loadingBag = async () => {
      if (authState.token != null) {
        const req = await authService.getFavorites(authState.token)

        if (req != null) {
          setDataFavorites(req)
        }
        setIsFetched(true)
        Animated.timing(fadeLoading, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
          setDisplayLoading(false)
        })
      }

    }
    loadingBag()

  }, [infoUser.favorites])

  const removeFavorite = async (dataMovie: dataMoviesModel) => {
    if (authState.token != null) {

      const isChanged = await authService.changeFavorite(
        {
          isSelected: false,
          dataMovie: dataMovie
        }, authState.token)
      if (isChanged != null) {
        setInfoUser((value) => (
          {
            ...value,
            favorites: isChanged.favorites
          }
        ))
      }
    }
  }

  const renderItemFavorite = ({ item, index }: { item: dataMoviesModel, index: number }) => {

    return (
      <View
        style={{ paddingHorizontal: 10 }} >
        <Image
          source={{ uri: item.poster_path }}
          style={{ width: 100, height: 150 }} />
        <RemoveButton onPress={() => {
          setDataFavorites(dataFavorites.filter((_, i) => i != index))
          removeFavorite(item)
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

  const renderItemToBuy = ({ item, index }: { item: dataMoviesToBuy | null, index: number }) => {

    if (item == null) {
      return (
        <View style={{ width: SPACER_ITEM_SIZE }} />
      )
    }

    return (
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 20,
          width: width - 50,
          height: 130,
          flexDirection: 'row',
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 8,
          shadowOpacity: 0.2,
          elevation: 10,
          borderRadius: 12,
        }} >

        <MaskedView
          style={{ width: '70%', height: '100%' }}
          maskElement={
            <View
              style={{
                width: (width - 50) * 0.7,
                height: 130,
                backgroundColor: 'blue',
                borderRadius: 12
              }} />
          }>
          <Image source={{ uri: item.banner }} style={{ width: (width - 50) * 0.7, height: 130 }} />
        </MaskedView>

        <View style={{
          position: 'absolute',
          left: '67.5%',
          top: -10,
          height: 20,
          width: 20,
          borderRadius: 10,
          backgroundColor: themeContext.background,
          zIndex: 3
        }} />

        <View style={{
          position: 'absolute',
          left: '67.5%',
          bottom: -10,
          height: 20,
          width: 20,
          borderRadius: 10,
          backgroundColor: themeContext.background,
          zIndex: 3
        }} />

        <View
          style={{
            width: '30%',
            height: '100%',
            backgroundColor: themeContext.backgroundView,
            borderRadius: 12,
            padding: 10
          }}>
            <Text style={{color: themeContext.primaryColor, fontSize: 12, marginBottom: 15}}>
              {item.dataSession['month'] + " "}
              {item.dataSession['day'] + " - "}
              {item.hoursSession}
            </Text>

            <Text style={{color: themeContext.textColor, fontSize: 15}}>
              {item.title}
            </Text>
        </View>

        <RemoveButton onPress={() => {
          console.tron.log!(index - 1)
          setTicketsToBuy(ticketsToBuy.filter((_, i) => i != index - 1))
        }}>
          <FontAwesome
            name="remove"
            size={20}
            color={'#f22'}
            style={{ left: 5, top: 3 }} />
        </RemoveButton>

      </View >

    )
  }

  {/*<View
        style={{ paddingHorizontal: 10, backgroundColor: "green" }} >
        <Image
          source={{ uri: item.poster_path }}
          style={{ width: 100, height: 150 }} />
        <RemoveButton onPress={() => {
          setTicketsToBuy(ticketsToBuy.filter((_, i) => i != index))
        }}>
          <FontAwesome
            name="remove"
            size={20}
            color={'#f22'}
            style={{ left: 5, top: 3 }} />
        </RemoveButton>

        <View style={{backgroundColor: "blue", width: '100%', height: 50}}>

        </View>
      </View >*/}

  return (
    <>
      <LoadingScreen opacity={fadeLoading} display={displayLoading} />

      {isFetched &&
        <MainBag contentContainerStyle={{ alignItems: 'center' }}>
          <TitleBag>Bag</TitleBag>

          <Section>
            <SectionTitle>To buy</SectionTitle>
            <SectionDivisor />
          </Section>

          {ticketsToBuy.length > 0
            ?
            <FlatList
              horizontal
              snapToInterval={ITEM_SIZE}
              data={[null, ...ticketsToBuy, null]}
              renderItem={renderItemToBuy}
              contentContainerStyle={{ alignItems: 'center' }}
              keyExtractor={(_, index) => String(index) + '-toBuy'}
              showsHorizontalScrollIndicator={false}
              decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}

              scrollEventThrottle={16}
            />
            :
            <ViewEmptyData>
              <FontAwesome5
                name="cart-plus"
                size={20}
                color={themeContext.primaryColor}
                style={{ width: 30 }} />
              <View>
                <Text style={{ color: themeContext.gray }}>You don't have movies in bag</Text>
                <Text style={{ color: themeContext.textColor }}>Add movies to purchase</Text>
              </View>
            </ViewEmptyData>
          }

          <Section>
            <SectionTitle>Favorites</SectionTitle>
            <SectionDivisor />
          </Section>

          {dataFavorites.length > 0
            ?
            <FlatList
              horizontal
              data={dataFavorites}
              renderItem={renderItemFavorite}
              contentContainerStyle={{ flexGrow: 1 }}
              keyExtractor={(_, index) => String(index) + '-favorites'}
              showsHorizontalScrollIndicator={false}
            />
            :
            <ViewEmptyData>
              <FontAwesome5
                name="bookmark"
                size={20}
                color={themeContext.primaryColor}
                style={{ width: 30 }} />
              <View>
                <Text style={{ color: themeContext.gray }}>You don't have favorites movies</Text>
                <Text style={{ color: themeContext.textColor }}>Touch on the flag to add</Text>
              </View>
            </ViewEmptyData>
          }
        </MainBag>
      }
    </>
  )
}
export default Bag;