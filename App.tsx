import Login from './src/components/signIn';
import { StatusBar, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { useColorScheme } from 'react-native';
import { reactotron } from './src/config/reactotron'
import themes from './src/themes';
import { AuthProvider } from "./src/context/authContext"
import Routes from './src/routes';
import FlashMessage from 'react-native-flash-message';

console.tron = reactotron

export default function App() {
  const deviceTheme = useColorScheme()
  const theme = deviceTheme != null && deviceTheme != undefined
    ? themes[deviceTheme]
    : themes['light']

  
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFC830' }}>
          <StatusBar animated backgroundColor={'#FFC830'} />
          <FlashMessage position="top" />
          <Routes />
        </SafeAreaView>
      </AuthProvider>
    </ThemeProvider>
  );
}
