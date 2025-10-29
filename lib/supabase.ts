import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { Platform } from 'react-native'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const anon = process.env.EXPO_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl) throw new Error('supabaseUrl is required.');
if (!anon) throw new Error('supabase anon key is required.');

// Create platform-specific storage adapter
const storage = Platform.OS === 'web' ? {
  getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key: string, value: string) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
} : AsyncStorage;

// Create Supabase client with realtime disabled to avoid Node.js module conflicts
export const supabase = createClient(supabaseUrl, anon, {
  auth: {
    storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
