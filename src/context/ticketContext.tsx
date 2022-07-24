import React, { createContext, useEffect, useReducer, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import authService from '../services/authService';
import { ticketContextProps } from '../models/ticketModel';
import { dataMoviesModel } from '../models/moviesModel';

interface TicketProviderProps {
  children: React.ReactNode
}


export const TicketContext = createContext<ticketContextProps | any>({})
const { Provider } = TicketContext

export const TicketProvider = ({ children }: TicketProviderProps) => {
  const [ticketsToBuy, setTicketsToBuy] = useState<dataMoviesModel[]>([])

  return (
    <Provider
      value={{
        ticketsToBuy,
        setTicketsToBuy
      }}>
      {children}
    </Provider>
  )
}
