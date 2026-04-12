import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { GradientBackground } from '../../components/common/GradientBackground';
import { COLORS, SIZES, SPACING, RADIUS } from '../../constants/theme';
import { Send, User as UserIcon, Bot } from 'lucide-react-native';
import { db } from '../../config/firebase';
import { addDoc, collection, query, where, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: any;
}

const ChatScreen = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, 'messages'),
            where('userId', '==', user.uid),
            orderBy('timestamp', 'asc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs: Message[] = [];
            snapshot.forEach((doc) => {
                msgs.push({ id: doc.id, ...doc.data() } as Message);
            });
            setMessages(msgs);
        });

        return unsubscribe;
    }, [user]);

    const sendMessage = async () => {
        if (inputText.trim() === '' || !user) return;

        const userMessage = inputText;
        setInputText('');

        try {
            await addDoc(collection(db, 'messages'), {
                userId: user.uid,
                text: userMessage,
                sender: 'user',
                timestamp: Timestamp.now(),
            });

            // Simulate AI response for now
            setTimeout(async () => {
                await addDoc(collection(db, 'messages'), {
                    userId: user.uid,
                    text: `I'm here to listen. You mentioned: "${userMessage}". How does that make you feel?`,
                    sender: 'ai',
                    timestamp: Timestamp.now(),
                });
            }, 1000);

        } catch (error) {
            console.error("Error sending message: ", error);
        }
    };

    const renderMessage = ({ item }: { item: Message }) => (
        <View style={[
            styles.messageContainer,
            item.sender === 'user' ? styles.userMessage : styles.aiMessage
        ]}>
            <View style={styles.avatar}>
                {item.sender === 'user' ? <UserIcon color={COLORS.text} size={16} /> : <Bot color={COLORS.primary} size={16} />}
            </View>
            <View style={[
                styles.bubble,
                item.sender === 'user' ? styles.userBubble : styles.aiBubble
            ]}>
                <Text style={styles.messageText}>{item.text}</Text>
            </View>
        </View>
    );

    return (
        <GradientBackground>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Talk to Will</Text>
                </View>

                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                />

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type your message..."
                        placeholderTextColor={COLORS.textSecondary}
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                        <Send color={COLORS.text} size={20} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </GradientBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 50,
        paddingBottom: SPACING.md,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    headerTitle: {
        color: COLORS.text,
        fontSize: SIZES.h3,
        fontWeight: 'bold',
    },
    listContent: {
        padding: SPACING.md,
    },
    messageContainer: {
        flexDirection: 'row',
        marginBottom: SPACING.md,
        alignItems: 'flex-end',
    },
    userMessage: {
        flexDirection: 'row-reverse',
    },
    aiMessage: {},
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: SPACING.sm,
    },
    bubble: {
        maxWidth: '75%',
        padding: SPACING.md,
        borderRadius: RADIUS.lg,
    },
    userBubble: {
        backgroundColor: COLORS.primary,
        borderBottomRightRadius: 2,
    },
    aiBubble: {
        backgroundColor: COLORS.surface,
        borderBottomLeftRadius: 2,
    },
    messageText: {
        color: COLORS.text,
        fontSize: SIZES.body,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: SPACING.md,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },
    input: {
        flex: 1,
        backgroundColor: COLORS.surface,
        color: COLORS.text,
        borderRadius: RADIUS.xl,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        marginRight: SPACING.sm,
        maxHeight: 100,
    },
    sendButton: {
        backgroundColor: COLORS.primary,
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ChatScreen;
