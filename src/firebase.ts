import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// TODO: Reemplaza con tu configuración de Firebase
// Puedes encontrar esta configuración en la consola de Firebase de tu proyecto
const firebaseConfig = {
  apiKey: import.meta.env.apiKey,
  authDomain: import.meta.env.authDomain,
  databaseURL: import.meta.env.databaseURL,
  projectId: import.meta.env.projectId,
  storageBucket: import.meta.env.storageBucket,
  messagingSenderId: import.meta.env.messagingSenderId,
  appId: import.meta.env.appId,
  measurementId: import.meta.env.measurementId
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtiene una referencia a la Realtime Database
export const database = getDatabase(app);