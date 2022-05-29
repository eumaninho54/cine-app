import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from '../../components/signIn'
import SignUp from '../../components/signUp'
import { ThemeContext } from 'styled-components/native'

const { Navigator, Screen } = createNativeStackNavigator()

interface themeContextProps {
  background: string,
  color: string
}

const LoginNavigation: React.FC = () => {
  const theme = useContext<themeContextProps>(ThemeContext)

  return (
    <Navigator
      screenOptions={
        {
          headerStyle: {backgroundColor: theme['background']},
          headerTintColor: theme['color'],
          headerBackButtonMenuEnabled: true,
          headerTitleAlign: 'center'
        }
      }>
      <Screen name='SignIn' component={SignIn}/>
      <Screen name='SignUp' component={SignUp}/>
    </Navigator>
  )
}

export default LoginNavigation