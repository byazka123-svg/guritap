
import React from 'react';
import { categoryDisplayMap } from '../constants';
import { 
  StreamingIcon, DesignIcon, AiIcon, MusicIcon, EdukasiIcon, BukuIcon, VpnIcon, UtilitasIcon 
} from './icons/CategoryIcons';

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    categories: string[];
    onCategoryClick: (category: string) => void;
}

const categoryIconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  'Streaming Film & Hiburan': StreamingIcon,
  'Desain & Editing': DesignIcon,
  'Artificial Intelligence (AI)': AiIcon,
  'Musik & Audio': MusicIcon,
  'Produktivitas & Edukasi': EdukasiIcon,
  'Buku & Literasi': BukuIcon,
  'VPN & Keamanan Internet': VpnIcon,
  'Utilitas & Sosial Media Tools': UtilitasIcon,
};


const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose, categories, onCategoryClick }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center" onClick={onClose}>
            <div 
                className="w-full bg-slate-800/90 border-t-2 border-cyan-400/50 rounded-t-2xl shadow-2xl shadow-cyan-500/20 flex flex-col max-h-[70vh]"
                onClick={e => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-cyan-400/30 sticky top-0 bg-slate-800/90">
                  <h2 className="font-orbitron text-2xl font-bold text-cyan-300">Pilih Kategori</h2>
                  <button onClick={onClose} className="text-3xl leading-none font-bold text-cyan-300 hover:text-white">&times;</button>
                </header>

                <div className="overflow-y-auto p-4">
                  <div className="grid grid-cols-1 gap-2">
                    {categories.map(category => {
                      const Icon = categoryIconMap[category];
                      return (
                        <button
                          key={category}
                          onClick={() => onCategoryClick(category)}
                          className="w-full flex items-center gap-4 text-left p-4 bg-slate-700/50 rounded-lg text-cyan-200 transition-all duration-300 hover:bg-cyan-400 hover:text-slate-900 group"
                        >
                          {Icon && <Icon className="w-8 h-8 flex-shrink-0" />}
                          <span className="font-semibold text-lg">{category}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;
