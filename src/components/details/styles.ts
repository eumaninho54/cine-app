import React from "react";
import styled from "styled-components/native";
import { MainLoginProps } from "../../models/themeModel";

export const MainDetails = styled.ScrollView`
  background-color: ${({ theme }: MainLoginProps) => theme.background};
  padding: 25px 20px;
  
`;

export const MainTitle = styled.Text`
  color: ${({ theme }: MainLoginProps) => theme.textColor};
  font-size: 18px;
  margin-bottom: 10px;
`;

export const SectionView = styled.View`
  margin: 15px 0px;
`;

export const SectionTitle = styled.Text`
  color: ${({ theme }: MainLoginProps) => theme.textColor};
  font-size: 18px;
  font-weight: 600;
`;

export const SectionInfo = styled.Text`
  color: ${({ theme }: MainLoginProps) => theme.textColor};
  font-size: 16px;
`;