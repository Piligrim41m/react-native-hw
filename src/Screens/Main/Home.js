import React from "react";
import { View } from 'react-native';
import PostScreen from "../Posts/PostsScreen";
import CreatePostsScreen from "../Posts/CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();

const Home = () => {
  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="appstore-o" size={24} color="grey" />
          ),
        }}
        name={"PostScreen"}
        component={PostScreen}
      />
      <MainTab.Screen
        options={{
          title: "Create post",
          headerTitleAlign: "center",
          tabBarIcon: ({ focused, size, color }) => (
            <View style={{ backgroundColor: "#FF6C00", borderRadius: 100, paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5 }}>
                <Ionicons name="add-sharp" size={24} color="white" />
            </View>
          ),
        }}
        name={"CreatePostsScreen"}
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
           
              <AntDesign name="user" size={24} color="grey" />
          ),
        }}
        name={"ProfileScreen"}
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

export default Home;
