import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://hjsszqkwtzqqlgarlvec.supabase.co';
const supabaseAnonKey = 'sb_publishable_s8dSZnVp14n1urNqYLXhKQ_c5zWHK2-';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
