
import React from 'react';
import { useCart } from '../context/CartContext';
import { CartIcon, UserPlusIcon, GridIcon } from './icons';

interface BottomNavProps {
    onJoinResellerClick: () => void;
    onCartClick: () => void;
    onCategoryClick: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ onJoinResellerClick, onCartClick, onCategoryClick }) => {
    const { cartItems } = useCart();
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-slate-800/60 backdrop-blur-sm border-t border-cyan-400/30 p-2 z-40 sm:hidden">
            <div className="container mx-auto grid grid-cols-3 gap-2">
                <button onClick={onJoinResellerClick} className="flex flex-col items-center justify-center text-cyan-300 hover:bg-cyan-400/20 rounded-lg py-1 transition-colors duration-200">
                    <UserPlusIcon className="w-6 h-6 mb-1"/>
                    <span className="text-xs font-semibold">Join Reseller</span>
                </button>
                <button onClick={onCartClick} className="relative flex flex-col items-center justify-center text-cyan-300 hover:bg-cyan-400/20 rounded-lg py-1 transition-colors duration-200">
                    <CartIcon className="w-6 h-6 mb-1"/>
                    <span className="text-xs font-semibold">Keranjangku</span>
                    {totalItems > 0 && (
                        <span className="absolute top-0 right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                            {totalItems}
                        </span>
                    )}
                </button>
                <button onClick={onCategoryClick} className="flex flex-col items-center justify-center text-cyan-300 hover:bg-cyan-400/20 rounded-lg py-1 transition-colors duration-200">
                    <GridIcon className="w-6 h-6 mb-1"/>
                    <span className="text-xs font-semibold">Kategori</span>
                </button>
            </div>
        </nav>
    );
}

export default BottomNav;
