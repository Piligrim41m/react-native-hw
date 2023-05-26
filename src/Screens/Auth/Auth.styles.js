import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        minHeight: "100%",
        minWidth: "100%",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        backgroundColor: "white",
    },

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

    textPosition: {
        display: 'flex',
        paddingBottom: 40,
    },

    input: {
        width: 300,
        height: 50,
        padding: 10,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        backgroundColor: "#E8E8E8",
        color: "#212121",
        borderRadius: 5,
        marginBottom: 10,

    },

    button: {
        color: "#fff",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 300,
        height: 50,
        padding: 10,
        borderColor: "grey",
        borderRadius: 100,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#FF6C00',
    },

    avatarPlace: {
        display: "flex",
        minHeight: 100,
        minWidth: 100,
        position: "absolute",
        top: -270,
        borderRadius: 16,
        backgroundColor: '#F6F6F6',
    },

    avatarImage: {
        width: 250,
        height: 300,
        borderRadius: 8
    },

    createPostCamera: {
        flex: 1,
        minWidth: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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
        right: '40%',
        borderRadius: 50,
    },

    add: {
        display: 'flex',
        position: "absolute",
        minHeight: 25,
        minWidth: 25,
        borderRadius: 100,
        color: 'blue',
        top: 15,
        right: '19%',
    },
});