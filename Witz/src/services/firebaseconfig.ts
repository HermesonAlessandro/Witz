import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDcCJBYvuO-HGpMqcP21CKgxdplwFF9zng",
  authDomain: "witz-fd3b9.firebaseapp.com",
  projectId: "witz-fd3b9",
  storageBucket: "witz-fd3b9.firebasestorage.app",
  messagingSenderId: "333914375635",
  appId: "1:333914375635:web:36596b9b87df051fa79b26",
  measurementId: "G-41MBXZNR2H"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

export { app, auth, db };