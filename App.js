import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import Main from './src/components/Main';

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
  });
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main />
      <StatusBar style="auto" />
    </Provider>
    
  );
}
