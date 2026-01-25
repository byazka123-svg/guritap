
import React from 'react';
import { categoryDisplayMap } from '../constants';
import { 
  StreamingIcon, DesignIcon, AiIcon, MusicIcon, EdukasiIcon, BukuIcon, VpnIcon, UtilitasIcon 
} from './icons/CategoryIcons';

interface CategoryNavProps {
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

const CategoryNav: React.FC<CategoryNavProps> = ({ categories, onCategoryClick }) => {
  return (
    <nav className="mb-12">
      <div className="container mx-auto grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-4 justify-items-center">
        {categories.map(category => {
          const Icon = categoryIconMap[category];
          return (
            <button
              key={category}
              onClick={() => onCategoryClick(category)}
              className="w-24 h-24 rounded-full flex flex-col items-center justify-center p-2 text-center text-sm font-bold bg-slate-800/50 text-cyan-200 transition-all duration-300 transform hover:bg-cyan-400 hover:text-slate-900 hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 group"
            >
              {Icon && <Icon className="w-8 h-8 mb-1 transition-transform duration-300 group-hover:scale-110" />}
              <span className="leading-tight">{categoryDisplayMap[category] || category}</span>
            </button>
          )
        })}
      </div>
    </nav>
  );
};

export default CategoryNav;
