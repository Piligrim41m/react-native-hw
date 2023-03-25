import { createStackNavigator } from '@react-navigation/stack';
import { moduleName } from 'react-native';
import CommentsScreen from '../nestedScreen/CommentsScreen';
import DefaultScreenPosts from '../nestedScreen/DefaultScreenPosts';
import MapScreen from '../nestedScreen/MappScreen';

const NestedScreen = createStackNavigator()
const PostsScreen = () => {
    return (
        <NestedScreen.Navigator initialRouteName='DefaultScreen'>
            <NestedScreen.Screen name='DefaultScreen' component={DefaultScreenPosts}/>
            <NestedScreen.Screen name='Map' component={MapScreen}/>
            <NestedScreen.Screen name='Comments' component={CommentsScreen}/>
        </NestedScreen.Navigator>
    )
}

export default PostsScreen;