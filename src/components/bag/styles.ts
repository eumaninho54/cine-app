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

export const ItemToBuyBg = styled.View`
  margin: 20px 10px;
  width: ${({width}: {width: number}) => `${width - 50}px`};
  height: 130px;
  flex-direction: row;
  border-radius: 12px;
`

export const MaskedBanner = styled.View`
  width: ${({width}: {width: number}) => `${(width - 50) * 0.7}px`};
  height: 130px;
  border-radius: 12px;
  background-color: blue;
`

export const BannerTicket = styled.Image`
  width: ${({width}: {width: number}) => `${(width - 50) * 0.7}px`};
  height: 130px;
`

export const DetailTicket = styled.View`
  position: absolute;
  left: 67.5%;
  height: 20px;
  width: 20px;
  border-radius: 10px;
  background-color: ${({theme}: MainLoginProps) => theme.background};
  z-index: 3;
`

export const InfoTicket = styled.View`
  width: 30%;
  height: 100%;
  background-color: ${({theme}: MainLoginProps) => theme.backgroundView};
  border-radius: 12px;
  padding: 10px;
`

export const DateTicket = styled.Text`
  color: ${({theme}: MainLoginProps) => theme.primaryColor};
  font-size: 12px; 
  margin-bottom: 15px;
`

export const TitleTicket = styled.Text`
  color: ${({theme}: MainLoginProps) => theme.textColor};
  font-size: 15px;
`

export const RemoveButton = styled.TouchableOpacity`
  position: absolute;
  width: 35px;
  height: 35px;
  left: 3px;
`
