import Login from './src/components/login';
import { StatusBar, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { useColorScheme } from 'react-native';
import { reactotron } from './src/config/reactotron'
import themes from './src/themes';

console.tron = reactotron

export default function App() {
  const deviceTheme = useColorScheme()
  const theme = deviceTheme != null && deviceTheme != undefined
    ? themes[deviceTheme]
    : themes['light']

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFC830' }}>
        <StatusBar animated backgroundColor={'#FFC830'} />
        <Login />
      </SafeAreaView>
    </ThemeProvider>
  );
}
