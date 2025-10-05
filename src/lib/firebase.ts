import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Config espelhando o app móvel. Em produção, prefira variáveis de ambiente públicas NEXT_*
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyD_eJLabb7WYiUB2CEZOUQo2QtYykxDnUw',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'mapsclean-131b0.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'mapsclean-131b0',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'mapsclean-131b0.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '396222420037',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:396222420037:android:1a7c92bffaf43b5bb73f2c',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Web: usar browserLocalPersistence para manter sessão e permitir popups
if (typeof window !== 'undefined') {
  auth.setPersistence(browserLocalPersistence).catch(() => {});
}

export const db = getFirestore(app);
export const storage = getStorage(app);

export const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api-wu7ecyjeta-uc.a.run.app';

export default app;

