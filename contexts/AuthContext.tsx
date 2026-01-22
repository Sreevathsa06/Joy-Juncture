import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { auth, db } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  firebaseUser: firebase.User | null;
  loading: boolean;
  login: (identifier?: string, password?: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<firebase.User | null>(auth.currentUser);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        // Do NOT set global loading=true here to prevent UI blocking
        try {
          const userRef = db.collection('users').doc(fbUser.uid);
          
          // FIX: Add 5-second timeout to prevent infinite hanging
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Firestore timeout")), 5000)
          );

          const docSnap: any = await Promise.race([
            userRef.get(),
            timeoutPromise
          ]);

          if (docSnap.exists) {
            setUser(docSnap.data() as User);
          } else {
            setUser({
              name: fbUser.displayName || 'Joyful Player',
              email: fbUser.email || 'anonymous@joyjuncture.com',
              username: 'anonymous',
            });
          }
        } catch (err) {
          console.warn('Profile fetch failed or timed out. Using fallback.', err);
          setUser({
            name: fbUser.displayName || 'Player',
            email: fbUser.email || '',
            username: 'guest',
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (identifier?: string, password?: string) => {
    try {
      if (identifier && password) {
        let emailToLogin = identifier;

        // Logic to handle Username login
        if (!identifier.includes('@')) {
          try {
            const userSnapshot = await db.collection('users')
              .where('username', '==', identifier)
              .limit(1)
              .get();

            if (!userSnapshot.empty) {
              const userData = userSnapshot.docs[0].data();
              emailToLogin = userData.email;
            } else {
              throw new Error('Username not found.');
            }
          } catch (err: any) {
            // FIX: Catch permission errors specifically
            if (err.code === 'permission-denied') {
              throw new Error('Database locked. Please login with EMAIL until Firestore Rules are updated.');
            }
            throw err;
          }
        }

        await auth.signInWithEmailAndPassword(emailToLogin, password);
      } else {
        await auth.signInAnonymously();
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, username: string) => {
    try {
      // 1. Create Auth User FIRST (so we have a token)
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const fbUser = userCredential.user;

      if (fbUser) {
        await fbUser.updateProfile({ displayName: username });

        const newUserProfile: User = {
          name: username,
          email: email,
          username: username,
        };

        // 2. Then try to save profile
        try {
          await db.collection('users').doc(fbUser.uid).set(newUserProfile);
          setUser(newUserProfile);
        } catch (firestoreError) {
          console.error('Profile creation failed:', firestoreError);
          // Don't fail the whole registration if just the DB write fails
        }
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      // Handle "Email already in use" gracefully
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('This email is already registered. Please login.');
      }
      throw error;
    }
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
    setFirebaseUser(null);
  };

  const value = { user, firebaseUser, loading, login, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;