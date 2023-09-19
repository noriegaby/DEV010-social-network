// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyD4c9CoNNfT8cV0rX11lcMMOxiXcJ81mPs",
  authDomain: "red-social-foodgram.firebaseapp.com",
  projectId: "red-social-foodgram",
  storageBucket: "red-social-foodgram.appspot.com",
  messagingSenderId: "58476164637",
  appId: "1:58476164637:web:6fb6498cc1a4126f49b8f4",
  measurementId: "G-NSK3289BQS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);