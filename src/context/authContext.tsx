import React, { createContext, useEffect, useReducer, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authStateProps, authContextProps, userProps } from '../models/authModel';
import * as SecureStore from 'expo-secure-store';
import authService from '../services/authService';

interface AuthProviderProps {
  children: React.ReactNode
}


export const AuthContext = createContext<authContextProps | any>({})
const { Provider } = AuthContext

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isSelectedFavorite, setIsSelectedFavorite] = useState({isSelected: false, dataMovie: {}})
  const [authState, setAuthState] = useState<authStateProps>({
    auth: null,
    token: null
  })
  const [infoUser, setInfoUser] = useState<userProps>({
    id: 0,
    email: "",
    username: "",
    favorites: []
  })

  const logout = async () => {
    await SecureStore.deleteItemAsync("token")
    setAuthState({
      auth: false,
      token: null
    })
  }

  useEffect(() => {
    const verifyToken = async () => {
      const token = await SecureStore.getItemAsync("token")
      
      if (token != null) {
        const isActived = await authService.verifyToken(token)

        if (isActived != null) {
          setInfoUser(isActived)
          setAuthState({ auth: true, token: token })
          return
        }
      }

      setAuthState({ auth: false, token: null})
    }

    verifyToken()
  }, [])

  return (
    <Provider
      value={{
        authState,
        setAuthState,
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
