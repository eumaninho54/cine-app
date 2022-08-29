import React, { Ref, useContext, useRef, useState } from 'react';
import { MainLogin, InputLogin, ButtonLogin, TextLogin, ImageLogin, DetailsView } from '../../templates/login/styles';
import banner from '../../../assets/icon2.png'
import logo from '../../../assets/logo.png'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native'
import authService from '../../services/authService';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import * as SecureStore from 'expo-secure-store';
import { themeModel } from '../../models/themeModel';
import { ThemeContext } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import userSlice, { login, verifyToken } from '../../store/userSlice';
import { StatesModel, userProps } from '../../models/storeModel';
import { AppDispatch } from '../../store';


const SignIn: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)
  const [focusInput, setFocusInput] = useState(false)
  const [inputEmail, setInputEmail] = useState("")
  const [inputPassword, setInputPassword] = useState("")
  const refPassword = useRef<any>()
  const navigation = useNavigation<NavigationProp<any>>()
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: StatesModel) => state.user)

  const onSignIn = async () => {
    const userInfo = (await dispatch(login({email: inputEmail, password: inputPassword}))).payload as userProps
    console.tron.log!(user)

    if(userInfo.token == ""){
      setInputPassword("")
      refPassword.current.clear()
      showMessage({
        message: "Login failed",
        description: "Invalid credentials",
        backgroundColor: themeContext.primaryColor,
        icon: 'warning',
        type: "warning"
      })
      return
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
          autoCapitalize='none'
          placeholderTextColor={'#808080'}
          onChangeText={(input) => setInputEmail(input)}
          onBlur={() => setFocusInput(false)}
          onFocus={() => setFocusInput(true)} />
        <InputLogin
          ref={refPassword}
          placeholder='Password'
          autoCapitalize='none'
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