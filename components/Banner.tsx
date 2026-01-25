
import React, { forwardRef } from 'react';
import { WHATSAPP_NUMBER } from '../constants';

interface BannerProps {
  onCTAClick: () => void;
}

const Banner = forwardRef<HTMLDivElement, BannerProps>(({ onCTAClick }, ref) => {
  const adminContactMessage = "Halo Gurimin, saya ingin bertanya.";
  const adminWhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(adminContactMessage)}`;

  return (
    <div ref={ref} className="relative container mx-auto mb-12 rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-[#2d2f7a] to-[#513d8d] border border-cyan-400/30 text-center shadow-2xl shadow-cyan-500/10">
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(107,235,249,0.1),_transparent_40%)]"></div>
        <div className="relative z-10">
            <h2 className="font-orbitron text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400 drop-shadow-[0_0_10px_rgba(107,235,249,0.7)] mb-4">
                Gabung Jadi Reseller Kami!
            </h2>
            <p className="text-base sm:text-lg text-cyan-100/80 max-w-2xl mx-auto mb-8">
                Cari penghasilan tambahan? Dapatkan harga khusus reseller dan jual kembali ribuan akun premium. Mudah, cepat, dan menguntungkan!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                    onClick={onCTAClick}
                    className="bg-cyan-500 text-slate-900 font-bold py-3 px-8 rounded-lg shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 hover:shadow-xl hover:shadow-cyan-400/50 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                >
                    Lihat Peluang
                </button>
                 <a
                    href={adminWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-transparent border-2 border-cyan-400 text-cyan-300 font-bold py-3 px-8 rounded-lg hover:bg-cyan-400/20 hover:text-white transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                >
                    Kontak Admin
                </a>
            </div>
        </div>
    </div>
  );
});

export default Banner;
