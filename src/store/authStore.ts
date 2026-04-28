import { create } from 'zustand';
import { User } from 'firebase/auth';
import {
  devLoginWithEmail,
  devLogout,
  persistMockUserEmail,
  readMockSessionUser,
  shouldUseDevMockAuth,
} from '../services/devAuth';
import { loginWithEmail, logout as firebaseLogout, onAuthChange } from '../services/firebase';
import { schedulePatientAlerts } from '../services/notifications';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  init: () => () => void;
}

function friendlyMessage(err: any): string {
  const code: string = err?.code ?? '';
  if (code === 'auth/invalid-api-key') return 'Authentication service is misconfigured. Please contact support.';
  if (code === 'auth/user-not-found') return 'No account found with this email.';
  if (code === 'auth/wrong-password') return 'Incorrect password. Please try again.';
  if (code === 'auth/invalid-credential') return 'Invalid email or password.';
  if (code === 'auth/too-many-requests') return 'Too many attempts. Please wait a moment and try again.';
  if (code === 'auth/network-request-failed') return 'Network error. Check your connection.';
  return err?.message || 'Something went wrong. Please try again.';
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,

  clearError: () => set({ error: null }),

  login: async (email, password) => {
    set({ error: null, loading: true });
    try {
      if (shouldUseDevMockAuth()) {
        const user = await devLoginWithEmail(email, password);
        persistMockUserEmail(user.email ?? '');
        set({ user, loading: false, error: null });
        schedulePatientAlerts();
        return;
      }
      await loginWithEmail(email, password);
      schedulePatientAlerts();
    } catch (err: any) {
      set({ error: friendlyMessage(err), loading: false });
    }
  },

  logout: async () => {
    try {
      if (shouldUseDevMockAuth()) {
        await devLogout();
      } else {
        await firebaseLogout();
      }
    } catch {
      // ignore logout errors
    }
    set({ user: null });
  },

  init: () => {
    if (shouldUseDevMockAuth()) {
      set({ user: readMockSessionUser(), loading: false, error: null });
      return () => {};
    }
    try {
      return onAuthChange(
        (user) => set({ user, loading: false }),
        (err) => {
          console.error('[Auth] State change error:', err);
          set({ loading: false, error: friendlyMessage(err) });
        }
      );
    } catch (err) {
      console.error('[Auth] Init failed:', err);
      set({ loading: false });
      return () => {};
    }
  },
}));
