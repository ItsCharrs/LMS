// src/styles/globalStyles.ts
import { StyleSheet } from 'react-native';

/**
 * STAINED GLASS THEME - Church window aesthetic
 */
export const StainedGlassTheme = {
  // Base Colors
  colors: {
    // Stained glass base colors
    deepPurple: 'rgba(41, 37, 66, 0.85)',
    darkPurple: 'rgba(28, 25, 48, 0.6)',
    amethyst: 'rgba(106, 81, 163, 0.4)',
    sapphire: 'rgba(67, 97, 238, 0.3)',
    ruby: 'rgba(233, 30, 99, 0.2)',

    // Gold accents (lead lines)
    gold: '#FFD166',
    goldLight: 'rgba(255, 223, 186, 0.8)',
    goldMedium: 'rgba(255, 223, 186, 0.4)',
    goldDark: 'rgba(255, 223, 186, 0.3)',
    goldVeryLight: 'rgba(255, 223, 186, 0.15)',

    // Text colors
    parchment: '#FFFFFF', // Pure white for maximum visibility
    parchmentLight: 'rgba(255, 255, 255, 0.9)', // Brighter secondary text

    // Button gradients
    buttonGradient: ['#4A3B8C', '#2A1B5E', '#1A0B4E'] as const,
  },

  // Glass Settings
  glass: {
    tint: 'dark' as const,
    intensity: 40,
    borderWidth: 2,
  },
};

/**
 * Reusable Stained Glass Components
 */
export const StainedGlassStyles = StyleSheet.create({
  // Main Stained Glass Card
  stainedGlassCard: {
    borderRadius: 24,
    borderWidth: 2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
    position: 'relative',
  },

  // Stained Glass Panel (for sections)
  stainedGlassPanel: {
    borderRadius: 16,
    borderWidth: 1.5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    position: 'relative',
  },

  // Stained Glass Input
  stainedGlassInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1.5,
  },

  // Stained Glass Button
  stainedGlassButton: {
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
  },

  // Stained Glass Badge/Icon Container
  stainedGlassBadge: {
    borderRadius: 9999,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Stained Glass Overlay (for decorative elements)
  glassOverlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    zIndex: 0,
  },

  // Glass Accent Shapes (circles, etc.)
  glassAccent: {
    position: 'absolute',
    opacity: 0.6,
  },
});

/**
 * Common Glassmorphism Style Constants
 */
export const GlassConstants = {
  // Glass Material Properties
  tint: 'light' as const,
  intensity: 80,

  // Glass Background Colors
  glassBg: 'rgba(255, 255, 255, 0.15)',
  glassBgLight: 'rgba(255, 255, 255, 0.1)',
  glassBgMedium: 'rgba(255, 255, 255, 0.15)',
  glassBgHeavy: 'rgba(255, 255, 255, 0.25)',

  // Glass Borders
  glassBorder: 'rgba(255, 255, 255, 0.25)',
  glassBorderLight: 'rgba(255, 255, 255, 0.18)',
  glassBorderHeavy: 'rgba(255, 255, 255, 0.35)',

  // Input Backgrounds
  inputBg: 'rgba(255, 255, 255, 0.12)',
  inputBorder: 'rgba(255, 255, 255, 0.25)',

  // Text Colors (for dark glass backgrounds)
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textTertiary: 'rgba(255, 255, 255, 0.6)',
  placeholder: 'rgba(255, 255, 255, 0.6)',
};

/**
 * Common Glassmorphism Styles
 */
export const GlassStyles = StyleSheet.create({
  // Glass Card (main container)
  glassCard: {
    borderRadius: 24,
    borderWidth: 1.5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 15,
  },

  // Glass Card - Compact variant
  glassCardCompact: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },

  // Glass Input Field
  glassInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
  },

  // Glass Button
  glassButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
  },

  // Glass Section/Panel
  glassPanel: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    marginVertical: 8,
  },
});

/**
 * Common Spacing
 */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

/**
 * Common Border Radius
 */
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

/**
 * Typography Styles
 */
export const Typography = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 24,
    fontWeight: '700',
  },
  h4: {
    fontSize: 20,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: '500',
  },
  bodySemibold: {
    fontSize: 16,
    fontWeight: '600',
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
  },
  captionMedium: {
    fontSize: 14,
    fontWeight: '500',
  },
  small: {
    fontSize: 12,
    fontWeight: '400',
  },
  smallMedium: {
    fontSize: 12,
    fontWeight: '500',
  },
});

/**
 * Common Shadows
 */
export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
};

// Export as default object as well for convenience
export default {
  StainedGlassTheme,
  StainedGlassStyles,
  GlassConstants,
  GlassStyles,
  Spacing,
  BorderRadius,
  Typography,
  Shadows,
};