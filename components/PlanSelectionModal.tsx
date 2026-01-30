
import React, { useState } from 'react';
import type { Product, ProductPlan } from '../types';
import { useCart } from '../context/CartContext';

interface PlanSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
    onAddToCartSuccess: () => void;
}

const PlanSelectionModal: React.FC<PlanSelectionModalProps> = ({ isOpen, onClose, product, onAddToCartSuccess }) => {
    const { addToCart } = useCart();
    const [addedPlan, setAddedPlan] = useState<string | null>(null);
    
    if (!isOpen || !product) return null;

    const { name, icon: Icon, plans } = product;

    const formatPrice = (amount: number) => {
        if (amount >= 1000) {
            const value = new Intl.NumberFormat('id-ID').format(amount / 1000);
            return `Rp ${value}k`;
        }
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };
    
    const handleAddToCart = (plan: ProductPlan) => {
        addToCart(product, plan);
        setAddedPlan(plan.duration);
        setTimeout(() => {
            onAddToCartSuccess();
            setAddedPlan(null);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div 
                className="w-full max-w-md bg-slate-800/90 border border-cyan-400/50 rounded-2xl shadow-2xl shadow-cyan-500/20 flex flex-col max-h-[80vh]"
                onClick={e => e.stopPropagation()}
            >
                <header className="flex items-center gap-4 p-4 border-b border-cyan-400/30">
                    <Icon className="w-12 h-12 flex-shrink-0" />
                    <div>
                        <h2 className="font-orbitron text-2xl font-bold text-cyan-300">{name}</h2>
                        <p className="text-slate-400">Pilih paket yang Anda inginkan</p>
                    </div>
                    <button onClick={onClose} className="text-3xl ml-auto leading-none font-bold text-cyan-300 hover:text-white">&times;</button>
                </header>

                <div className="flex-grow overflow-y-auto p-4 space-y-3">
                    {plans.map((plan) => {
                        const isAdded = addedPlan === plan.duration;
                        return (
                            <div key={plan.duration} className="bg-slate-700/50 p-3 rounded-lg flex items-center justify-between gap-4">
                                <div>
                                    <p className="font-bold text-white">{plan.duration}</p>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-cyan-300 font-semibold">{formatPrice(plan.price)}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleAddToCart(plan)}
                                    disabled={isAdded}
                                    className="bg-cyan-500 text-slate-900 font-bold py-2 px-4 rounded-lg shadow-md shadow-cyan-500/20 hover:bg-cyan-400 transform hover:scale-105 transition-all duration-200 disabled:bg-green-500 disabled:scale-100 disabled:shadow-green-500/50"
                                >
                                    {isAdded ? 'Added!' : '+ Keranjang'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PlanSelectionModal;
