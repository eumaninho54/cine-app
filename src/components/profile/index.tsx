import React, { useContext } from 'react';
import { View } from 'react-native';
import { ThemeContext } from 'styled-components';
import { themeModel } from '../../models/themeModel';


const Profile: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)

  return (
    <View style={{flex: 1, backgroundColor: themeContext.background}}>

    </View>
  )
}

export default Profile;