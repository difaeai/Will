import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { GradientBackground } from '../../components/common/GradientBackground';
import { COLORS, SIZES, SPACING, RADIUS } from '../../constants/theme';
import { supabase } from '../../config/supabase';

const OnboardingScreen = ({ navigation }: any) => {
    const [genderPref, setGenderPref] = useState('');
    const [language, setLanguage] = useState('English');
    const [interest, setInterest] = useState<string[]>([]);

    const toggleInterest = (i: string) => {
        if (interest.includes(i)) {
            setInterest(interest.filter(x => x !== i));
        } else {
            setInterest([...interest, i]);
        }
    };

    const handleComplete = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    ai_gender_preference: genderPref,
                    language,
                    interests: interest,
                    onboarding_complete: true,
                })
                .eq('id', user.id);

            if (error) throw error;
            navigation.replace('Main');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <GradientBackground style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Welcome to Will</Text>
                <Text style={styles.subtitle}>Let's personalize your experience</Text>

                <Text style={styles.sectionTitle}>AI Psychologist Gender Preference</Text>
                <View style={styles.row}>
                    {['Male', 'Female', 'No Preference'].map(g => (
                        <TouchableOpacity
                            key={g}
                            style={[styles.chip, genderPref === g && styles.activeChip]}
                            onPress={() => setGenderPref(g)}
                        >
                            <Text style={[styles.chipText, genderPref === g && styles.activeChipText]}>{g}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Interests</Text>
                <View style={styles.wrap}>
                    {['Mental Health', 'Career', 'Relationships', 'Personal Growth', 'Stress Management'].map(i => (
                        <TouchableOpacity
                            key={i}
                            style={[styles.chip, interest.includes(i) && styles.activeChip]}
                            onPress={() => toggleInterest(i)}
                        >
                            <Text style={[styles.chipText, interest.includes(i) && styles.activeChipText]}>{i}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleComplete}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </ScrollView>
        </GradientBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: SPACING.lg,
    },
    content: {
        paddingTop: 80,
        paddingBottom: 40,
    },
    title: {
        color: COLORS.text,
        fontSize: SIZES.h1,
        fontWeight: 'bold',
    },
    subtitle: {
        color: COLORS.textSecondary,
        fontSize: SIZES.body,
        marginBottom: SPACING.xxl,
    },
    sectionTitle: {
        color: COLORS.text,
        fontSize: SIZES.h3,
        fontWeight: '600',
        marginTop: SPACING.lg,
        marginBottom: SPACING.md,
    },
    row: {
        flexDirection: 'row',
    },
    wrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    chip: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.round,
        backgroundColor: COLORS.surface,
        marginRight: SPACING.sm,
        marginBottom: SPACING.sm,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    activeChip: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    chipText: {
        color: COLORS.textSecondary,
        fontSize: 14,
    },
    activeChipText: {
        color: COLORS.text,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: SPACING.md,
        borderRadius: RADIUS.md,
        alignItems: 'center',
        marginTop: SPACING.xxl,
    },
    buttonText: {
        color: COLORS.text,
        fontSize: SIZES.body,
        fontWeight: 'bold',
    },
});

export default OnboardingScreen;
