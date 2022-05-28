import React from 'react';
import { MainLogin, InputLogin, ButtonLogin, TextLogin, ImageLogin, DetailsView } from './styles';
import banner from '../../../assets/icon2.png'
import { TouchableOpacity } from 'react-native';
const Login: React.FC = () => {
  return (
    <MainLogin>
      <ImageLogin source={banner}/>
      <InputLogin placeholder='Email' placeholderTextColor={'#808080'}/>
      <InputLogin placeholder='Password' placeholderTextColor={'#808080'}/>

      <ButtonLogin>
        <TextLogin color='reverseColor'>LOGIN</TextLogin>
      </ButtonLogin>

      <DetailsView>
        <TouchableOpacity>
          <TextLogin color='color'>Forgot Password?</TextLogin>
        </TouchableOpacity> 
        <TextLogin color='#FFC830'>Signup</TextLogin>
      </DetailsView>
    </MainLogin>
  )
}

export default Login;