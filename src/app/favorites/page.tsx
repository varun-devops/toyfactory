'use client';
import { useStore } from '@/lib/store';
import { PRODUCTS } from '@/lib/data/products';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  const favorites = useStore(s => s.favorites);
  const favProducts = PRODUCTS.filter(p => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="font-baloo text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <Heart className="text-pink-500 fill-pink-500" /> My Favourites
          <span className="text-pink-500">({favProducts.length})</span>
        </h1>

        {favProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-7xl mb-4">💔</div>
            <h2 className="font-baloo text-2xl font-bold text-gray-600 mb-2">No favourites yet!</h2>
            <p className="text-gray-400 mb-6">Tap the heart icon on any product to save it here</p>
            <Link href="/products" className="bg-pink-500 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-600 transition-colors">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {favProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
