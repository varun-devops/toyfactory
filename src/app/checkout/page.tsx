'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Shield, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useStore();
  const router = useRouter();
  const total = cartTotal();
  const shipping = total >= 499 ? 0 : 49;
  const grandTotal = total + shipping;

  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '', landmark: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('razorpay');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const req = ['name', 'email', 'phone', 'address', 'city', 'state', 'pincode'];
    for (const k of req) {
      if (!form[k as keyof typeof form].trim()) {
        toast.error(`Please fill in ${k}`);
        return false;
      }
    }
    if (!/^\d{10}$/.test(form.phone)) { toast.error('Enter a valid 10-digit phone number'); return false; }
    if (!/^\d{6}$/.test(form.pincode)) { toast.error('Enter a valid 6-digit pincode'); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { toast.error('Enter a valid email'); return false; }
    return true;
  };

  const handleOrder = async () => {
    if (!validate()) return;
    if (cart.length === 0) { toast.error('Your cart is empty'); return; }

    setLoading(true);
    try {
      if (paymentMethod === 'cod') {
        await new Promise(r => setTimeout(r, 1000));
        clearCart();
        toast.success('🎉 Order placed successfully! Cash on Delivery.');
        router.push('/orders/success?method=cod&amount=' + grandTotal);
        return;
      }

      // Razorpay
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: grandTotal, currency: 'INR', receipt: `order_${Date.now()}` }),
      });
      const data = await res.json();

      if (!data.id) throw new Error('Order creation failed');

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
        amount: data.amount,
        currency: 'INR',
        name: 'ToyFactory India',
        description: `Order for ${cart.length} items`,
        image: '/logo.png',
        order_id: data.id,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        notes: { address: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}` },
        theme: { color: '#f97316' },
        handler: (response: Record<string, string>) => {
          clearCart();
          toast.success('🎉 Payment successful! Order confirmed.');
          router.push(`/orders/success?payment_id=${response.razorpay_payment_id}&amount=${grandTotal}`);
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    router.replace('/cart');
    return null;
  }

  const STATES = ['Andhra Pradesh', 'Delhi', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Bihar', 'Odisha', 'Assam', 'Jharkhand', 'Chhattisgarh', 'Uttarakhand', 'Himachal Pradesh', 'Jammu & Kashmir', 'Goa', 'Others'];

  return (
    <>
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-5xl mx-auto px-4">
          {/* Progress */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span className="text-orange-500 font-semibold">Cart</span>
            <ChevronRight size={14} />
            <span className="text-orange-500 font-bold bg-orange-100 px-3 py-1 rounded-full">Checkout</span>
            <ChevronRight size={14} />
            <span>Confirmation</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Delivery Form */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h2 className="font-baloo text-xl font-bold text-gray-800 mb-4">📦 Delivery Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Priya Sharma" className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-400 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="priya@example.com" className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-400 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="9876543210" maxLength={10} className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-400 text-sm" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Address *</label>
                    <textarea name="address" value={form.address} onChange={handleChange} placeholder="Flat/House No., Building, Street, Area" rows={2} className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-400 text-sm resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">City *</label>
                    <input name="city" value={form.city} onChange={handleChange} placeholder="Noida" className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-400 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">State *</label>
                    <select name="state" value={form.state} onChange={handleChange} className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-400 text-sm bg-white">
                      <option value="">Select State</option>
                      {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">PIN Code *</label>
                    <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="201301" maxLength={6} className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-400 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Landmark (Optional)</label>
                    <input name="landmark" value={form.landmark} onChange={handleChange} placeholder="Near Metro Station" className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-400 text-sm" />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h2 className="font-baloo text-xl font-bold text-gray-800 mb-4">💳 Payment Method</h2>
                <div className="space-y-3">
                  <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-colors ${paymentMethod === 'razorpay' ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="payment" value="razorpay" checked={paymentMethod === 'razorpay'} onChange={() => setPaymentMethod('razorpay')} className="accent-orange-500" />
                    <div className="flex-1">
                      <div className="font-bold text-gray-800">💳 Razorpay — Pay Online</div>
                      <div className="text-xs text-gray-500">UPI, Cards, NetBanking, Wallets — Secure & Instant</div>
                    </div>
                    <div className="flex gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                      <Shield size={12} /> SECURE
                    </div>
                  </label>
                  <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="accent-orange-500" />
                    <div>
                      <div className="font-bold text-gray-800">💰 Cash on Delivery</div>
                      <div className="text-xs text-gray-500">Pay when your order arrives. Available for orders up to ₹10,000</div>
                    </div>
                  </label>
                </div>
              </div>

              <button onClick={handleOrder} disabled={loading} className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center gap-3 shadow-lg">
                {loading ? (
                  <><span className="animate-spin">⏳</span> Processing...</>
                ) : (
                  <>{paymentMethod === 'razorpay' ? '💳 Pay ₹' + grandTotal.toLocaleString() + ' Now' : '📦 Place Order — COD'}</>
                )}
              </button>
              <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                <Shield size={12} /> Your data is 100% secure. We never store card details.
              </p>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-sm p-4">
                <h3 className="font-bold text-gray-800 mb-3">Order Items ({cart.length})</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="48px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-gray-800 line-clamp-1">{item.product.name}</div>
                        <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                        <div className="text-xs font-bold text-gray-900">₹{(item.product.price * item.quantity).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 mt-3 pt-3 space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>₹{total.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Shipping</span><span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>{shipping === 0 ? 'FREE' : '₹' + shipping}</span></div>
                  <div className="flex justify-between font-bold text-base pt-1 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-orange-600">₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-2xl p-3 text-center">
                <div className="text-green-700 font-bold text-sm">🎁 You&apos;re saving ₹{cart.reduce((s,i) => s + (i.product.mrp - i.product.price) * i.quantity, 0).toLocaleString()} on this order!</div>
              </div>

              {grandTotal >= 10000 && (
                <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-3 text-white text-center">
                  <div className="font-bold text-sm">✈️ You qualify for Korea Tour Lucky Draw!</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
