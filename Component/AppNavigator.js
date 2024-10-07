import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraPage from './CameraPage';
import HomePage from './HomePage';
import PredictionPage from './PredictionPage';
import CropInfoPage from './CropInfoPage';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Camera" component={CameraPage} />
      <Stack.Screen name="PredictionPage" component={PredictionPage} />
      <Stack.Screen name="CropInfoPage" component={CropInfoPage} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
