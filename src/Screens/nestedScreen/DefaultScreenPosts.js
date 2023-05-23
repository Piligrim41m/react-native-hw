import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Image, TouchableOpacity, Text, Pressable } from "react-native";
import { db } from "../../firabase/config";
import { Ionicons } from '@expo/vector-icons';

const DefaultScreenPosts = ({ navigation, route }) => {
    const [posts, setPosts] = useState([])

    // let uniquePostId = '';
    // if (route.params) {
    //     uniquePostId = route.params.uniquePostId;
    // }

    const getAllPosts = async () => {
        const querySnapshot = await getDocs(query(collection(db, 'posts')));
        const allPosts = querySnapshot.docs.map(post => ({
            ...post.data(), id: post.id
        }))
        const sortPosts = allPosts.sort(
            (firstContact, secondContact) => secondContact.id - firstContact.id
        ); 
        setPosts(sortPosts)
    }


    useEffect(() => {
      getAllPosts()
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={post => post.id}
                renderItem={({ item }) => (
                    <View>
                        <Image
                            source={{ uri: item.photo }}
                            style={{marginHorizontal: 16, height: 240}}
                        />
                        <Text style={{ paddingBottom: 20, color: 'e91e63' }}>{item.headers.posotTitle}</Text>
                        <View>
                            {item.location ? (
                            <Pressable style={styles.location} title={"Map"}
                                onPress={() => navigation.navigate("Map", {location: item.location})}>
                                <Ionicons name="location-outline" size={24} color="green"/>
                                <Text style={{paddingBottom: 20}}>{item.headers.terrain}</Text>
                            </Pressable>) : (
                                <Text style={{paddingBottom: 20}}>{item.headers.terrain}</Text>
                            )}
                        </View>
                        <View>
                            <Pressable title={"Comments"}
                                    onPress={() => navigation.navigate("Comments", {
                                        id: item.id,
                                        title: item.headers.posotTitle,
                                        photo: item.photo,
                                        terrain: item.headers.terrain,
                                        location: item.location,
                                    })}>
                                <Text style={{color: 'grey'}}>
                                    <Ionicons name="chatbubble-outline" size={24} color="grey"/>
                                    {item.commentsCount ?? 0}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                    
                )}
            />

        </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    location: {
        display: 'flex',

    }
})

export default DefaultScreenPosts;