
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product } from '../types';

export interface CartItem extends Product {
  cartId: string; // Unique ID for the item in cart (to handle duplicates if needed)
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
      if (typeof window !== 'undefined') {
          const saved = localStorage.getItem('joy_cart');
          return saved ? JSON.parse(saved) : [];
      }
      return [];
  });

  useEffect(() => {
      localStorage.setItem('joy_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    const newItem: CartItem = { ...product, cartId: Date.now().toString() + Math.random().toString() };
    setCart(prev => [...prev, newItem]);
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const cartCount = cart.length;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
