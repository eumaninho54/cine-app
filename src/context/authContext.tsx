import React, { createContext, useEffect, useReducer, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userProps } from '../models/storeModel';
import * as SecureStore from 'expo-secure-store';
import authService from '../services/authService';

interface AuthProviderProps {
  children: React.ReactNode
}

interface authContextProps {
  infoUser: userProps
  setInfoUser: React.Dispatch<React.SetStateAction<userProps>>
  logout: () => Promise<void>
  isSelectedFavorite: {
    isSelected: boolean;
    dataMovie: {};
  }
  setIsSelectedFavorite: React.Dispatch<React.SetStateAction<{
    isSelected: boolean;
    dataMovie: {};
  }>>
}

export const AuthContext = createContext<authContextProps | any>({})
const { Provider } = AuthContext

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isSelectedFavorite, setIsSelectedFavorite] = useState({ isSelected: false, dataMovie: {} })
  const [infoUser, setInfoUser] = useState<userProps>({
    id: 0,
    email: "",
    username: "",
    favorites: [],
    token: "",
    auth: false
  })

  const logout = async () => {
    await SecureStore.deleteItemAsync("token")
    setInfoUser({
      id: 0,
      email: "",
      username: "",
      favorites: [],
      token: "",
      auth: false
    })
  }

  useEffect(() => {
    const verifyToken = async () => {
      const token = await SecureStore.getItemAsync("token")

      if (token != null) {
        const isActived = await authService.verifyToken(token)

        if (isActived != null) {
          setInfoUser(isActived)
          return
        }
      }
      setInfoUser({
        id: 0,
        email: "",
        username: "",
        favorites: [],
        token: "",
        auth: false
      })
    }

    verifyToken()
  }, [])

  return (
    <Provider
      value={{
        logout,
        infoUser,
        setInfoUser,
        isSelectedFavorite,
        setIsSelectedFavorite
      }}>
      {children}
    </Provider>
  )
}
