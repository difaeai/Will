import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import { GradientBackground } from '../../components/common/GradientBackground';
import { COLORS, SIZES, SPACING, RADIUS } from '../../constants/theme';
import { Mic, MessageCircle, PhoneCall, Smile, Meh, Frown, Sparkles } from 'lucide-react-native';

const HomeScreen = ({ navigation }: any) => {
    const [mood, setMood] = useState<string | null>(null);

    const requestCall = () => {
        Alert.alert("AI Call Requested", "Will will call you in 5-10 minutes for a check-in.");
    };

    const moods = [
        { icon: <Smile color={mood === 'Great' ? COLORS.text : COLORS.success} />, label: 'Great' },
        { icon: <Meh color={mood === 'Okay' ? COLORS.text : COLORS.warning} />, label: 'Okay' },
        { icon: <Frown color={mood === 'Bad' ? COLORS.text : COLORS.error} />, label: 'Bad' },
    ];

    return (
        <GradientBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.greeting}>Good Evening,</Text>
                    <Text style={styles.title}>Will</Text>
                    <Text style={styles.tagline}>"You're not alone."</Text>
                </View>

                <View style={styles.moodCard}>
                    <Text style={styles.cardLabel}>How are you feeling?</Text>
                    <View style={styles.moodRow}>
                        {moods.map((m) => (
                            <TouchableOpacity
                                key={m.label}
                                style={[styles.moodBtn, mood === m.label && styles.moodBtnActive]}
                                onPress={() => setMood(m.label)}
                            >
                                {m.icon}
                                <Text style={[styles.moodLabel, mood === m.label && styles.moodLabelActive]}>{m.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.actionGrid}>
                    <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Chat')}>
                        <MessageCircle color={COLORS.primary} size={32} />
                        <Text style={styles.actionText}>Chat AI</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Voice')}>
                        <Mic color={COLORS.primary} size={32} />
                        <Text style={styles.actionText}>Voice Call</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.callRequestBtn} onPress={requestCall}>
                    <PhoneCall color={COLORS.text} size={24} />
                    <View style={styles.callRequestTextCont}>
                        <Text style={styles.callRequestTitle}>Request AI Call</Text>
                        <Text style={styles.callRequestSub}>Will will reach out to you</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.tipCard}>
                    <Sparkles color={COLORS.accent} size={20} />
                    <Text style={styles.tipText}>Tip of the day: Take 5 deep breaths before starting a hard task.</Text>
                </View>
            </ScrollView>
        </GradientBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: SPACING.lg,
        paddingTop: 80,
    },
    header: {
        marginBottom: SPACING.xl,
    },
    greeting: {
        color: COLORS.textSecondary,
        fontSize: SIZES.body,
    },
    title: {
        fontSize: 40,
        color: COLORS.text,
        fontWeight: 'bold',
    },
    tagline: {
        fontSize: SIZES.body,
        color: COLORS.textSecondary,
    },
    moodCard: {
        backgroundColor: COLORS.surface,
        padding: SPACING.md,
        borderRadius: RADIUS.lg,
        marginBottom: SPACING.lg,
    },
    cardLabel: {
        color: COLORS.text,
        fontSize: SIZES.body,
        fontWeight: '600',
        marginBottom: SPACING.md,
    },
    moodRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    moodBtn: {
        alignItems: 'center',
        flex: 1,
        padding: SPACING.sm,
        borderRadius: RADIUS.md,
    },
    moodBtnActive: {
        backgroundColor: COLORS.primary,
    },
    moodLabel: {
        color: COLORS.textSecondary,
        fontSize: 12,
        marginTop: 4,
    },
    moodLabelActive: {
        color: COLORS.text,
        fontWeight: 'bold',
    },
    actionGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.lg,
    },
    actionCard: {
        backgroundColor: COLORS.surface,
        width: '48%',
        padding: SPACING.lg,
        borderRadius: RADIUS.lg,
        alignItems: 'center',
    },
    actionText: {
        color: COLORS.text,
        marginTop: SPACING.sm,
        fontWeight: 'bold',
    },
    callRequestBtn: {
        backgroundColor: COLORS.surface,
        padding: SPACING.md,
        borderRadius: RADIUS.lg,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        marginBottom: SPACING.lg,
    },
    callRequestTextCont: {
        marginLeft: SPACING.md,
    },
    callRequestTitle: {
        color: COLORS.text,
        fontSize: SIZES.body,
        fontWeight: 'bold',
    },
    callRequestSub: {
        color: COLORS.textSecondary,
        fontSize: 12,
    },
    tipCard: {
        backgroundColor: 'rgba(238, 108, 77, 0.1)',
        padding: SPACING.md,
        borderRadius: RADIUS.md,
        flexDirection: 'row',
        alignItems: 'center',
    },
    tipText: {
        color: COLORS.text,
        fontSize: 12,
        flex: 1,
        marginLeft: SPACING.sm,
    },
});

export default HomeScreen;
