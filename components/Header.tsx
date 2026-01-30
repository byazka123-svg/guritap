
import React from 'react';
import { CartIcon } from './icons';
import { useCart } from '../context/CartContext';

interface HeaderProps {
    onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="py-6 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1"></div>
        <div className="flex-1 flex items-center justify-center gap-4">
            <img 
              src="https://ik.imagekit.io/hrctvvb3m/Guritap%20logo.png" 
              alt="Guritap Logo" 
              className="w-12 h-12 drop-shadow-[0_0_10px_rgba(107,235,249,0.7)]" 
            />
            <h1 className="font-orbitron text-4xl sm:text-5xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400 drop-shadow-[0_0_10px_rgba(107,235,249,0.7)]">
            GURITAP
            </h1>
        </div>
        <div className="flex-1 flex justify-end">
            <button 
              onClick={onCartClick} 
              className="relative text-cyan-300 hover:text-white transition-colors duration-300 hidden sm:block" 
              aria-label={`Open cart with ${totalItems} items`}
            >
                <CartIcon className="w-8 h-8"/>
                {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {totalItems}
                    </span>
                )}
            </button>
        </div>
      </div>
       <p className="text-center mt-2 text-cyan-200/80 font-light tracking-wider">Your One-Stop Premium Account Store</p>
    </header>
  );
};

export default Header;
