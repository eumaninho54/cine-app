import React from "react";
import styled from "styled-components/native";
import { MainLoginProps } from "../../models/themeModel";


export const MainBag = styled.View`
  background-color: ${({theme}: MainLoginProps) => theme.background};
  flex: 1;
  flex-direction: column;
  align-items: center;
`

export const TitleBag = styled.Text`
  color: ${({theme}: MainLoginProps) => theme.textColor};
  font-size: 30px;
  width: 100%;
  text-align: left;
  padding: 20px 13px;
  font-weight: 600;
`