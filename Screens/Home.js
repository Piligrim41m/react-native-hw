import { StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

import { Feather } from '@expo/vector-icons'


import PostsScreen from "./mainScreen/PostsScreen";
import CreatePostsScreen from "./mainScreen/CreatePostsScreen";
import ProfileScreen from "./mainScreen/ProfileScreen";

const UserTab = createBottomTabNavigator();


const HomeScreen = ({ navigation, route }) => {
    const { email } = route.params
    console.log(email)
    return (
        <UserTab.Navigator
          initialRouteName='PostsScreen'
          screenOptions={{
            tabBarActiveTintColor: '#e91e63',
            tabBarShowLabel: false,
          }}>
            <UserTab.Screen options={{
                tabBarIcon: ({ color, size }) => (<Feather name="grid" size={size} color={color} />),
                headerRight: () => (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Login')} >
                        <Ionicons name="log-out-outline" size={24} color="black" />
                    </TouchableOpacity>
                )
        }} 
        name='Posts' component={PostsScreen} />
            <UserTab.Screen options={{
            tabBarIcon: ({color, size}) => (<Ionicons name="add-circle" size={size} color={color} />)
        }} name='Create' component={CreatePostsScreen} />
            <UserTab.Screen options={{
            tabBarIcon: ({color, size}) => (<AntDesign name="user" size={size} color={color} />)
        }} name='Profile' component={ProfileScreen} />
      </UserTab.Navigator>
    )
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     }
// })

export default HomeScreen;