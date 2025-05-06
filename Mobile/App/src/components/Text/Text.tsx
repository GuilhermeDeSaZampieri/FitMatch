import React from 'react';
import { Text, TextProps } from 'react-native';
import { styles } from './style';

type VariantType = keyof typeof styles;

interface AppTextProps extends TextProps {
  variant?: VariantType;
}

export function AppText({ variant = 'body', children,style, ...props }: AppTextProps) {
  return <Text {...props} style={[styles[variant], style]} >{children}</Text>;
}
