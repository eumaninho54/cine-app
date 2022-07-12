import React from "react";
import styled from "styled-components/native";
import { MainLoginProps } from "../../models/themeModel";

export const MainDetails = styled.View`
  background-color: ${({ theme }: MainLoginProps) => theme.background};
  border-color: ${({ theme }: MainLoginProps) => theme.borderColor};
  border-width: 6px;
  flex: 1;
  padding: 25px 20px;
  max-height: 500px;
`;

export const MainTitle = styled.Text`
  color: ${({ theme }: MainLoginProps) => theme.white};
  font-size: 18px;
  margin-bottom: 10px;
`;

export const SectionView = styled.View`
  margin: 15px 0px;
  max-height: 80px;
`;

export const SectionTitle = styled.Text`
  color: ${({ theme }: MainLoginProps) => theme.white};
  font-size: 18px;
  font-weight: 600;
`;

export const SectionInfo = styled.Text`
  color: ${({ theme }: MainLoginProps) => theme.white};
  font-size: 16px;
`;