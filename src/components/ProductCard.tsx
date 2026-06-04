'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useStore } from '@/lib/store';
import type { Product } from '@/lib/data/products';
import toast from 'react-hot-toast';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, favorites } = useStore();
  const isFav  = favorites.includes(product.id);
  const is18   = product.ageRating === '18+';

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

  return (
    <Link href={`/products/${product.id}`} style={{ display: 'block', textDecoration: 'none' }}>
      <div className="product-card" style={{ height: '100%' }}>

        {/* ── Image ── */}
        <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: '#f7f4f0' }}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            style={{ transition: 'transform 0.45s ease' }}
            sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
          />

          {/* Hover overlay */}
          <div className="img-hover-overlay" style={{
            position: 'absolute', inset: 0, opacity: 0,
            background: 'linear-gradient(180deg,transparent 40%,rgba(0,0,0,0.38) 100%)',
            transition: 'opacity 0.3s',
          }} />

          {/* Top-left badge */}
          {product.badge && !is18 && (
            <span style={{
              position: 'absolute', top: 8, left: 8,
              background: 'linear-gradient(120deg,#FF6B00,#FF3D77)',
              color: '#fff', fontSize: 10, fontWeight: 900,
              padding: '3px 9px', borderRadius: 99,
              boxShadow: '0 2px 8px rgba(255,107,0,0.4)',
            }}>
              {product.badge}
            </span>
          )}

          {is18 && (
            <span style={{
              position: 'absolute', top: 8, left: 8,
              background: '#111', color: '#fff', fontSize: 10,
              fontWeight: 900, padding: '3px 9px', borderRadius: 99,
            }}>
              🔞 18+
            </span>
          )}

          {/* Discount top-right (leave room for heart) */}
          <span style={{
            position: 'absolute', top: 8, right: 44,
            background: '#16a34a', color: '#fff', fontSize: 10,
            fontWeight: 900, padding: '3px 8px', borderRadius: 99,
          }}>
            {product.discount}% OFF
          </span>

          {/* Heart */}
          <button
            onClick={handleFav}
            style={{
              position: 'absolute', top: 8, right: 8,
              width: 32, height: 32, borderRadius: '50%',
              background: isFav ? '#FF3D77' : 'rgba(255,255,255,0.95)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.14)',
              transition: 'transform 0.2s, background 0.2s',
              transform: isFav ? 'scale(1.12)' : 'scale(1)',
            }}
            aria-label="Toggle wishlist"
          >
            <Heart size={13} style={{ color: isFav ? '#fff' : '#777', fill: isFav ? '#fff' : 'none' }} />
          </button>

          {/* Quick add — shows on hover */}
          <button
            onClick={handleAdd}
            className="quick-add-btn"
            style={{
              position: 'absolute', bottom: 10, left: 10, right: 10,
              background: 'linear-gradient(120deg,#FF6B00,#FF3D77)',
              color: '#fff', fontSize: 11, fontWeight: 800,
              padding: '8px 12px', borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
              opacity: 0, transform: 'translateY(6px)',
              transition: 'opacity 0.25s, transform 0.25s',
            }}
          >
            <ShoppingCart size={12} /> Quick Add
          </button>
        </div>

        {/* ── Info ── */}
        <div className="product-card__body">
          {/* Brand */}
          <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FF6B00' }}>
            {product.brand}
          </p>

          {/* Name */}
          <h3 className="line-clamp-2" style={{ fontSize: 13, fontWeight: 700, color: '#111', lineHeight: 1.4, letterSpacing: '-0.01em' }}>
            {product.name}
          </h3>

          {/* Stars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ display: 'flex', gap: 1 }}>
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={10} style={{ fill: s <= Math.round(product.rating) ? '#f59e0b' : '#e5e7eb', color: s <= Math.round(product.rating) ? '#f59e0b' : '#e5e7eb' }} />
              ))}
            </div>
            <span style={{ fontSize: 10, color: '#999' }}>({(product.reviewCount / 1000).toFixed(0)}K)</span>
          </div>

          {/* Price row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4, marginTop: 2 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, minWidth: 0 }}>
              <span style={{ fontSize: 15, fontWeight: 900, color: '#111', letterSpacing: '-0.02em' }}>
                ₹{product.price.toLocaleString()}
              </span>
              <span style={{ fontSize: 11, color: '#ccc', textDecoration: 'line-through', flexShrink: 0 }}>
                ₹{product.mrp.toLocaleString()}
              </span>
            </div>
            <button
              onClick={handleAdd}
              style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(120deg,#FF6B00,#FF3D77)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(255,107,0,0.32)',
                transition: 'transform 0.15s',
              }}
              aria-label="Add to cart"
            >
              <ShoppingCart size={13} style={{ color: '#fff' }} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .product-card:hover .img-hover-overlay { opacity: 1 !important; }
        .product-card:hover .quick-add-btn     { opacity: 1 !important; transform: translateY(0) !important; }
      `}</style>
    </Link>
  );
}
