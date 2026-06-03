'use client';
import Link from 'next/link';
import { Package } from 'lucide-react';

// Static demo orders page - in production connect to a real orders database
const DEMO_ORDERS = [
  { id: 'TF87654321', date: '2 Jun 2024', status: 'Delivered', total: 2998, items: 2, tracking: 'DL123456789IN' },
  { id: 'TF76543210', date: '28 May 2024', status: 'In Transit', total: 1499, items: 1, tracking: 'DL987654321IN' },
  { id: 'TF65432109', date: '20 May 2024', status: 'Delivered', total: 4497, items: 3, tracking: 'DL456789123IN' },
];

const STATUS_COLORS: Record<string, string> = {
  Delivered: 'bg-green-100 text-green-700',
  'In Transit': 'bg-blue-100 text-blue-700',
  Processing: 'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-red-100 text-red-700',
};

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-baloo text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <Package className="text-orange-500" /> My Orders
        </h1>

        <div className="space-y-4">
          {DEMO_ORDERS.map(order => (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <div className="font-bold text-gray-800">Order #{order.id}</div>
                  <div className="text-sm text-gray-500 mt-1">Placed on {order.date} • {order.items} item{order.items > 1 ? 's' : ''}</div>
                  <div className="text-sm text-gray-500">Tracking: {order.tracking}</div>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>
                    {order.status}
                  </span>
                  <div className="font-bold text-gray-900 mt-2">₹{order.total.toLocaleString()}</div>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                <button className="text-sm bg-orange-50 text-orange-600 font-semibold px-4 py-2 rounded-xl hover:bg-orange-100 transition-colors">Track Order</button>
                {order.status === 'Delivered' && (
                  <button className="text-sm bg-gray-50 text-gray-600 font-semibold px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors">Return/Refund</button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-orange-50 border border-orange-200 rounded-2xl p-5 text-center">
          <div className="text-orange-700 font-semibold mb-2">💡 Can&apos;t find your order?</div>
          <p className="text-sm text-gray-600 mb-3">Check your email for order confirmation. Need help? Contact our support team.</p>
          <Link href="/contact" className="inline-block bg-orange-500 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-orange-600 transition-colors">Contact Support</Link>
        </div>
      </div>
    </div>
  );
}
