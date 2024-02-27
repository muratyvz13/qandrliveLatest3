
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};

// Firebase app'i başlat
const app = initializeApp(firebaseConfig);

// Authentication servisini al
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

