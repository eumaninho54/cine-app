import React from "react";
import styled from "styled-components/native";

interface TextLoginProps {
  color: string,
  theme: {
    background: string,
    color: string,
    reverseColor: string
  }
}

interface MainLoginProps {
  theme: {
    background: string
  }
}


export const MainLogin = styled.View`
  background-color: ${({theme}: MainLoginProps) => theme.background};
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  `;

export const ImageLogin = styled.Image`
  width: 300px; 
  height: 300px;
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
  background-color: #FFC830;
  margin-top: 10px;
  width: 300px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
`

export const TextLogin = styled.Text<TextLoginProps>`
  color: ${(props: TextLoginProps) => props.color == 'color' ? props.theme.color : props.color == 'reverseColor' ? props.theme.reverseColor : props.color};
  font-weight: bold;
`

export const DetailsView = styled.View `
  margin-top: 15px;
  width: 300px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`