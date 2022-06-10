import React, { createContext, useEffect, useReducer, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authStateProps, authContextProps } from '../models/authModel';
import * as SecureStore from 'expo-secure-store';
import authService from '../services/authService';


export const AuthContext = createContext<authContextProps | any>({})
const { Provider } = AuthContext

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<authStateProps>({
    auth: false,
    token: null
  })

  const logout = async () => {
    await SecureStore.deleteItemAsync("token")
    setAuthState({
      auth: false,
      token: null
    })
  }

  const getAccessToken = () => {
    return authState.token
  }

  useEffect(() => {
    const verifyToken = async () => {
      const token = await SecureStore.getItemAsync("token")

      if (token != null) {
        const isActived = await authService.verifyToken(token)

        if (isActived) setAuthState({ auth: true, token: token })
      }
    }

    verifyToken()
  }, [])

  return (
    <Provider
      value={{
        authState,
        setAuthState,
        getAccessToken,
        logout
      }}>
      {children}
    </Provider>
  )
}
