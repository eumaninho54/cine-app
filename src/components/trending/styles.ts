import React from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import { MainLoginProps, themeModel } from "../../models/themeModel";

export const MainTrending = styled.View`
  background-color: ${({ theme }: MainLoginProps) => theme.background};
  flex: 1;
`;

export const MainCarousel = styled.View`
  width: ${({ width }: { width: number }) => `${width}px`};
`;

export const CarouselBg = styled(Animated.View)`
  margin-left: ${({ SPACING }: { SPACING: number }) => `${SPACING}px`};
  padding: ${({ SPACING }: { SPACING: number }) => `${SPACING * 2}px`};
  align-items: center;
  background-color: ${({ theme }: { theme: themeModel }) => theme.background};
  border-radius: 34px;
  bottom: 25px ;
`;

export const CarouselPoster = styled.Image`
  width: 100%;
  height: ${({ width }: { width: number }) => `${width * 1.2}px`};
  border-radius: 24px;
  margin: 0px;
  margin-bottom: 10px;
`;

export const TitlePoster = styled.Text`
  font-size: 24px;
  color: ${({ theme }: MainLoginProps) => theme.textColor};
`;

export const OverviewPoster = styled.Text`
  font-size: 12px;
  color: ${({ theme }: MainLoginProps) => theme.textColor};
`;

export const GenresBg = styled.View`
  flex-direction: row;
  margin: 5px 0px;
`;

export const GenreView = styled.View`
  border-color: ${({ theme }: MainLoginProps) => theme.textColor};
  border-width: 2px;
  border-radius: 10px;
  padding: 5px;
  align-items: center;
  margin: 0px 5px;
  opacity: 0.8;
`;

export const GenreText = styled.Text`
  color: ${({ theme }: MainLoginProps) => theme.textColor};
  font-size: 12px;
`;

export const BackdropView = styled.View`
  position: absolute;
  width: ${({ width }: { width: number }) => `${width}px`};
  height: ${({ BACKDROP_HEIGHT }: { BACKDROP_HEIGHT: number, width: number }) => `${BACKDROP_HEIGHT}px`};
`;

export const BackdropBg = styled(Animated.View)`
  position: absolute;
  height: ${({ height }: { height: number}) => `${height}px`};
  overflow: hidden;
`;

export const BackdropImage = styled.Image`
  width: ${({ width }: { width: number }) => `${width}px`}; 
  height: ${({ BACKDROP_HEIGHT }: { BACKDROP_HEIGHT: number, width: number }) => `${BACKDROP_HEIGHT}px`}; 
  position: absolute; 
`;

export const EmptyView = styled.View`
  width: ${({ SPACER_ITEM_SIZE }: {SPACER_ITEM_SIZE: number}) => `${SPACER_ITEM_SIZE}px`};
`;


