import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { movieProps } from "../models/storeModel";
import * as SecureStore from "expo-secure-store";
import authService from "../services/authService";
import { dataMoviesModel } from "../models/moviesModel";

const initialState: movieProps[] = [];


const movieSlice = createSlice({
  name: "movieData",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {

  }
})

export default movieSlice.reducer;
export const {} = movieSlice.actions;