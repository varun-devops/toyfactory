'use client';
import { useStore } from '@/lib/store';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { cart, removeFromCart, updateQty, cartTotal } = useStore();
  const total = cartTotal();
  const shipping = total >= 499 ? 0 : 49;
  const grandTotal = total + shipping;
  const savings = cart.reduce((s, i) => s + (i.product.mrp - i.product.price) * i.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="text-7xl mb-4 animate-float">🛒</div>
        <h2 className="font-baloo text-3xl font-bold text-gray-700 mb-2">Your cart is empty!</h2>
        <p className="text-gray-500 mb-6">Add some amazing toys to your cart</p>
        <Link href="/products" className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors">
          🧸 Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="font-baloo text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <ShoppingCart className="text-orange-500" /> My Cart <span className="text-orange-500">({cart.length} items)</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.product.id} className="bg-white rounded-2xl p-4 shadow-sm flex gap-4">
                <Link href={`/products/${item.product.id}`} className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50">
                  <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="96px" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-orange-500 font-semibold">{item.product.brand}</div>
                  <Link href={`/products/${item.product.id}`} className="font-bold text-gray-800 text-sm line-clamp-2 hover:text-orange-600">{item.product.name}</Link>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-gray-900">₹{item.product.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 line-through">₹{item.product.mrp.toLocaleString()}</span>
                    <span className="text-xs text-green-600 font-bold">{item.product.discount}% OFF</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                      <button onClick={() => { updateQty(item.product.id, item.quantity - 1); if (item.quantity === 1) toast.success('Removed from cart'); }} className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-orange-50">
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                      <button onClick={() => updateQty(item.product.id, item.quantity + 1)} className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-orange-50">
                        <Plus size={12} />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">₹{(item.product.price * item.quantity).toLocaleString()}</div>
                      <button onClick={() => { removeFromCart(item.product.id); toast.success('Removed from cart'); }} className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 mt-1">
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h3 className="font-baloo font-bold text-lg text-gray-800 mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Subtotal ({cart.reduce((s,i) => s + i.quantity, 0)} items)</span><span>₹{total.toLocaleString()}</span></div>
                <div className="flex justify-between text-green-600 font-semibold"><span>Total Savings</span><span>-₹{savings.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Shipping</span><span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>{shipping === 0 ? 'FREE 🎉' : `₹${shipping}`}</span></div>
                {shipping > 0 && <div className="text-xs text-orange-600 bg-orange-50 rounded-lg p-2">Add ₹{(499 - total).toLocaleString()} more for FREE shipping!</div>}
              </div>
              <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between font-bold text-lg">
                <span>Grand Total</span>
                <span className="text-orange-600">₹{grandTotal.toLocaleString()}</span>
              </div>
              {savings > 0 && <div className="bg-green-50 text-green-700 text-sm font-semibold text-center rounded-xl p-2 mt-3">🎉 You save ₹{savings.toLocaleString()} on this order!</div>}
              <Link href="/checkout" className="block w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3.5 rounded-2xl font-bold text-center mt-4 hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                Proceed to Checkout <ArrowRight size={16} />
              </Link>
              <div className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                🔒 Secured by Razorpay • 100% Safe
              </div>
            </div>

            {/* Korea Promo */}
            {total >= 10000 && (
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-4 text-white text-center">
                <div className="text-xl font-bold mb-1">✈️ You qualify for Korea Tour!</div>
                <div className="text-sm opacity-90">Order above ₹10,000 — enter the lucky draw!</div>
              </div>
            )}
            {total < 10000 && (
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 text-center">
                <div className="text-purple-700 font-bold text-sm mb-1">✈️ Korea Tour Lucky Draw</div>
                <div className="text-xs text-purple-600">Add ₹{(10000 - total).toLocaleString()} more to qualify!</div>
                <Link href="/products" className="inline-block mt-2 text-xs bg-purple-600 text-white px-4 py-1.5 rounded-full font-semibold">Shop More</Link>
              </div>
            )}

            {/* Payment icons */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="text-xs text-gray-500 text-center mb-3 font-semibold">ACCEPTED PAYMENTS</div>
              <div className="flex flex-wrap gap-2 justify-center">
                {['💳 Visa', '💳 Mastercard', '📱 UPI', '🏦 NetBanking', '💰 COD', '📲 Paytm'].map(m => (
                  <span key={m} className="text-xs bg-gray-100 px-2 py-1 rounded">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
