import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './style';
import {AppText} from '../Text/Text';

interface CustomTwoButtonsProps {
  onValueChange?: (value: boolean) => void;
  initialValue?: boolean;
}

export function CustomTwoButtons({onValueChange, initialValue = true}: CustomTwoButtonsProps) {
  const [visibility, setVisibility] = useState('private');

  const handleSelect = (value: string) => {
    setVisibility(value);
    if (onValueChange) {
      onValueChange(value === 'private');
    }
  };


  return (
    <View style={styles.container}>
      <AppText variant="mapVisibility" style={{marginTop: 20}}>
        Visibilidade
      </AppText>
      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={[
            styles.radioButton,
            visibility === 'private' && styles.radioButtonSelected,
          ]}
          onPress={() => {
            handleSelect('private');
          }}>
          <Text
            style={[
              styles.radioText,
              visibility === 'private' && styles.textSelected,
            ]}>
            Privado
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.radioButton,
            visibility === 'public' && styles.radioButtonSelected,
          ]}
          onPress={() => {
            handleSelect('public');
          }}>
          <Text
            style={[
              styles.radioText,
              visibility === 'public' && styles.textSelected,
            ]}>
            Público
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
