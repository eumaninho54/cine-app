import React from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import { MainLoginProps } from "../../models/styledModel";

export const MainTrending = styled(Animated.View)`
  background-color: ${({ theme }: MainLoginProps) => theme.background};
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

export const BannerTrending = styled.View`
  height: 170px;
  width: 100%;
`;
