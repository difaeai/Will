import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import { GradientBackground } from '../../components/common/GradientBackground';
import { COLORS, SIZES, SPACING, RADIUS } from '../../constants/theme';
import { User, Settings, LogOut, CreditCard, Shield } from 'lucide-react-native';
import { supabase } from '../../config/supabase';
import { useAuth } from '../../context/AuthContext';

const ProfileScreen = ({ navigation }: any) => {
    const { userData, user } = useAuth();

    const handleSignOut = () => {
        supabase.auth.signOut();
    };

    return (
        <GradientBackground style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <User color={COLORS.primary} size={40} />
                </View>
                <Text style={styles.email}>{auth.currentUser?.email}</Text>
                <View style={styles.planBadge}>
                    <Text style={styles.planText}>{userData?.subscriptionStatus?.toUpperCase() || 'FREE'}</Text>
                </View>
            </View>

            <View style={styles.menu}>
                <TouchableOpacity style={styles.menuItem}>
                    <Settings color={COLORS.textSecondary} size={20} />
                    <Text style={styles.menuText}>Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Subscription')}>
                    <CreditCard color={COLORS.textSecondary} size={20} />
                    <Text style={styles.menuText}>Manage Subscription</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Shield color={COLORS.textSecondary} size={20} />
                    <Text style={styles.menuText}>Privacy & Security</Text>
                </TouchableOpacity>

                {userData?.role === 'admin' && (
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Admin')}>
                        <Shield color={COLORS.accent} size={20} />
                        <Text style={[styles.menuText, { color: COLORS.accent }]}>Admin Panel</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.logoutBtn} onPress={handleSignOut}>
                    <LogOut color={COLORS.error} size={20} />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </GradientBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: SPACING.lg,
    },
    header: {
        alignItems: 'center',
        marginTop: 80,
        marginBottom: SPACING.xxl,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    email: {
        color: COLORS.text,
        fontSize: SIZES.h3,
        fontWeight: 'bold',
    },
    planBadge: {
        backgroundColor: 'rgba(108, 99, 255, 0.1)',
        paddingHorizontal: SPACING.md,
        paddingVertical: 4,
        borderRadius: RADIUS.sm,
        marginTop: SPACING.sm,
    },
    planText: {
        color: COLORS.primary,
        fontSize: 10,
        fontWeight: 'bold',
    },
    menu: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.lg,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    menuText: {
        color: COLORS.text,
        fontSize: SIZES.body,
        marginLeft: SPACING.md,
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.md,
    },
    logoutText: {
        color: COLORS.error,
        fontSize: SIZES.body,
        fontWeight: 'bold',
        marginLeft: SPACING.md,
    },
});

export default ProfileScreen;
