import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { GradientBackground } from '../../components/common/GradientBackground';
import { COLORS, SIZES, SPACING, RADIUS } from '../../constants/theme';
import { Check } from 'lucide-react-native';

const SubscriptionScreen = () => {
    const plans = [
        { title: 'Free', price: '$0', features: ['Daily 10 messages', 'Standard AI agent', 'Community access'] },
        { title: 'Premium', price: '$19.99/mo', features: ['Unlimited messages', 'Real-time voice calls', 'Dedicated career coach', 'Proactive AI calls'], featured: true },
        { title: 'Pro', price: '$49.99/mo', features: ['All Premium features', 'Human expert matching', 'Priority booking', 'Personalized mental health plan'] },
    ];

    return (
        <GradientBackground style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Simple Pricing</Text>
                <Text style={styles.subtitle}>Choose the plan that's right for your journey</Text>

                {plans.map((plan, idx) => (
                    <View key={idx} style={[styles.card, plan.featured && styles.featuredCard]}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>{plan.title}</Text>
                            <Text style={styles.cardPrice}>{plan.price}</Text>
                        </View>
                        <View style={styles.features}>
                            {plan.features.map((f, i) => (
                                <View key={i} style={styles.featureRow}>
                                    <Check color={COLORS.primary} size={16} />
                                    <Text style={styles.featureText}>{f}</Text>
                                </View>
                            ))}
                        </View>
                        <TouchableOpacity style={[styles.button, plan.featured && styles.featuredButton]}>
                            <Text style={styles.buttonText}>Select Plan</Text>
                        </TouchableOpacity>
                    </View>
                ))}
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
        paddingBottom: 40,
    },
    title: {
        color: COLORS.text,
        fontSize: SIZES.h1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        color: COLORS.textSecondary,
        fontSize: SIZES.body,
        textAlign: 'center',
        marginBottom: SPACING.xxl,
    },
    card: {
        backgroundColor: COLORS.surface,
        padding: SPACING.lg,
        borderRadius: RADIUS.lg,
        marginBottom: SPACING.lg,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    featuredCard: {
        borderColor: COLORS.primary,
        borderWidth: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    cardTitle: {
        color: COLORS.text,
        fontSize: SIZES.h2,
        fontWeight: 'bold',
    },
    cardPrice: {
        color: COLORS.primary,
        fontSize: SIZES.h3,
        fontWeight: 'bold',
    },
    features: {
        marginBottom: SPACING.xl,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    featureText: {
        color: COLORS.textSecondary,
        fontSize: 14,
        marginLeft: SPACING.sm,
    },
    button: {
        backgroundColor: COLORS.background,
        padding: SPACING.md,
        borderRadius: RADIUS.md,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    featuredButton: {
        backgroundColor: COLORS.primary,
    },
    buttonText: {
        color: COLORS.text,
        fontSize: SIZES.body,
        fontWeight: 'bold',
    },
});

export default SubscriptionScreen;
