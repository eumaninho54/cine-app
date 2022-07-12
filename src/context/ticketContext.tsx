import React, { createContext, useEffect, useReducer, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import authService from '../services/authService';
import { ticketContextProps } from '../models/ticketModel';

interface TicketProviderProps {
  children: React.ReactNode
}


export const TicketContext = createContext<ticketContextProps | any>({})
const { Provider } = TicketContext

export const TicketProvider = ({ children }: TicketProviderProps) => {
  const [numTicketCar, setNumTicketCar] = useState(0)

  return (
    <Provider
      value={{
        numTicketCar,
        setNumTicketCar
      }}>
      {children}
    </Provider>
  )
}
