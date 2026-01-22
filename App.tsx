import React, { Component, ErrorInfo, ReactNode } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Events from './pages/Events';
import Experiences from './pages/Experiences';
import Community from './pages/Community';
import Wallet from './pages/Wallet';
import Play from './pages/Play';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { WalletProvider } from './contexts/WalletContext';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import AddProduct from './pages/Admin/AddProduct';
import AddEvent from './pages/Admin/AddEvent';
import Loading from './components/Loading';

// --- 1. ERROR BOUNDARY (Catches Crashes) ---
class ErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) { return { hasError: true, error }; }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) { console.error("Uncaught error:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 p-8 text-center">
          <div>
            <h1 className="text-3xl font-bold text-red-600 mb-4">Something went wrong.</h1>
            <p className="text-gray-700 mb-4">See the console (F12) for details, or verify your Firebase Config.</p>
            <div className="bg-white p-4 rounded shadow text-left overflow-auto max-w-lg mx-auto">
                <code className="text-red-500 text-sm font-mono">{this.state.error?.toString()}</code>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- 2. MAIN APP CONTENT ---
const ThemeBackground: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <div className="text-gray-900 dark:text-gray-200 min-h-screen flex flex-col font-sans transition-colors duration-300">
    {children}
  </div>
);

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();

  // Explicit Loading State
  if (loading) {
    return <Loading fullScreen size="large" />;
  }

  return (
    <HashRouter>
      <ThemeBackground>
        {user ? (
          <>
            <Header />
            <main className="flex-grow pt-32 pb-12">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/shop/:productId" element={<ProductDetail />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/experiences" element={<Experiences />} />
                  <Route path="/play" element={<Play />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/about" element={<About />} />
                  
                  {/* ADMIN ROUTES */}
                  <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                  <Route path="/admin/add-product" element={<AdminRoute><AddProduct /></AdminRoute>} />
                  <Route path="/admin/add-event" element={<AdminRoute><AddEvent /></AdminRoute>} />

                  {/* REDIRECTS */}
                  <Route path="/login" element={<Navigate to="/" replace />} />
                  <Route path="/register" element={<Navigate to="/" replace />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <Footer />
          </>
        ) : (
          <main className="flex-grow flex items-center justify-center p-4 relative min-h-screen">
             {/* THEME TOGGLE BUTTON */}
            <div className="absolute top-6 right-6 z-50">
              <button onClick={toggleTheme} className="w-12 h-12 flex items-center justify-center rounded-full bg-white/40 dark:bg-black/30 backdrop-blur-md shadow-lg border border-white/20 text-gray-700 dark:text-yellow-400 transition-transform hover:scale-110 active:scale-95">
                {theme === 'light' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 14.464A1 1 0 106.465 13.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm-.707-10.607a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clipRule="evenodd" /></svg>
                )}
              </button>
            </div>
            {/* LOGIN CONTAINER */}
            <div className="w-full max-w-md">
              <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-8">Joy Juncture</h1>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </div>
          </main>
        )}
      </ThemeBackground>
    </HashRouter>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <WalletProvider>
            <CartProvider>
              <AppContent />
            </CartProvider>
          </WalletProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;