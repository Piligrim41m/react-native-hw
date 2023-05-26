import RegistrationScreen from "./Screens/Auth/RegistrationScreen";
import LoginScreen from "./Screens/Auth/LoginScreen";
import Home from "./Screens/Main/Home";
import MapScreen from "./Screens/Additionall/MapScreen";
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";


const MainStack = createStackNavigator();

export const useRoute = (authState) => {

    if (authState) {
        return (
            <MainStack.Navigator initialRouteName="Home"
                                 screenOptions={{
                                     tabBarShowLabel: false,
                                 }}>
                <MainStack.Screen name="Home"
                                  component={Home} options={{
                    headerShown: false,
                }}/>
                <MainStack.Screen name="Map"
                                  component={MapScreen} options={{
                    headerShown: false,
                }}/>
            </MainStack.Navigator>
        );
    }

    return (
        <MainStack.Navigator initialRouteName="Login">
            <MainStack.Screen name="Registration"
                              component={RegistrationScreen} options={{
                headerShown: false,
            }}/>
            <MainStack.Screen name="Login"
                              component={LoginScreen} options={{
                headerShown: false,
            }}/>
        </MainStack.Navigator>
    );
}

