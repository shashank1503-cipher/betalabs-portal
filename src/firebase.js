// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { Firestore, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiAwaL07QEybYVUrs05czg-hXYOmuwCLA",
  authDomain: "betalabs-portal-1fb2f.firebaseapp.com",
  projectId: "betalabs-portal-1fb2f",
  storageBucket: "betalabs-portal-1fb2f.appspot.com",
  messagingSenderId: "697798238486",
  appId: "1:697798238486:web:0c028b1a2945e2e4903037",
  measurementId: "G-X99B228MZ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const db = getFirestore(app)