import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    img: {
        minWidth: "100%",
        flex: 1,
        justifyContent: 'flex-end',
    },

    regField: {
        marginTop: 'auto',
        display: 'flex',
        height: "80%",
        minWidth: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },

    regInputs: {
        display: 'flex',
        position: "relative",
        height: "80%",
        minWidth: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },

    avatarPlace: {
        display: "flex",
        minHeight: 120,
        minWidth: 120,
        position: "absolute",
        top: -180,
        borderRadius: 16,
        backgroundColor: '#F6F6F6',
    },

    avatarImage: {
        width: 150,
        height: 200,
        borderRadius: 8
    },

    add: {
        display: 'flex',
        position: "absolute",
        minHeight: 25,
        minWidth: 25,
        borderRadius: 100,
        color: 'blue',
        top: -25,
        right: '31%',
    },

    makePhotoButton: {
        alignContent: 'center',
        position: "absolute",
        backgroundColor: 'rgba(255,255,255,0.3)',
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        top: '40%',
        right: '30%',
        borderRadius: 50,
    },

    profileLogOut: {
        display: 'flex',
        position: "absolute",
        minHeight: 25,
        minWidth: 25,
        borderRadius: 100,
        // color: 'blue',
        top: -50,
        right: '10%',
    },

    postSection: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        minHeight: 255,
        maxWidth: '100%',
    },

    postImage: {
        width: 225,
        height: 300,
        borderRadius: 8
    },

    postText: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },

});