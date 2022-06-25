import React from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import { MainLoginProps } from "../../models/styledModel";

export const MainTrending = styled.View`
  background-color: ${({ theme }: MainLoginProps) => theme.background};
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

export const BannerTrendingView = styled.View`
  height: 170px;
  width: 100%;
`;

export const BannerTrendingBackground = styled.ImageBackground`
  width: 100%; 
  height: 220px;
`;

export const InfoTrendingView = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: absolute;
  padding: 0px 15px;
  bottom: 1px;
  width: 100%;
`;

export const InfoTrendingText = styled.Text`
  font-size: 20px;
  color: ${({ theme }: MainLoginProps) => theme.textColor};
  padding-bottom: 5px;
  width: 70%;
`;

export const TrendingRatingView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
`

export const TrendingRatingImage = styled.Image`
  width: 30px;
  height: 30px;
`
