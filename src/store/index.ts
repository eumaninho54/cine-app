import { configureStore } from "@reduxjs/toolkit"
import selectedMovieSlice from "./selectedMovieSlice"
import toBuySlice from "./toBuyTickets"
import userSlice from "./userSlice"

export const store = configureStore({
  reducer: {
    user: userSlice,
    selectedMovie: selectedMovieSlice,
    toBuyTickets: toBuySlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
})  

export type AppDispatch = typeof store.dispatch