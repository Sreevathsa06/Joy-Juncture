import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import Loading from './Loading';

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { firebaseUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      if (firebaseUser) {
        const doc = await db.collection('users').doc(firebaseUser.uid).get();
        const userData = doc.data();
        setIsAdmin(userData?.isAdmin === true); 
      } else {
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, [firebaseUser]);

  if (isAdmin === null) return <div className="min-h-screen flex items-center justify-center"><Loading /></div>;

  return isAdmin ? <>{children}</> : <Navigate to="/" replace />;
};

export default AdminRoute;