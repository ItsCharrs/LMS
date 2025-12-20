// src/context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'light' | 'dark';

const THEME_STORAGE_KEY = 'user_theme_preference';

interface ThemeColors {
    background: string;
    card: string;
    text: string;
    subtext: string;
    primary: string;
    success: string;
    warning: string;
    error: string;
    border: string;
    accent: string;
    glass: string; // For glassmorphism overlays
    tabBar: string;
}

export interface Theme {
    mode: ThemeMode;
    colors: ThemeColors;
    isDark: boolean;
}

// 🌑 Midnight Theme (Premium Dark)
const darkColors: ThemeColors = {
    background: '#121417', // Deep Charcoal (Softer than #0F172A)
    card: '#1E2228',       // Soft Dark Grey
    text: '#F3F4F6',       // Gray 100
    subtext: '#9CA3AF',    // Gray 400
    primary: '#4F46E5',    // Indigo 600 (Premium Purple-Blue)
    success: '#10B981',    // Emerald 500
    warning: '#F59E0B',    // Amber 500
    error: '#EF4444',      // Red 500
    border: '#2D333B',     // Subtle border
    accent: '#6366F1',     // Indigo 500
    glass: 'rgba(30, 34, 40, 0.85)', // Dark Glass
    tabBar: 'rgba(30, 34, 40, 0.95)',
};

// 🌞 Light Theme (Clean & Airy)
const lightColors: ThemeColors = {
    background: '#F8FAFC', // Slate 50
    card: '#FFFFFF',       // White
    text: '#0F172A',       // Slate 900
    subtext: '#64748B',    // Slate 500
    primary: '#3B82F6',    // Blue 500
    success: '#10B981',    // Emerald 500
    warning: '#F59E0B',    // Amber 500
    error: '#EF4444',      // Red 500
    border: '#E2E8F0',     // Slate 200
    accent: '#60A5FA',     // Blue 400
    glass: 'rgba(255, 255, 255, 0.9)', // Light Glass
    tabBar: '#FFFFFF',
};

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const systemScheme = useColorScheme();
    const [mode, setMode] = useState<ThemeMode>('dark'); // Default to Dark initially

    // Load saved theme on mount
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
                if (savedTheme === 'light' || savedTheme === 'dark') {
                    setMode(savedTheme);
                } else if (systemScheme) {
                    // Optional: Fallback to system if no preference
                    // setMode(systemScheme);
                }
            } catch (error) {
                console.error('Failed to load theme:', error);
            }
        };
        loadTheme();
    }, []);

    const saveTheme = async (newMode: ThemeMode) => {
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, newMode);
        } catch (error) {
            console.error('Failed to save theme:', error);
        }
    };

    const toggleTheme = () => {
        setMode(prev => {
            const newMode = prev === 'dark' ? 'light' : 'dark';
            saveTheme(newMode);
            return newMode;
        });
    };

    const setTheme = (newMode: ThemeMode) => {
        setMode(newMode);
        saveTheme(newMode);
    };

    const theme: Theme = {
        mode,
        colors: mode === 'dark' ? darkColors : lightColors,
        isDark: mode === 'dark',
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
