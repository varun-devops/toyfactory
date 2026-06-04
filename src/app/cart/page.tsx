'use client';
import { useStore } from '@/lib/store';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { cart, removeFromCart, updateQty, cartTotal } = useStore();
  const total      = cartTotal();
  const shipping   = total >= 499 ? 0 : 49;
  const grandTotal = total + shipping;
  const savings    = cart.reduce((s, i) => s + (i.product.mrp - i.product.price) * i.quantity, 0);

  if (cart.length === 0) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f9f9f9', padding: 32, gap: 16, textAlign: 'center' }}>
        <div style={{ fontSize: 72 }} className="animate-float">🛒</div>
        <h2 className="font-baloo" style={{ fontSize: 28, fontWeight: 800, color: '#333' }}>Your cart is empty!</h2>
        <p style={{ color: '#888', fontSize: 15 }}>Add some amazing toys to your cart</p>
        <Link href="/products" className="btn btn-primary" style={{ marginTop: 8 }}>
          🧸 Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f4f4f4' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px' }}>

        <h1 className="font-baloo" style={{ fontSize: 'clamp(1.5rem,4vw,2rem)', fontWeight: 800, color: '#111', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
          <ShoppingCart size={26} color="#FF6B00" />
          My Cart
          <span style={{ color: '#FF6B00' }}>({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }} className="cart-layout">

          {/* ── Cart items ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {cart.map(item => (
              <div key={item.product.id} style={{
                background: '#fff', borderRadius: 18, padding: '16px 18px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                display: 'flex', gap: 16, alignItems: 'flex-start',
              }}>
                {/* Image */}
                <Link href={`/products/${item.product.id}`} style={{
                  position: 'relative', width: 88, height: 88, borderRadius: 14,
                  overflow: 'hidden', flexShrink: 0, background: '#f7f4f0', display: 'block',
                }}>
                  <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="88px" />
                </Link>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#FF6B00', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                    {item.product.brand}
                  </div>
                  <Link href={`/products/${item.product.id}`} style={{ fontSize: 14, fontWeight: 700, color: '#111', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.product.name}
                  </Link>

                  {/* Price */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                    <span style={{ fontSize: 17, fontWeight: 900, color: '#111' }}>₹{item.product.price.toLocaleString()}</span>
                    <span style={{ fontSize: 12, color: '#ccc', textDecoration: 'line-through' }}>₹{item.product.mrp.toLocaleString()}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#16a34a' }}>{item.product.discount}% OFF</span>
                  </div>

                  {/* Qty + Remove */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 0, background: '#f4f4f4', borderRadius: 12, padding: 3 }}>
                      <button
                        onClick={() => { updateQty(item.product.id, item.quantity - 1); if (item.quantity === 1) toast.success('Removed from cart'); }}
                        style={{ width: 32, height: 32, borderRadius: 10, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', color: '#555', fontWeight: 700 }}
                      >
                        <Minus size={13} />
                      </button>
                      <span style={{ width: 36, textAlign: 'center', fontWeight: 800, fontSize: 15 }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.product.id, item.quantity + 1)}
                        style={{ width: 32, height: 32, borderRadius: 10, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', color: '#555', fontWeight: 700 }}
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, fontSize: 15, color: '#111' }}>₹{(item.product.price * item.quantity).toLocaleString()}</div>
                      <button
                        onClick={() => { removeFromCart(item.product.id); toast.success('Removed from cart'); }}
                        style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#ef4444', background: 'transparent', fontWeight: 600, marginTop: 4 }}
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Order summary ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            <div style={{ background: '#fff', borderRadius: 20, padding: '20px 22px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
              <h3 className="font-baloo" style={{ fontSize: 18, fontWeight: 800, color: '#111', marginBottom: 18 }}>Order Summary</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span style={{ fontWeight: 700 }}>₹{total.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
                  <span style={{ fontWeight: 600 }}>Total Savings</span>
                  <span style={{ fontWeight: 700 }}>−₹{savings.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Shipping</span>
                  <span style={{ fontWeight: 700, color: shipping === 0 ? '#16a34a' : '#111' }}>
                    {shipping === 0 ? 'FREE 🎉' : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 10, padding: '8px 12px', fontSize: 12, color: '#c2410c' }}>
                    Add ₹{(499 - total).toLocaleString()} more for FREE shipping!
                  </div>
                )}
              </div>

              <div style={{ borderTop: '1px solid #f0f0f0', marginTop: 16, paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, fontSize: 16 }}>Grand Total</span>
                <span style={{ fontWeight: 900, fontSize: 20, color: '#FF6B00' }}>₹{grandTotal.toLocaleString()}</span>
              </div>

              {savings > 0 && (
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '10px 14px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#16a34a', marginTop: 14 }}>
                  🎉 You save ₹{savings.toLocaleString()} on this order!
                </div>
              )}

              <Link href="/checkout" className="btn btn-primary" style={{ width: '100%', marginTop: 18, borderRadius: 16, padding: '15px 20px', fontSize: 15 }}>
                Proceed to Checkout <ArrowRight size={16} />
              </Link>
              <p style={{ textAlign: 'center', fontSize: 11, color: '#aaa', marginTop: 12 }}>
                🔒 Secured by Razorpay • 100% Safe
              </p>
            </div>

            {/* Korea draw */}
            {total >= 10000 ? (
              <div style={{ background: 'linear-gradient(120deg,#7c3aed,#ec4899)', borderRadius: 18, padding: '18px 20px', color: '#fff', textAlign: 'center' }}>
                <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 4 }}>✈️ You qualify for Korea Tour!</div>
                <div style={{ fontSize: 13, opacity: 0.9 }}>Order above ₹10,000 — enter the lucky draw!</div>
              </div>
            ) : (
              <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: 18, padding: '16px 18px', textAlign: 'center' }}>
                <div style={{ color: '#7c3aed', fontWeight: 800, fontSize: 14, marginBottom: 6 }}>✈️ Korea Tour Lucky Draw</div>
                <div style={{ fontSize: 12, color: '#9333ea', marginBottom: 10 }}>Add ₹{(10000 - total).toLocaleString()} more to qualify!</div>
                <Link href="/products" style={{ background: '#7c3aed', color: '#fff', fontSize: 12, fontWeight: 700, padding: '7px 18px', borderRadius: 99, display: 'inline-block' }}>
                  Shop More
                </Link>
              </div>
            )}

            {/* Payment icons */}
            <div style={{ background: '#fff', borderRadius: 18, padding: '16px 18px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 11, color: '#aaa', textAlign: 'center', marginBottom: 12, fontWeight: 700, letterSpacing: '0.08em' }}>ACCEPTED PAYMENTS</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                {['💳 Visa', '💳 Mastercard', '📱 UPI', '🏦 NetBanking', '💰 COD', '📲 Paytm'].map(m => (
                  <span key={m} style={{ background: '#f4f4f4', fontSize: 12, padding: '5px 12px', borderRadius: 8, color: '#555' }}>{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
