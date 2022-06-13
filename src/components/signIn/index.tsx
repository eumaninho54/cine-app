import React, { Ref, useContext, useRef, useState } from 'react';
import { MainLogin, InputLogin, ButtonLogin, TextLogin, ImageLogin, DetailsView } from '../../templates/login/styles';
import banner from '../../../assets/icon2.png'
import logo from '../../../assets/logo.png'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native'
import authService from '../../services/authService';
import { useNavigation } from '@react-navigation/native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../../context/authContext';
import { authContextProps } from '../../models/authModel';

interface navigateProp {
  navigate: (route: string, { screen }: { screen?: string }) => void
}

const SignIn: React.FC = () => {
  const [focusInput, setFocusInput] = useState(false)
  const [inputEmail, setInputEmail] = useState("")
  const [inputPassword, setInputPassword] = useState("")
  const refPassword = useRef<any>()
  const navigation = useNavigation<navigateProp>()
  const authContext = useContext<authContextProps>(AuthContext)

  const onSingIn = async () => {
    await authService.singIn(inputEmail, inputPassword)
    const keychanToken = await SecureStore.getItemAsync("token")
    
    if (keychanToken) {
      authContext.setAuthState({auth: true, token: keychanToken})
      navigation.navigate('BrowserNavigation', {})
    } else {
      setInputPassword("")
      refPassword.current.clear()
      showMessage({
        message: "Login failed",
        description: "Invalid credentials",
        backgroundColor: "#FFC830",
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

        <ButtonLogin onPress={onSingIn}>
          <TextLogin color='reverseColor'>SIGN IN</TextLogin>
        </ButtonLogin>

        <DetailsView>
          <TouchableOpacity>
            <TextLogin color='color'>Forgot Password?</TextLogin>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('LoginNavigation', { screen: 'SignUp' })}>
            <TextLogin color='#FFC830'>Signup</TextLogin>
          </TouchableOpacity>
        </DetailsView>
      </ScrollView>
    </MainLogin>
  )
}

export default SignIn;