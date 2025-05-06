import React, {ReactNode, useState} from 'react';
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {styles} from './style';

interface InputRootProps extends ViewProps {
  children:
    | React.ReactElement<InputLabelProps | InputProps | InputErrorMessageProps>
    | React.ReactElement<
        InputLabelProps | InputProps | InputErrorMessageProps
      >[];
  isError?: boolean;
}

function InputRoot({children, isError, style, ...props}: InputRootProps) {
  return (
    <View {...props} style={style}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {isError});
        }
        return child;
      })}
    </View>
  );
}

interface InputLabelProps {
  children: ReactNode;
  required?: boolean;
  style?: any;
  isError?: boolean;
}

function InputLabel({children, required, isError, style}: InputLabelProps) {
  return (
    <Text style={[styles.label, isError && {color: '#E7000B'}, style]}>
      {children}
      {required && <Text style={[styles.label, styles.required]}> *</Text>}
    </Text>
  );
}

interface InputProps extends TextInputProps {
  isError?: boolean;
}

function CustomInput({style, isError,...props}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      {...props}
      placeholderTextColor={isError ? '#E7000B' : '#A1A1A1'}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={[
        styles.input,
        isError && {borderColor: '#E7000B'},
        isFocused && {borderColor: '#D4D4D4'},
        style,
      ]}
    />
  );
}

interface InputErrorMessageProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  isError?: boolean;
}

function InputErrorMessage({children, style, isError}: InputErrorMessageProps) {
  return (
    <View style={style}>
      {isError && <Text style={[styles.label, styles.error]}>{children}</Text>}
    </View>
  );
}

export const Input = {
  Root: InputRoot,
  Label: InputLabel,
  Input: CustomInput,
  ErrorMessage: InputErrorMessage,
};
