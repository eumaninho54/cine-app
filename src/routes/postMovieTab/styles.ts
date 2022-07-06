import React from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import { MainLoginProps } from "../../models/themeModel";

interface ScreenViewProps {
  focused: boolean
  theme: {
    primaryColor: string
    tabNav: string
  };
}

export const ScreenView = styled.TouchableOpacity<ScreenViewProps>`
  background-color: ${({ focused, theme }: ScreenViewProps) => focused ? theme.tabNav : "#00000000"}; 
  width: 130px;
  height: 40px;
  border-radius: 3px;
  align-items: center;
  justify-content: center;
`;

export const ScreenTitle = styled.Text<ScreenViewProps>`
  color: ${({ focused, theme }: ScreenViewProps) => focused ? theme.primaryColor : "white"}; 
  font-size:  17px;
`;
