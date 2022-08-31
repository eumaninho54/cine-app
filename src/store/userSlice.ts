import { dataMoviesToBuy } from './../models/moviesModel';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userProps } from "../models/storeModel";
import * as SecureStore from "expo-secure-store";
import authService from "../services/authService";
import { dataMoviesModel } from "../models/moviesModel";

const initialState: userProps = {
  id: 0,
  email: "",
  username: "",
  favorites: [],
  auth: false,
  token: "",
};


export const verifyToken = createAsyncThunk("verifyToken", async () => {
  const token = await SecureStore.getItemAsync("token");

  if (token == null) {
    return null;
  }
  return await authService.verifyToken(token);
});


export const login = createAsyncThunk("login", async ({email, password}: {email: string, password: string}) => {
  const reqSignIn = await authService.signIn(email, password)

  if (reqSignIn == null || reqSignIn.token == null){
    return null
  }
  await SecureStore.setItemAsync("token", reqSignIn.token)
  return reqSignIn
})


export const logout = createAsyncThunk("logout", async () => {
  await SecureStore.deleteItemAsync("token");
});


export const changeFavorite = createAsyncThunk("changeFavorite", async ({dataMovie, token} : {dataMovie: dataMoviesModel, token: string}) => {
  return await authService.changeFavorite(
    {
      ...dataMovie,
      isFavorite: !dataMovie.isFavorite
    }, token)
});


const userSlice = createSlice({
  name: "userAuth",
  initialState: initialState,
  reducers: {
    login(state, { payload }) {
      state.auth = true;
      state.token = payload;
      return state
    },
  },
  extraReducers: (builder) => {
    builder.addCase(verifyToken.fulfilled, (state, { payload }) => {
      payload == null 
        ? state = initialState
        : state = payload
      return state
    })

    builder.addCase(logout.fulfilled, (state, { payload }) => {
      return state = initialState
    }),

    builder.addCase(changeFavorite.fulfilled, (state, { payload }) => {
      payload == null 
        ? (state.favorites = initialState.favorites) 
        : (state.favorites = payload)
      return state
      }),

    builder.addCase(login.fulfilled, (state, { payload }) => {
      payload == null
        ? state = initialState
        : state = payload
      return state
    })
  }
})

export default userSlice.reducer;
export const {} = userSlice.actions;
