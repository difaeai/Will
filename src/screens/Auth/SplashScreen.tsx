import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';
import { GradientBackground } from '../../components/common/GradientBackground';
import { COLORS, SIZES, SPACING } from '../../constants/theme';
import { Sparkles } from 'lucide-react-native';

const SplashScreen = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 1000,
                easing: Easing.out(Easing.back(1.5)),
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    return (
        <GradientBackground>
            <View style={styles.container}>
                <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
                    <View style={styles.iconContainer}>
                        <Sparkles color={COLORS.primary} size={48} />
                    </View>
                    <Text style={styles.title}>Will</Text>
                    <Text style={styles.subtitle}>You're not alone.</Text>
                </Animated.View>
            </View>
        </GradientBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
    },
    title: {
        color: COLORS.text,
        fontSize: 48,
        fontWeight: 'bold',
        marginTop: SPACING.md,
    },
    subtitle: {
        color: COLORS.textSecondary,
        fontSize: SIZES.body,
        marginTop: SPACING.sm,
    },
    iconContainer: {
        backgroundColor: COLORS.surface,
        padding: SPACING.lg,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    }
});

export default SplashScreen;
