import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Modal } from 'react-native';
import { GradientBackground } from '../../components/common/GradientBackground';
import { COLORS, SIZES, SPACING, RADIUS } from '../../constants/theme';
import { Plus, MessageSquare, Heart } from 'lucide-react-native';
import { supabase } from '../../config/supabase';
import { useAuth } from '../../context/AuthContext';

interface Post {
    id: string;
    content: string;
    mood: string;
    timestamp: any;
    likes: number;
}

const CommunityScreen = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState<Post[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newPostContent, setNewPostContent] = useState('');
    const [selectedMood, setSelectedMood] = useState('Neutral');

    useEffect(() => {
        // Fetch posts
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (data) setPosts(data);
        };

        fetchPosts();

        // Real-time subscription
        const channel = supabase
            .channel('public:posts')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, (payload) => {
                setPosts(prev => [payload.new as Post, ...prev]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const createPost = async () => {
        if (newPostContent.trim() === '' || !user) return;
        try {
            await supabase.from('posts').insert({
                user_id: user.id,
                content: newPostContent,
                mood: selectedMood,
                likes: 0,
                anonymous: true,
            });
            setNewPostContent('');
            setModalVisible(false);
        } catch (error) {
            console.error("Error creating post: ", error);
        }
    };

    const renderPost = ({ item }: { item: Post }) => (
        <View style={styles.postCard}>
            <View style={styles.postHeader}>
                <View style={[styles.moodBadge, { backgroundColor: COLORS.surface }]}>
                    <Text style={styles.moodText}>{item.mood}</Text>
                </View>
                <Text style={styles.timeText}>Anonymous</Text>
            </View>
            <Text style={styles.postContent}>{item.content}</Text>
            <View style={styles.postFooter}>
                <TouchableOpacity style={styles.footerAction}>
                    <Heart color={COLORS.textSecondary} size={18} />
                    <Text style={styles.footerText}>{item.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerAction}>
                    <MessageSquare color={COLORS.textSecondary} size={18} />
                    <Text style={styles.footerText}>Comment</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <GradientBackground>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Community</Text>
                    <Text style={styles.headerSubtitle}>Share your thoughts anonymously</Text>
                </View>

                <FlatList
                    data={posts}
                    renderItem={renderPost}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                />

                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => setModalVisible(true)}
                >
                    <Plus color={COLORS.text} size={28} />
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>New Post</Text>
                            <TextInput
                                style={styles.modalInput}
                                placeholder="What's on your mind?"
                                placeholderTextColor={COLORS.textSecondary}
                                multiline
                                value={newPostContent}
                                onChangeText={setNewPostContent}
                            />
                            <View style={styles.moodSelector}>
                                {['Happy', 'Sad', 'Anxious', 'Neutral', 'Grateful'].map(m => (
                                    <TouchableOpacity
                                        key={m}
                                        style={[styles.moodItem, selectedMood === m && styles.selectedMoodItem]}
                                        onPress={() => setSelectedMood(m)}
                                    >
                                        <Text style={[styles.moodItemText, selectedMood === m && styles.selectedMoodItemText]}>{m}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={styles.modalButtons}>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.postButton} onPress={createPost}>
                                    <Text style={styles.postButtonText}>Post</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
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
    listContent: {
        padding: SPACING.md,
    },
    postCard: {
        backgroundColor: COLORS.surface,
        padding: SPACING.md,
        borderRadius: RADIUS.lg,
        marginBottom: SPACING.md,
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.sm,
    },
    moodBadge: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: 2,
        borderRadius: RADIUS.sm,
    },
    moodText: {
        color: COLORS.primary,
        fontSize: SIZES.caption,
        fontWeight: '600',
    },
    timeText: {
        color: COLORS.textSecondary,
        fontSize: SIZES.caption,
    },
    postContent: {
        color: COLORS.text,
        fontSize: SIZES.body,
        lineHeight: 22,
        marginBottom: SPACING.md,
    },
    postFooter: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
        paddingTop: SPACING.sm,
    },
    footerAction: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SPACING.lg,
    },
    footerText: {
        color: COLORS.textSecondary,
        fontSize: SIZES.caption,
        marginLeft: SPACING.xs,
    },
    fab: {
        position: 'absolute',
        right: SPACING.lg,
        bottom: SPACING.lg,
        backgroundColor: COLORS.primary,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        padding: SPACING.lg,
    },
    modalContent: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.lg,
        padding: SPACING.lg,
    },
    modalTitle: {
        color: COLORS.text,
        fontSize: SIZES.h3,
        fontWeight: 'bold',
        marginBottom: SPACING.md,
    },
    modalInput: {
        backgroundColor: COLORS.background,
        color: COLORS.text,
        borderRadius: RADIUS.md,
        padding: SPACING.md,
        height: 120,
        textAlignVertical: 'top',
        marginBottom: SPACING.md,
    },
    moodSelector: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: SPACING.lg,
    },
    moodItem: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.sm,
        borderWidth: 1,
        borderColor: COLORS.textSecondary,
        marginRight: SPACING.sm,
        marginBottom: SPACING.sm,
    },
    selectedMoodItem: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    moodItemText: {
        color: COLORS.textSecondary,
        fontSize: 12,
    },
    selectedMoodItemText: {
        color: COLORS.text,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    cancelButton: {
        padding: SPACING.md,
    },
    cancelButtonText: {
        color: COLORS.textSecondary,
        fontWeight: '600',
    },
    postButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.xl,
        borderRadius: RADIUS.md,
    },
    postButtonText: {
        color: COLORS.text,
        fontWeight: 'bold',
    },
});

export default CommunityScreen;
