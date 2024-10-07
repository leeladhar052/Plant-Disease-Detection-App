import React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';

const UserGuide = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/HomePageIcons/capture.png')} style={styles.square} />
            <Image source={require('../../assets/HomePageIcons/leaf.png')} style={styles.leaf} />
          </View>
          <Text style={styles.text}>Click Image</Text>
        </View>
        <Image source={require('../../assets/HomePageIcons/arrow.png')} style={styles.leftArrow} />

        <View style={styles.iconContainer}>
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/HomePageIcons/mobile.jpg')} style={styles.square} />
          </View>
          <Text style={styles.text}>Get Prediction</Text>
        </View>
        <Image source={require('../../assets/HomePageIcons/arrow.png')} style={styles.leftArrow} />

        <View style={styles.iconContainer}>
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/HomePageIcons/diagnosis.jpg')} style={styles.square} />
          </View>
          <Text style={styles.text}>Get Diagnosis</Text>
        </View>
      </View>
      <View style={styles.button}>
        <Button
          title="Take a picture"
          onPress={() =>
            navigation.navigate('Camera')
          }
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 20,
  },
  iconContainer: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  leaf: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
    position: 'absolute',
  },
  leftArrow: {
    width: 20,
    height: 40,
    margin: 10
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
  button: {
    marginBottom: 30,
    borderRadius: 60,
    overflow: 'hidden'
  }
});

export default UserGuide;
