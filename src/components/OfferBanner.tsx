'use client';
import { useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function OfferBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-[#FF6B00] via-[#FF8C00] to-[#FFB300] text-white relative overflow-hidden">
      {/* Decorative flags */}
      <div className="absolute left-2 top-0 bottom-0 flex items-center text-xl opacity-80 gap-1 pointer-events-none">
        🇮🇳 🎆
      </div>
      <div className="absolute right-10 top-0 bottom-0 flex items-center text-xl opacity-80 gap-1 pointer-events-none">
        🎆 🇮🇳
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 py-2 flex items-center justify-center gap-3 text-center text-sm font-bold">
        <span className="hidden sm:inline">🎉</span>
        <span>
          <span className="text-yellow-200 font-extrabold text-base">FREEDOM SALE 2026</span>
          <span className="mx-2">·</span>
          Up to <span className="text-yellow-200 font-extrabold">83% OFF</span> sitewide
          <span className="mx-2">·</span>
          Valid: <span className="text-yellow-200">1 Aug – 15 Aug 2026</span>
          <span className="mx-2">·</span>
          Use code:{' '}
          <span className="bg-white/20 text-white border border-white/40 px-2 py-0.5 rounded font-mono tracking-widest text-xs ml-1">
            FREEDOM26
          </span>
        </span>
        <Link
          href="/products"
          className="hidden md:inline-block ml-3 bg-white text-orange-600 text-xs font-extrabold px-4 py-1.5 rounded-full hover:bg-yellow-50 transition-colors whitespace-nowrap"
        >
          Shop Now →
        </Link>
        <button
          onClick={() => setVisible(false)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Close"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
