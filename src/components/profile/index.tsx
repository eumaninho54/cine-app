import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { ThemeContext } from 'styled-components';
import { themeModel } from '../../models/themeModel';
import { FontAwesome5, FontAwesome } from "@expo/vector-icons"
import { EmoteLink, ExitText, HeaderInfo, InfoLink, InfoView, ProfileBackground, ProfileHeader, SectionLink, TextHeaderProfile, TextModifyUsername } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { StatesModel } from '../../models/storeModel';
import { logout } from '../../store/userSlice';
import { AppDispatch } from '../../store';


const Profile: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)
  const [modalVisible, setModalVisible] = useState(false)
  const user = useSelector((state: StatesModel) => state.user)
  const dispatch = useDispatch<AppDispatch>()
  
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
            <TextHeaderProfile>Hello, {user.username} !</TextHeaderProfile>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <TextModifyUsername>Press to modify username</TextModifyUsername>
            </TouchableOpacity>
          </View>
        </HeaderInfo>

        <TouchableOpacity onPress={() => dispatch(logout())}>
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