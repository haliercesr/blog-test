import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { IAuthUser, IAuthState } from '../../interfaces';
import { database } from '../../firebase'; // Importa la instancia de la base de datos
import { ref, set, remove, onValue } from 'firebase/database'; // Importa funciones de Firebase Database

interface AuthContextType extends IAuthState {
  login: (user: IAuthUser) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// No necesitamos AUTH_STORAGE_KEY ya que usaremos Firebase para persistencia
// const AUTH_STORAGE_KEY = 'blog_auth_user';

// Función para cargar el usuario desde Firebase (si existe)
const loadUserFromFirebase = (userId: string, callback: (user: IAuthUser | null) => void) => {
  const userRef = ref(database, 'users/' + userId);
  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      callback({
        id: userId,
        email: data.email,
        name: data.name,
        picture: data.picture,
        googleId: userId, // Usamos el ID de Firebase como googleId
      });
    } else {
      callback(null);
    }
  }, {
    onlyOnce: true // Solo queremos cargar una vez al inicio
  });
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IAuthUser | null>(null); // Inicialmente null
  const [isLoading, setIsLoading] = useState(true); // Empezamos cargando para verificar Firebase

  // Efecto para cargar el usuario al inicio de la aplicación
  // Esto simula la persistencia de sesión si el usuario ya se autenticó con Google
  // y sus datos están en Firebase.
  React.useEffect(() => {
    // Aquí podrías intentar obtener el ID de Google del usuario de alguna manera
    // Por ahora, asumimos que si GoogleOAuthProvider ya autenticó, el login se llamará.
    // Si necesitas persistencia de sesión sin re-autenticar con Google cada vez,
    // necesitarías un mecanismo de token o un estado de sesión en Firebase Auth.
    // Para este ejemplo, nos basamos en que GoogleLogin se encargará de llamar a `login`
    // si el usuario ya está autenticado en Google.
    setIsLoading(false); // Terminamos de cargar si no hay un mecanismo de carga inicial aquí
  }, []);

  const login = useCallback((userData: IAuthUser) => {
    setUser(userData);
    setIsLoading(false);
    // Guarda el usuario en Firebase Realtime Database
    set(ref(database, 'users/' + userData.id), {
      email: userData.email,
      name: userData.name,
      picture: userData.picture,
    }).catch(error => {
      console.error("Error al guardar usuario en Firebase:", error);
    });
  }, []);

  const logout = useCallback(() => {
    if (user) {
      // Elimina el usuario de Firebase Realtime Database
      remove(ref(database, 'users/' + user.id)).catch(error => {
        console.error("Error al eliminar usuario de Firebase:", error);
      });
    }
    setUser(null);
    setIsLoading(false);
  }, [user]);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    setLoading: setIsLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};