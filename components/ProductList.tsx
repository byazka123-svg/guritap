
import React from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../types';

interface ProductListProps {
  products: Product[];
  categories: string[];
  onSelectPlan: (product: Product) => void;
  searchQuery: string;
}

const ProductList: React.FC<ProductListProps> = ({ products, categories, onSelectPlan, searchQuery }) => {
  const formatCategoryId = (category: string) => {
    return `category-${category.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`;
  };

  if (searchQuery) {
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <section>
        <h2 className="text-3xl font-bold font-orbitron mb-6 text-cyan-200 text-center md:text-left">
          Hasil Pencarian "{searchQuery}"
        </h2>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectPlan={onSelectPlan}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-slate-400">Oops! Produk tidak ditemukan.</p>
            <p className="text-slate-500">Coba kata kunci lain atau jelajahi kategori kami.</p>
          </div>
        )}
      </section>
    );
  }
  
  if (products.length === 0) {
    return (
        <div className="text-center py-12">
            <p className="text-xl text-slate-400">Belum ada produk yang tersedia.</p>
            <p className="text-slate-500">Silakan cek kembali nanti atau hubungi admin.</p>
        </div>
    )
  }

  const groupedProducts = products.reduce((acc, product) => {
    (acc[product.category] = acc[product.category] || []).push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="space-y-12">
      {categories.map(category => (
        groupedProducts[category] && (
          <section key={category} id={formatCategoryId(category)} data-category={category}>
            <h2 className="text-3xl font-bold font-orbitron mb-6 text-cyan-200 text-center md:text-left">{category}</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
              {groupedProducts[category].map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onSelectPlan={onSelectPlan}
                />
              ))}
            </div>
          </section>
        )
      ))}
    </div>
  );
};

export default ProductList;
