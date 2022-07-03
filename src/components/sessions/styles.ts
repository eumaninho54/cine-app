import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";


export const TicketCarouselBorder = styled.View`
  height: 120px;
  background-color: white;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;
`;

export const TicketCarouselBg = styled.View`
  overflow: hidden;
  height: 97%;
  width: 97%;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const TicketCarouselView = styled.View`
  overflow: hidden;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  padding-bottom: 10px;
`;