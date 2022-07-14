import React from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import { MainLoginProps } from "../../models/themeModel";

export const MainMovies = styled.ScrollView`
  background-color: ${({ theme }: MainLoginProps) => theme.background};
  flex: 1;
`;

export const BannerMoviesView = styled.View`
  height: 240px;
  width: 100%;
`;

export const BannerMoviesBackground = styled.ImageBackground`
  width: 100%;
  height: 220px;
`;

export const InfoMoviesView = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: absolute;
  padding: 0px 15px;
  bottom: 1px;
  width: 100%;
`;

export const InfoMoviesText = styled.Text`
  font-size: 20px;
  color: ${({ theme }: MainLoginProps) => theme.textColor};
  padding-bottom: 5px;
  width: 70%;
  align-items:  center;
  justify-content:  center;
`;

export const MoviesRatingView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
`;

export const MoviesRatingImage = styled.Image`
  width: 25px;
  height: 25px;
`;

export const SectionMovieTitle = styled.Text`
  margin-top: 40px;
  font-size: 20px;
  color: ${({ theme }: MainLoginProps) => theme.textColor};
  font-weight: 700;
  width: 100%;
  padding: 0px 15px;
  margin-bottom: 15px;
`;
