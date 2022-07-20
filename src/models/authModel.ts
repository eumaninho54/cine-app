import { dataMoviesModel } from './moviesModel';
export interface authStateProps {
  auth: null | boolean;
  token: null | string;
}

export interface authContextProps {
  authState: authStateProps
  setAuthState: React.Dispatch<React.SetStateAction<authStateProps>>
  logout: () => void
  infoUser: userProps
  setInfoUser: React.Dispatch<React.SetStateAction<userProps>>
  isSelectedFavorite: {
    isSelected: boolean;
    dataMovie: dataMoviesModel
  }
  setIsSelectedFavorite: React.Dispatch<React.SetStateAction<{
    isSelected: boolean;
    dataMovie: dataMoviesModel;
  }>>
}

export interface userProps {
  id: number
  email: string
  username: string
  favorites: dataMoviesModel[]
}

export interface signInProps {
  authentication: {
    auth: boolean
    token: string
  }
  infoUser: {
    id: number
    username: string,
    email: string
    favorites: dataMoviesModel[]
  }
}
