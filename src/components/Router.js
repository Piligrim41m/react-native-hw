import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/Home";
import { LoginScreen } from "../Screens/LoginScreen";
import { RegistrationScreen } from "../Screens/RegistrationScreen";
import MapScreen from "../Screens/nestedScreen/MappScreen";

const MainStack = createStackNavigator();

export const UseRoute = (authState) => {
    if (authState) {
        return (
            <MainStack.Navigator screenOptions={{ tabBarShowLabel: false}}>
                <MainStack.Screen options={{ hederShown: false }} name='Home' component={HomeScreen} />
                <MainStack.Screen options={{ hederShown: false }} name='Map' component={MapScreen} />
            </MainStack.Navigator>
        )
    }
    return (
        <MainStack.Navigator>
                <MainStack.Screen options={{ hederShown: false }} name='Login' component={LoginScreen} />
                <MainStack.Screen options={{ hederShown: false }} name='Registration' component={RegistrationScreen} />
        </MainStack.Navigator>
    )
}

