import React from "react";
import styled from "styled-components/native";
import { ImageLoginProps, MainLoginProps } from "../../models/themeModel";

interface TextLoginProps {
  color: string;
  theme: {
    backgroundLogin: string;
    textColorLogin: string;
    reverseColor: string;
  };
}

export const MainLogin = styled.KeyboardAvoidingView`
  background-color: ${({theme}: MainLoginProps) => theme.backgroundLogin};
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const ImageLogin = styled.Image<ImageLoginProps>`
  width: ${(props: ImageLoginProps) => props.type == 'logo' ? '170px' : '300px'}; 
  height: ${(props: ImageLoginProps) => props.type == 'logo' ? '100px' : '300px'}; 
  display: ${(props: ImageLoginProps) => props.show ? 'flex' : 'none'};
  margin-bottom: ${(props: ImageLoginProps) => props.type == 'logo' ? '20px' : '0px'};
`

export const InputLogin = styled.TextInput`
  width: 300px;
  height: 40px;
  border-radius: 100px;
  padding: 0px 15px;
  background-color: #e9e9e9;
  margin-bottom: 25px;
`

export const ButtonLogin = styled.TouchableOpacity`
  background-color: ${({theme}: MainLoginProps) => theme.primaryColor};
  margin-top: 10px;
  width: 300px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
`

export const TextLogin = styled.Text<TextLoginProps>`
  color: ${(props: TextLoginProps) => props.color == 'color' ? props.theme.textColorLogin : props.color == 'reverseColor' ? props.theme.reverseColor : props.color};
  font-weight: bold;
`

export const DetailsView = styled.View `
  margin-top: 15px;
  width: 300px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`