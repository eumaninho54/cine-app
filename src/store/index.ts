import { configureStore } from "@reduxjs/toolkit"
import selectedMovieSlice from "./selectedMovieSlice"
import bagSlice from "./movieSlice"
import userSlice from "./userSlice"

export const store = configureStore({
  reducer: {
    user: userSlice,
    movieSelected: selectedMovieSlice,
    moviesData: bagSlice
  }
})  

export type AppDispatch = typeof store.dispatch