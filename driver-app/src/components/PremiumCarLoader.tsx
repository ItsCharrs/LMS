import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { StainedGlassTheme } from '../styles/globalStyles';

interface PremiumCarLoaderProps {
    size?: number;
    color?: string;
}

export const PremiumCarLoader: React.FC<PremiumCarLoaderProps> = ({
    color = StainedGlassTheme.colors.gold
}) => {
    // --- ANIMATION VALUES ---
    const truckX = useRef(new Animated.Value(-120)).current;
    const wheelRot = useRef(new Animated.Value(0)).current;

    // Person
    const personX = useRef(new Animated.Value(-50)).current;
    const personOpacity = useRef(new Animated.Value(0)).current;
    const legRot = useRef(new Animated.Value(0)).current; // -1 to 1 sine wave

    // Box
    const boxY = useRef(new Animated.Value(0)).current;
    const boxOpacity = useRef(new Animated.Value(1)).current;

    const runAnimation = () => {
        // Reset
        truckX.setValue(-100);
        wheelRot.setValue(0);
        personX.setValue(-50);
        personOpacity.setValue(0);
        boxY.setValue(0);
        boxOpacity.setValue(1);

        // --- SUB ANIMATIONS ---

        // Walking Cycle (Leg Swing) - Loops continuously
        const walkCycle = Animated.loop(
            Animated.sequence([
                Animated.timing(legRot, { toValue: 1, duration: 150, useNativeDriver: true }),
                Animated.timing(legRot, { toValue: -1, duration: 150, useNativeDriver: true }),
            ])
        );

        // Truck Wheel Spin
        const spinWheels = (duration: number) => Animated.timing(wheelRot, {
            toValue: 1, duration: duration, easing: Easing.linear, useNativeDriver: true
        });

        // --- MAIN SEQUENCE ---
        Animated.sequence([

            // 1. Truck Arrives (Left -> Center)
            Animated.parallel([
                Animated.timing(truckX, {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
                // Spin wheels during movement
                Animated.timing(wheelRot, {
                    toValue: 4, // 4 full rotations
                    duration: 1000,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                })
            ]),

            // 2. Person Appearance & Walk In (To Rear of Truck)
            Animated.parallel([
                Animated.timing(personOpacity, { toValue: 1, duration: 100, useNativeDriver: true }),
                Animated.timing(personX, {
                    toValue: -38, // Stop at the back (Tailgate area)
                    duration: 800,
                    easing: Easing.linear,
                    useNativeDriver: true
                }),
                // Start walking legs
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(legRot, { toValue: 1, duration: 200, useNativeDriver: true }),
                        Animated.timing(legRot, { toValue: -1, duration: 200, useNativeDriver: true }),
                    ]),
                    { iterations: 4 }
                )
            ]),

            Animated.delay(100), // Brief pause for loading

            // 3. Loading Action (Box goes INTO truck rear)
            Animated.parallel([
                Animated.timing(boxY, {
                    toValue: -5, // Lift slightly
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.timing(boxOpacity, {
                    toValue: 0,
                    duration: 200,
                    delay: 100,
                    useNativeDriver: true
                }),
                // Person leans forward slightly (simulate push)
                Animated.sequence([
                    Animated.timing(personX, { toValue: -32, duration: 300, useNativeDriver: true }),
                    Animated.timing(personX, { toValue: -38, duration: 300, useNativeDriver: true }),
                ])
            ]),

            // 4. Person Walks Away
            Animated.parallel([
                Animated.timing(personOpacity, { toValue: 0, duration: 600, useNativeDriver: true }),
                Animated.timing(personX, {
                    toValue: -60, // Walk back off screen
                    duration: 600,
                    useNativeDriver: true
                }),
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(legRot, { toValue: 1, duration: 200, useNativeDriver: true }),
                        Animated.timing(legRot, { toValue: -1, duration: 200, useNativeDriver: true }),
                    ]),
                    { iterations: 3 }
                )
            ]),

            // 5. Truck Departs (Center -> Right)
            Animated.parallel([
                Animated.timing(truckX, {
                    toValue: 100, // Move off screen right
                    duration: 800,
                    easing: Easing.in(Easing.cubic),
                    useNativeDriver: true,
                }),
                Animated.timing(wheelRot, {
                    toValue: 8, // Continue spinning
                    duration: 800,
                    easing: Easing.in(Easing.cubic),
                    useNativeDriver: true,
                })
            ]),

            Animated.delay(200),
        ]).start(() => runAnimation());
    };

    useEffect(() => {
        runAnimation();
    }, []);

    // --- INTERPOLATIONS ---
    const spin = wheelRot.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    const leftLegSwing = legRot.interpolate({
        inputRange: [-1, 1],
        outputRange: ['-30deg', '30deg']
    });

    const rightLegSwing = legRot.interpolate({
        inputRange: [-1, 1],
        outputRange: ['30deg', '-30deg']
    });


    return (
        <View style={styles.container}>

            {/* TRUCK COMPOSITE */}
            <Animated.View style={[styles.truckContainer, { transform: [{ translateX: truckX }] }]}>
                {/* Truck Body */}
                <View style={[styles.truckBody, { backgroundColor: color }]} />
                <View style={[styles.truckCabin, { backgroundColor: color }]} />

                {/* Wheels */}
                <Animated.View style={[styles.wheel, styles.wheelRear, { transform: [{ rotate: spin }] }]}>
                    <View style={styles.wheelSpoke} />
                    <View style={[styles.wheelSpoke, { transform: [{ rotate: '90deg' }] }]} />
                </Animated.View>
                <Animated.View style={[styles.wheel, styles.wheelFront, { transform: [{ rotate: spin }] }]}>
                    <View style={styles.wheelSpoke} />
                    <View style={[styles.wheelSpoke, { transform: [{ rotate: '90deg' }] }]} />
                </Animated.View>
            </Animated.View>

            {/* PERSON COMPOSITE */}
            <Animated.View style={[
                styles.personContainer,
                {
                    opacity: personOpacity,
                    transform: [{ translateX: personX }]
                }
            ]}>
                {/* Box (Held) */}
                <Animated.View style={[styles.box, { opacity: boxOpacity, transform: [{ translateY: boxY }] }]} />

                {/* Head */}
                <View style={styles.head} />

                {/* Torso */}
                <View style={styles.torso} />

                {/* Legs */}
                <Animated.View style={[styles.leg, { transform: [{ rotate: leftLegSwing }] }]} />
                <Animated.View style={[styles.leg, { transform: [{ rotate: rightLegSwing }] }]} />
            </Animated.View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 40,
        justifyContent: 'flex-end', // Ground level alignment
        alignItems: 'center',
        paddingBottom: 2,
        overflow: 'hidden',
    },
    // --- TRUCK ---
    truckContainer: {
        position: 'absolute',
        bottom: 4,
        zIndex: 2,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    truckBody: {
        width: 32,
        height: 18,
        borderTopLeftRadius: 2,
        marginRight: 1,
    },
    truckCabin: {
        width: 14,
        height: 14,
        borderTopRightRadius: 4,
    },
    wheel: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#333',
        position: 'absolute',
        bottom: -4,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#555',
    },
    wheelRear: {
        left: 4,
    },
    wheelFront: {
        right: 2,
    },
    wheelSpoke: {
        width: '80%',
        height: 1,
        backgroundColor: '#888',
        position: 'absolute',
    },

    // --- PERSON ---
    personContainer: {
        position: 'absolute',
        bottom: 4,
        zIndex: 1, // Behind truck slightly or interacts
        alignItems: 'center',
        width: 12,
        height: 24,
    },
    head: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: StainedGlassTheme.colors.parchment,
        zIndex: 2,
    },
    torso: {
        width: 8,
        height: 10,
        backgroundColor: StainedGlassTheme.colors.parchmentLight,
        borderRadius: 2,
        zIndex: 2,
        marginTop: -1,
    },
    leg: {
        width: 3,
        height: 9,
        backgroundColor: '#555',
        position: 'absolute',
        bottom: 0,
        borderRadius: 1,
        top: 14, // Hinge at hip
        transformOrigin: 'top center', // Ideally pivot at top, need anchor
    },
    box: {
        width: 10,
        height: 10,
        backgroundColor: '#FFD700', // Gold box
        borderWidth: 1,
        borderColor: '#B8860B',
        position: 'absolute',
        top: 6,
        left: 2, // Holding position
        zIndex: 3,
    }
});
