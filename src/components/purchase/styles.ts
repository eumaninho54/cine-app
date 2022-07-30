import React from "react";
import styled from "styled-components/native";
import { MainLoginProps } from "../../models/themeModel";

export const MainBg = styled.View`
  background-color: ${({ theme }: MainLoginProps) => theme.background};
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

export const MainToBuy = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const TitleToBuy = styled.Text`
  color: ${({ theme }: MainLoginProps) => theme.textColor};
  font-size: 30px;
  width: 100%;
  text-align: center;
  padding: 20px 13px;
  font-weight: 600;
`;

export const RemoveButton = styled.TouchableOpacity`
  position: absolute;
  width: 35px;
  height: 35px;
  left: 3px;
`;

export const ViewEmptyData = styled.View`
  height: 40px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ButtonFinish = styled.TouchableOpacity`
  background-color: ${({ theme }: MainLoginProps) => theme.primaryColor};
  padding: 20px;
  border-radius: 15px;
  width: 85%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
`;

export const TextBuyTicket = styled.Text`
  color: ${({ theme }: MainLoginProps) => theme.white};
  font-weight: 900;
  font-size: 16px;
`;