// src/components/ScreenBackground.tsx
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface ScreenBackgroundProps {
    children?: React.ReactNode;
}

export const ScreenBackground: React.FC<ScreenBackgroundProps> = ({ children }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#1A0B4E', '#2D1B69', '#1A0B4E']}
                locations={[0, 0.5, 1]}
                style={styles.gradient}
            />

            {/* Decorative orbs for depth */}
            <View style={styles.backgroundGradient}>
                <View style={[styles.orb, styles.orbTop]} />
                <View style={[styles.orb, styles.orbMiddle]} />
                <View style={[styles.orb, styles.orbBottom]} />
            </View>

            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A0B4E',
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    backgroundGradient: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },
    orb: {
        position: 'absolute',
        borderRadius: 1000,
        opacity: 0.15,
    },
    orbTop: {
        top: -width * 0.4,
        left: -width * 0.2,
        width: width * 1.2,
        height: width * 1.2,
        backgroundColor: '#FFB347', // Gold/Orange
    },
    orbMiddle: {
        top: height * 0.35,
        right: -width * 0.3,
        width: width * 0.9,
        height: width * 0.9,
        backgroundColor: '#9D5CFF', // Purple
    },
    orbBottom: {
        bottom: -width * 0.3,
        left: -width * 0.25,
        width: width * 1.1,
        height: width * 1.1,
        backgroundColor: '#4A90E2', // Blue
    },
});