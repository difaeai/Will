import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { GradientBackground } from '../../components/common/GradientBackground';
import { COLORS, SIZES, SPACING, RADIUS } from '../../constants/theme';
import { Star, MapPin, Filter } from 'lucide-react-native';
import { supabase } from '../../config/supabase';

interface Expert {
    id: string;
    name: string;
    title: string;
    rating: number;
    price: string;
    imageUrl: string;
}

const MarketplaceScreen = () => {
    const [experts, setExperts] = useState<Expert[]>([]);

    useEffect(() => {
        const fetchExperts = async () => {
            const { data, error } = await supabase
                .from('experts')
                .select('*');

            if (data && data.length > 0) {
                setExperts(data);
            } else {
                // Fallback to initial seed if table is empty
                setExperts([
                    { id: '1', name: 'Dr. Sarah Smith', title: 'Clinical Psychologist', rating: 4.9, price: '$80/session', imageUrl: 'https://via.placeholder.com/100' },
                    { id: '2', name: 'James Wilson', title: 'Career Coach', rating: 4.7, price: '$50/session', imageUrl: 'https://via.placeholder.com/100' },
                    { id: '3', name: 'Emma Brown', title: 'Life Counselor', rating: 4.8, price: '$60/session', imageUrl: 'https://via.placeholder.com/100' },
                ]);
            }
        };

        fetchExperts();
    }, []);

    const renderExpert = ({ item }: { item: Expert }) => (
        <TouchableOpacity style={styles.card}>
            <View style={styles.cardHeader}>
                <Image source={{ uri: item.imageUrl }} style={styles.avatar} />
                <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.ratingRow}>
                        <Star color={COLORS.warning} fill={COLORS.warning} size={14} />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.cardFooter}>
                <Text style={styles.price}>{item.price}</Text>
                <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <GradientBackground>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>Expert Marketplace</Text>
                        <Text style={styles.headerSubtitle}>Find the right support for you</Text>
                    </View>
                    <TouchableOpacity style={styles.filterButton}>
                        <Filter color={COLORS.text} size={20} />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={experts}
                    renderItem={renderExpert}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                />
            </View>
        </GradientBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 50,
        paddingHorizontal: SPACING.md,
        paddingBottom: SPACING.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        color: COLORS.text,
        fontSize: SIZES.h2,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        color: COLORS.textSecondary,
        fontSize: SIZES.body,
    },
    filterButton: {
        backgroundColor: COLORS.surface,
        padding: SPACING.sm,
        borderRadius: RADIUS.md,
    },
    listContent: {
        padding: SPACING.md,
    },
    card: {
        backgroundColor: COLORS.surface,
        padding: SPACING.md,
        borderRadius: RADIUS.lg,
        marginBottom: SPACING.md,
    },
    cardHeader: {
        flexDirection: 'row',
        marginBottom: SPACING.md,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.background,
    },
    info: {
        marginLeft: SPACING.md,
        justifyContent: 'center',
    },
    name: {
        color: COLORS.text,
        fontSize: SIZES.body,
        fontWeight: 'bold',
    },
    title: {
        color: COLORS.textSecondary,
        fontSize: SIZES.caption,
        marginVertical: 2,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        color: COLORS.text,
        fontSize: 12,
        marginLeft: 4,
        fontWeight: '600',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
        paddingTop: SPACING.md,
    },
    price: {
        color: COLORS.text,
        fontSize: SIZES.body,
        fontWeight: '600',
    },
    bookButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.lg,
        borderRadius: RADIUS.md,
    },
    bookButtonText: {
        color: COLORS.text,
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default MarketplaceScreen;
