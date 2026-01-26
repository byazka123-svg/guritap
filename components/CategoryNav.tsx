
import React from 'react';
import { categoryDisplayMap } from '../constants';

interface CategoryNavProps {
  categories: string[];
  onCategoryClick: (category: string) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ categories, onCategoryClick }) => {
  return (
    <nav className="mb-12">
      <div className="container mx-auto flex flex-wrap justify-center gap-3 sm:gap-4">
        {categories.map(category => {
          return (
            <button
              key={category}
              onClick={() => onCategoryClick(category)}
              className="py-2 px-5 rounded-full text-sm font-semibold bg-slate-800/50 border border-cyan-400/30 text-cyan-200 transition-all duration-300 transform hover:bg-cyan-400 hover:text-slate-900 hover:border-cyan-400 hover:shadow-md hover:shadow-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75"
            >
              <span className="leading-tight">{categoryDisplayMap[category] || category}</span>
            </button>
          )
        })}
      </div>
    </nav>
  );
};

export default CategoryNav;
