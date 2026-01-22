
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(identifier, password);
      // Navigate to root, App.tsx will handle rendering the authenticated layout
      navigate('/');
    } catch (error: any) {
      console.error(error);
      alert('Failed to log in: ' + error.message);
    }
    setLoading(false);
  };

  return (
      <MotionDiv 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full bg-white/70 dark:bg-jj-gray-800/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 dark:border-white/10 p-8 sm:p-10"
      >
        <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-jj-gray-900 dark:text-white">Welcome Back</h2>
            <p className="mt-2 text-jj-gray-600 dark:text-jj-gray-300">Log in to continue your journey of joy.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="identifier" className="block text-sm font-medium text-jj-gray-700 dark:text-jj-gray-300 mb-2 pl-4">Email or Username</label>
                <input 
                    type="text" 
                    id="identifier" 
                    required 
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full px-6 py-3 bg-white/50 dark:bg-jj-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-jj-purple focus:border-transparent outline-none transition-all text-jj-gray-900 dark:text-white"
                    placeholder="you@example.com or username"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-jj-gray-700 dark:text-jj-gray-300 mb-2 pl-4">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-6 py-3 bg-white/50 dark:bg-jj-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-jj-purple focus:border-transparent outline-none transition-all text-jj-gray-900 dark:text-white"
                    placeholder="••••••••"
                />
            </div>

            <div className="flex items-center justify-between text-sm px-2">
                <label className="flex items-center text-jj-gray-600 dark:text-jj-gray-400 cursor-pointer">
                    <input type="checkbox" className="mr-2 rounded text-jj-purple focus:ring-jj-purple" />
                    Remember me
                </label>
                <button type="button" className="text-jj-purple hover:text-jj-sky font-medium">Forgot Password?</button>
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-jj-purple to-jj-blue text-white font-bold py-3.5 rounded-full hover:shadow-lg hover:opacity-90 transition-all transform active:scale-95 disabled:opacity-50"
            >
                {loading ? 'Logging in...' : 'Log In'}
            </button>
        </form>

        <div className="mt-8 text-center text-sm text-jj-gray-600 dark:text-jj-gray-400">
            Don't have an account? <Link to="/register" className="font-bold text-jj-purple hover:text-jj-sky">Sign up</Link>
        </div>
      </MotionDiv>
  );
};

export default Login;
