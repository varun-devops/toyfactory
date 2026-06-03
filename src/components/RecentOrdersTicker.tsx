'use client';
import { RECENT_ORDERS } from '@/lib/data/products';

export default function RecentOrdersTicker() {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white py-1.5 overflow-hidden relative">
      <div className="flex items-center gap-2 animate-ticker whitespace-nowrap">
        {[...RECENT_ORDERS, ...RECENT_ORDERS].map((order, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-4">
            <span className="text-yellow-300">🛒</span>
            <strong>{order.name}</strong> from <strong>{order.city}</strong> just ordered{' '}
            <strong>&quot;{order.product}&quot;</strong>
            <span className="text-yellow-200 text-xs">{order.time}</span>
            <span className="text-orange-200 mx-2">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
