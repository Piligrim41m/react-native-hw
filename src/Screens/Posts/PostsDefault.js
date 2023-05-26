import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    Image, Pressable,
    FlatList,
} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import {styles} from './Posts.styles'
import {collection, getDocs, query} from "firebase/firestore";
import {db} from "../../firebase/config";
import {useSelector} from "react-redux";


const PostsDefaultScreen = ({navigation, route}) => {

    const [posts, setPosts] = useState([]);

    const {login} = useSelector(state => state.auth);
    const {avatar} = useSelector(state => state.auth);

    let uniquePostId = '';
    if (route.params) {
        uniquePostId = route.params.uniquePostId;
    }

    const q = query(collection(db, "posts"));

    const getAllPosts = async () => {
        const querySnapshot = await getDocs(q);
        const allPosts = querySnapshot.docs.map((post) => ({
            ...post.data(), id: post.id
        }));

        const sortedPosts = allPosts.sort(
            (firstContact, secondContact) =>
                secondContact.id - firstContact.id);
        setPosts(sortedPosts);
    }


    useEffect(() => {
        getAllPosts();
    }, [uniquePostId])

    return (
        <View style={styles.postsMain}>
            <View style={styles.postsOwnerSection}>
                <Image style={styles.avatarImg} source={{uri: avatar}}/>
                <View style={styles.postsProfileText}>
                    <Text>{login}</Text>
                </View>
            </View>
            <FlatList data={posts} keyExtractor={post => post.id}
                      renderItem={({item}) => (
                          <View style={styles.postSection}>
                              <Text style={{paddingBottom: 20}}>{item.headers.name}</Text>
                              <Image style={styles.postImage}
                                     source={{uri: item.photo}}
                              />
                              <View style={styles.postText}>

                                  <View>
                                      {item.location ? (<Pressable title={"Map"}
                                                                   onPress={() => navigation.navigate("Map", {
                                                                       location: item.location,
                                                                   })}>
                                          <Ionicons name="location-outline" size={24} color="green"/>
                                          <Text style={{paddingBottom: 20}}>{item.headers.place}</Text>
                                      </Pressable>) : (
                                          <Text style={{paddingBottom: 20}}>{item.headers.place}</Text>
                                      )}

                                  </View>
                                  <Pressable title={"Comments"}
                                             onPress={() => navigation.navigate("Comments", {
                                                 id: item.id,
                                                 header: item.headers.name,
                                                 photo: item.photo,
                                                 place: item.headers.place,
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
        </View>
    )
};

export default PostsDefaultScreen;
