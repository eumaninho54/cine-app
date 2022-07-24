import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { ThemeContext } from 'styled-components';
import { themeModel } from '../../models/themeModel';
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"
import { AuthContext } from '../../context/authContext';
import { authContextProps } from '../../models/authModel';
import { EmoteLink, ExitText, HeaderInfo, InfoLink, InfoView, ProfileBackground, ProfileHeader, SectionLink, TextHeaderProfile, TextModifyUsername } from './styles';


const Profile: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)
  const { infoUser, logout } = useContext<authContextProps>(AuthContext)
  const [modalVisible, setModalVisible] = useState(false)

  const changeUsername = () => {
  }

  const linkSection = async(linkTo: string) => {
    let supported: boolean

    switch (linkTo) {
      case "linkedin":
        supported = await Linking.canOpenURL("https://www.linkedin.com/in/angelo-menti-663040210/")

        if(supported) await Linking.openURL("https://www.linkedin.com/in/angelo-menti-663040210/")
        break;

      case "repository":
        supported = await Linking.canOpenURL("https://github.com/eumaninho54")

        if(supported) await Linking.openURL("https://github.com/eumaninho54")
        break;
    
    }
  }

  return (
    <ProfileBackground>
      <ProfileHeader>
        <HeaderInfo>
          <FontAwesome5
            name="user-circle"
            size={35}
            color={themeContext.iconTabNav} />

          <View>
            <TextHeaderProfile>Hello, {infoUser.username} !</TextHeaderProfile>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <TextModifyUsername>Press to modify username</TextModifyUsername>
            </TouchableOpacity>
          </View>
        </HeaderInfo>

        <TouchableOpacity onPress={logout}>
          <ExitText>Exit</ExitText>
        </TouchableOpacity>
      </ProfileHeader>

      <SectionLink onPress={() => linkSection("linkedin")}>
        <InfoView>
          <EmoteLink>
            <FontAwesome5
              name="linkedin"
              size={30}
              color={themeContext.textColor} />
          </EmoteLink>

          <InfoLink>Talk to me</InfoLink>
        </InfoView>

        <FontAwesome
          name="angle-right"
          size={35}
          color={themeContext.primaryColor} />
      </SectionLink>

      <SectionLink onPress={() => linkSection("repository")}>
        <InfoView>
          <EmoteLink>
            <FontAwesome
              name="mobile"
              size={35}
              color={themeContext.textColor} />
          </EmoteLink>

          <InfoLink>See app info</InfoLink>
        </InfoView>
          <FontAwesome
            name="angle-right"
            size={35}
            color={themeContext.primaryColor} />
      </SectionLink>
    </ProfileBackground>
  )
}

export default Profile;