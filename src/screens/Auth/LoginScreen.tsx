import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { GradientBackground } from '../../components/common/GradientBackground';
import { COLORS, SIZES, SPACING, RADIUS } from '../../constants/theme';
import { supabase } from '../../config/supabase';

const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleAuth = async () => {
        if (!email || !password) return;
        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
            } else {
                const { data: { user }, error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                if (user) {
                    await supabase.from('profiles').insert({
                        id: user.id,
                        email,
                        subscription_status: 'free',
                    });
                }
                navigation.navigate('Onboarding');
            }
        } catch (error: any) {
            Alert.alert("Auth Error", error.message);
        }
    };

    return (
        <GradientBackground style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Will</Text>
                <Text style={styles.subtitle}>{isLogin ? 'Welcome back' : 'Join our community'}</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={COLORS.textSecondary}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={COLORS.textSecondary}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={handleAuth}>
                    <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                    <Text style={styles.switchText}>
                        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                    </Text>
                </TouchableOpacity>
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
        justifyContent: 'center',
    },
    title: {
        color: COLORS.text,
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: SPACING.xs,
    },
    subtitle: {
        color: COLORS.textSecondary,
        fontSize: SIZES.body,
        textAlign: 'center',
        marginBottom: SPACING.xxl,
    },
    input: {
        backgroundColor: COLORS.surface,
        color: COLORS.text,
        borderRadius: RADIUS.md,
        padding: SPACING.md,
        marginBottom: SPACING.md,
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: SPACING.md,
        borderRadius: RADIUS.md,
        alignItems: 'center',
        marginTop: SPACING.md,
    },
    buttonText: {
        color: COLORS.text,
        fontSize: SIZES.body,
        fontWeight: 'bold',
    },
    switchText: {
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginTop: SPACING.lg,
    },
});

export default LoginScreen;
