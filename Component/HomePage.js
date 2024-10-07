import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import UserGuide from './Cards/UserGuide';
import Welcome from './Cards/Welcome';
import Weather from './Cards/Weather';

const HomePage = ({ navigation }) => {
    return (
        <View style={styles.container}>

            <View style={styles.welcome}>
                <Welcome  navigation={navigation} />
            </View>

            <View>
                <Text style={styles.heading}>Heal Your Crop</Text>
            </View>

            <View>
                <Text>Available crops: Apple, Potato, Tomato, BlueBerry, Soyabean, Strawberry</Text>
            </View>

            <View style={styles.userGuide}>
                <UserGuide navigation={navigation} />
            </View>

            <View style={styles.weather}>
                <Weather />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexdirection: 'column',
        // padding: 20,
    },
    welcome: {
        flex: 1,
        backgroundColor: '#FFB6C1',
        width: '100%' 
    },
    userGuide: {
        flex: 2,
        backgroundColor: '#E6E6FA',
        width: '100%',
        marginTop: 10,
        marginBottom: 10, 
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }
    },
    weather: {
        flex: 2,
        backgroundColor: 'white',
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    },
    heading:{
        fontWeight: 'bold',
        fontSize: 17,
        marginRight: 199
    }
});

export default HomePage;