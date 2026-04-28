import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  Auth,
  User,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

// Isolate Firebase init so a bad config never crashes the app
try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (err) {
  console.error('[Firebase] Initialisation failed:', err);
}

export const isFirebaseReady = () => auth !== null;

export const loginWithEmail = async (email: string, password: string) => {
  if (!auth) {
    throw new Error('Authentication service is unavailable.');
  }
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  if (!auth) return;
  return signOut(auth);
};

export const onAuthChange = (
  onUser: (user: User | null) => void,
  onError: (err: Error) => void
): (() => void) => {
  if (!auth) {
    // Firebase not ready — treat as logged out immediately
    onUser(null);
    return () => {};
  }
  return onAuthStateChanged(auth, onUser, onError);
};
