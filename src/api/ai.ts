import { db } from '../config/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export interface AIAgent {
    id: string;
    name: string;
    personality: string;
    avatar: string;
}

export const AI_AGENTS: AIAgent[] = [
    { id: '1', name: 'Will', personality: 'Empathetic Psychologist', avatar: 'bot' },
    { id: '2', name: 'Coach Ken', personality: 'Motivational Career Coach', avatar: 'user' },
    { id: '3', name: 'Luna', personality: 'Calm Listener', avatar: 'sparkles' },
];

export const getAIResponse = async (userId: string, userMessage: string, agent: AIAgent) => {
    // In a real app, this would call a Firebase Function that interacts with Gemini/OpenAI
    // For now, we simulate the logic
    const response = `[${agent.name}]: I hear you. You're talking about "${userMessage}". As your ${agent.personality}, I'd suggest looking at it from a different perspective...`;

    await addDoc(collection(db, 'messages'), {
        userId,
        text: response,
        sender: 'ai',
        agentId: agent.id,
        timestamp: Timestamp.now(),
    });

    return response;
};
