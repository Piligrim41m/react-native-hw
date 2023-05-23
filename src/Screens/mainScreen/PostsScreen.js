import { createStackNavigator } from '@react-navigation/stack';
import { moduleName } from 'react-native';
import CommentsScreen from '../nestedScreen/CommentsScreen';
import DefaultScreenPosts from '../nestedScreen/DefaultScreenPosts';
import MapScreen from '../nestedScreen/MappScreen';

const NestedScreen = createStackNavigator()
const PostsScreen = () => {
    return (
        <NestedScreen.Navigator initialRouteName='DefaultScreen'>
            <NestedScreen.Screen options={{ hederShown: false }} name='DefaultScreen' component={DefaultScreenPosts}/>
            <NestedScreen.Screen options={{ hederShown: false }} name='Map' component={MapScreen}/>
            <NestedScreen.Screen options={{ hederShown: false }} name='Comments' component={CommentsScreen}/>
        </NestedScreen.Navigator>
    )
}

export default PostsScreen;