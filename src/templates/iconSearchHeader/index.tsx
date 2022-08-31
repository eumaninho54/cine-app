import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Platform, SafeAreaView, KeyboardAvoidingView, Keyboard, FlatList, TouchableWithoutFeedback, Image, useColorScheme, Animated } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons"
import { ThemeContext } from 'styled-components';
import { themeModel } from '../../models/themeModel';
import Modal from "react-native-modal";
import { SearchBar } from 'react-native-elements';
import { dataMoviesModel } from '../../models/moviesModel';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import moviesService from '../../services/moviesService';


const IconSearchHeader: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)
  const [modalActivated, setModalActivated] = useState(false)
  const [textSearch, setTextSearch] = useState("")
  const [moviesSearch, setMoviesSearch] = useState<dataMoviesModel[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation<NavigationProp<any>>()

  useEffect(() => {
    const reloadSearch = async () => {
      if (textSearch.trim() == '') return

      setIsLoading(true)
      const moviesSearch = await moviesService.searchMovie(textSearch)

      if (moviesSearch == null) {
        return
      }
      setMoviesSearch(moviesSearch)
      setIsLoading(false)
    }

    reloadSearch()

  }, [textSearch])

  const renderItemFlatList = ({ item, index }: { item: dataMoviesModel, index: number }) => {
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <TouchableWithoutFeedback onPress={() => {
          navigation.navigate('PosterMovie', { dataMovie: item })
          setModalActivated(false)
        }}>
          <Image
            source={{ uri: item.poster_path }}
            style={{ width: 100, height: 150 }} />
        </TouchableWithoutFeedback>
      </View>
    )
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalActivated(true)}
        style={{ padding: 5, alignItems: 'center', justifyContent: 'center' }}>
        <FontAwesome5
          name="search"
          size={28}
          color={"#303030"}
        />
      </TouchableOpacity>

      <Modal
        isVisible={modalActivated}
        onBackdropPress={() => setModalActivated(false)}
        backdropTransitionInTiming={0}
        hideModalContentWhileAnimating
        animationIn={'fadeInDown'}
        animationOut={'fadeOutUp'}
        backdropOpacity={0.9}
        useNativeDriver
        style={{ alignItems: "center", justifyContent: "flex-start" }}>
        <SafeAreaView style={{ width: '90%' }}>
          <SearchBar
            autoFocus
            containerStyle={{
              backgroundColor: Platform.OS == "ios" ? "transparent" : themeContext.gray,
              height: 40,
              borderRadius: 10
            }}
            cancelButtonProps={{ color: themeContext.primaryColor }}
            selectionColor={themeContext.primaryColor}
            inputStyle={{ height: 30 }}
            inputContainerStyle={{ height: 20 }}
            platform={Platform.OS == 'android' ? 'android' : 'ios'}
            placeholder="Type Movie..."
            value={textSearch}
            onChangeText={(text) => setTextSearch(text)}
            showLoading={isLoading}
            loadingProps={{ color: themeContext.primaryColor }}
            
          />
        </SafeAreaView>

        <View onTouchStart={() => setModalActivated(false)} style={{ height: '30%' }} />
        
        <View style={{ height: 150 }}>
          <FlatList
            horizontal
            data={moviesSearch}
            renderItem={renderItemFlatList}
            contentContainerStyle={{ flexGrow: 1 }}
            keyExtractor={(movie) => String(movie.id)}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={true}
          />
        </View>
      </Modal>
    </>
  )
}

export default IconSearchHeader;