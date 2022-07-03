import React from "react";
import { Animated, Dimensions } from "react-native";
import styled from "styled-components/native";
import { MainLoginProps } from "../../models/themeModel";


export const MainSessions = styled.View`
  background-color: ${({ theme }: MainLoginProps) => theme.background};
  width: 100%; 
  flex: 1;
`;

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

export const TicketSelectedBorder = styled(Animated.View)`
  height: 100%;
  width: 100%;
  position: absolute;
`;

export const TicketDetailView = styled.View`
  border-radius: 12px;
  height: 12px;
  width: 12px;
  bottom: 20%;
  position: absolute;
  z-index: 3;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const TicketDetail = styled.View`
  background-color: ${({ theme }: MainLoginProps) => theme.background};
  width: 10px;
  height: 10px;
  border-radius: 10px;
`;

export const GradientSelected = styled(Animated.View)`
  height: 100%;
  width: 100%;
  position: absolute;
`;

export const WeekText = styled.Text`
  font-size: 20px;
  color: white; 
  font-weight: 400;
`;

export const DayText = styled.Text`
  font-size: 20px;
  color: white; 
  font-weight: bold;
`;
