
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <div className="w-full mt-auto bg-white/60 dark:bg-jj-gray-800/70 backdrop-blur-2xl border-t border-white/60 dark:border-white/20 shadow-2xl">
      <footer className="w-full max-w-7xl mx-auto py-10 px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                <div className="col-span-2 md:col-span-1">
                    <h2 className="text-2xl font-bold text-jj-gray-900 dark:text-white">Joy Juncture</h2>
                    <p className="text-base text-jj-gray-800 dark:text-jj-gray-300 mt-4 leading-relaxed">
                    Crafting joy, one game at a time. Join the movement of playful connection.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-jj-gray-900 dark:text-white mb-4">Explore</h3>
                    <ul className="space-y-3">
                    <li><Link to="/shop" className="text-base text-jj-gray-800 dark:text-jj-gray-300 hover:text-jj-blue transition-colors">Shop</Link></li>
                    <li><Link to="/events" className="text-base text-jj-gray-800 dark:text-jj-gray-300 hover:text-jj-blue transition-colors">Events</Link></li>
                    <li><Link to="/experiences" className="text-base text-jj-gray-800 dark:text-jj-gray-300 hover:text-jj-blue transition-colors">Experiences</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-jj-gray-900 dark:text-white mb-4">Engage</h3>
                    <ul className="space-y-3">
                    <li><Link to="/play" className="text-base text-jj-gray-800 dark:text-jj-gray-300 hover:text-jj-blue transition-colors">Play Online</Link></li>
                    <li><Link to="/community" className="text-base text-jj-gray-800 dark:text-jj-gray-300 hover:text-jj-blue transition-colors">Community</Link></li>
                    <li><Link to="/wallet" className="text-base text-jj-gray-800 dark:text-jj-gray-300 hover:text-jj-blue transition-colors">Wallet</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-jj-gray-900 dark:text-white mb-4">Company</h3>
                    <ul className="space-y-3">
                    <li><Link to="/about" className="text-base text-jj-gray-800 dark:text-jj-gray-300 hover:text-jj-blue transition-colors">About Us</Link></li>
                    <li><Link to="/login" className="text-base text-jj-gray-800 dark:text-jj-gray-300 hover:text-jj-blue transition-colors">Login</Link></li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 border-t border-jj-gray-300 dark:border-jj-gray-700 pt-8 text-center text-sm text-jj-gray-600 dark:text-jj-gray-400">
                <p>&copy; {new Date().getFullYear()} Joy Juncture. All rights reserved.</p>
            </div>
      </footer>
    </div>
  );
};

export default Footer;
