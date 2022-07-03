import React from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import { MainLoginProps } from "../../models/themeModel";


export const LoadingMain = styled(Animated.View)`
  background-color: ${({ theme }: MainLoginProps) => theme.background};
  flex: 1;
  flex-direction: column;
  align-items: center;
  position: absolute;
  z-index: 2;

  height: 100%;
  width: 100%;
`;