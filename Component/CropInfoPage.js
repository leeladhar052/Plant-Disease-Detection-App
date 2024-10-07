import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import cropDetails from '../assets/cropDetails.json';
import { Picker } from '@react-native-picker/picker';


const CropInfoPage = () => {
  const [selectedCropName, setSelectedCropName] = useState('Crop Name');
  const [selectedCropInfo, setSelectedCropInfo] = useState(null);
  const [crop, setCrop] = useState(null);

  const handleDiseaseChange = (disease) => {
    setSelectedCropName(disease);
    const selectedCrop = cropDetails.find(crop => crop.crop_name === disease);
    console.log(selectedCrop);
    setSelectedCropInfo(selectedCrop);
    setCrop(selectedCrop);
  };

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Select Crop:</Text>
        <Picker
          selectedValue={selectedCropName}
          style={{ height: 50, width: '100%', fontSize: 20 }}
          itemStyle={{ color: 'blue' }}
          onValueChange={(itemValue) => handleDiseaseChange(itemValue)}
        >
          <Picker.Item label="Tomato" value="Tomato" />
          {cropDetails.map(crop => (
            <Picker.Item
              key={crop.crop_name}
              label={crop.crop_name}
              value={crop.crop_name}
              style={{ fontSize: 20 }}
            />

          ))}

        </Picker>

        {selectedCropInfo && (
           <ScrollView style={styles.container}>
            {crop === selectedCropInfo}
           <Text style={styles.header}>{crop.crop_name}</Text>
           <Text style={styles.subHeader}>{crop.scientific_name}</Text>
           <Text style={styles.text}>{crop.description}</Text>

           <Text style={styles.sectionHeader}>Family:</Text>
           <Text style={styles.text}>{crop.family}</Text>

           <Text style={styles.sectionHeader}>Sowing Time:</Text>
           <Text style={styles.text}>{crop.sowing_time}</Text>

           <Text style={styles.sectionHeader}>Transplanting Time:</Text>
           <Text style={styles.text}>{crop.transplanting_time}</Text>

           <Text style={styles.sectionHeader}>Harvesting Time:</Text>
           <Text style={styles.text}>{crop.harvesting_time}</Text>

           <Text style={styles.sectionHeader}>Planting Depth:</Text>
           <Text style={styles.text}>{crop.planting_depth}</Text>

           <Text style={styles.sectionHeader}>Spacing:</Text>
           <Text style={styles.text}>{crop.spacing}</Text>

           <Text style={styles.sectionHeader}>Growing Temperature:</Text>
           <Text style={styles.text}>Min: {crop.growing_temperature.min_temperature}</Text>
           <Text style={styles.text}>Max: {crop.growing_temperature.max_temperature}</Text>

           <Text style={styles.sectionHeader}>Growing Conditions:</Text>
           {crop.growing_conditions.map((condition, index) => (
               <Text key={index} style={styles.text}>{condition}</Text>
           ))}

           <Text style={styles.sectionHeader}>Soil Requirements:</Text>
           <Text style={styles.text}>Soil Type: {crop.soil_requirements.soil_type}</Text>
           <Text style={styles.text}>pH Range: {crop.soil_requirements.ph_range}</Text>
           <Text style={styles.text}>Drainage: {crop.soil_requirements.drainage}</Text>
           <Text style={styles.text}>Nutrient Requirements:</Text>
           {crop.soil_requirements.nutrient_requirements.map((requirement, index) => (
               <Text key={index} style={styles.text}>{requirement}</Text>
           ))}

           <Text style={styles.sectionHeader}>Common Pests:</Text>
           {crop.common_pests.map((pest, index) => (
               <View key={index} style={styles.pestContainer}>
                   <Text style={styles.subSectionHeader}>{pest.pest_name}</Text>
                   <Text style={styles.text}>{pest.description}</Text>
                   <Text style={styles.text}>Prevention Methods: {pest.prevention_methods}</Text>
                   <Text style={styles.text}>Control Methods: {pest.control_methods}</Text>
               </View>
           ))}

           <Text style={styles.sectionHeader}>Common Diseases:</Text>
           {crop.common_diseases.map((disease, index) => (
               <View key={index} style={styles.diseaseContainer}>
                   <Text style={styles.subSectionHeader}>{disease.disease_name}</Text>
                   <Text style={styles.text}>{disease.description}</Text>
                   <Text style={styles.text}>Prevention Methods: {disease.prevention_methods}</Text>
                   <Text style={styles.text}>Control Methods: {disease.control_methods}</Text>
               </View>
           ))}

           <Text style={styles.sectionHeader}>Other Notes:</Text>
           <Text style={styles.text}>{crop.other_notes}</Text>
       </ScrollView>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
      padding: 16,
      backgroundColor: '#f5f5f5',
  },
  header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 8,
  },
  subHeader: {
      fontSize: 18,
      fontWeight: '600',
      color: '#555',
  },
  sectionHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#444',
      marginTop: 16,
      marginBottom: 8,
  },
  subSectionHeader: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#666',
      marginBottom: 4,
  },
  text: {
      fontSize: 14,
      color: '#333',
      marginBottom: 4,
  },
  pestContainer: {
      marginBottom: 16,
  },
  diseaseContainer: {
      marginBottom: 16,
  },
});

export default CropInfoPage;
