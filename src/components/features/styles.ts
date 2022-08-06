import React from "react";
import styled from "styled-components/native";
import { MainLoginProps } from "../../models/themeModel";


export const MainFeatures = styled.View`
  background-color: ${({theme}: MainLoginProps) => theme.background};
  flex: 1;
`

export const BannerFeaturesView = styled.View`
  height: 240px;
  width: 100%;
`;

export const BannerFeaturesBackground = styled.ImageBackground`
  width: 100%;
  height: 220px;
`;

export const InfoFeaturesView = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: absolute;
  padding: 0px 15px;
  bottom: 1px;
  width: 100%;
`;

export const InfoFeaturesText = styled.Text`
  font-size: 20px;
  color: ${({ theme }: MainLoginProps) => theme.textColor};
  padding-bottom: 5px;
  width: 70%;
  align-items:  center;
  justify-content:  center;
`;

export const FeaturesRatingView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
`;

export const FeaturesRatingImage = styled.Image`
  width: 25px;
  height: 25px;
`;

export const SectionFeaturesTitle = styled.Text`
  margin-top: 40px;
  font-size: 20px;
  color: ${({ theme }: MainLoginProps) => theme.textColor};
  font-weight: 700;
  width: 100%;
  padding: 0px 15px;
  margin-bottom: 15px;
`;

export const RenderItemView = styled.View`
  padding: 0px 10px;
`;

export const DateView = styled.View`
  width: 100%;
  height: 40px;
  position: absolute;
  border-width: 1px;
  border-color: white;
  top: 80%;
  justify-content: center;
  align-items: center;
`;

export const DateText = styled.Text`
  font-size: 16;
  color: white;
  font-weight: 600;
`