import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { GradientBackground } from '../../components/common/GradientBackground';
import { COLORS, SIZES, SPACING, RADIUS } from '../../constants/theme';
import { Briefcase, GraduationCap, TrendingUp, Lightbulb } from 'lucide-react-native';

const CareerCounselingScreen = () => {
    const options = [
        { title: 'Student Guidance', icon: <GraduationCap color={COLORS.primary} size={32} />, desc: 'Pathways for students' },
        { title: 'Career Shift', icon: <Briefcase color={COLORS.primary} size={32} />, desc: 'Support for changing careers' },
        { title: 'Skill Development', icon: <Lightbulb color={COLORS.primary} size={32} />, desc: 'What to learn next' },
        { title: 'Market Trends', icon: <TrendingUp color={COLORS.primary} size={32} />, desc: 'Stay ahead of the curve' },
    ];

    return (
        <GradientBackground style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Career Counseling</Text>
                <Text style={styles.subtitle}>AI-powered professional guidance</Text>

                <View style={styles.grid}>
                    {options.map((opt, idx) => (
                        <TouchableOpacity key={idx} style={styles.card}>
                            {opt.icon}
                            <Text style={styles.cardTitle}>{opt.title}</Text>
                            <Text style={styles.cardDesc}>{opt.desc}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.mainAction}>
                    <Text style={styles.mainActionText}>Start Career Session</Text>
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
        paddingTop: 60,
    },
    title: {
        color: COLORS.text,
        fontSize: SIZES.h1,
        fontWeight: 'bold',
    },
    subtitle: {
        color: COLORS.textSecondary,
        fontSize: SIZES.body,
        marginBottom: SPACING.xl,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: COLORS.surface,
        padding: SPACING.md,
        borderRadius: RADIUS.lg,
        width: '48%',
        marginBottom: SPACING.md,
        alignItems: 'center',
    },
    cardTitle: {
        color: COLORS.text,
        fontSize: SIZES.body,
        fontWeight: 'bold',
        marginTop: SPACING.sm,
        textAlign: 'center',
    },
    cardDesc: {
        color: COLORS.textSecondary,
        fontSize: 12,
        textAlign: 'center',
        marginTop: SPACING.xs,
    },
    mainAction: {
        backgroundColor: COLORS.primary,
        padding: SPACING.md,
        borderRadius: RADIUS.md,
        alignItems: 'center',
        marginTop: SPACING.lg,
    },
    mainActionText: {
        color: COLORS.text,
        fontSize: SIZES.body,
        fontWeight: 'bold',
    },
});

export default CareerCounselingScreen;
