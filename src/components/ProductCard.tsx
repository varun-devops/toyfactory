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
      <div className="product-card group cursor-pointer" style={{background:'#fff'}}>

        {/* ── Image ── */}
        <div className="relative overflow-hidden" style={{aspectRatio:'1/1',background:'#f7f4f0'}}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-108"
            style={{transition:'transform 0.5s cubic-bezier(.25,.46,.45,.94)'}}
            sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{background:'linear-gradient(180deg,transparent 40%,rgba(0,0,0,0.4) 100%)'}} />

          {/* Top-left badge */}
          {product.badge && !is18 && (
            <span className="absolute top-3 left-3 text-white text-[10px] font-black tracking-wide px-2.5 py-1 rounded-full"
              style={{background:'linear-gradient(120deg,#FF6B00,#FF3D77)',boxShadow:'0 2px 8px rgba(255,107,0,0.4)'}}>
              {product.badge}
            </span>
          )}

          {/* 18+ badge */}
          {is18 && (
            <span className="absolute top-3 left-3 text-white text-[10px] font-black px-2.5 py-1 rounded-full"
              style={{background:'#111',letterSpacing:'0.05em'}}>
              🔞 18+ ONLY
            </span>
          )}

          {/* Discount */}
          <span className="absolute top-3 right-12 text-white text-[10px] font-black px-2 py-1 rounded-full"
            style={{background:'#16a34a'}}>
            {product.discount}% OFF
          </span>

          {/* Heart */}
          <button
            onClick={handleFav}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200"
            style={{
              background: isFav ? '#FF3D77' : 'rgba(255,255,255,0.92)',
              boxShadow:'0 2px 10px rgba(0,0,0,0.15)',
              transform: isFav ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            <Heart size={14} className={isFav ? 'fill-white text-white' : 'text-gray-500'} />
          </button>

          {/* Quick add on hover */}
          <button
            onClick={handleAdd}
            className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5"
            style={{background:'linear-gradient(120deg,#FF6B00,#FF3D77)',backdropFilter:'blur(4px)'}}
          >
            <ShoppingCart size={13} /> Quick Add
          </button>
        </div>

        {/* ── Info ── */}
        <div className="p-2.5 sm:p-3.5">
          {/* Brand */}
          <p className="text-[10px] font-black tracking-widest uppercase mb-1"
            style={{color:'#FF6B00'}}>
            {product.brand}
          </p>

          {/* Name */}
          <h3 className="text-sm font-bold leading-snug line-clamp-2 mb-2" style={{color:'#111',letterSpacing:'-0.01em'}}>
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2.5">
            <div className="flex">
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={10}
                  className={s <= Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'} />
              ))}
            </div>
            <span style={{fontSize:10,color:'#888'}}>({(product.reviewCount/1000).toFixed(0)}K)</span>
          </div>

          {/* Price row */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black" style={{color:'#111',letterSpacing:'-0.02em'}}>
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-xs line-through" style={{color:'#bbb'}}>
                ₹{product.mrp.toLocaleString()}
              </span>
            </div>
            <button
              onClick={handleAdd}
              className="w-9 h-9 flex items-center justify-center rounded-full transition-transform active:scale-90"
              style={{background:'linear-gradient(120deg,#FF6B00,#FF3D77)',boxShadow:'0 4px 14px rgba(255,107,0,0.35)'}}
            >
              <ShoppingCart size={15} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
