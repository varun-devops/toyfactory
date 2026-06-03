'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useStore } from '@/lib/store';
import type { Product } from '@/lib/data/products';
import toast from 'react-hot-toast';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, favorites } = useStore();
  const isFav = favorites.includes(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`🛒 Added to cart!`, { icon: '🧸' });
  };

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(product.id);
    toast.success(isFav ? 'Removed from favourites' : '❤️ Added to favourites!');
  };

  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="product-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:border-orange-200 group relative">
        {/* Image */}
        <div className="relative h-48 sm:h-56 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {product.badge}
            </div>
          )}
          {/* Age badge for 18+ */}
          {product.ageRating === '18+' && (
            <div className="absolute top-2 right-10 bg-gray-900 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              🔞 18+
            </div>
          )}
          {/* Fav button */}
          <button onClick={handleFav} className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:scale-110 transition-transform">
            <Heart size={14} className={isFav ? 'fill-pink-500 text-pink-500' : 'text-gray-400'} />
          </button>
          {/* Discount */}
          <div className="absolute bottom-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {product.discount}% OFF
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <div className="text-xs text-orange-500 font-semibold mb-0.5">{product.brand}</div>
          <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug mb-1">{product.name}</h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={11} className={s <= Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'} />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviewCount.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            <span className="text-xs text-gray-400 line-through">₹{product.mrp.toLocaleString()}</span>
          </div>

          {/* Gender tags */}
          <div className="flex flex-wrap gap-1 mb-2">
            {product.gender.slice(0, 3).map(g => (
              <span key={g} className="text-xs bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded-full capitalize">{g}</span>
            ))}
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-95"
          >
            <ShoppingCart size={14} />
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
