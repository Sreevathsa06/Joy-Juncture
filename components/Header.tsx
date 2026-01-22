import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { motion } from 'framer-motion';
import { animated, useSpring } from '@react-spring/web';

const MotionSpan = motion.span as any;
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

const expressiveSpring = {
  type: 'spring' as const,
  stiffness: 350,
  damping: 25,
  mass: 0.8,
};

const underlineSpring = {
  type: 'spring' as const,
  stiffness: 140,
  damping: 18,
  mass: 2.0,
};

const NavItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const activeColor = '#a357daff';
  const baseClasses = 'relative transition-colors duration-200 px-5 py-2 text-base font-medium flex items-center h-full';

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${baseClasses} ${
          isActive
            ? 'text-jj-gray-900 dark:text-white'
            : 'text-jj-gray-900 dark:text-jj-gray-300 hover:text-jj-gray-900 dark:hover:text-white'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <MotionSpan whileHover={{ scale: 1.05 }} transition={expressiveSpring}>
            {children}
          </MotionSpan>
          {isActive && (
            <MotionDiv
              className="absolute bottom-3.5 left-4 right-4 h-0.5 rounded-full"
              style={{
                backgroundColor: activeColor,
                boxShadow: 'none',
                originX: 0.5,
              }}
              layoutId="active-pill-underline"
              transition={underlineSpring}
            />
          )}
        </>
      )}
    </NavLink>
  );
};

const Header: React.FC = () => {
  const { user, loading, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [jiggleProps, api] = useSpring(() => ({
    transform: 'translateY(0px)',
    config: { mass: 2.5, tension: 200, friction: 10 },
  }));

  useEffect(() => {
    api.start({
      transform: isScrolled ? 'translateY(6px)' : 'translateY(0px)',
    });
  }, [isScrolled, api]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const pillBase = `
    h-[60px] flex items-center justify-center
    transition-all duration-500 ease-in-out
    rounded-full
  `;

  const bgScrolled = 'bg-white/25 dark:bg-black/20 backdrop-blur-3xl backdrop-saturate-200 shadow-lg';
  const bgTransparent = 'bg-transparent backdrop-blur-0 shadow-none';

  const borderScrolled = 'border-white/20 dark:border-white/10';
  const borderTransparent = 'border-transparent';

  const standardClass = isScrolled ? `${bgScrolled} ${borderScrolled} border` : `${bgTransparent} ${borderTransparent} border`;

  const profileClass = 'bg-transparent border-0 shadow-none';

  return (
    <header className="fixed z-50 top-4 left-0 right-0 pointer-events-none flex justify-center">
      <animated.div style={jiggleProps} className="flex items-center gap-2">
        <div className={`pointer-events-auto px-4 ${pillBase} ${standardClass}`}>
          <Link to="/" className="font-bold text-jj-gray-900 dark:text-white shrink-0 text-2xl tracking-tight leading-none">
            Joy Juncture
          </Link>
        </div>

        <div className={`pointer-events-auto px-2 hidden md:flex gap-0 ${pillBase} ${standardClass}`}>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/shop">Shop</NavItem>
          <NavItem to="/experiences">Experiences</NavItem>
          <NavItem to="/play">Play</NavItem>
          <NavItem to="/events">Events</NavItem>
          <NavItem to="/community">Community</NavItem>
        </div>

        <div className={`pointer-events-auto w-[60px] ${pillBase} ${standardClass}`}>
          <MotionButton
            whileHover={{ rotate: 15, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleTheme()}
            className="w-full h-full flex items-center justify-center rounded-full bg-transparent hover:bg-white/20 dark:hover:bg-white/10 transition-colors text-jj-gray-700 dark:text-jj-yellow"
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 14.464A1 1 0 106.465 13.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm-.707-10.607a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clipRule="evenodd" /></svg>
            )}
          </MotionButton>
        </div>

        <div className={`pointer-events-auto w-[60px] ${pillBase} ${standardClass} ml-2`}>
          <Link to="/cart" className="w-full h-full flex items-center justify-center relative hover:scale-105 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-jj-gray-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-3 right-3 bg-jj-red text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Profile / Login Button */}
        <div className={`pointer-events-auto ${user ? 'w-[60px]' : 'px-0'} ${pillBase} ${user ? profileClass : 'border-0'} ml-2`}>
          {loading ? (
            <div className="flex items-center justify-center w-11 h-11">
              <Loading size={44} />
            </div>
          ) : user ? (
            <Link to="/wallet" className="flex items-center justify-center w-full h-full hover:opacity-90 transition-opacity">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-jj-purple to-jj-blue flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            </Link>
          ) : (
            <Link to="/login">
              <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 h-[52px] flex items-center justify-center rounded-full bg-[#0055ff] hover:bg-[#0044cc] dark:bg-[#003399] dark:hover:bg-[#002266] text-white text-lg font-bold shadow-md transition-colors border-0 outline-none ring-0"
              >
                Login
              </MotionButton>
            </Link>
          )}
        </div>

        {/* NEW LOGOUT BUTTON: COMPLETE RED, NO BLUR */}
        {user && (
          <div className="pointer-events-auto w-[60px] h-[60px] ml-2 flex items-center justify-center rounded-full bg-red-600 shadow-xl hover:bg-red-700 transition-colors duration-300">
            <button
              onClick={handleLogout}
              className="w-full h-full flex items-center justify-center text-white"
              title="Logout"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        )}

      </animated.div>
    </header>
  );
};

export default Header;