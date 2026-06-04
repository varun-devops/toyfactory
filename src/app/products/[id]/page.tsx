'use client';
import { useParams, useRouter } from 'next/navigation';
import { PRODUCTS } from '@/lib/data/products';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, ChevronRight, Package } from 'lucide-react';
import { useStore } from '@/lib/store';
import toast from 'react-hot-toast';
import ProductCard from '@/components/ProductCard';

export default function ProductPage() {
  const { id }     = useParams();
  const product    = PRODUCTS.find(p => p.id === id);
  const router     = useRouter();
  const { addToCart, toggleFavorite, favorites } = useStore();
  const [activeImg, setActiveImg]   = useState(0);
  const [qty, setQty]               = useState(1);
  const [activeTab, setActiveTab]   = useState<'desc' | 'reviews' | 'specs'>('desc');

  if (!product) {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 32, textAlign: 'center' }}>
        <div style={{ fontSize: 64 }}>😢</div>
        <h2 className="font-baloo" style={{ fontSize: 24, fontWeight: 800, color: '#555' }}>Product not found</h2>
        <Link href="/products" className="btn btn-primary">Browse All Products</Link>
      </div>
    );
  }

  const isFav   = favorites.includes(product.id);
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const savings = (product.mrp - product.price) * qty;

  const handleAddToCart = () => { addToCart(product, qty); toast.success(`🛒 Added ${qty} × "${product.name}" to cart!`); };
  const handleBuyNow    = () => { addToCart(product, qty); router.push('/cart'); };

  const card = { background: '#fff', borderRadius: 20, padding: '20px 22px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' };

  return (
    <div style={{ minHeight: '100vh', background: '#f4f4f4' }}>

      {/* Breadcrumb */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '12px 20px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#888', overflowX: 'auto', whiteSpace: 'nowrap' }}>
          <Link href="/" style={{ color: '#888', transition: 'color 0.15s' }} onMouseEnter={e => ((e.target as HTMLElement).style.color = '#FF6B00')} onMouseLeave={e => ((e.target as HTMLElement).style.color = '#888')}>Home</Link>
          <ChevronRight size={13} />
          <Link href="/products" style={{ color: '#888' }}>Products</Link>
          <ChevronRight size={13} />
          <Link href={`/products?category=${product.category}`} style={{ color: '#888', textTransform: 'capitalize' }}>{product.category}</Link>
          <ChevronRight size={13} />
          <span style={{ color: '#333', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</span>
        </div>
      </div>

      {/* 18+ warning */}
      {product.ageRating === '18+' && (
        <div style={{ background: '#fff1f2', borderBottom: '1px solid #fecdd3', padding: '12px 20px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 10, color: '#be123c', fontSize: 13, fontWeight: 600 }}>
            <span style={{ fontSize: 20 }}>🔞</span>
            This product is for adults 18 years and above only. By proceeding, you confirm you are 18+.
          </div>
        </div>
      )}

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 20px 48px' }}>

        {/* Main 2-col layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }} className="pdp-grid">

          {/* ── Images ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ position: 'relative', borderRadius: 22, overflow: 'hidden', background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', aspectRatio: '1/1' }}>
              <Image src={product.images[activeImg]} alt={product.name} fill className="object-cover" sizes="600px" priority />
              {product.badge && (
                <div style={{ position: 'absolute', top: 14, left: 14, background: '#ef4444', color: '#fff', fontSize: 12, fontWeight: 800, padding: '5px 12px', borderRadius: 99 }}>
                  {product.badge}
                </div>
              )}
              <div style={{ position: 'absolute', top: 14, right: 14, background: '#16a34a', color: '#fff', fontSize: 12, fontWeight: 800, padding: '5px 12px', borderRadius: 99 }}>
                {product.discount}% OFF
              </div>
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} style={{
                  position: 'relative', width: 68, height: 68, borderRadius: 14, overflow: 'hidden',
                  flexShrink: 0, border: `2.5px solid ${i === activeImg ? '#FF6B00' : '#e5e5e5'}`,
                  transition: 'border-color 0.15s', background: '#f7f4f0',
                }}>
                  <Image src={img} alt="" fill className="object-cover" sizes="68px" />
                </button>
              ))}
            </div>
          </div>

          {/* ── Product info ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Name + brand */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#FF6B00', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                {product.brand}
              </div>
              <h1 className="font-baloo" style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, color: '#111', lineHeight: 1.25 }}>
                {product.name}
              </h1>
            </div>

            {/* Rating row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#16a34a', color: '#fff', padding: '5px 10px', borderRadius: 9, fontSize: 13, fontWeight: 800 }}>
                {product.rating} <Star size={12} style={{ fill: '#fff', color: '#fff' }} />
              </div>
              <span style={{ fontSize: 13, color: '#888' }}>{product.reviewCount.toLocaleString()} ratings</span>
              <span style={{ color: '#ddd' }}>|</span>
              <span style={{ color: '#16a34a', fontSize: 13, fontWeight: 700 }}>✓ In Stock ({product.stockCount})</span>
            </div>

            {/* Price block */}
            <div style={{ background: '#fff7ed', borderRadius: 18, padding: '18px 20px', border: '1px solid #fed7aa' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
                <span style={{ fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 900, color: '#111' }}>
                  ₹{product.price.toLocaleString()}
                </span>
                <span style={{ fontSize: 16, color: '#bbb', textDecoration: 'line-through' }}>₹{product.mrp.toLocaleString()}</span>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#16a34a' }}>{product.discount}% OFF</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#c2410c' }}>
                You save ₹{(product.mrp - product.price).toLocaleString()} on this product!
              </div>
            </div>

            {/* Gender tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#555' }}>For:</span>
              {product.gender.map(g => (
                <span key={g} style={{ background: '#fff7ed', color: '#c2410c', fontSize: 12, fontWeight: 700, padding: '5px 13px', borderRadius: 99, textTransform: 'capitalize' }}>{g}</span>
              ))}
              <span style={{ background: '#eff6ff', color: '#1d4ed8', fontSize: 12, fontWeight: 700, padding: '5px 13px', borderRadius: 99 }}>
                Age: {product.ageRating}
              </span>
            </div>

            {/* Quantity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#555' }}>Quantity:</span>
              <div style={{ display: 'flex', alignItems: 'center', background: '#f4f4f4', borderRadius: 14, padding: 4, gap: 0 }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 36, height: 36, borderRadius: 10, background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', fontSize: 16, fontWeight: 800, color: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                <span style={{ width: 40, textAlign: 'center', fontWeight: 800, fontSize: 16 }}>{qty}</span>
                <button onClick={() => setQty(Math.min(product.stockCount, qty + 1))} style={{ width: 36, height: 36, borderRadius: 10, background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', fontSize: 16, fontWeight: 800, color: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
              </div>
              <span style={{ fontSize: 13, color: '#888' }}>Total: <strong style={{ color: '#111' }}>₹{(product.price * qty).toLocaleString()}</strong></span>
            </div>
            {savings > 0 && <div style={{ fontSize: 13, fontWeight: 700, color: '#16a34a' }}>You save ₹{savings.toLocaleString()} 🎉</div>}

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button onClick={handleAddToCart} className="btn btn-lg" style={{ flex: 1, minWidth: 140, background: '#ff6b00', color: '#fff' }}>
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <button onClick={handleBuyNow} className="btn btn-lg btn-primary" style={{ flex: 1, minWidth: 140 }}>
                ⚡ Buy Now
              </button>
              <button
                onClick={() => { toggleFavorite(product.id); toast.success(isFav ? 'Removed' : '❤️ Saved!'); }}
                style={{
                  width: 52, height: 52, borderRadius: 16, flexShrink: 0,
                  border: `2px solid ${isFav ? '#fb7185' : '#e5e5e5'}`,
                  background: isFav ? '#fff0f5' : '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.15s',
                }}
              >
                <Heart size={20} style={{ color: isFav ? '#fb7185' : '#aaa', fill: isFav ? '#fb7185' : 'none' }} />
              </button>
            </div>

            {/* Delivery trust */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
              {[[<Truck key="t" size={18} />, 'Free Delivery', 'Orders ₹499+'], [<Shield key="s" size={18} />, 'Secure Payment', 'Razorpay'], [<RotateCcw key="r" size={18} />, '7-Day Returns', 'Hassle-free']].map(([icon, title, sub], i) => (
                <div key={i} style={{ ...card, padding: '14px 12px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ color: '#FF6B00' }}>{icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#111' }}>{title as string}</div>
                  <div style={{ fontSize: 10, color: '#888', lineHeight: 1.3 }}>{sub as string}</div>
                </div>
              ))}
            </div>

            {/* Manufacturer */}
            <div style={{ background: '#f9f9f9', borderRadius: 14, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 12, color: '#555' }}><span style={{ fontWeight: 700 }}>Manufacturer:</span> {product.manufacturer}</div>
              <div style={{ fontSize: 12, color: '#555' }}><span style={{ fontWeight: 700 }}>Address:</span> {product.manufacturerAddress}</div>
              <div style={{ fontSize: 12, color: '#555' }}><span style={{ fontWeight: 700 }}>Country of Origin:</span> {product.countryOfOrigin}</div>
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div style={{ marginTop: 48 }}>
          {/* Tab bar */}
          <div style={{ display: 'flex', gap: 6, borderBottom: '2px solid #f0f0f0', marginBottom: 28, overflowX: 'auto' }}>
            {(['desc', 'reviews', 'specs'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '12px 20px', fontWeight: 700, fontSize: 13, borderRadius: '12px 12px 0 0',
                  whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.15s',
                  background: activeTab === tab ? '#FF6B00' : 'transparent',
                  color: activeTab === tab ? '#fff' : '#666',
                  borderBottom: activeTab === tab ? '2px solid #FF6B00' : '2px solid transparent',
                }}
              >
                {tab === 'desc' ? '📋 Description' : tab === 'reviews' ? `⭐ Reviews (${product.reviewCount.toLocaleString()})` : '📦 Specs'}
              </button>
            ))}
          </div>

          {activeTab === 'desc' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }} className="tabs-desc-grid">
              <div style={card}>
                <h3 className="font-baloo" style={{ fontSize: 18, fontWeight: 800, color: '#111', marginBottom: 14 }}>About This Product</h3>
                <p style={{ fontSize: 14, color: '#555', lineHeight: 1.75 }}>{product.description}</p>
              </div>
              <div style={card}>
                <h3 className="font-baloo" style={{ fontSize: 18, fontWeight: 800, color: '#111', marginBottom: 14 }}>Key Features</h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {product.features.map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: '#444', lineHeight: 1.5 }}>
                      <span style={{ color: '#16a34a', fontWeight: 900, marginTop: 1, flexShrink: 0 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              {/* Summary */}
              <div style={{ ...card, display: 'flex', alignItems: 'center', gap: 24, marginBottom: 20, flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                  <div className="font-baloo" style={{ fontSize: 52, fontWeight: 900, color: '#111', lineHeight: 1 }}>{product.rating}</div>
                  <div style={{ display: 'flex', gap: 3, justifyContent: 'center', margin: '8px 0 4px' }}>
                    {[1,2,3,4,5].map(s => <Star key={s} size={14} style={{ fill: s <= Math.round(product.rating) ? '#f59e0b' : '#e5e7eb', color: s <= Math.round(product.rating) ? '#f59e0b' : '#e5e7eb' }} />)}
                  </div>
                  <div style={{ fontSize: 12, color: '#888' }}>{product.reviewCount.toLocaleString()} reviews</div>
                </div>
                <div style={{ flex: 1, minWidth: 160 }}>
                  {[5,4,3,2,1].map(s => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 12, width: 12, flexShrink: 0 }}>{s}</span>
                      <Star size={10} style={{ fill: '#f59e0b', color: '#f59e0b', flexShrink: 0 }} />
                      <div style={{ flex: 1, height: 8, background: '#f0f0f0', borderRadius: 99, overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: '#f59e0b', borderRadius: 99, width: `${s === 5 ? 70 : s === 4 ? 20 : s === 3 ? 7 : 2}%` }} />
                      </div>
                      <span style={{ fontSize: 11, color: '#aaa', width: 30, flexShrink: 0 }}>{s === 5 ? '70%' : s === 4 ? '20%' : s === 3 ? '7%' : '2%'}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14 }} className="reviews-pdp-grid">
                {product.reviews.map(rev => (
                  <div key={rev.id} className="review-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#FF6B00,#FF3D77)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>
                        {rev.name.charAt(0)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: '#111' }}>{rev.name}</div>
                        <div style={{ fontSize: 11, color: '#888', marginTop: 1 }}>{rev.city}, {rev.state}</div>
                      </div>
                      {rev.verified && <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 99, whiteSpace: 'nowrap' }}>✓ Verified</span>}
                    </div>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {[1,2,3,4,5].map(s => <Star key={s} size={11} style={{ fill: s <= rev.rating ? '#f59e0b' : '#e5e7eb', color: s <= rev.rating ? '#f59e0b' : '#e5e7eb' }} />)}
                    </div>
                    <p style={{ fontSize: 13, color: '#555', lineHeight: 1.65 }}>{rev.comment}</p>
                    <div style={{ fontSize: 11, color: '#ccc' }}>{rev.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              {[
                ['Material',              product.material],
                ['Weight',                product.weight],
                ['Dimensions',            product.dimensions],
                ['Age Rating',            product.ageRating],
                ['Age Group',             product.ageGroup],
                ['Country of Origin',     product.countryOfOrigin],
                ['Manufacturer',          product.manufacturer],
                ['Manufacturer Address',  product.manufacturerAddress],
              ].map(([key, val], i) => (
                <div key={key} style={{
                  display: 'grid', gridTemplateColumns: '1fr 2fr',
                  padding: '14px 20px', gap: 16,
                  background: i % 2 === 0 ? '#f9f9f9' : '#fff',
                  borderBottom: '1px solid #f0f0f0',
                }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#555' }}>{key}</span>
                  <span style={{ fontSize: 13, color: '#333' }}>{val}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <h2 className="font-baloo" style={{ fontSize: 22, fontWeight: 800, color: '#111', marginBottom: 20 }}>
              You May Also Like 🎁
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }} className="related-grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
