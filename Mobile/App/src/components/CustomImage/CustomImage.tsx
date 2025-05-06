import React from 'react';
import {Image, ImageProps} from 'react-native';
import {styles} from './style';

const imageActivity = require('../../assets/image/imgActivity.png');

type VariantType = keyof typeof styles;

interface ImageRootProps extends ImageProps {
  type?: VariantType;
  radius?: any;
  uri?: any;
  edit?: boolean
}

function ImageRoot({
  type = 'imgActivity',
  radius,
  uri,
  style,
  edit = false,
  ...props

}: ImageRootProps) {
  const getImageUrl = (imageUri: string) => {
    imageUri == undefined
      ? imageActivity
      : (imageUri = imageUri.replace('localhost', '10.0.2.2'));
    return imageUri;
  };

  const getImageSource = () => {
    if (edit) {
      return uri;
    }
    if (uri && typeof uri === 'object' && uri.uri) {
      return { uri: getImageUrl(uri.uri) };
    }
    
    if (typeof uri === 'string' && uri.trim() !== '') {
      return { uri: getImageUrl(uri) };
    }
    
    return imageActivity;
  };


  return (
    <Image
      resizeMethod="resize"
      resizeMode="cover"
      {...props}
      source={getImageSource()}
      style={[styles[type], radius, style]}
    />
  );
}




export const CustomImage = {
  Root: ImageRoot,
};
