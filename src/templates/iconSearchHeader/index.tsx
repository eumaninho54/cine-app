import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons"
import { ThemeContext } from 'styled-components';
import { themeModel } from '../../models/themeModel';


const IconSearchHeader: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)

  return (
    <TouchableOpacity style={{ padding: 5, alignItems: 'center', justifyContent: 'center' }}>
      <FontAwesome5
        name="search"
        size={28}
        color={"#303030"}
      />
    </TouchableOpacity>
  )
}

export default IconSearchHeader;