import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../config/supabase';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    userData: any | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    userData: null,
    loading: true
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [userData, setUserData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchUserData(session.user.id);
            } else {
                setLoading(false);
            }
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchUserData(session.user.id);
            } else {
                setUserData(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchUserData = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (data) setUserData(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, session, userData, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
