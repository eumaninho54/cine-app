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
    idMovie: number;
  }
  setIsSelectedFavorite: React.Dispatch<React.SetStateAction<{
    isSelected: boolean;
    idMovie: number;
  }>>
}

export interface userProps {
  id: number
  email: string
  username: string
  favorites: number[]
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
    favorites: number[]
  }
}
