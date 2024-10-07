import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { translate } from '@vitalets/google-translate-api';
import {Picker} from '@react-native-picker/picker';

const PredictionPage = ({ route }) => {
  const { data } = route.params;
  const [causesParagraph, setCausesParagraph] = useState('');
  const [remediesParagraph, setRemediesParagraph] = useState('');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Function to format the causess and remedies into paragraphs
    const formatParagraph = (items) => {
      return items.map(item => item + '.').join(' ');
    };

    // Set the causes and remedies paragraphs
    if (data.remedies) {
      const remediesPara = formatParagraph(data.remedies);
      setRemediesParagraph(remediesPara);
    }

    if (data.causes) {
      const causesPara = formatParagraph(data.causes);
      setCausesParagraph(causesPara);
    }
  }, [data]);

  // Function to handle language change
  const handleLanguageChange = async (lang) => {
    setLanguage(lang);
    if (lang !== 'en') {
      const causessTranslation = await translate(causesParagraph, { to: lang });
      const remediesTranslation = await translate(remediesParagraph, { to: lang });
      setCausesParagraph(causessTranslation.text);
      setRemediesParagraph(remediesTranslation.text);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.disease}</Text>
      <Picker
        selectedValue={language}
        style={{ height: 50, width: '100%', fontSize: 20 }}
        itemStyle={{ color: 'blue' }}
        onValueChange={(itemValue) => handleLanguageChange(itemValue)}
      >
        <Picker.Item label="English" value="en" style={{ fontSize: 20 }}/>
        <Picker.Item label="Hindi" value="hi" style={{ fontSize: 20 }}/>
        <Picker.Item label="Punjabi" value="pa" style={{ fontSize: 20 }}/>
      </Picker>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>causess:</Text>
        <Text style={styles.paragraph}>{causesParagraph}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Remedies:</Text>
        <Text style={styles.paragraph}>{remediesParagraph}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    marginLeft: 10,
    marginBottom: 5,
  },
});

export default PredictionPage;
