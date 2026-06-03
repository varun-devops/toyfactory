'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Search, Menu, X, Package } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const cartCount = useStore((s) => s.cartCount());
  const favorites = useStore((s) => s.favorites);
  const router = useRouter();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) router.push(`/products?search=${encodeURIComponent(q.trim())}`);
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-md'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-3xl">🧸</span>
            <div>
              <div className="font-baloo font-800 text-xl leading-tight gradient-text">ToyFactory</div>
              <div className="text-xs text-gray-500 -mt-1">India's #1 Toy Store</div>
            </div>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                type="text"
                placeholder="Search toys, brands, categories..."
                className="w-full border-2 border-orange-200 rounded-full pl-5 pr-12 py-2 text-sm focus:outline-none focus:border-orange-400 transition-colors"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-1.5 rounded-full hover:bg-orange-600 transition-colors">
                <Search size={14} />
              </button>
            </div>
          </form>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1 text-sm">
            <Link href="/products" className="px-3 py-2 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600 font-semibold transition-colors">All Toys</Link>
            <Link href="/products?category=wellness" className="px-3 py-2 rounded-lg hover:bg-pink-50 text-gray-700 hover:text-pink-600 font-semibold transition-colors">Wellness 18+</Link>
            <Link href="/products?category=stem" className="px-3 py-2 rounded-lg hover:bg-green-50 text-gray-700 hover:text-green-600 font-semibold transition-colors">STEM</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link href="/favorites" className="relative p-2 rounded-full hover:bg-pink-50 transition-colors">
              <Heart size={22} className={favorites.length > 0 ? 'text-pink-500 fill-pink-500' : 'text-gray-600'} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">{favorites.length}</span>
              )}
            </Link>
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-orange-50 transition-colors">
              <ShoppingCart size={22} className="text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">{cartCount}</span>
              )}
            </Link>
            <Link href="/orders" className="hidden md:flex p-2 rounded-full hover:bg-gray-50 transition-colors">
              <Package size={22} className="text-gray-600" />
            </Link>
            <button onClick={() => setOpen(!open)} className="md:hidden p-2">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="md:hidden pb-3">
          <div className="relative">
            <input value={q} onChange={e => setQ(e.target.value)} type="text" placeholder="Search toys..." className="w-full border-2 border-orange-200 rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none focus:border-orange-400" />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-1.5 rounded-full">
              <Search size={14} />
            </button>
          </div>
        </form>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-1">
            {[['/', '🏠 Home'], ['/products', '🧸 All Toys'], ['/products?category=wellness', '💆 Wellness 18+'], ['/products?category=stem', '🤖 STEM Toys'], ['/cart', '🛒 Cart'], ['/favorites', '❤️ Favourites'], ['/orders', '📦 My Orders'], ['/about', '🏢 About Us'], ['/contact', '📞 Contact']].map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="block px-4 py-2.5 rounded-lg hover:bg-orange-50 text-gray-700 font-semibold">
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Category bar */}
      <div className="hidden md:block border-t border-gray-100 bg-gradient-to-r from-orange-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 flex gap-6 text-sm py-2 overflow-x-auto">
          {[['Hot Wheels', '/products?subcategory=Hot+Wheels', '🚗'], ['Plush Toys', '/products?category=plush', '🧸'], ['Dolls', '/products?category=dolls', '👗'], ['Teddies', '/products?subcategory=Teddys', '🐻'], ['STEM', '/products?category=stem', '🤖'], ['Ride-On', '/products?subcategory=Toy+cars+(Big)', '🚙'], ['Scooters', '/products?subcategory=Toy+scooters', '🛴'], ['Kitchen', '/products?category=kitchen', '👨‍🍳'], ['Dollhouses', '/products?category=houses', '🏠'], ['Collectibles', '/products?category=collectibles', '🎮'], ['Wellness 🔞', '/products?category=wellness', '💆']].map(([label, href, icon]) => (
            <Link key={href} href={href} className="whitespace-nowrap flex items-center gap-1 px-3 py-1 rounded-full hover:bg-white hover:shadow-sm text-gray-700 hover:text-orange-600 font-semibold transition-all">
              <span>{icon}</span> {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
