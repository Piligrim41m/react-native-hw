import { Provider } from 'react-redux';
import { store } from './redux/store';
import { useFonts } from 'expo-font';
import { Main } from './src/components/Main';
import { LoaderScreen } from './src/Screens/LoaderScreen';

export const App = () => {
  const [fontsLoaded] = useFonts({
    'Roboto-Italic': require('./src/fonts/Roboto/Roboto-Italic.ttf'),
    'Roboto-Regular': require('./src/fonts/Roboto/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <LoaderScreen />;
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
