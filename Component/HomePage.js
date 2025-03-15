import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import UserGuide from './Cards/UserGuide';
import Welcome from './Cards/Welcome';
import Weather from './Cards/Weather';

const HomePage = ({ navigation }) => {
    const [selectedCrop, setSelectedCrop] = useState(null);
    const [lastScanned, setLastScanned] = useState([
        { id: 1, name: 'Apple', disease: 'Apple Scab', date: '12 Mar 2025' },
        { id: 2, name: 'Tomato', disease: 'Leaf Spot', date: '10 Mar 2025' },
    ]);

    const crops = [
        { id: 1, name: 'Apple', icon: '🍎' },
        { id: 2, name: 'Potato', icon: '🥔' },
        { id: 3, name: 'Tomato', icon: '🍅' },
        { id: 4, name: 'Blueberry', icon: '🫐' },
        { id: 5, name: 'Soybean', icon: '🌱' },
        { id: 6, name: 'Strawberry', icon: '🍓' },
    ];

    const handleCropSelect = (crop) => {
        setSelectedCrop(crop);
        navigation.navigate('ScanPage', { crop: crop.name });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
            
            {/* Header with Welcome Component */}
            <View style={styles.welcomeContainer}>
                <Welcome navigation={navigation} />
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerIcon}>🌿</Text>
                    <Text style={styles.headerTitle}>Heal Your Crop</Text>
                </View>
            </View>

            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* Quick Scan Card */}
                <View style={styles.quickScanCard}>
                    <Text style={styles.sectionTitle}>Quick Scan</Text>
                    <Text style={styles.sectionSubtitle}>Select a crop to start scanning</Text>
                    
                    <View style={styles.cropSelector}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {crops.map((crop) => (
                                <TouchableOpacity 
                                    key={crop.id} 
                                    style={[
                                        styles.cropButton,
                                        selectedCrop?.id === crop.id && styles.selectedCropButton
                                    ]}
                                    onPress={() => handleCropSelect(crop)}
                                >
                                    <Text style={styles.cropIcon}>{crop.icon}</Text>
                                    <Text style={styles.cropName}>{crop.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>

                {/* User Guide Card */}
                <View style={styles.userGuideCard}>
                    <UserGuide navigation={navigation} />
                </View>

                {/* Recent Scans Card */}
                <View style={styles.recentScansCard}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.sectionTitle}>Recent Scans</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('ScanHistory')}>
                            <Text style={styles.viewAllText}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    
                    {lastScanned.map((item) => (
                        <TouchableOpacity 
                            key={item.id} 
                            style={styles.scanItem}
                            onPress={() => navigation.navigate('ScanResult', { scan: item })}
                        >
                            <View style={styles.scanItemLeft}>
                                <Text style={styles.scanItemIcon}>{
                                    crops.find(crop => crop.name === item.name)?.icon || '🌱'
                                }</Text>
                                <View>
                                    <Text style={styles.scanItemName}>{item.name}</Text>
                                    <Text style={styles.scanItemDisease}>{item.disease}</Text>
                                </View>
                            </View>
                            <View style={styles.scanItemRight}>
                                <Text style={styles.scanItemDate}>{item.date}</Text>
                                <Text style={styles.chevronRight}>›</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Weather Card */}
                <View style={styles.weatherCard}>
                    <Weather />
                </View>

                {/* Tips Card */}
                <View style={styles.tipsCard}>
                    <Text style={styles.sectionTitle}>Today's Tip</Text>
                    <View style={styles.tipContent}>
                        <Text style={styles.tipIcon}>💡</Text>
                        <Text style={styles.tipText}>Regular crop rotation can help prevent disease buildup in your soil.</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Floating Action Button */}
            <TouchableOpacity 
                style={styles.fab}
                onPress={() => navigation.navigate('ScanPage')}
            >
                <Text style={styles.fabText}>📷</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    welcomeContainer: {
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#8DC26F',
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    headerIcon: {
        fontSize: 24,
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    quickScanCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    cropSelector: {
        marginTop: 15,
    },
    cropButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        width: 80,
        height: 90,
        borderRadius: 15,
        backgroundColor: '#f0f0f0',
        padding: 10,
    },
    selectedCropButton: {
        backgroundColor: '#e6f7e1',
        borderWidth: 2,
        borderColor: '#8DC26F',
    },
    cropIcon: {
        fontSize: 30,
        marginBottom: 5,
    },
    cropName: {
        fontSize: 12,
        textAlign: 'center',
    },
    userGuideCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    recentScansCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    viewAllText: {
        fontSize: 14,
        color: '#8DC26F',
        fontWeight: '600',
    },
    scanItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    scanItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scanItemIcon: {
        fontSize: 24,
        marginRight: 15,
    },
    scanItemName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    scanItemDisease: {
        fontSize: 14,
        color: '#666',
    },
    scanItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scanItemDate: {
        fontSize: 12,
        color: '#999',
        marginRight: 5,
    },
    chevronRight: {
        fontSize: 18,
        color: '#8DC26F',
        fontWeight: 'bold',
    },
    weatherCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    tipsCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginTop: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    tipContent: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFAEB',
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
    },
    tipIcon: {
        fontSize: 24,
        marginRight: 10,
    },
    tipText: {
        fontSize: 14,
        color: '#333',
        flex: 1,
    },
    fab: {
        position: 'absolute',
        right: 25,
        bottom: 25,
        backgroundColor: '#8DC26F',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    fabText: {
        fontSize: 24,
    }
});

export default HomePage;