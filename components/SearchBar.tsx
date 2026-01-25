
import React from 'react';
import { SearchIcon } from './icons';

interface SearchBarProps {
    value: string;
    onChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    return (
        <div className="container mx-auto mb-8">
            <div className="relative">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Cari produk impianmu..."
                    className="w-full bg-slate-800/50 border-2 border-cyan-400/30 rounded-lg py-3 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300"
                    aria-label="Cari produk"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <SearchIcon className="w-6 h-6 text-cyan-400" />
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
