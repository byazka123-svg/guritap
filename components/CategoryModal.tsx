
import React from 'react';

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    categories: string[];
    onCategoryClick: (category: string) => void;
}

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
                  <div className="grid grid-cols-4 gap-3">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => onCategoryClick(category)}
                        className="flex items-center justify-center p-3 text-center bg-slate-700/50 rounded-lg text-cyan-200 transition-all duration-300 hover:bg-cyan-400 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      >
                        <span className="font-semibold text-sm leading-tight">{category}</span>
                      </button>
                    ))}
                  </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;
