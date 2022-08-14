import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, Image, FlatList, Animated, TouchableOpacity, Dimensions, Platform, TouchableWithoutFeedback } from 'react-native';
import { ThemeContext } from 'styled-components';
import { AuthContext } from '../../context/authContext';
import { authContextProps } from '../../models/authModel';
import { dataMoviesBag, dataMoviesModel } from '../../models/moviesModel';
import { themeModel } from '../../models/themeModel';
import authService from '../../services/authService';
import LoadingScreen from '../../templates/loadingScreen';
import { BannerTicket, BuyNowButton, BuyNowTitle, DateTicket, DetailTicket, InfoTicket, ItemToBuyBg, MainBag, MaskedBanner, RemoveButton, Section, SectionDivisor, SectionTitle, TitleBag, TitleTicket, ViewEmptyData } from './styles';
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"
import { ticketContextProps } from '../../models/ticketModel';
import { TicketContext } from '../../context/ticketContext';
import MaskedView from '@react-native-masked-view/masked-view';
import { dayWeek, listMonth, monthProps } from '../../models/dateWeek';


const { width, height } = Dimensions.get("screen")
const ITEM_SIZE = width - 30
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2

const Bag: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)
  const { infoUser, setInfoUser, authState } = useContext<authContextProps>(AuthContext)
  const [dataFavorites, setDataFavorites] = useState<dataMoviesModel[]>([])
  const [dataTickets, setDataTickets] = useState<dataMoviesBag[]>([])
  const [dataClosed, setDataClosed] = useState<dataMoviesBag[]>([])
  const [isFetched, setIsFetched] = useState(false)
  const fadeLoading = useState(new Animated.Value(1))[0]
  const [displayLoading, setDisplayLoading] = useState(true)
  const navigation = useNavigation<NavigationProp<any>>()

  useEffect(() => {
    const loadingBag = async () => {
      if (authState.token != null) {
        const ticketsReq = await authService.getTickets(authState.token)
        const favoritesReq = await authService.getFavorites(authState.token)

        if (favoritesReq != null) setDataFavorites(favoritesReq)

        if (ticketsReq != null) {
          setDataClosed(ticketsReq.filter((ticket) => new Date(ticket.session_date).getTime() < new Date().getTime()))
          setDataTickets(ticketsReq.filter((ticket) => new Date(ticket.session_date).getTime() > new Date().getTime()))
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

  }, [infoUser])

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
      <TouchableOpacity
        onPress={() => navigation.navigate('PosterMovie', { dataMovie: item })}
        style={{ paddingHorizontal: 10 }} >
        <Image
          source={{ uri: item.poster_path }}
          style={{ width: 100, height: 150 }} />
        <RemoveButton style={{ left: 10 }} onPress={() => {
          setDataFavorites(dataFavorites.filter((_, i) => i != index))
          removeFavorite(item)
        }}>
          <FontAwesome
            name="remove"
            size={20}
            color={'#f22'}
            style={{ left: 5, top: 3 }} />
        </RemoveButton>
      </TouchableOpacity>
    )
  }

  const renderItemYourTickets = ({ item, index }: { item: dataMoviesBag | null, index: number }) => {

    if (item == null) {
      return (
        <View style={{ width: SPACER_ITEM_SIZE }} />
      )
    }

    return (
      <ItemToBuyBg width={width}>
        <MaskedView
          style={{ width: '70%', height: '100%' }}
          maskElement={
            <MaskedBanner width={width} />
          }>
          <BannerTicket width={width} source={{ uri: item.banner }} />
        </MaskedView>

        <DetailTicket style={{ top: -10 }} />

        <DetailTicket style={{ bottom: -10 }} />

        <InfoTicket style={{
          shadowColor: "#000000c8",
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 4,
          shadowOpacity: 0.1,
          elevation: 4
        }}>
          <DateTicket>
            {new Date(item.session_date).getDate() + " "}
            {listMonth[new Date(item.session_date).getMonth() as keyof monthProps] + " - "}
            {`${new Date(item.session_date).getHours()}:${String(new Date(item.session_date).getMinutes()) == "0"
              ? "00" : new Date(item.session_date).getMinutes()}`}
          </DateTicket>

          <TitleTicket>
            {item.title}
          </TitleTicket>
        </InfoTicket>
      </ItemToBuyBg >
    )
  }

  return (
    <>
      <LoadingScreen opacity={fadeLoading} display={displayLoading} />

      {isFetched &&
        <MainBag
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}>
          <TitleBag>Bag</TitleBag>

          <Section>
            <SectionTitle>Your tickets</SectionTitle>
            <SectionDivisor />
          </Section>

          {dataTickets.length > 0
            ?
            <>
              <FlatList
                horizontal
                snapToInterval={ITEM_SIZE}
                data={[null, ...dataTickets, null]}
                renderItem={renderItemYourTickets}
                contentContainerStyle={{ alignItems: 'center' }}
                keyExtractor={(_, index) => String(index) + '-Tickets'}
                showsHorizontalScrollIndicator={false}
                decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
                scrollEventThrottle={16}
              />
            </>
            :
            <ViewEmptyData>
              <FontAwesome
                name="dollar"
                size={20}
                color={themeContext.primaryColor}
                style={{ width: 30 }} />
              <View>
                <Text style={{ color: themeContext.gray }}>You don't have movies purchase</Text>
                <Text style={{ color: themeContext.textColor }}>Purchase now!</Text>
              </View>
            </ViewEmptyData>
          }

          <Section>
            <SectionTitle>Closed</SectionTitle>
            <SectionDivisor />
          </Section>

          {dataClosed.length > 0
            ?
            <>
              <FlatList
                horizontal
                snapToInterval={ITEM_SIZE}
                data={[null, ...dataClosed, null]}
                renderItem={renderItemYourTickets}
                contentContainerStyle={{ alignItems: 'center', opacity: 0.6 }}
                keyExtractor={(_, index) => String(index) + '-closed'}
                showsHorizontalScrollIndicator={false}
                decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
                scrollEventThrottle={16}
              />
            </>
            :
            <ViewEmptyData>
              <FontAwesome
                name="close"
                size={20}
                color={themeContext.primaryColor}
                style={{ width: 30 }} />
              <View>
                <Text style={{ color: themeContext.gray }}>You don't have movies closed</Text>
                <Text style={{ color: themeContext.textColor }}>Your expired tickets will appear here</Text>
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
              contentContainerStyle={{ flexGrow: 1, marginBottom: 100 }}
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