import React, { useState } from 'react';
import { MainLogin, InputLogin, ButtonLogin, TextLogin, ImageLogin } from '../../templates/login/styles';
import banner from '../../../assets/icon2.png'
import logo from '../../../assets/logo.png'
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';

interface navigateProp {
  navigate: (route: string, { screen }: { screen?: string }) => void
}


const SignUp: React.FC = () => {
  const [focusInput, setFocusInput] = useState(false)
  const navigation = useNavigation<navigateProp>()

  return (
    <MainLogin behavior='padding'>
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
        <InputLogin
          placeholder='Confirm Password'
          placeholderTextColor={'#808080'}
          secureTextEntry={true}
          onBlur={() => setFocusInput(false)}
          onFocus={() => setFocusInput(true)}
        />

        <ButtonLogin onPress={() => navigation.navigate('BrowserNavigation', {})}>
          <TextLogin color='reverseColor'>SIGN UP</TextLogin>
        </ButtonLogin>

      </ScrollView>
    </MainLogin>
  )
}

export default SignUp;