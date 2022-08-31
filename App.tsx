import { StatusBar, SafeAreaView } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { useColorScheme } from 'react-native';
import { reactotron } from './src/config/reactotron'
import themes from './src/themes';
import Routes from './src/routes';
import FlashMessage from 'react-native-flash-message';
import "./src/config/ignoreWarnings"
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { verifyToken } from './src/store/userSlice';

console.tron = reactotron

export default function App() {
  const deviceTheme = useColorScheme()
  const theme = deviceTheme != null && deviceTheme != undefined
    ? themes[deviceTheme]
    : themes['light']

  useEffect(() => {
    store.dispatch(verifyToken())
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SafeAreaView style={{ flex: 0, backgroundColor: theme.primaryColor }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
          <StatusBar barStyle={'dark-content'} animated backgroundColor={theme.primaryColor} />
          <FlashMessage position="top" />
          <Routes />
        </SafeAreaView>
      </Provider>
    </ThemeProvider>
  );
}
