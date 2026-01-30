
import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectPlan: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectPlan }) => {
  const { name, icon: Icon, features, plans } = product;

  const firstPlan = plans[0];
  const priceToShow = firstPlan?.price ?? 0;
  const originalPriceToShow = firstPlan?.originalPrice;

  const hasDiscount = originalPriceToShow && originalPriceToShow > priceToShow;
  
  let discountPercentage = 0;
  if (hasDiscount) {
    discountPercentage = Math.round(((originalPriceToShow - priceToShow) / originalPriceToShow) * 100);
  }

  const formatCurrency = (amount: number) => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);

  const handleSelectPlan = () => {
    onSelectPlan(product);
  };

  return (
    <div className="relative bg-slate-800/40 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-4 sm:p-6 flex flex-col group hover:border-cyan-400/80 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 transform hover:-translate-y-2">
      {hasDiscount && (
        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl z-10">
            HEMAT {discountPercentage}%
        </div>
      )}
      <div className="flex items-center gap-2 sm:gap-4 mb-4">
        <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white flex-shrink-0" />
        <div>
          <h3 className="text-lg sm:text-2xl font-bold font-orbitron text-cyan-300 leading-tight">{name}</h3>
          <p className="text-xs sm:text-sm text-cyan-100/70">{firstPlan?.duration || 'Tidak ada paket'}</p>
        </div>
      </div>
      <ul className="space-y-1 sm:space-y-2 text-slate-300 flex-grow mb-4 sm:mb-6 text-xs sm:text-base">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="text-center mt-auto">
        <div className="mb-4">
          <p className="text-xs text-slate-400">Mulai dari</p>
           <div className="flex items-baseline justify-center gap-2">
            <p className="text-xl sm:text-3xl font-orbitron font-bold bg-gradient-to-r from-cyan-200 to-purple-300 bg-clip-text text-transparent">
              {formatCurrency(priceToShow)}
            </p>
            {hasDiscount && (
              <p className="text-sm sm:text-base text-slate-500 line-through">
                {formatCurrency(originalPriceToShow)}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={handleSelectPlan}
          className="w-full bg-cyan-500 text-slate-900 font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 hover:shadow-xl hover:shadow-cyan-400/50 transform hover:scale-105 transition-all duration-300"
        >
          Pilih Paket
        </button>
      </div>
    </div>
  );
};

export default ProductCard;