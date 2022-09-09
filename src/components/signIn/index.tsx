import React, { useContext, useRef, useState } from 'react';
import { MainLogin, InputLogin, ButtonLogin, TextLogin, ImageLogin, DetailsView } from '../../templates/login/styles';
import banner from '../../../assets/icon2.png'
import logo from '../../../assets/logo.png'
import { ScrollView, TouchableOpacity } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { themeModel } from '../../models/themeModel';
import { ThemeContext } from 'styled-components';
import { useDispatch } from 'react-redux';
import { login } from '../../store/userSlice';
import { userProps } from '../../models/storeModel';
import { AppDispatch } from '../../store';


const SignIn: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)
  const [focusInput, setFocusInput] = useState(false)
  const [inputEmail, setInputEmail] = useState("")
  const [inputPassword, setInputPassword] = useState("")
  const refPassword = useRef<any>()
  const refEmail = useRef<any>() 
  const navigation = useNavigation<NavigationProp<any>>()
  const dispatch = useDispatch<AppDispatch>()

  const onSignIn = async () => {
    const userInfo = (await dispatch(login({email: inputEmail, password: inputPassword}))).payload as userProps

    if(userInfo.token == ""){
      setInputPassword("")
      refPassword.current?.clear()
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

  const changeFocus = () => {
    if(refEmail.current.isFocused() || refPassword.current.isFocused()){
      setFocusInput(true)
    }else{
      setFocusInput(false)
    }
  }

  return (
    <MainLogin behavior='padding'>
      <ScrollView
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ImageLogin show={!focusInput} source={banner} type={'banner'} />
        <ImageLogin show={focusInput} source={logo} type={'logo'} />
        <InputLogin
          ref={refEmail}
          placeholder='Email'
          autoCapitalize='none'
          placeholderTextColor={'#808080'}
          onChangeText={(input) => setInputEmail(input)}
          onBlur={() => changeFocus()}
          onFocus={() => changeFocus()} 
        />
        <InputLogin
          ref={refPassword}
          placeholder='Password'
          autoCapitalize='none'
          placeholderTextColor={'#808080'}
          onChangeText={(input) => setInputPassword(input)}
          secureTextEntry={true}
          onBlur={() => changeFocus()}
          onFocus={() => changeFocus()}
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