
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCsYYIsu92cj3tGMmiAyatWdSQhIQoPt9I",
  authDomain: "loginmail-54606.firebaseapp.com",
  projectId: "loginmail-54606",
  storageBucket: "loginmail-54606.appspot.com",
  messagingSenderId: "789404863348",
  appId: "1:789404863348:web:9472103267c9dbebd9fa21",
  measurementId: "G-V4EPS7W6J4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();
  
// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
    prompt : "select_account "
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

