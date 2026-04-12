import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { GradientBackground } from '../../components/common/GradientBackground';
import { COLORS, SIZES, SPACING, RADIUS } from '../../constants/theme';
import { Users, BarChart3, Settings, ShieldAlert } from 'lucide-react-native';

const AdminScreen = () => {
    const stats = [
        { label: 'Total Users', value: '1,234', icon: <Users color={COLORS.primary} size={24} /> },
        { label: 'Active Subs', value: '456', icon: <BarChart3 color={COLORS.success} size={24} /> },
        { label: 'Pending Experts', value: '12', icon: <ShieldAlert color={COLORS.warning} size={24} /> },
    ];

    return (
        <GradientBackground style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Admin Panel</Text>
                <Text style={styles.subtitle}>Manage Will Platform</Text>

                <View style={styles.statsGrid}>
                    {stats.map((s, i) => (
                        <View key={i} style={styles.statCard}>
                            {s.icon}
                            <Text style={styles.statValue}>{s.value}</Text>
                            <Text style={styles.statLabel}>{s.label}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.actionBtn}>
                        <Text style={styles.actionBtnText}>Moderate Community Posts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn}>
                        <Text style={styles.actionBtnText}>Manage Subscription Pricing</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn}>
                        <Text style={styles.actionBtnText}>Approve Service Providers</Text>
                    </TouchableOpacity>
                </View>
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
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.xl,
    },
    statCard: {
        backgroundColor: COLORS.surface,
        padding: SPACING.md,
        borderRadius: RADIUS.lg,
        width: '31%',
        alignItems: 'center',
    },
    statValue: {
        color: COLORS.text,
        fontSize: SIZES.body,
        fontWeight: 'bold',
        marginTop: SPACING.sm,
    },
    statLabel: {
        color: COLORS.textSecondary,
        fontSize: 10,
        textAlign: 'center',
    },
    actions: {
        marginTop: SPACING.md,
    },
    actionBtn: {
        backgroundColor: COLORS.surface,
        padding: SPACING.md,
        borderRadius: RADIUS.md,
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    actionBtnText: {
        color: COLORS.text,
        fontSize: SIZES.body,
        fontWeight: '600',
    },
});

export default AdminScreen;
