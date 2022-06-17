import React, { useContext } from 'react';
import { View } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons"
import { ThemeContext } from 'styled-components';
import { themeModel } from '../../models/themeModel';


const IconProfileHeader: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)

  return (
    <View style={{marginLeft: 6, padding: 10 }}>
      <FontAwesome5
        name="user-circle"
        size={28}
        color={"#303030"}
      />
    </View>
  )
}

export default IconProfileHeader;