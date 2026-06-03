'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function SuccessContent() {
  const params = useSearchParams();
  const paymentId = params.get('payment_id');
  const amount = params.get('amount');
  const method = params.get('method');
  const orderId = `TF${Date.now().toString().slice(-8)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 text-center">
        <div className="text-7xl mb-4 animate-float">🎉</div>
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">✅</span>
        </div>
        <h1 className="font-baloo text-3xl font-bold text-gray-800 mb-2">Order Placed!</h1>
        <p className="text-gray-500 mb-6">Your order has been successfully placed and will be delivered soon!</p>

        <div className="bg-gray-50 rounded-2xl p-4 text-left space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Order ID</span>
            <span className="font-bold text-gray-800">#{orderId}</span>
          </div>
          {paymentId && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Payment ID</span>
              <span className="font-bold text-gray-800 text-xs">{paymentId}</span>
            </div>
          )}
          {amount && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Amount Paid</span>
              <span className="font-bold text-green-700">₹{Number(amount).toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Payment Method</span>
            <span className="font-bold">{method === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Expected Delivery</span>
            <span className="font-bold text-orange-600">3-5 Business Days</span>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3 mb-6">
          <div className="text-purple-700 font-bold text-sm">✈️ You are now entered in the Korea Tour Lucky Draw!</div>
          <div className="text-xs text-purple-500 mt-1">Winners announced every month</div>
        </div>

        <div className="flex gap-3">
          <Link href="/products" className="flex-1 bg-orange-500 text-white py-3 rounded-2xl font-bold hover:bg-orange-600 transition-colors text-sm">
            🛍️ Shop More
          </Link>
          <Link href="/" className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-2xl font-bold hover:bg-gray-50 transition-colors text-sm">
            🏠 Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return <Suspense><SuccessContent /></Suspense>;
}
