import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'styled-components';
import { themeModel } from '../../models/themeModel';
import { FontAwesome5 } from "@expo/vector-icons"
import { AuthContext } from '../../context/authContext';
import { authContextProps } from '../../models/authModel';
import { ExitText, HeaderInfo, ProfileBackground, ProfileHeader, TextWelcome } from './styles';
import { useNavigation } from '@react-navigation/native';

interface navigateProp {
  navigate: (route: string, { screen }: { screen?: string }) => void
}


const Profile: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)
  const { infoUser, logout } = useContext<authContextProps>(AuthContext)
  const navigation = useNavigation<navigateProp>()

  const exitProfile = () => {
    logout()
  }

  return (
    <ProfileBackground>
      <ProfileHeader>
        <HeaderInfo>
          <FontAwesome5
            name="user-circle"
            size={35}
            color={themeContext.iconTabNav}/>

          <TextWelcome>Hello {infoUser.username} !</TextWelcome>
        </HeaderInfo>

        <TouchableOpacity onPress={exitProfile}>
          <ExitText>Exit</ExitText>
        </TouchableOpacity>
      </ProfileHeader>
    </ProfileBackground>
  )
}

export default Profile;