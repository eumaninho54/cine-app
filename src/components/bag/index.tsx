import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from 'styled-components';
import { AuthContext } from '../../context/authContext';
import { authContextProps } from '../../models/authModel';
import { dataMoviesModel } from '../../models/moviesModel';
import { themeModel } from '../../models/themeModel';
import authService from '../../services/authService';
import { MainBag, TitleBag } from './styles';

const Bag: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)
  const { infoUser, authState } = useContext<authContextProps>(AuthContext)

  useEffect(() => {
    const loadingBag = async () => {
      if (authState.token != null) {
        authService.getFavorites(authState.token)

      }
    }

    loadingBag()

  }, [])

  /*const renderItemFlatList = ({ item, index }: { item: dataMoviesModel, index: number }) => {
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <TouchableWithoutFeedback onPress={() => {
          navigation.navigate('PosterMovie', { dataMovie: item })
        }}>
          <Image
            onLoad={() => isImagesRequested()}
            source={{ uri: item.poster_path }}
            style={{ width: 100, height: 150 }}/>
        </TouchableWithoutFeedback>
      </View>
    )
  }*/

  return (
    <MainBag>
      <TitleBag>Bag</TitleBag>

      <View style={{ width: '100%', paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 16, color: themeContext.gray }}>Favorites</Text>
        <View style={{ backgroundColor: themeContext.gray, height: 1, width: '75%' }} />
      </View>

      {/*<FlatList
        horizontal
        data={dataNowPlaying}
        renderItem={renderItemFlatList}
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={(movie) => String(movie.id)}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={true}
      /> */}


    </MainBag>
  )
}

export default Bag;