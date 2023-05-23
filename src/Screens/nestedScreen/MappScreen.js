import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from 'react-native-maps'

const MapScreen = ({ route }) => {
    const {location} = route.params
    console.log('-----MAP-----', location.latitude)
    return (
        <View style={styles.container}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                    }}
                />
            </MapView>
        </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
    }
})

export default MapScreen;