// src/components/StainedGlassInput.tsx
import React from 'react';
import { View, TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StainedGlassTheme, StainedGlassStyles, Typography } from '../styles/globalStyles';

interface StainedGlassInputProps extends TextInputProps {
  icon?: string;
  secureTextEntry?: boolean;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  containerStyle?: any;
}

export const StainedGlassInput: React.FC<StainedGlassInputProps> = ({
  icon,
  secureTextEntry,
  showPasswordToggle,
  onTogglePassword,
  containerStyle,
  style,
  placeholderTextColor = StainedGlassTheme.colors.parchmentLight,
  ...props
}) => {
  return (
    <View style={[
      StainedGlassStyles.stainedGlassInput,
      {
        backgroundColor: StainedGlassTheme.colors.darkPurple,
        borderColor: StainedGlassTheme.colors.goldMedium,
      },
      containerStyle,
    ]}>
      {icon && (
        <Ionicons 
          name={icon as any} 
          size={20} 
          color={StainedGlassTheme.colors.goldLight} 
          style={{ marginRight: 10 }} 
        />
      )}
      
      <TextInput
        style={[
          {
            flex: 1,
            height: '100%',
            color: StainedGlassTheme.colors.parchment,
            fontSize: 15,
            fontWeight: '500',
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 3,
          },
          style,
        ]}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        {...props}
      />
      
      {showPasswordToggle && onTogglePassword && (
        <TouchableOpacity onPress={onTogglePassword}>
          <Ionicons 
            name={secureTextEntry ? "eye-outline" : "eye-off-outline"} 
            size={20} 
            color={StainedGlassTheme.colors.goldLight} 
          />
        </TouchableOpacity>
      )}
    </View>
  );
};