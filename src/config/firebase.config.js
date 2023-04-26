import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDG1QJONrzK8o5IUv5xb9dW6ng8WVV8wZY",
  authDomain: "saaf-water-onboarding-app.firebaseapp.com",
  projectId: "saaf-water-onboarding-app",
  storageBucket: "saaf-water-onboarding-app.appspot.com",
  messagingSenderId: "674630984164",
  appId: "1:674630984164:web:5c239d2018dcc576b7e7f1",
  measurementId: "G-9VMWCEY0L8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
auth.settings.appVerificationDisabledForTesting = true;

export { auth, firestore };
