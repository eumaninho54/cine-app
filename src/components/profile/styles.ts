import React from "react";
import styled from "styled-components/native";
import { MainLoginProps } from "../../models/styledModel";

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
`

export const HeaderInfo = styled.View`
  flex-direction: row;
  width: 60%; 
  align-items: center;
`

export const TextWelcome = styled.Text`
  color: ${({theme}: MainLoginProps) => theme.iconTabNav};
  margin-left: 10px;
  font-size: 16px;
`

export const ExitText = styled.Text`
  color: ${({theme}: MainLoginProps) => theme.primaryColor};
  font-size: 16px;
`
