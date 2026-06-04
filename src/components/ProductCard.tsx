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
    toast.success('Added to cart!', { icon: '🛒' });
  };

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(product.id);
    toast(isFav ? 'Removed from wishlist' : 'Saved to wishlist ❤️');
  };

  const is18 = product.ageRating === '18+';

  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="product-card group cursor-pointer bg-white">

        {/* ── Image ── */}
        <div className="relative overflow-hidden bg-[#f7f4f0]" style={{ aspectRatio: '1 / 1' }}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(180deg,transparent 40%,rgba(0,0,0,0.4) 100%)' }} />

          {/* Top-left badge */}
          {product.badge && !is18 && (
            <span className="absolute top-2 left-2 text-white text-[9px] sm:text-[10px] font-black tracking-wide px-2 py-0.5 rounded-full"
              style={{ background: 'linear-gradient(120deg,#FF6B00,#FF3D77)', boxShadow: '0 2px 8px rgba(255,107,0,0.4)' }}>
              {product.badge}
            </span>
          )}

          {/* 18+ badge */}
          {is18 && (
            <span className="absolute top-2 left-2 text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full"
              style={{ background: '#111', letterSpacing: '0.05em' }}>
              🔞 18+
            </span>
          )}

          {/* Discount */}
          <span className="absolute top-2 right-9 sm:right-10 text-white text-[9px] sm:text-[10px] font-black px-1.5 sm:px-2 py-0.5 rounded-full"
            style={{ background: '#16a34a' }}>
            {product.discount}% OFF
          </span>

          {/* Heart */}
          <button
            onClick={handleFav}
            className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full transition-all duration-200"
            style={{
              background: isFav ? '#FF3D77' : 'rgba(255,255,255,0.92)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
              transform: isFav ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            <Heart size={12} className={isFav ? 'fill-white text-white' : 'text-gray-500'} />
          </button>

          {/* Quick add on hover */}
          <button
            onClick={handleAdd}
            className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-white text-[10px] sm:text-xs font-bold py-1.5 sm:py-2 rounded-xl flex items-center justify-center gap-1"
            style={{ background: 'linear-gradient(120deg,#FF6B00,#FF3D77)', backdropFilter: 'blur(4px)' }}
          >
            <ShoppingCart size={11} /> Quick Add
          </button>
        </div>

        {/* ── Info ── */}
        <div className="p-2 sm:p-3">
          {/* Brand */}
          <p className="text-[9px] sm:text-[10px] font-black tracking-widest uppercase mb-0.5 sm:mb-1 truncate"
            style={{ color: '#FF6B00' }}>
            {product.brand}
          </p>

          {/* Name */}
          <h3 className="text-xs sm:text-sm font-bold leading-snug line-clamp-2 mb-1.5 sm:mb-2" style={{ color: '#111', letterSpacing: '-0.01em' }}>
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-1.5 sm:mb-2.5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} size={9}
                  className={s <= Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'} />
              ))}
            </div>
            <span style={{ fontSize: 9, color: '#888' }}>({(product.reviewCount / 1000).toFixed(0)}K)</span>
          </div>

          {/* Price row */}
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-baseline gap-1 min-w-0">
              <span className="text-sm sm:text-base font-black truncate" style={{ color: '#111', letterSpacing: '-0.02em' }}>
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-[10px] sm:text-xs line-through flex-shrink-0" style={{ color: '#bbb' }}>
                ₹{product.mrp.toLocaleString()}
              </span>
            </div>
            <button
              onClick={handleAdd}
              className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 flex items-center justify-center rounded-full transition-transform active:scale-90"
              style={{ background: 'linear-gradient(120deg,#FF6B00,#FF3D77)', boxShadow: '0 4px 14px rgba(255,107,0,0.35)' }}
            >
              <ShoppingCart size={13} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
