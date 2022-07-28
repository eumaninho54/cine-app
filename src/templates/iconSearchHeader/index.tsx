import React, { useContext, useState } from 'react';
import { TouchableOpacity, View, Text, Platform, useColorScheme, SafeAreaView, KeyboardAvoidingView, Keyboard } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons"
import { ThemeContext } from 'styled-components';
import { themeModel } from '../../models/themeModel';
import Modal from "react-native-modal";
import { SearchBar } from 'react-native-elements';
import themes from '../../themes';


const IconSearchHeader: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)
  const [modalActivated, setModalActivated] = useState(false)
  const deviceTheme = useColorScheme()
  const theme = deviceTheme != null && deviceTheme != undefined
    ? themes[deviceTheme]
    : themes['light']

  const onSearch = () => {
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
            containerStyle={{ backgroundColor: themeContext.gray, height: 40, borderRadius: 10 }}
            inputStyle={{ height: 30 }}
            inputContainerStyle={{ height: 20 }}
            platform={Platform.OS == 'android' ? 'android' : 'ios'}
            placeholder="Type Movie..."
          />
        </SafeAreaView>

        <View onTouchStart={() => setModalActivated(false)} style={{ height: '15%' }} />

        <View style={{ width: 200, height: 200 }}>
          <Text>FOOI</Text>
        </View>
      </Modal>
    </>
  )
}

export default IconSearchHeader;