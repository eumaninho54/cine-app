import React, { Ref, useContext, useRef, useState } from 'react';
import { MainLogin, InputLogin, ButtonLogin, TextLogin, ImageLogin, DetailsView } from '../../templates/login/styles';
import banner from '../../../assets/icon2.png'
import logo from '../../../assets/logo.png'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native'
import authService from '../../services/authService';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../../context/authContext';
import { authContextProps } from '../../models/authModel';
import { themeModel } from '../../models/themeModel';
import { ThemeContext } from 'styled-components';


const SignIn: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)
  const [focusInput, setFocusInput] = useState(false)
  const [inputEmail, setInputEmail] = useState("")
  const [inputPassword, setInputPassword] = useState("")
  const refPassword = useRef<any>()
  const navigation = useNavigation<NavigationProp<any>>()
  const authContext = useContext<authContextProps>(AuthContext)

  const onSignIn = async () => {
    const reqSignIn = await authService.signIn(inputEmail, inputPassword)
    
    if (reqSignIn != null) {
      await SecureStore.setItemAsync("token", reqSignIn.authentication["token"])
      authContext.setInfoUser(reqSignIn.infoUser)
      authContext.setAuthState(reqSignIn.authentication)
      navigation.navigate('BrowserNavigation', {})
    } else {
      setInputPassword("")
      refPassword.current.clear()
      showMessage({
        message: "Login failed",
        description: "Invalid credentials",
        backgroundColor: themeContext.primaryColor,
        icon: 'warning',
        type: "warning"
      })
    }
  }

  return (
    <MainLogin behavior='padding'>
      <ScrollView
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ImageLogin show={!focusInput} source={banner} type={'banner'} />
        <ImageLogin show={focusInput} source={logo} type={'logo'} />
        <InputLogin
          placeholder='Email'
          placeholderTextColor={'#808080'}
          onChangeText={(input) => setInputEmail(input)}
          onBlur={() => setFocusInput(false)}
          onFocus={() => setFocusInput(true)} />
        <InputLogin
          ref={refPassword}
          placeholder='Password'
          placeholderTextColor={'#808080'}
          onChangeText={(input) => setInputPassword(input)}
          secureTextEntry={true}
          onBlur={() => setFocusInput(false)}
          onFocus={() => setFocusInput(true)}
        />

        <ButtonLogin onPress={onSignIn}>
          <TextLogin color='reverseColor'>SIGN IN</TextLogin>
        </ButtonLogin>

        <DetailsView>
          <TouchableOpacity>
            <TextLogin color='color'>Forgot Password?</TextLogin>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('LoginNavigation', { screen: 'SignUp' })}>
            <TextLogin color={themeContext.primaryColor}>Signup</TextLogin>
          </TouchableOpacity>
        </DetailsView>
      </ScrollView>
    </MainLogin>
  )
}

export default SignIn;