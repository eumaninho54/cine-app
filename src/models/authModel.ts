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
}

export interface userProps {
  email: string
  username: string
}

export interface signInProps {
  authentication: {
    auth: boolean
    token: string
  }
  infoUser: {
    username: string,
    email: string
  }
}
