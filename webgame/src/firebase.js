// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBV0y47g2EFbjzoZ6gw-82sy5Zs4EUe9dY",
  authDomain: "palepeli-c07be.firebaseapp.com",
  projectId: "palepeli-c07be",
  storageBucket: "palepeli-c07be.appspot.com",
  messagingSenderId: "561884863400",
  appId: "1:561884863400:web:ac13099dc5f3a44fa45b9d",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);