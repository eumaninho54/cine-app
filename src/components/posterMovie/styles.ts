import React from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import { MainLoginProps } from "../../models/styledModel";

export const MainPosterMovie = styled.ScrollView`
  background-color: ${({ theme }: MainLoginProps) => theme.background};
  flex: 1;
`;