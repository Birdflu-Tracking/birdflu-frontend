import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCvVK5yUKogNjsBxLc4BjMohyszX36ixc4",
  authDomain: "birdflu-tracker.firebaseapp.com",
  projectId: "birdflu-tracker",
  storageBucket: "gs://birdflu-tracker.appspot.com",
  messagingSenderId: "587207126920",
  appId: "1:587207126920:web:d1f15c26305c66195e943d",
  measurementId: "G-TC1GWNNBJC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
const auth = getAuth(app);
auth.settings.appVerificationDisabledForTesting = true;

export { auth };
