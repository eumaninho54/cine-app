import React, { useContext, useState } from 'react';
import { MainLogin, InputLogin, ButtonLogin, TextLogin, ImageLogin } from '../../templates/login/styles';
import banner from '../../../assets/icon2.png'
import logo from '../../../assets/logo.png'
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/authContext';
import { authContextProps } from '../../models/authModel';
import authService from '../../services/authService';
import * as SecureStore from 'expo-secure-store';
import FlashMessage, { showMessage } from 'react-native-flash-message';

interface navigateProp {
  navigate: (route: string, { screen }: { screen?: string }) => void
}


const SignUp: React.FC = () => {
  const authContext = useContext<authContextProps>(AuthContext)
  const [inputEmail, setInputEmail] = useState("")
  const [inputPassword, setInputPassword] = useState("")
  const [inputConfirmPassword, setInputConfirmPassword] = useState("")
  const [focusInput, setFocusInput] = useState(false)
  const navigation = useNavigation<navigateProp>()


  const onSignUp = async () => {
    //Validation fields
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if ((inputPassword != inputConfirmPassword || inputPassword == "") || !reg.test(inputEmail)) {
      showMessage({
        message: "Subscribe failed",
        description: "Invalid credentials",
        backgroundColor: "#FFC830",
        icon: 'warning',
        type: "warning"
      })
      return
    }

    if(inputPassword.length < 8){
      showMessage({
        message: "Subscribe failed",
        description: "Password must be 8 characters",
        backgroundColor: "#FFC830",
        icon: 'warning',
        type: "warning"
      })
      return
    }

    //Request
    if (await authService.singUp(inputEmail, inputPassword)) {
      showMessage({
        message: "Subscribe successful",
        description: "Sign in to your account",
        backgroundColor: "#FFC830",
        icon: 'success',
        type: "success"
      })
      navigation.navigate('LoginNavigation', { screen: "SignIn" })
    }else{
      showMessage({
        message: "Subscribe failed",
        description: "Email already used",
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
          onChangeText={(text) => setInputEmail(text)}
          onBlur={() => setFocusInput(false)}
          onFocus={() => setFocusInput(true)} />
        <InputLogin
          placeholder='Password'
          placeholderTextColor={'#808080'}
          onChangeText={(text) => setInputPassword(text)}
          secureTextEntry={true}
          onBlur={() => setFocusInput(false)}
          onFocus={() => setFocusInput(true)}
        />
        <InputLogin
          placeholder='Confirm Password'
          placeholderTextColor={'#808080'}
          onChangeText={(text) => setInputConfirmPassword(text)}
          secureTextEntry={true}
          onBlur={() => setFocusInput(false)}
          onFocus={() => setFocusInput(true)}
        />

        <ButtonLogin onPress={onSignUp}>
          <TextLogin color='reverseColor'>SIGN UP</TextLogin>
        </ButtonLogin>

      </ScrollView>
    </MainLogin>
  )
}

export default SignUp;