import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {authSignOutUser} from "../../redux/auth/authOperations";
import {useDispatch} from "react-redux";
import {Pressable} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import MapScreen from '../Additionall/MapScreen'
import PostsDefaultScreen from "./PostsDefault";
import CommentsScreen from "../Additionall/CommentsScreen";


const PostsStack = createStackNavigator();

const PostsScreen = () => {

    const dispatch = useDispatch();
    const signOut = () => {
        dispatch(authSignOutUser())
    }

    return (
        <PostsStack.Navigator
            initialRouteName="PostsDefaultScreen"
        >
            <PostsStack.Screen name='PostsDefaultScreen' component={PostsDefaultScreen}
                               options={{
                                   title: 'Posts',
                                   headerTitleAlign: 'center',
                                   headerRightContainerStyle: {
                                       paddingRight: 40,
                                   },
                                   headerRight: () => (
                                       <Pressable
                                           onPress={signOut}
                                           title="LogOut"
                                       >
                                           <MaterialCommunityIcons name="logout" size={24} color="grey"/>
                                       </Pressable>
                                   ),
                                   headerLeft: null
                               }}
            />
            <PostsStack.Screen name="Map" component={MapScreen}
                               options={{
                                   title: 'Photo location map'
                               }}/>
            <PostsStack.Screen name="Comments" component={CommentsScreen}
                               options={{
                                   title: 'post comments'
                               }}/>
        </PostsStack.Navigator>
    )
};

export default PostsScreen;