import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons"
import { ThemeContext } from 'styled-components';
import { themeModel } from '../../models/themeModel';
import { useNavigation } from '@react-navigation/native';
import { ProfileButton } from './styles';

interface IconProfileHeaderProps {
  navigation:{
    navigate: (route: string, { screen }: { screen?: string }) => void
  }
}

const IconProfileHeader: React.FC<IconProfileHeaderProps> = ({navigation}) => {
  const themeContext = useContext<themeModel>(ThemeContext)

  return (
    <ProfileButton onPress={() => navigation.navigate('Profile', {})}>
      <FontAwesome5
        name="user-circle"
        size={28}
        color={"#303030"}
      />
    </ProfileButton>
  )
}

export default IconProfileHeader;