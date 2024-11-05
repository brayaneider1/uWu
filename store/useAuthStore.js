import create from 'zustand';
import { persist } from 'zustand/middleware';
import {jwtDecode} from 'jwt-decode';
import { apiLogin, apiRegister } from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSubscriptionByUser } from '../api/subscriptions';

const useAuthStore = create(persist(
  (set, get) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    subscriptionData: null,
    loading: false,
    error: null,
    login: async (phone, password) => {
      set({ loading: true, error: null });
      try {
        const response = await apiLogin(phone, password);
        const decodedToken = jwtDecode(response.token);
        set({ user: { phone, sub: decodedToken.sub }, token: response.token, isAuthenticated: true });
        await get().fetchSubscription(decodedToken.sub); // Espera a que fetchSubscription termine
        set({ loading: false });
      } catch (error) {
        set({ error, loading: false });
        console.error('Login failed:', error);
        throw error;
      }
    },
    register: async (name, email, phone, password, referralCode) => {
      set({ loading: true, error: null });
      try {
        const response = await apiRegister(name, email, phone, password, referralCode);
        set({ user: { name, email, phone }, token: response.token, isAuthenticated: false });
        set({ loading: false });
      } catch (error) {
        set({ error, loading: false });
        console.error('Registration failed:', error);
        throw error;
      }
    },
    fetchSubscription: async (sub) => {
      set({ loading: true, error: null });
      try {
        const data = await getSubscriptionByUser(sub);
        set({ subscriptionData: data, loading: false });
      } catch (error) {
        set({ error, loading: false });
      }
    },
    logout: () => {
      set({ user: null, token: null, isAuthenticated: false, subscriptionData: null });
    },
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  }),
  {
    name: 'auth-storage', // Nombre de almacenamiento persistente
    getStorage: () => AsyncStorage, // para React Native
  }
));

export default useAuthStore;