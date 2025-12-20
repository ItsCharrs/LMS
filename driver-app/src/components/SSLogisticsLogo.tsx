// src/components/SSLogisticsLogo.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StainedGlassTheme, BorderRadius } from '../styles/globalStyles';

interface SSLogisticsLogoProps {
    size?: 'small' | 'medium' | 'large';
    variant?: 'icon' | 'full' | 'badge';
    showTagline?: boolean;
}

export const SSLogisticsLogo: React.FC<SSLogisticsLogoProps> = ({
    size = 'medium',
    variant = 'badge',
    showTagline = false,
}) => {
    const sizes = {
        small: { container: 72, fontSize: 16, iconSize: 32 },
        medium: { container: 104, fontSize: 20, iconSize: 40 },
        large: { container: 136, fontSize: 26, iconSize: 52 },
    };

    const currentSize = sizes[size];

    const LogoIcon = () => (
        <View style={[styles.logoIconContainer, { width: currentSize.container, height: currentSize.container }]}>
            {/* Outer gold ring with shimmer */}
            <View style={[styles.outerRing, { width: currentSize.container, height: currentSize.container }]}>
                <LinearGradient
                    colors={[
                        StainedGlassTheme.colors.gold,
                        StainedGlassTheme.colors.goldLight,
                        StainedGlassTheme.colors.gold,
                    ] as any}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.ringGradient}
                />
            </View>

            {/* Shield background with depth */}
            <LinearGradient
                colors={['#3A2B6E', '#2A1B5E', '#1A0B4E', '#0A003E'] as any}
                style={[styles.logoShield, { width: currentSize.container * 0.82, height: currentSize.container * 0.82 }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {/* Inner shadow/depth */}
                <View style={styles.innerShadow} />

                {/* S&S Monogram with metallic effect */}
                <View style={[styles.monogramContainer, { marginTop: -currentSize.container * 0.08 }]}>
                    <Text style={[styles.monogramS, { fontSize: currentSize.iconSize * 0.75 }]}>S</Text>
                    <Text style={[styles.monogramAmpersand, { fontSize: currentSize.iconSize * 0.42 }]}>&</Text>
                    <Text style={[styles.monogramS, { fontSize: currentSize.iconSize * 0.75 }]}>S</Text>
                </View>

                {/* Decorative underline */}
                <View style={[styles.decorativeLine, { width: currentSize.container * 0.4, marginTop: currentSize.container * 0.02 }]} />

                {/* Logistics text with better positioning */}
                <View style={[styles.logisticsTextContainer, { bottom: currentSize.container * 0.14 }]}>
                    <Text style={[styles.logisticsText, { fontSize: currentSize.fontSize * 0.52 }]}>LOGISTICS</Text>
                </View>
            </LinearGradient>
        </View>
    );

    const LogoFull = () => (
        <View style={styles.fullLogoContainer}>
            <LogoIcon />

            <View style={styles.textContainer}>
                <Text style={[styles.companyName, { fontSize: currentSize.fontSize * 1.1 }]}>
                    S&S LOGISTICS
                </Text>
                {showTagline && (
                    <Text style={[styles.tagline, { fontSize: currentSize.fontSize * 0.58 }]}>
                        Premium Transport Solutions
                    </Text>
                )}
            </View>
        </View>
    );

    const LogoBadge = () => (
        <View style={[styles.badgeContainer, { width: currentSize.container, height: currentSize.container }]}>
            {/* Outer decorative ring */}
            <View style={[styles.badgeRing, { width: currentSize.container, height: currentSize.container }]}>
                <LinearGradient
                    colors={[
                        StainedGlassTheme.colors.gold,
                        StainedGlassTheme.colors.goldMedium,
                        StainedGlassTheme.colors.gold,
                    ] as any}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.badgeRingGradient}
                />
            </View>

            {/* Badge background with rich gradient */}
            <LinearGradient
                colors={['#5A4B9C', '#4A3B8C', '#3A2B7C', '#2A1B6C', '#1A0B5C'] as any}
                style={[styles.badgeBackground, { width: currentSize.container * 0.88, height: currentSize.container * 0.88 }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {/* Inner glow */}
                <View style={styles.badgeGlow} />

                {/* Badge content */}
                <View style={styles.badgeShield}>
                    <Text style={[styles.badgeText, { fontSize: currentSize.fontSize * 0.85 }]}>
                        S&S
                    </Text>

                    {/* Gold divider with shimmer */}
                    <LinearGradient
                        colors={[
                            StainedGlassTheme.colors.gold,
                            StainedGlassTheme.colors.goldLight,
                            StainedGlassTheme.colors.gold,
                        ] as any}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={[styles.badgeDivider, { width: currentSize.container * 0.5 }]}
                    />

                    <Text style={[styles.badgeSubtext, { fontSize: currentSize.fontSize * 0.52 }]}>
                        LOGISTICS
                    </Text>
                </View>
            </LinearGradient>
        </View>
    );

    switch (variant) {
        case 'icon':
            return <LogoIcon />;
        case 'badge':
            return <LogoBadge />;
        case 'full':
        default:
            return <LogoFull />;
    }
};

const styles = StyleSheet.create({
    // Icon Logo Styles
    logoIconContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    outerRing: {
        position: 'absolute',
        borderRadius: 9999,
        overflow: 'hidden',
        padding: 2,
    },
    ringGradient: {
        flex: 1,
        borderRadius: 9999,
        borderWidth: 0,
    },
    logoShield: {
        borderRadius: BorderRadius.lg,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 12,
    },
    innerShadow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: BorderRadius.lg,
    },
    monogramContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        zIndex: 1,
    },
    monogramS: {
        color: StainedGlassTheme.colors.gold,
        fontWeight: '900',
        fontFamily: 'System',
        textShadowColor: 'rgba(255, 215, 0, 0.4)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 8,
        letterSpacing: 1.5,
    },
    monogramAmpersand: {
        color: StainedGlassTheme.colors.parchment,
        fontWeight: '200',
        fontStyle: 'italic',
        marginTop: -6,
        textShadowColor: 'rgba(248, 243, 230, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    decorativeLine: {
        height: 2,
        backgroundColor: StainedGlassTheme.colors.goldMedium,
        marginVertical: 4,
        borderRadius: 1,
        shadowColor: StainedGlassTheme.colors.gold,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
    },
    logisticsTextContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    logisticsText: {
        color: StainedGlassTheme.colors.parchmentLight,
        fontWeight: '700',
        letterSpacing: 2.5,
        textTransform: 'uppercase',
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },

    // Full Logo Styles
    fullLogoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18,
    },
    textContainer: {
        justifyContent: 'center',
    },
    companyName: {
        color: StainedGlassTheme.colors.parchment,
        fontWeight: '900',
        letterSpacing: 3,
        textTransform: 'uppercase',
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 6,
    },
    tagline: {
        color: StainedGlassTheme.colors.goldLight,
        fontWeight: '400',
        letterSpacing: 0.8,
        marginTop: 4,
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },

    // Badge Logo Styles
    badgeContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeRing: {
        position: 'absolute',
        borderRadius: 9999,
        overflow: 'hidden',
        padding: 2,
    },
    badgeRingGradient: {
        flex: 1,
        borderRadius: 9999,
    },
    badgeBackground: {
        borderRadius: BorderRadius.lg,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 12,
        overflow: 'hidden',
    },
    badgeGlow: {
        position: 'absolute',
        top: '10%',
        left: '10%',
        right: '10%',
        height: '30%',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 9999,
        transform: [{ scaleX: 1.2 }],
    },
    badgeShield: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    badgeText: {
        color: StainedGlassTheme.colors.gold,
        fontWeight: '900',
        letterSpacing: 2,
        textShadowColor: 'rgba(255, 215, 0, 0.5)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 8,
    },
    badgeDivider: {
        height: 3,
        borderRadius: 1.5,
        marginVertical: 8,
        shadowColor: StainedGlassTheme.colors.gold,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 6,
    },
    badgeSubtext: {
        color: StainedGlassTheme.colors.parchmentLight,
        fontWeight: '700',
        letterSpacing: 2,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
});

export default SSLogisticsLogo;