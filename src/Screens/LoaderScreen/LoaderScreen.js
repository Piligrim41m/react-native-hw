import { View, ActivityIndicator } from 'react-native';
import { styles } from './LoaderScreen.styles';

export const LoaderScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={styles.loader.color} />
    </View>
  );
};
