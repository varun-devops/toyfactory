'use client';
import { useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function OfferBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-[#FF6B00] via-[#FF8C00] to-[#FFB300] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 py-2 flex items-center justify-center gap-2 text-center">
        {/* Mobile: compact single line */}
        <span className="text-xs sm:hidden font-bold leading-tight">
          <span className="text-yellow-200 font-extrabold">FREEDOM SALE</span>
          {' · '}Up to <span className="text-yellow-200 font-extrabold">83% OFF</span>
          {' · '}Code:{' '}
          <span className="bg-white/20 border border-white/40 px-1.5 py-0.5 rounded font-mono tracking-wider text-[10px]">
            FREEDOM26
          </span>
        </span>
        {/* Tablet+ */}
        <span className="hidden sm:inline text-sm font-bold">
          🎉{' '}
          <span className="text-yellow-200 font-extrabold">FREEDOM SALE 2026</span>
          {' · '}Up to <span className="text-yellow-200 font-extrabold">83% OFF</span> sitewide
          {' · '}Valid: <span className="text-yellow-200">1 Aug – 15 Aug 2026</span>
          {' · '}Use code:{' '}
          <span className="bg-white/20 border border-white/40 px-2 py-0.5 rounded font-mono tracking-widest text-xs ml-1">
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
