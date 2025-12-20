/**
 * USAGE EXAMPLES - Global Styles
 * 
 * This file shows how to use the global styles in your components.
 * Copy these patterns into your actual component files.
 */

/*
// Example 1: Using Glass Card
import { GlassConstants, GlassStyles, Spacing } from '../styles/globalStyles';
import { BlurView } from 'expo-blur';

<BlurView
  intensity={GlassConstants.intensity}
  tint={GlassConstants.tint}
  style={[
    GlassStyles.glassCard,
    {
      backgroundColor: GlassConstants.glassBg,
      borderColor: GlassConstants.glassBorder,
      padding: Spacing.lg,
    }
  ]}
>
  <Text>Your content</Text>
</BlurView>

// Example 2: Using Glass Input
import { View, TextInput } from 'react-native';

<View style={[
  GlassStyles.glassInput,
  {
    backgroundColor: GlassConstants.inputBg,
    borderColor: GlassConstants.inputBorder,
  }
]}>
  <TextInput
    style={{ color: GlassConstants.textPrimary }}
    placeholderTextColor={GlassConstants.placeholder}
    placeholder="Enter text"
  />
</View>

// Example 3: Using Typography
import { Text } from 'react-native';

<Text style={[Typography.h2, { color: GlassConstants.textPrimary }]}>
  Title
</Text>
<Text style={[Typography.caption, { color: GlassConstants.textSecondary }]}>
  Subtitle
</Text>

// Example 4: Using in LoginScreen
// See LoginScreen.tsx for a full implementation example
*/

export { };
