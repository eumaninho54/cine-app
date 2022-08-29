import { dataMoviesModel } from "./moviesModel";

export interface StatesModel {
  user: userProps
  selectedMovie: dataMoviesModel
}

export interface userProps {
  id: number;
  email: string;
  username: string;
  favorites: dataMoviesModel[];
  auth: boolean;
  token: string;
}

export interface movieProps {
  id: number;
  title: string;
  banner: string;
  session_date: Date;
}
