import React, {useState, useEffect, use} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {CustomImage} from '../CustomImage/CustomImage';

const defaultImage = require('../../assets/image/profile-edit.png');

interface CustomImagePickerProps {
  type?: string;
  uri?: string;
  onImageChange?: (imageUri: string) => void;
}

export function CustomImagePicker({
  type = '',
  uri = '',
  onImageChange,
}: CustomImagePickerProps) {
  const [image, setImage] = useState<string | null>(uri);
  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    console.log('URI recebida no CustomImagePicker:', uri);
    if (uri && uri.trim() !== '') {
      setImage(uri);
    } else {
      setImage(null);
    }
  }, [uri]);

  async function pickImage() {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    try {
      const response = await launchImageLibrary(options);

      if (response.assets && response.assets[0]?.uri) {
        const selectedUri = response.assets[0].uri;
        setImage(selectedUri);

        if (onImageChange) {
          onImageChange(selectedUri);
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  }

  const imageSource = image ? {uri: image} : defaultImage;
  console.log('Fonte da imagem a ser usada:', image ? `URI: ${image}` : 'Imagem padrão');
  return (
    <View style={{marginTop: 20}}>
      <TouchableOpacity onPress={pickImage}>
        {type === 'Profile' ? (
          <CustomImage.Root 
          uri={imageSource} 
          edit={edit} 

          type="imgEditProfile" />
        ) : (
          <CustomImage.Root
            uri={imageSource}
            edit={edit}
            type="imgCreateActivity"
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
