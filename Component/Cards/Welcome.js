import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to the plant care app</Text>
      <View style={styles.button}>
        <Button
          title='Get Information About Crops'
          onPress={() =>
            navigation.navigate('CropInfoPage')
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 15
  },
  button: {
    marginBottom: 30,
    borderRadius: 60,
    overflow: 'hidden'
  }
});

export default Welcome;