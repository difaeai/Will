import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/Main/HomeScreen';
import ChatScreen from '../screens/Main/ChatScreen';
import CommunityScreen from '../screens/Main/CommunityScreen';
import VoiceScreen from '../screens/Main/VoiceScreen';
import MarketplaceScreen from '../screens/Main/MarketplaceScreen';
import ProfileScreen from '../screens/Main/ProfileScreen';
import SubscriptionScreen from '../screens/Main/SubscriptionScreen';
import AdminScreen from '../screens/Main/AdminScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import OnboardingScreen from '../screens/Auth/OnboardingScreen';
import { COLORS } from '../constants/theme';
import { Home, MessageCircle, Mic, Users, ShoppingBag, User } from 'lucide-react-native';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { View } from 'react-native';
import SplashScreen from '../screens/Auth/SplashScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: COLORS.background,
                    borderTopColor: COLORS.surface,
                    paddingBottom: 5,
                    height: 60,
                },
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textSecondary,
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <MessageCircle color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Community"
                component={CommunityScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Experts"
                component={MarketplaceScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <ShoppingBag color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
                }}
            />
        </Tab.Navigator>
    );
};

const NavigationContent = () => {
    const { user, loading, userData } = useAuth();

    if (loading) {
        return <SplashScreen />;
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!user ? (
                <Stack.Screen name="Login" component={LoginScreen} />
            ) : !userData?.onboarding_complete ? (
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            ) : (
                <>
                    <Stack.Screen name="Main" component={MainTabs} />
                    <Stack.Screen name="Voice" component={VoiceScreen} />
                    <Stack.Screen name="Subscription" component={SubscriptionScreen} options={{ headerShown: true, headerTransparent: true, headerTitle: '' }} />
                    <Stack.Screen name="Admin" component={AdminScreen} options={{ headerShown: true, headerTransparent: true, headerTitle: '' }} />
                </>
            )}
        </Stack.Navigator>
    );
};

export const RootNavigator = () => {
    return (
        <AuthProvider>
            <NavigationContainer>
                <NavigationContent />
            </NavigationContainer>
        </AuthProvider>
    );
};
