import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// TODO: Reemplaza con tu configuración de Firebase
// Puedes encontrar esta configuración en la consola de Firebase de tu proyecto
const firebaseConfig = {
  apiKey: "AIzaSyApBg7Zi5FsF8HKMdgCpV9us5tCJ-Jl8ZQ",
  authDomain: "blog-a810a.firebaseapp.com",
  databaseURL: "https://blog-a810a-default-rtdb.firebaseio.com",
  projectId: "blog-a810a",
  storageBucket: "blog-a810a.firebasestorage.app",
  messagingSenderId: "908980374580",
  appId: "1:908980374580:web:7d5d1951abfcb6bdbfce61",
  measurementId: "G-4TW7K22CPW"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtiene una referencia a la Realtime Database
export const database = getDatabase(app);