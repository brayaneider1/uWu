import create from 'zustand';
import { persist } from 'zustand/middleware';
import { apiLogin, apiRegister } from '../api/auth';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthStore = create(persist(
  (set, get) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    idSubscription: null,
    code: '',
    login: async (phone, password) => {
      try {
        const response = await apiLogin(phone, password);
        const decodedToken = jwtDecode(response.token);
        set({ user: decodedToken, token: response.token, isAuthenticated: true });
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    register: async (name, email, phone, password, referralCode) => {
      try {
        const response = await apiRegister(name, email, phone, password, referralCode);
        set({ user: { name, email, phone }, token: response.token, isAuthenticated: true });
      } catch (error) {
        console.error('Registration failed:', error);
        throw error;
      }
    },
    logout: () => {
      set({ user: null, token: null, isAuthenticated: false });
    },
    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    subscrition: (subs) => {
      set({ idSubscription: subs });
    },
    setCode: (code) => {
      set({ code });
    },
  }),
  {
    name: 'auth-storage', // Nombre de almacenamiento persistente
    getStorage: () => AsyncStorage, // para React Native
  }
));

export default useAuthStore;
