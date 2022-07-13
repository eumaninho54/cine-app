import React from "react";
import styled from "styled-components/native";
import { MainLoginProps } from "../../models/themeModel";

export const ProfileBackground = styled.View`
  flex: 1; 
  background-color: ${({theme}: MainLoginProps) => theme.background};
`;

export const ProfileHeader = styled.View`
  background: ${({theme}: MainLoginProps) => theme.tabNav};
  width: 100%;
  height: 70px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 30px;
`

export const HeaderInfo = styled.View`
  flex-direction: row;
  width: 60%; 
  align-items: center;
`

export const TextHeaderProfile = styled.Text`
  color: ${({theme}: MainLoginProps) => theme.iconTabNav};
  margin-left: 10px;
  font-size: 16px;
  font-weight: 700;
`

export const TextModifyUsername = styled.Text`
  color: ${({theme}: MainLoginProps) => theme.gray};
  margin-left: 10px;
  font-size: 13px;
`

export const ExitText = styled.Text`
  color: ${({theme}: MainLoginProps) => theme.primaryColor};
  font-size: 16px;
`

export const SectionLink = styled.TouchableOpacity`
  color: ${({theme}: MainLoginProps) => theme.primaryColor};
  width: 100%;
  height: 70px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 15px;
`

export const InfoView = styled.View`
  flex-direction: row;
  width: 50%; 
  align-items: center;
`

export const EmoteLink = styled.View`
  width: 35px;
`

export const InfoLink = styled.Text`
  color: ${({theme}: MainLoginProps) => theme.textColor};
  margin-left: 10px;
  font-size: 16px;
`



