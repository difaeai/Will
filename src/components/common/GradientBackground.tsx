import React from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../constants/theme';

interface Props extends ViewProps {
    children: React.ReactNode;
}

export const GradientBackground: React.FC<Props> = ({ children, style, ...props }) => {
    return (
        <LinearGradient
            colors={COLORS.gradientPrimary as any}
            style={[styles.container, style]}
            {...props}
        >
            {children}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
