import { View } from 'react-native';
// import { useDispatch } from 'react-redux';
// import { authSignOutUser } from '../../../redux/auth/authOperations';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Feather } from '@expo/vector-icons';
import { PostsScreen } from '../PostsScreen';
import { CreatePostsScreen } from '../CreatePostsScreen';
import { ProfileScreen } from '../ProfileScreen';
import { styles } from './Home.styles';

const Tabs = createBottomTabNavigator();

const screenOptions = ({ navigation, route }) => ({
  headerTintColor: styles.header.colorPrimary,
  headerTitleAlign: styles.headerTitle.alignItems,
  headerTitleStyle: styles.headerTitle,
  headerTitleContainerStyle: styles.headerContainerItem,
  headerRightContainerStyle: styles.headerContainerItem,
  headerLeftContainerStyle: styles.headerContainerItem,
  headerLeft: () => (
    <Feather
      name="arrow-left"
      size={24}
      color={styles.header.colorPrimary}
      onPress={navigation.goBack}
    />
  ),
  headerRight: () => (
    <Feather name="log-out" size={24} color={styles.header.colorSecondary} onPress={() => {}} />
  ),
  tabBarIcon: ({ focused, color, size }) => {
    let tabBarItem;

    if (route.name === 'PostsScreen') {
      tabBarItem = focused ? (
        <View style={styles.tabItemActive}>
          <AntDesign name="appstore-o" size={size} color={styles.tabItemActive.activeFill} />
        </View>
      ) : (
        <AntDesign name="appstore-o" size={size} color={styles.tabItemActive.inActiveFill} />
      );
    }

    if (route.name === 'Create') {
      tabBarItem = focused ? (
        <View style={styles.tabItemActive}>
          <AntDesign name="plus" size={size} color={styles.tabItemActive.activeFill} />
        </View>
      ) : (
        <AntDesign name="plus" size={size} color={styles.tabItemActive.inActiveFill} />
      );
    }

    if (route.name === 'Profile') {
      tabBarItem = focused ? (
        <View style={styles.tabItemActive}>
          <Feather name="user" size={size} color={styles.tabItemActive.activeFill} />
        </View>
      ) : (
        <Feather name="user" size={size} color={styles.tabItemActive.inActiveFill} />
      );
    }

    return tabBarItem;
  },
  tabBarShowLabel: false,
  tabBarStyle: styles.tabBar,
  tabBarItemStyle: styles.tabBarItem,
});

export const Home = ({ navigation, route, options }) => {
  // const dispatch = useDispatch();
  return (
    <Tabs.Navigator initialRouteName="PostsScreen" screenOptions={screenOptions}>
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: 'Posts',
          headerLeft: null,
          // headerShown: false,
        }}
      />

      <Tabs.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          title: 'Create post',
          headerRight: null,
          tabBarStyle: { display: 'none' },
        }}
      />

      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Your profile',
          headerLeft: null,
        }}
      />
    </Tabs.Navigator>
  );
};
