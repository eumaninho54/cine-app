import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, Image, FlatList, Animated } from 'react-native';
import { ThemeContext } from 'styled-components';
import { AuthContext } from '../../context/authContext';
import { authContextProps } from '../../models/authModel';
import { dataMoviesModel } from '../../models/moviesModel';
import { themeModel } from '../../models/themeModel';
import authService from '../../services/authService';
import LoadingScreen from '../../templates/loadingScreen';
import { MainBag, TitleBag } from './styles';
import { FontAwesome5 } from "@expo/vector-icons"

const Bag: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)
  const { infoUser, authState } = useContext<authContextProps>(AuthContext)
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

  const renderItemFlatList = ({ item, index }: { item: dataMoviesModel, index: number }) => {

    return (
      <View style={{ paddingHorizontal: 10 }}>
        <Image
          source={{ uri: item.poster_path }}
          style={{ width: 100, height: 150 }} />
      </View>
    )
  }

  return (
    <>
      <LoadingScreen opacity={fadeLoading} display={displayLoading} />

      {isFetched &&
        <MainBag>
          <TitleBag>Bag</TitleBag>

          <View style={{ width: '100%', paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, color: themeContext.gray }}>Favorites</Text>
            <View style={{ backgroundColor: themeContext.gray, height: 1, width: '75%' }} />
          </View>

          {dataFavorites.length > 0
            ?
            <FlatList
              horizontal
              data={dataFavorites}
              renderItem={renderItemFlatList}
              contentContainerStyle={{ flexGrow: 1 }}
              keyExtractor={(movie) => String(movie.id) + '-favorites'}
              showsHorizontalScrollIndicator={false}
            />
            :
            <View style={{
              height: 30,
              width: '100%',
              marginVertical: 10,
              paddingHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: "center"
            }}>
              <FontAwesome5
                name="bookmark"
                size={20}
                color={themeContext.primaryColor}
                style={{ marginRight: 15 }} />
              <View>
                <Text style={{color: themeContext.gray}}>You don't have favorites movies</Text>
                <Text style={{color: themeContext.textColor}}>Touch on the heart to continue</Text>
              </View>
            </View>
          }
        </MainBag>
      }
    </>
  )
}
export default Bag;