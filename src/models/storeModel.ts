import { dataMoviesModel, dataMoviesToBuy } from "./moviesModel";

export interface StatesModel {
  user: userProps
  selectedMovie: dataMoviesModel
  toBuyTickets: dataMoviesToBuy[]
}

export interface userProps {
  id: number;
  email: string;
  username: string;
  favorites: dataMoviesModel[];
  auth: boolean;
  token: string | null;
}

export interface movieProps {
  id: number;
  title: string;
  banner: string;
  session_date: Date;
}
