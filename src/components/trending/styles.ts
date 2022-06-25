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

export const InfoTrendingView = styled.View`
  padding: 0px 15px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: absolute;
  bottom: 1px;
`;
