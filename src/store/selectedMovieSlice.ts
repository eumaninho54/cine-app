import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { movieProps } from "../models/storeModel";
import * as SecureStore from "expo-secure-store";
import authService from "../services/authService";
import { dataMoviesModel } from "../models/moviesModel";

const initialState: dataMoviesModel = {
  id: 0,
  vote_average: 0,
  overview: "",
  release_date: "",
  backdrop_path: "",
  banner: "",
  poster_path: "",
  title: "",
  original_title: "",
  popularity: 0,
  genre_ids: [],
  isFavorite: false
};

const selectedMovieSlice = createSlice({
  name: "selectedMovieData",
  initialState: initialState,
  reducers: {
    setMovie(state, {payload}: {payload: dataMoviesModel}){
      state = payload
    }
  },
  extraReducers:{}
});

export default selectedMovieSlice.reducer;
export const {setMovie} = selectedMovieSlice.actions;
