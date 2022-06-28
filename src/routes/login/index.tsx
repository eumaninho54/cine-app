import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from '../../components/signIn'
import SignUp from '../../components/signUp'
import { ThemeContext } from 'styled-components/native'
import { themeModel } from '../../models/themeModel'

const { Navigator, Screen } = createNativeStackNavigator()


const LoginNavigation: React.FC = () => {
  const theme = useContext<themeModel>(ThemeContext)

  return (
    <Navigator
      screenOptions={
        {
          headerShadowVisible: false,
          headerStyle: {backgroundColor: theme['backgroundLogin']},
          headerTintColor: theme["textColorLogin"],
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