export interface authStateProps {
    auth: boolean
    token: null | string
  }
  
export interface authContextProps{
    authState: authStateProps
    setAuthState: React.Dispatch<React.SetStateAction<authStateProps>>
    getAccessToken: () => null | string
    logout: () => void
  }