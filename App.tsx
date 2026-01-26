
import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import Cart from './components/Cart';
import CategoryNav from './components/CategoryNav';
import Banner from './components/Banner';
import SearchBar from './components/SearchBar';
import BottomNav from './components/BottomNav';
import CategoryModal from './components/CategoryModal';
import PlanSelectionModal from './components/PlanSelectionModal';
import { CartProvider } from './context/CartContext';
import type { Product } from './types';
import { fetchProducts, fetchCategories } from './api';

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Fetch both products and categories concurrently
        const [fetchedProducts, fetchedCategories] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ]);
        setProducts(fetchedProducts);
        setCategories(fetchedCategories);
      } catch (e) {
        let errorMessage = "Gagal memuat data. Pastikan backend Strapi Anda berjalan dan dapat diakses.";
        if (e instanceof Error) {
            // Provide more specific feedback for common issues
            if (e.message.includes('Failed to fetch')) {
                 errorMessage += `\n\n[Detail Teknis: Gagal melakukan koneksi]. Ini seringkali disebabkan oleh masalah CORS di backend Strapi atau server backend sedang tidak aktif.`;
            } else if (e.message.includes('Forbidden')) {
                errorMessage += `\n\n[Detail Teknis: Akses Ditolak (403)]. Pastikan Anda telah memberikan izin 'find' dan 'findOne' untuk 'Product' dan 'Category' pada role 'Public' di Pengaturan Strapi.`;
            } else {
                 errorMessage += `\n\n[Detail Teknis: ${e.message}]`;
            }
        }
        setError(errorMessage);
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleProductAdded = () => {
    setIsPlanModalOpen(false);
    setIsCartOpen(true);
  };
  
  const handleSelectPlan = (product: Product) => {
    setSelectedProduct(product);
    setIsPlanModalOpen(true);
  }

  const formatCategoryId = (category: string) => {
    return `category-${category.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`;
  };

  const handleCategoryClick = (category: string) => {
    setSearchQuery(''); 
    setTimeout(() => {
        const categoryId = formatCategoryId(category);
        const element = document.getElementById(categoryId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsCategoryModalOpen(false);
    }, 0);
  };
  
  const handleScrollToBanner = () => {
    bannerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleBannerCTAClick = () => {
    if (categories.length > 0) {
      handleCategoryClick(categories[0]);
    }
  };
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <svg className="animate-spin h-10 w-10 text-cyan-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="font-orbitron text-2xl text-cyan-200">Memuat Data...</p>
        </div>
      );
    }

    if (error) {
       return (
        <div className="flex flex-col items-center justify-center text-center py-12 mx-auto max-w-2xl bg-red-900/30 border-2 border-red-500/50 rounded-2xl p-8 whitespace-pre-wrap">
          <p className="font-orbitron text-2xl text-red-400 mb-2">Oops! Terjadi Kesalahan</p>
          <p className="text-slate-300">{error}</p>
        </div>
      );
    }

    return (
       <ProductList 
          products={products}
          categories={categories}
          onSelectPlan={handleSelectPlan}
          searchQuery={searchQuery}
       />
    );
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#1a1c4b] via-[#2d2f7a] to-[#513d8d] text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="relative z-10 flex flex-col min-h-screen pb-20 sm:pb-0">
          <Header onCartClick={() => setIsCartOpen(true)} />
          <main className="flex-grow container mx-auto px-4 py-8 sm:py-12">
            <Banner ref={bannerRef} onCTAClick={handleBannerCTAClick} />
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            
            {!searchQuery && (
              <CategoryNav 
                categories={categories} 
                onCategoryClick={handleCategoryClick} 
              />
            )}

            {renderContent()}
          </main>
          <Footer />
        </div>
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <PlanSelectionModal
          isOpen={isPlanModalOpen}
          onClose={() => setIsPlanModalOpen(false)}
          product={selectedProduct}
          onAddToCartSuccess={handleProductAdded}
        />
        <CategoryModal 
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          categories={categories}
          onCategoryClick={handleCategoryClick}
        />
        <BottomNav 
          onJoinResellerClick={handleScrollToBanner}
          onCartClick={() => setIsCartOpen(true)}
          onCategoryClick={() => setIsCategoryModalOpen(true)}
        />
      </div>
    </CartProvider>
  );
};

export default App;
