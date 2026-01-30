
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
import type { Product, BannerContent } from './types';
import { fetchProducts, fetchCategories, fetchBannerContent, ApiError } from './api';

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [bannerContent, setBannerContent] = useState<BannerContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [fetchedProducts, fetchedCategories, fetchedBannerContent] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
          fetchBannerContent()
        ]);
        setProducts(fetchedProducts);
        setCategories(fetchedCategories);
        setBannerContent(fetchedBannerContent);
      } catch (e) {
        let errorMessage: string;

        if (e instanceof ApiError) {
          if (e.status === 403) {
            errorMessage = "AKSES DITOLAK (Error 403)\n\n" +
                           "Ini berarti API Anda ada, tetapi akses publik diblokir.\n\n" +
                           "Solusi: Buka panel admin Strapi Anda, lalu pergi ke:\n" +
                           "Settings > Roles > Public\n\n" +
                           "Kemudian, untuk 'Product', 'Category', dan 'Banner', centang kotak 'find' dan 'findOne'. Simpan perubahan dan refresh halaman ini.";
          } else if (e.status === 404) {
            errorMessage = "ENDPOINT TIDAK DITEMUKAN (Error 404)\n\n" +
                           "Aplikasi tidak dapat menemukan endpoint produk/kategori/banner di server.\nPastikan URL API di file `api.ts` sudah benar dan collection/single types Anda sudah di-'publish' di Strapi.";
          } else {
            errorMessage = `Terjadi masalah saat komunikasi dengan API.\n\n[Detail Teknis: Error ${e.status} - ${e.message}]`;
          }
        } else if (e instanceof Error) {
          if (e.message.includes('Failed to fetch')) {
            errorMessage = `GAGAL KONEKSI\n\nTidak dapat terhubung ke server API.\n\nPastikan:\n1. URL API di file api.ts sudah benar.\n2. Server backend Strapi Anda sedang berjalan.\n3. Tidak ada masalah CORS atau firewall.`;
          } else {
            errorMessage = `Terjadi error yang tidak terduga.\n\n[Detail Teknis: ${e.message}]`;
          }
        } else {
            errorMessage = "Terjadi error yang tidak diketahui.";
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
          <p className="font-orbitron text-2xl text-cyan-200">Menghubungkan ke Server...</p>
        </div>
      );
    }

    if (error) {
       return (
        <div className="flex flex-col items-center justify-center text-center py-12 mx-auto max-w-2xl bg-red-900/30 border-2 border-red-500/50 rounded-2xl p-8">
          <p className="font-orbitron text-2xl text-red-400 mb-4">Oops! Gagal Memuat Data</p>
          <p className="text-slate-300 whitespace-pre-wrap text-left font-mono bg-slate-900/50 p-4 rounded-lg">{error}</p>
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
          <Header onCartClick={() => setIsCartOpen(true)} subtitle={bannerContent?.subtitle} />
          <main className="flex-grow container mx-auto px-4 py-8 sm:py-12">
            <Banner 
              ref={bannerRef} 
              onCTAClick={handleBannerCTAClick}
              title={bannerContent?.title}
              description={bannerContent?.description}
            />
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