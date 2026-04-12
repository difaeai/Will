import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { GradientBackground } from '../../components/common/GradientBackground';
import { COLORS, SIZES, SPACING, RADIUS } from '../../constants/theme';
import { PhoneOff, Mic, MicOff, Volume2, Bot } from 'lucide-react-native';

const VoiceScreen = () => {
    const [isMuted, setIsMuted] = useState(false);
    const [pulseAnim] = useState(new Animated.Value(1));

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <GradientBackground style={styles.container}>
            <View style={styles.content}>
                <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>Call in progress...</Text>
                    <Text style={styles.timer}>04:22</Text>
                </View>

                <View style={styles.aiContainer}>
                    <Animated.View style={[styles.avatarPulse, { transform: [{ scale: pulseAnim }] }]}>
                        <View style={styles.avatar}>
                            <Bot color={COLORS.primary} size={60} />
                        </View>
                    </Animated.View>
                    <Text style={styles.aiName}>Will</Text>
                    <Text style={styles.aiSubtext}>Listening...</Text>
                </View>

                <View style={styles.controls}>
                    <TouchableOpacity
                        style={[styles.controlButton, isMuted && styles.controlButtonActive]}
                        onPress={() => setIsMuted(!isMuted)}
                    >
                        {isMuted ? <MicOff color={COLORS.text} size={28} /> : <Mic color={COLORS.text} size={28} />}
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.controlButton, styles.endCallButton]}>
                        <PhoneOff color={COLORS.text} size={28} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.controlButton}>
                        <Volume2 color={COLORS.text} size={28} />
                    </TouchableOpacity>
                </View>
            </View>
        </GradientBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: SPACING.lg,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SPACING.xxl,
    },
    statusContainer: {
        alignItems: 'center',
    },
    statusText: {
        color: COLORS.textSecondary,
        fontSize: SIZES.body,
    },
    timer: {
        color: COLORS.text,
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        marginTop: SPACING.sm,
    },
    aiContainer: {
        alignItems: 'center',
    },
    avatarPulse: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: 'rgba(108, 99, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    aiName: {
        color: COLORS.text,
        fontSize: SIZES.h2,
        fontWeight: 'bold',
    },
    aiSubtext: {
        color: COLORS.primary,
        fontSize: SIZES.body,
        marginTop: SPACING.xs,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
    },
    controlButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
    controlButtonActive: {
        backgroundColor: COLORS.error,
    },
    endCallButton: {
        backgroundColor: COLORS.error,
        width: 72,
        height: 72,
        borderRadius: 36,
    },
});

export default VoiceScreen;
