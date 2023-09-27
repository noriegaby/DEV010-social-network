// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from 'firebase/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyD4c9CoNNfT8cV0rX11lcMMOxiXcJ81mPs",
  authDomain: "red-social-foodgram.firebaseapp.com",
  projectId: "red-social-foodgram",
  storageBucket: "red-social-foodgram.appspot.com",
  messagingSenderId: "58476164637",
  appId: "1:58476164637:web:6fb6498cc1a4126f49b8f4",
  measurementId: "G-NSK3289BQS",
  databaseURL: "https://red-social-foodgram-default-rtdb.firebaseio.com/",
};

// Inicializa Firebase con la configuración
const app = initializeApp(firebaseConfig);

// Obtén una instancia de Firebase Realtime Database
const db = getDatabase(app);

export {db}; // Exporta la instancia de Firebase Realtime Database


