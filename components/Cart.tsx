
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { WHATSAPP_NUMBER } from '../constants';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = cartItems.reduce((total, item) => total + item.selectedPlan.price * item.quantity, 0);

  const formattedTotalPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(totalPrice);

  const handleCheckout = () => {
    setIsLoading(true);
    let message = 'Halo Gurimin, saya mau pesan:\n';
    cartItems.forEach(item => {
      message += `- ${item.name} (${item.selectedPlan.duration}) x${item.quantity}\n`;
    });
    message += `\nTotal: *${formattedTotalPrice}*`;
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        setIsLoading(false);
        onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="w-full max-w-md bg-slate-800/80 border border-cyan-400/50 rounded-2xl shadow-2xl shadow-cyan-500/20 flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-cyan-400/30">
          <h2 className="font-orbitron text-2xl font-bold text-cyan-300">Keranjang</h2>
          <button onClick={onClose} className="text-3xl leading-none font-bold text-cyan-300 hover:text-white">&times;</button>
        </header>

        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-slate-400 text-center py-8">Keranjang belanja kosong.</p>
          ) : (
            cartItems.map(item => (
              <div key={`${item.id}-${item.selectedPlan.duration}`} className="flex items-center gap-4">
                <item.icon className="w-12 h-12 flex-shrink-0 rounded-lg" />
                <div className="flex-grow">
                  <p className="font-bold text-white">{item.name}</p>
                  <p className="text-sm text-slate-400">{item.selectedPlan.duration}</p>
                  <p className="text-sm text-slate-300">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.selectedPlan.price)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.id, item.selectedPlan.duration, item.quantity - 1)} className="w-7 h-7 bg-slate-700 rounded font-bold">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.selectedPlan.duration, item.quantity + 1)} className="w-7 h-7 bg-slate-700 rounded font-bold">+</button>
                </div>
                <button onClick={() => removeFromCart(item.id, item.selectedPlan.duration)} className="text-red-400 hover:text-red-300 text-xs">Hapus</button>
              </div>
            ))
          )}
        </div>
        
        {cartItems.length > 0 && (
          <footer className="p-4 border-t border-cyan-400/30 space-y-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-300">Total</span>
              <span className="font-orbitron text-xl font-bold text-cyan-200">{formattedTotalPrice}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full bg-cyan-500 text-slate-900 font-bold py-3 px-6 rounded-lg shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 hover:shadow-xl hover:shadow-cyan-400/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center disabled:bg-cyan-700 disabled:scale-100"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Memproses...</span>
                </>
              ) : (
                'Checkout via WhatsApp'
              )}
            </button>
            <button
              onClick={onClose}
              className="w-full bg-transparent border border-slate-600 text-cyan-200 font-bold py-3 px-6 rounded-lg hover:bg-slate-700 hover:border-slate-500 transition-all duration-300"
            >
              Kembali Belanja
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};

export default Cart;
