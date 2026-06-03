import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS, CATEGORIES, GENDER_FILTERS, RECENT_ORDERS } from '@/lib/data/products';
import ProductCard from '@/components/ProductCard';
import { Star, Truck, Shield, RotateCcw } from 'lucide-react';

export default function HomePage() {
  const featured = PRODUCTS.filter(p => p.isFeatured).slice(0, 8);
  const bestsellers = PRODUCTS.filter(p => p.isBestseller);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="text-white">
              <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-4 py-2 rounded-full mb-6">
                🎉 MEGA SALE — UP TO 83% OFF!
              </div>
              <h1 className="font-baloo text-4xl md:text-6xl font-bold leading-tight mb-4">
                India&apos;s #1<br />
                <span className="text-yellow-300">Toy Store</span><br />
                for Everyone!
              </h1>
              <p className="text-white/90 text-lg mb-8">
                Hot Wheels, Plush, STEM, Wellness &amp; more — 1000+ products with massive discounts. Delivered across India!
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/products" className="bg-white text-orange-500 font-bold px-8 py-3 rounded-full hover:shadow-xl transition-shadow text-base">
                  🛍️ Shop Now
                </Link>
                <Link href="/products?category=wellness" className="bg-white/20 backdrop-blur-sm text-white font-bold px-6 py-3 rounded-full border border-white/40 hover:bg-white/30 transition-colors text-base">
                  💆 Wellness 18+
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-white/80">
                <div className="flex items-center gap-2"><Truck size={16} /><span>Free Delivery ₹499+</span></div>
                <div className="flex items-center gap-2"><Shield size={16} /><span>100% Secure</span></div>
                <div className="flex items-center gap-2"><RotateCcw size={16} /><span>Easy Returns</span></div>
              </div>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-4">
              {PRODUCTS.slice(0, 4).map((p, i) => (
                <Link key={p.id} href={`/products/${p.id}`} className={`relative rounded-2xl overflow-hidden ${i === 0 ? 'col-span-2 h-48' : 'h-36'} shadow-xl hover:scale-105 transition-transform`}>
                  <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="300px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3">
                    <div className="text-white text-xs font-bold line-clamp-1">{p.name}</div>
                    <div className="text-yellow-300 text-xs font-bold">₹{p.price.toLocaleString()}</div>
                  </div>
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{p.discount}% OFF</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { icon: '🚚', title: 'Free Delivery', sub: 'On orders above ₹499' },
            { icon: '🔒', title: '100% Secure', sub: 'Razorpay secured checkout' },
            { icon: '↩️', title: 'Easy Returns', sub: '7-day return policy' },
            { icon: '🏆', title: 'Award Winning', sub: "India's Most Trusted" },
          ].map(item => (
            <div key={item.title} className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="font-bold text-gray-800 text-sm">{item.title}</div>
                <div className="text-xs text-gray-500">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Korea Tour Promo */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <div className="text-3xl font-baloo font-bold mb-1">✈️ WIN A FREE KOREA TOUR! 🇰🇷</div>
          <div className="text-lg opacity-90 mb-3">Buy products worth ₹10,000 or more &amp; get a chance to win an all-expenses-paid Korea Tour Package!</div>
          <Link href="/products" className="inline-block bg-white text-purple-700 font-bold px-8 py-2.5 rounded-full hover:shadow-xl transition-shadow">
            🛍️ Shop ₹10,000+ Now
          </Link>
        </div>
      </section>

      {/* Gender Filters */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-baloo text-2xl font-bold text-gray-800 mb-4 text-center">Shop By <span className="gradient-text">Who</span></h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {GENDER_FILTERS.map(g => (
              <Link key={g.id} href={`/products?gender=${g.id}`} className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border-2 font-bold text-xs sm:text-sm hover:scale-105 transition-transform ${g.color}`}>
                <span className="text-xl">{g.icon}</span>
                {g.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-baloo text-3xl font-bold text-gray-800">Shop By <span className="gradient-text">Category</span></h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {CATEGORIES.map(cat => (
              <Link key={cat.id} href={`/products?category=${cat.id}`} className="group text-center p-4 bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 hover:border-orange-200 transition-all hover:-translate-y-1">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-3xl mx-auto mb-3 group-hover:scale-110 transition-transform shadow-sm`}>
                  {cat.icon}
                </div>
                <div className="font-bold text-gray-800 text-sm">{cat.name}</div>
                <div className="text-xs text-gray-500 mt-1 line-clamp-2">{cat.description}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-10 bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-baloo text-3xl font-bold text-gray-800">⭐ Featured <span className="gradient-text">Picks</span></h2>
              <p className="text-gray-500 text-sm mt-1">Handpicked by our toy experts</p>
            </div>
            <Link href="/products" className="bg-orange-500 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-orange-600 transition-colors">View All →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-baloo text-3xl font-bold text-gray-800">🏆 Best<span className="gradient-text">sellers</span></h2>
            <Link href="/products" className="text-orange-500 font-bold text-sm hover:underline">See All →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {bestsellers.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Live Orders */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-baloo text-2xl font-bold text-gray-800 mb-6 text-center">🛒 Live Orders — People Are Shopping Now!</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {RECENT_ORDERS.map((order, i) => (
              <div key={i} className="bg-white rounded-xl p-3 shadow-sm border border-green-100 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {order.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-xs text-gray-800">{order.name}</div>
                  <div className="text-xs text-gray-500">{order.city}</div>
                  <div className="text-xs text-orange-600 font-semibold mt-0.5 line-clamp-1">{order.product}</div>
                  <div className="text-xs text-green-600 mt-0.5">✓ {order.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-orange-500 to-pink-500 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[['5L+', 'Happy Customers'], ['1000+', 'Products'], ['28', 'States Covered'], ['4.8★', 'Average Rating']].map(([num, label]) => (
            <div key={label}>
              <div className="font-baloo text-4xl font-bold mb-1">{num}</div>
              <div className="text-white/80 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-baloo text-3xl font-bold text-gray-800 text-center mb-2">What India Says <span className="gradient-text">About Us</span></h2>
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1,2,3,4,5].map(s => <Star key={s} size={20} className="fill-amber-400 text-amber-400" />)}
            <span className="font-bold text-gray-700">4.8/5 from 50,000+ reviews</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS[0].reviews.slice(0, 6).map((rev, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center text-white font-bold">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-sm">{rev.name}</div>
                    <div className="text-xs text-gray-500">{rev.city}, {rev.state}</div>
                  </div>
                  {rev.verified && <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">✓ Verified</span>}
                </div>
                <div className="flex mb-2">
                  {[1,2,3,4,5].map(s => <Star key={s} size={12} className={s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'} />)}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{rev.comment}</p>
                <div className="text-xs text-gray-400 mt-2">{rev.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Cities */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-baloo text-2xl font-bold text-gray-800 mb-4 text-center">Buy Toys Online Across India</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-6 text-sm leading-relaxed">
            ToyFactory delivers premium toys, wellness products, and STEM kits to every corner of India. Whether you are in Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Pune, or any other city — we deliver to your doorstep with free shipping on orders above ₹499.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            {['Toys in Delhi', 'Toys in Mumbai', 'Toys in Bengaluru', 'Toys in Hyderabad', 'Toys in Chennai', 'Toys in Pune', 'Toys in Noida', 'Toys in Gurugram', 'Toys in Kolkata', 'Toys in Ahmedabad', 'Toys in Jaipur', 'Toys in Lucknow', 'Hot Wheels Delhi', 'STEM Toys India', 'Imported Toys India', 'Toys NCR', 'Kids Toys Online India'].map(tag => (
              <span key={tag} className="bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-600 text-xs">{tag}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
