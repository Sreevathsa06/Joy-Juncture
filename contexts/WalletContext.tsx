
import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { WalletTransaction } from '../types';
import { useAuth } from './AuthContext';
import { getWalletTransactions, addWalletTransaction } from '../services/firestoreService';


interface WalletContextType {
  transactions: WalletTransaction[];
  totalPoints: number;
  loading: boolean;
  addPoints: (description: string, points: number) => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { firebaseUser } = useAuth();
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = useCallback(async (uid: string) => {
    setLoading(true);
    const userTransactions = await getWalletTransactions(uid);
    setTransactions(userTransactions);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (firebaseUser) {
      fetchTransactions(firebaseUser.uid);
    } else {
      setTransactions([]);
    }
  }, [firebaseUser, fetchTransactions]);

  const totalPoints = transactions.reduce((sum, t) => sum + t.points, 0);

  const addPoints = useCallback(async (description: string, points: number) => {
    if (!firebaseUser) {
      console.error("User not logged in, cannot add points.");
      alert("Please log in to earn points!");
      return;
    }
    setLoading(true);
    await addWalletTransaction(firebaseUser.uid, description, points);
    await fetchTransactions(firebaseUser.uid);
    setLoading(false);
  }, [firebaseUser, fetchTransactions]);

  return (
    <WalletContext.Provider value={{ transactions, totalPoints, addPoints, loading }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
