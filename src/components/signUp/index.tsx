import React, { useContext, useRef, useState } from 'react';
import { MainLogin, InputLogin, ButtonLogin, TextLogin, ImageLogin } from '../../templates/login/styles';
import banner from '../../../assets/icon2.png'
import logo from '../../../assets/logo.png'
import { ScrollView } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import authService from '../../services/authService';
import { showMessage } from 'react-native-flash-message';
import { themeModel } from '../../models/themeModel';
import { ThemeContext } from 'styled-components';


const SignUp: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)
  const [inputEmail, setInputEmail] = useState("")
  const [inputPassword, setInputPassword] = useState("")
  const [inputConfirmPassword, setInputConfirmPassword] = useState("")
  const [focusInput, setFocusInput] = useState(false)
  const refPassword = useRef<any>()
  const refConfirmPassword = useRef<any>()
  const refEmail = useRef<any>() 
  const navigation = useNavigation<NavigationProp<any>>()

  const onSignUp = async () => {
    //Validation fields
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if ((inputPassword != inputConfirmPassword || inputPassword == "") || !reg.test(inputEmail)) {
      showMessage({
        message: "Subscribe failed",
        description: "Invalid credentials",
        backgroundColor: themeContext.primaryColor,
        icon: 'warning',
        type: "warning"
      })
      return
    }

    if (inputPassword.length < 8) {
      showMessage({
        message: "Subscribe failed",
        description: "Password must be 8 characters",
        backgroundColor: themeContext.primaryColor,
        icon: 'warning',
        type: "warning"
      })
      return
    }

    //Request
    if (await authService.signUp(inputEmail, inputPassword)) {
      showMessage({
        message: "Subscribe successful",
        description: "Sign in to your account",
        backgroundColor: themeContext.primaryColor,
        icon: 'success',
        type: "success"
      })
      navigation.navigate('LoginNavigation', { screen: "SignIn" })
    } else {
      showMessage({
        message: "Subscribe failed",
        description: "Email already used",
        backgroundColor: themeContext.primaryColor,
        icon: 'warning',
        type: "warning"
      })
    }
  }

  const changeFocus = () => {
    if(refEmail.current.isFocused() || refPassword.current.isFocused() || refConfirmPassword.current.isFocused()){
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
          onChangeText={(text) => setInputEmail(text)}
          onBlur={() => changeFocus()}
          onFocus={() => changeFocus()} />
        <InputLogin
          ref={refPassword}
          placeholder='Password'
          autoCapitalize='none'
          placeholderTextColor={'#808080'}
          onChangeText={(text) => setInputPassword(text)}
          secureTextEntry={true}
          onBlur={() => changeFocus()}
          onFocus={() => changeFocus()}
        />
        <InputLogin
          ref={refConfirmPassword}
          placeholder='Confirm Password'
          placeholderTextColor={'#808080'}
          onChangeText={(text) => setInputConfirmPassword(text)}
          secureTextEntry={true}
          onBlur={() => changeFocus()}
          onFocus={() => changeFocus()}
        />

        <ButtonLogin onPress={onSignUp}>
          <TextLogin color='reverseColor'>SIGN UP</TextLogin>
        </ButtonLogin>

      </ScrollView>
    </MainLogin>
  )
}

export default SignUp;