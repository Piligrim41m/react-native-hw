import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    colorPrimary: '#212121',
    colorSecondary: '#BDBDBD',
  },
  headerTitle: {
    alignItems: 'center',
    fontWeight: '500',
    fontSize: 17,
  },
  headerContainerItem: {
    justifyContent: 'flex-end',
    paddingBottom: 11,
    paddingHorizontal: 16,
  },
  headerExitBtn: {
    color: '#BDBDBD',
  },
  tabBar: {
    paddingHorizontal: 73,
  },
  tabBarItem: {
    paddingTop: 9,
    paddingBottom: 35,
    height: 85,
  },
  tabItemActive: {
    height: 40,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#FF6C00',
    activeFill: '#FFFFFF',
    inActiveFill: '#212121',
  },
});
