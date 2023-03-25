import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Image, TouchableOpacity, Text } from "react-native";

const DefaultScreenPosts = ({ navigation, route }) => {
    const [posts, setPosts] = useState([])
    console.log('-------POST-------', route.params)
    // console.log('-------POST-LOCATION-------', route.params.location)
    

    useEffect(() => {
        if (route.params) {
            setPosts(prevState => [...prevState, route.params])
        }
    }, [route.params])

    console.log('+++POSTS+++', posts)
    
    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Image
                            source={{ uri: item.photo }}
                            style={{marginHorizontal: 16, height: 240}}
                        />
                        <Text>{item.postTitle}</Text>
                        <TouchableOpacity>
                           <Text onPress={() => navigation.navigate('Comments')}>Comments</Text> 
                        </TouchableOpacity>
                        <TouchableOpacity>
                           <Text onPress={() => navigation.navigate('Map', {location: route.params.location})}>{route.params.terrain}: Map</Text> 
                        </TouchableOpacity>
                    </View>
                    
                )}
            />

        </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
    }
})

export default DefaultScreenPosts;