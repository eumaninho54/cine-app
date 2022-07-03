import React from "react";
import styled from "styled-components/native";
import { MainLoginProps } from "../../models/themeModel";


export const MainMovies = styled.View`
  background-color: ${({theme}: MainLoginProps) => theme.background};
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`