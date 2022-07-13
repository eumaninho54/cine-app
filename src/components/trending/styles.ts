import React from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import { MainLoginProps } from "../../models/themeModel";

export const MainTrending = styled.View`
  background-color: ${({ theme }: MainLoginProps) => theme.background};
  flex: 1;
`;

