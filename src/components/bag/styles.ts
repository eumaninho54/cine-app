import React from "react";
import styled from "styled-components/native";
import { MainLoginProps } from "../../models/styledModel";


export const MainBag = styled.View`
  background-color: ${({theme}: MainLoginProps) => theme.background};
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`