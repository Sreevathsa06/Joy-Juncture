
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useWallet } from '../contexts/WalletContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;

const Cart: React.FC = () => {
  const { cart, removeFromCart, cartTotal, clearCart } = useCart();
  const { totalPoints, addPoints } = useWallet();
  const [isProcessing, setIsProcessing] = useState(false);
  const [usePoints, setUsePoints] = useState(false);

  // Discount Logic: 10 INR off per 1,000 Points
  const availableDiscountUnits = Math.floor(totalPoints / 1000);
  const potentialDiscountAmount = availableDiscountUnits * 10;
  
  // Ensure discount doesn't exceed total
  const actualDiscountAmount = Math.min(potentialDiscountAmount, cartTotal);
  const pointsToDeduct = (actualDiscountAmount / 10) * 1000;
  
  const finalTotal = usePoints ? cartTotal - actualDiscountAmount : cartTotal;

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(async () => {
        if (usePoints && pointsToDeduct > 0) {
            await addPoints(`Redeemed discount on purchase`, -pointsToDeduct);
        }
        
        // In a real app, this would process payment
        clearCart();
        alert("Order placed successfully! Thank you for playing.");
        setIsProcessing(false);
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center max-w-2xl mx-auto px-4">
        <div className="bg-white/60 dark:bg-jj-gray-800/60 backdrop-blur-xl rounded-3xl p-12 shadow-lg border border-white/50 dark:border-white/10">
            <svg className="w-24 h-24 mx-auto text-jj-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-2xl font-bold text-jj-gray-900 dark:text-white mb-4">Your cart is empty</h2>
            <p className="text-jj-gray-600 dark:text-jj-gray-300 mb-8">Looks like you haven't discovered our games yet. Head over to the shop to find your next adventure.</p>
            <Link to="/shop" className="bg-jj-purple text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-opacity-90 transition-all">
                Browse Shop
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-jj-gray-900 dark:text-white mb-12 text-center">Your Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items List */}
            <div className="lg:w-2/3">
                <div className="bg-white/60 dark:bg-jj-gray-800/60 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 dark:border-white/10 overflow-hidden">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        <AnimatePresence>
                            {cart.map((item) => (
                                <MotionDiv 
                                    key={item.cartId}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="p-6 flex items-center gap-6"
                                >
                                    <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-bold text-jj-gray-900 dark:text-white">{item.name}</h3>
                                        <p className="text-sm text-jj-gray-500 dark:text-jj-gray-400">{item.category}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-jj-gray-900 dark:text-white">₹{item.price}</p>
                                        <button 
                                            onClick={() => removeFromCart(item.cartId)}
                                            className="text-sm text-red-500 hover:text-red-700 mt-2 font-medium"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </MotionDiv>
                            ))}
                        </AnimatePresence>
                    </ul>
                </div>
            </div>

            {/* Checkout Summary */}
            <div className="lg:w-1/3">
                <div className="bg-white/70 dark:bg-jj-gray-800/70 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 dark:border-white/10 p-8 sticky top-32">
                    <h2 className="text-2xl font-bold text-jj-gray-900 dark:text-white mb-6">Summary</h2>
                    
                    <div className="flex justify-between mb-4 text-jj-gray-700 dark:text-jj-gray-300">
                        <span>Subtotal ({cart.length} items)</span>
                        <span>₹{cartTotal}</span>
                    </div>

                    {/* Joy Points Redemption */}
                    {potentialDiscountAmount > 0 && (
                        <div className="my-6 p-4 bg-jj-yellow/10 rounded-2xl border border-jj-yellow/30">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-jj-gray-900 dark:text-white flex items-center gap-2">
                                    <span className="text-jj-orange">★</span> Joy Points
                                </span>
                                <span className="text-sm font-semibold text-jj-gray-600 dark:text-jj-gray-400">{totalPoints} Available</span>
                            </div>
                            <p className="text-xs text-jj-gray-600 dark:text-jj-gray-300 mb-4">
                                Redeem 1,000 points for ₹10 off.
                            </p>
                            
                            <label className="flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={usePoints} 
                                    onChange={(e) => setUsePoints(e.target.checked)}
                                    className="w-5 h-5 rounded text-jj-orange focus:ring-jj-orange"
                                />
                                <span className="ml-3 text-sm font-medium text-jj-gray-900 dark:text-white">
                                    Use {pointsToDeduct} points to save ₹{actualDiscountAmount}
                                </span>
                            </label>
                        </div>
                    )}

                    <hr className="border-gray-300 dark:border-gray-600 my-6" />

                    <div className="flex justify-between mb-8">
                        <span className="text-xl font-bold text-jj-gray-900 dark:text-white">Total</span>
                        <div className="text-right">
                             {usePoints && actualDiscountAmount > 0 && (
                                <span className="block text-sm text-green-500 font-medium line-through mr-2">₹{cartTotal}</span>
                            )}
                            <span className="text-2xl font-extrabold text-jj-orange">₹{finalTotal}</span>
                        </div>
                    </div>

                    <button 
                        onClick={handleCheckout}
                        disabled={isProcessing}
                        className="w-full bg-jj-gray-900 dark:bg-white text-white dark:text-jj-gray-900 font-bold py-4 rounded-full hover:opacity-90 transition-all disabled:opacity-50"
                    >
                        {isProcessing ? 'Processing...' : 'Checkout'}
                    </button>
                    
                    <p className="mt-4 text-xs text-center text-gray-500">
                        Secure checkout powered by Joy.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
