import type { User } from 'firebase/auth';
import { isFirebaseReady } from './firebase';

const STORAGE_KEY = 'healthos_dev_auth_email';

/**
 * Local-only mock auth when Firebase is not in use.
 * - development: on if REACT_APP_USE_MOCK_AUTH is "true", or if unset and Firebase failed to init.
 * - Set REACT_APP_USE_MOCK_AUTH=false to force real Firebase in development.
 */
export function shouldUseDevMockAuth(): boolean {
  if (process.env.NODE_ENV !== 'development') return false;
  const flag = process.env.REACT_APP_USE_MOCK_AUTH;
  if (flag === 'false') return false;
  if (flag === 'true') return true;
  return !isFirebaseReady();
}

function expectedEmail(): string {
  return (process.env.REACT_APP_DEV_AUTH_EMAIL ?? 'demo@health.com').trim().toLowerCase();
}

function expectedPassword(): string {
  return process.env.REACT_APP_DEV_AUTH_PASSWORD ?? 'demo123';
}

function makeMockUser(email: string): User {
  const e = email.trim();
  return {
    uid: 'dev-local-mock',
    email: e,
    emailVerified: true,
    isAnonymous: false,
    metadata: {} as User['metadata'],
    providerData: [],
    displayName: null,
    phoneNumber: null,
    photoURL: null,
    providerId: 'password',
    tenantId: null,
    refreshToken: '',
    delete: async () => {},
    getIdToken: async () => 'dev-mock',
    getIdTokenResult: async () => ({} as Awaited<ReturnType<User['getIdTokenResult']>>),
    reload: async () => {},
    toJSON: () => ({}),
  } as User;
}

export function getPersistedMockUserEmail(): string | null {
  try {
    const v = sessionStorage.getItem(STORAGE_KEY);
    return v && v.length > 0 ? v : null;
  } catch {
    return null;
  }
}

export function persistMockUserEmail(email: string): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, email);
  } catch {
    /* ignore quota / private mode */
  }
}

export function clearPersistedMockUser(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export async function devLoginWithEmail(email: string, password: string): Promise<User> {
  const normalized = email.trim().toLowerCase();
  if (!normalized || !password) {
    const err = new Error('Invalid email or password.');
    (err as { code?: string }).code = 'auth/invalid-credential';
    throw err;
  }
  await new Promise((r) => setTimeout(r, 120));
  if (normalized !== expectedEmail() || password !== expectedPassword()) {
    const err = new Error('Invalid email or password.');
    (err as { code?: string }).code = 'auth/invalid-credential';
    throw err;
  }
  return makeMockUser(normalized);
}

export async function devLogout(): Promise<void> {
  clearPersistedMockUser();
}

/** Current mock session from sessionStorage, if any. */
export function readMockSessionUser(): User | null {
  const email = getPersistedMockUserEmail();
  return email ? makeMockUser(email) : null;
}
