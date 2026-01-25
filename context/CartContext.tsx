
import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Product, CartItem, ProductPlan } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, plan: ProductPlan) => void;
  removeFromCart: (productId: number, planDuration: string) => void;
  updateQuantity: (productId: number, planDuration: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, plan: ProductPlan) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id && item.selectedPlan.duration === plan.duration);
      if (existingItem) {
        return prevItems.map(item =>
          (item.id === product.id && item.selectedPlan.duration === plan.duration) 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1, selectedPlan: plan }];
    });
  };

  const removeFromCart = (productId: number, planDuration: string) => {
    setCartItems(prevItems => prevItems.filter(item => !(item.id === productId && item.selectedPlan.duration === planDuration)));
  };

  const updateQuantity = (productId: number, planDuration: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, planDuration);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          (item.id === productId && item.selectedPlan.duration === planDuration) ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
