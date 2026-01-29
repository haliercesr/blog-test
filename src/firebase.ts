import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// TODO: Reemplaza con tu configuración de Firebase
// Puedes encontrar esta configuración en la consola de Firebase de tu proyecto
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtiene una referencia a la Realtime Database
export const database = getDatabase(app);