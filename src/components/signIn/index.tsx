import React, { useEffect, useState } from 'react';
import { MainLogin, InputLogin, ButtonLogin, TextLogin, ImageLogin, DetailsView } from '../../templates/login/styles';
import banner from '../../../assets/icon2.png'
import logo from '../../../assets/logo.png'
import { ScrollView, TouchableOpacity } from 'react-native'
import authService from '../../services/authService';
import { useNavigation } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import * as SecureStore from 'expo-secure-store';

interface navigateProp {
  navigate: (route: string, { screen }: { screen?: string }) => void
}

const SignIn: React.FC = () => {
  const [focusInput, setFocusInput] = useState(false)
  const navigation = useNavigation<navigateProp>()

  const onSingIn = async() => {
    await authService.singIn("test.test@test.com", "testtest")
    const keychanToken = await SecureStore.getItemAsync("token")

    if(keychanToken){
      console.tron.log!(keychanToken)
    }else{
      console.tron.log!("n foi")
    }
  }

  return (
    <MainLogin behavior='padding'>
      <FlashMessage position="top" />
      <ScrollView 
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <ImageLogin show={!focusInput} source={banner} type={'banner'} />
        <ImageLogin show={focusInput} source={logo} type={'logo'} />
        <InputLogin
          placeholder='Email'
          placeholderTextColor={'#808080'}
          onBlur={() => setFocusInput(false)}
          onFocus={() => setFocusInput(true)} />
        <InputLogin
          placeholder='Password'
          placeholderTextColor={'#808080'}
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