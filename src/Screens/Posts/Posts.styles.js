import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    createPostMain: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        alignItems: 'center',
    },

    createPostPhoto: {
        backgroundColor: '#F6F6F6',
        width: 300,
        height: 300,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },

    createPostCamera: {
        flex: 1,
        minWidth: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    makePhotoButton: {
        alignContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.3)',
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },

    retakePhotoButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 50,
        height: 50,
        padding: 10,
        borderColor: "grey",
        borderRadius: 100,
        marginBottom: 10,
        backgroundColor: '#F6F6F6',
        marginTop: 20,
    },

    postInput: {
        width: 300,
        height: 30,
        padding: 3,
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
        marginTop: 10,
    },

    postButtonActive: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 300,
        height: 50,
        padding: 10,
        borderColor: "grey",
        borderRadius: 100,
        marginBottom: 10,
        backgroundColor: '#FF6C00',
        marginTop: 20,
    },

    postButtonInactive: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 300,
        height: 50,
        padding: 10,
        borderColor: "grey",
        borderRadius: 100,
        marginBottom: 10,
        backgroundColor: '#F6F6F6',
        marginTop: 20,
    },

    postsMain: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        alignItems: 'center',
    },

    postsOwnerSection: {
        flexDirection: 'row',
        paddingBottom: 10,
    },

    avatarImg: {
        height: 120,
        width: 120,
        borderRadius: 16,
    },

    postsProfileText: {
        justifyContent: 'center',
        paddingLeft: 20
    },

    postSection: {
        flex: 1,
        // flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        // alignItems: 'center',
        minHeight: 255,
        maxWidth: '100%',
    },

    postImage: {
        width: 270,
        height: 360,
        borderRadius: 8
    },

    postText: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },

});