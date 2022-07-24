import React from "react";
import styled from "styled-components/native";
import { MainLoginProps } from "../../models/themeModel";


export const MainBag = styled.ScrollView`
  background-color: ${({theme}: MainLoginProps) => theme.background};
  flex: 1;
  flex-direction: column;
`

export const TitleBag = styled.Text`
  color: ${({theme}: MainLoginProps) => theme.textColor};
  font-size: 30px;
  width: 100%;
  text-align: left;
  padding: 20px 13px;
  font-weight: 600;
`

export const Section = styled.View`
  width: 100%; 
  padding: 10px 20px; 
  flex-direction: row; 
  align-items: center; 
  justify-content: space-between;
`

export const SectionDivisor = styled.Text`
  background-color: ${({theme}: MainLoginProps) => theme.gray};
  height: 1px; 
  width: 75%;
`

export const SectionTitle = styled.Text`
  font-size: 16px; 
  color: ${({theme}: MainLoginProps) => theme.gray};
`

export const ViewEmptyData = styled.View`
  height: 30px;
  width: 100%;
  margin: 10px 0px 10px 40%;
  padding: 0px 20px;
  flex-direction: row;
  align-items: center;
`

export const RemoveButton = styled.TouchableOpacity`
  position: absolute;
  width: 35px;
  height: 35px;
  left: 10px;
`