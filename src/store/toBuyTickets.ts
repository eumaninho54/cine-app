import { dataMoviesToBuy } from './../models/moviesModel';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { movieProps } from "../models/storeModel";
import * as SecureStore from "expo-secure-store";
import authService from "../services/authService";
import { dataMoviesModel } from "../models/moviesModel";

const initialState: dataMoviesToBuy[] = [];


const toBuyTickets = createSlice({
  name: "movieData",
  initialState: initialState,
  reducers: {
    setToBuy(state, {payload}: { payload: dataMoviesToBuy[] | null}){
      payload == null
      ? state = initialState
      : state = payload
      return state
    }
  }
})

export default toBuyTickets.reducer;
export const {setToBuy} = toBuyTickets.actions;