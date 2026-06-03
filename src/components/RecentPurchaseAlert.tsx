'use client';
import { useEffect, useState, useCallback } from 'react';
import { RECENT_ORDERS } from '@/lib/data/products';
import { X, ShoppingBag } from 'lucide-react';

interface Alert {
  id: number;
  name: string;
  city: string;
  product: string;
}

export default function RecentPurchaseAlert() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [index, setIndex] = useState(0);

  const showNext = useCallback(() => {
    const order = RECENT_ORDERS[index % RECENT_ORDERS.length];
    const id = Date.now();
    setAlerts(prev => [...prev, { id, ...order }]);
    setIndex(i => i + 1);

    // Auto-dismiss after 4s
    setTimeout(() => {
      setAlerts(prev => prev.filter(a => a.id !== id));
    }, 4000);
  }, [index]);

  useEffect(() => {
    // First alert after 3s, then every 8s
    const first = setTimeout(showNext, 3000);
    const interval = setInterval(showNext, 8000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dismiss = (id: number) => setAlerts(prev => prev.filter(a => a.id !== id));

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2 max-w-xs pointer-events-none">
      {alerts.map(alert => (
        <div
          key={alert.id}
          className="pointer-events-auto bg-white border border-gray-100 shadow-2xl rounded-2xl px-4 py-3 flex items-start gap-3 animate-slide-in"
          style={{ animation: 'slideInLeft 0.35s ease-out' }}
        >
          {/* Icon */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-sm">
            <ShoppingBag size={15} className="text-white" />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-xs font-bold text-gray-900">{alert.name}</span>
              <span className="text-xs text-gray-400">from {alert.city}</span>
            </div>
            <div className="text-xs text-gray-600 line-clamp-2">
              just purchased <span className="font-semibold text-orange-600">{alert.product}</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-green-600 font-semibold">Verified Purchase</span>
            </div>
          </div>

          {/* Close */}
          <button
            onClick={() => dismiss(alert.id)}
            className="text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0 -mt-0.5"
          >
            <X size={13} />
          </button>
        </div>
      ))}

      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-100%) scale(0.95); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
