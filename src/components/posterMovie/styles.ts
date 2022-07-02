import React from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import { MainLoginProps } from "../../models/styledModel";

export const MainPosterMovie = styled.ScrollView`
  background-color: ${({ theme }: MainLoginProps) => theme.background};
  flex: 1;
`;

export const PosterView = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const PosterImage = styled.Image`
  width: 140px;
  height: 210px;
`;

export const PosterInfoView = styled.View`
  width: 200px; 
  padding-left: 12px;
`;

export const PosterTitle = styled.Text`
  color: ${({ theme }: MainLoginProps) => theme.textColor}; 
  padding-bottom: 10px;
`;

export const PosterGenres = styled.Text`
  color: ${({ theme }: MainLoginProps) => theme.textColor}; 
  padding-bottom: 15px;
`;

export const RatingView = styled.View`
  flex-direction: row; 
  align-items: center;
`;

export const RatingPopcorn = styled.Image`
  width: 25px; 
  height: 25px;
`;

export const RatingText = styled.Text`
  font-size: 14px; 
  padding-bottom: 0px; 
  color: #fff;
`;

export const TabView = styled.View`
  height: 600px;
  padding-top: 10px;
`;

