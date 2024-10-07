import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';

import axios from 'axios';

import { Camera } from 'expo-camera';



const CameraPage = ({ navigation }) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [isRequestMade, setIsRequestMade] = useState(false);
  const [diseaseData, setDiseaseData] = useState("Click 'Submit' to get disease");
  const cameraRef = React.createRef();

  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [imagePickerPermission, requestImagePickerPermission] = ImagePicker.useMediaLibraryPermissions();


  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          We need your permission to access the camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={styles.permissionButton}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!imagePickerPermission) {
    return <View />;
  }

  if (!imagePickerPermission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          We need your permission to access the media
        </Text>
        <TouchableOpacity
          onPress={requestImagePickerPermission}
          style={styles.permissionButton}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraReady && cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setDiseaseData("Click 'Submit' to get disease");
      setCapturedImage(data.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    setIsRequestMade(false)

    if (!result.canceled) {
      setCapturedImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {

    const apiUrl = 'https://btp-app-2020eeb1183.onrender.com/predict';

    const formData = new FormData();
    formData.append('image', {
      uri: capturedImage,
      type: 'image/jpeg',
      name: capturedImage.fileName || 'image.jpg',
    });
    console.log(formData);

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('GET request successful', response.data);
      setDiseaseData(response.data);
    } catch (error) {
      console.error('GET request error', error);
    }
    setIsRequestMade(true);
  };

  const handleDetailsPageNevigation = () => {
    // Navigate to a different screen with data
    navigation.navigate('PredictionPage', { data: diseaseData });
  };

  return (
    <View style={styles.container}>
      {capturedImage && (
        <View style={styles.topSection}>
          <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
        </View>
      )}
      {capturedImage && (
        <View style={styles.diseaseSection}>
          <Text style={styles.diseaseText}>Disease Name: {diseaseData.disease}</Text>
          <View style={styles.submitButtonSection}>
            {isRequestMade ? (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleDetailsPageNevigation}>
                <Text style={styles.submitButtonText}>Get More Details</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
      {!capturedImage && (
        <View style={styles.defaultImageContainer}>
          <Image
            source={require('../assets/logo.jpg')} // Replace with your default image source
            style={styles.defaultImage}
          />
          <Text style={styles.welcomeText}>
            Welcome to our BTP app. Click an image of a plant to get a
            prediction.
          </Text>
        </View>
      )}
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={cameraRef}
        onCameraReady={() => setCameraReady(true)}>
        <View style={styles.captureButtonContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <Text style={styles.captureButtonText}>Take Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.captureButton} onPress={pickImage}>
            <Text style={styles.captureButtonText}>Select Picture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  defaultImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  defaultImage: {
    width: width - 20,
    height: (height - 50) / 3,
  },
  welcomeText: {
    fontSize: 16,
    textAlign: 'center',
  },
  topSection: {
    flex: 1,
  },
  capturedImage: {
    width: width - 20,
    height: height / 2 - 75,
  },
  diseaseSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  diseaseText: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 15
  },
  submitButtonSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  camera: {
    flex: 1,
  },
  permissionText: {
    textAlign: 'center',
    fontSize: 16,
  },
  permissionButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
  },
  captureButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 50,
    margin: 5
  },
  captureButtonText: {
    fontSize: 18,
    color: 'white',
  },
  dropdown: {
    height: 50,
    width: 150,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default CameraPage;
