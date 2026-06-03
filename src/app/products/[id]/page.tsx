'use client';
import { useParams, useRouter } from 'next/navigation';
import { PRODUCTS } from '@/lib/data/products';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, ChevronRight, Package } from 'lucide-react';
import { useStore } from '@/lib/store';
import toast from 'react-hot-toast';
import ProductCard from '@/components/ProductCard';

export default function ProductPage() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  const router = useRouter();
  const { addToCart, toggleFavorite, favorites } = useStore();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'reviews' | 'specs'>('desc');

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-6xl mb-4">😢</div>
        <h2 className="font-baloo text-2xl font-bold text-gray-700">Product not found</h2>
        <Link href="/products" className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-full font-bold">Browse All Products</Link>
      </div>
    );
  }

  const isFav = favorites.includes(product.id);
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, qty);
    toast.success(`🛒 Added ${qty} × "${product.name}" to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    router.push('/cart');
  };

  const savings = (product.mrp - product.price) * qty;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 text-sm text-gray-500">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <ChevronRight size={14} />
          <Link href="/products" className="hover:text-orange-500">Products</Link>
          <ChevronRight size={14} />
          <Link href={`/products?category=${product.category}`} className="hover:text-orange-500 capitalize">{product.category}</Link>
          <ChevronRight size={14} />
          <span className="text-gray-800 font-medium line-clamp-1">{product.name}</span>
        </div>
      </div>

      {/* Age warning for 18+ */}
      {product.ageRating === '18+' && (
        <div className="bg-red-50 border-b border-red-200 py-3">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-red-700 text-sm font-semibold">
            <span className="text-xl">🔞</span>
            This product is for adults 18 years and above only. By proceeding, you confirm you are 18+.
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-3">
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-sm aspect-square">
              <Image src={product.images[activeImg]} alt={product.name} fill className="object-cover" sizes="600px" priority />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">{product.badge}</div>
              )}
              <div className="absolute top-4 right-4 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">{product.discount}% OFF</div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-colors ${i === activeImg ? 'border-orange-500' : 'border-gray-200'}`}>
                  <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div>
              <div className="text-sm font-semibold text-orange-500 mb-1">{product.brand}</div>
              <h1 className="font-baloo text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-green-600 text-white px-2.5 py-1 rounded-lg text-sm font-bold">
                {product.rating} <Star size={12} className="fill-white" />
              </div>
              <span className="text-gray-500 text-sm">{product.reviewCount.toLocaleString()} ratings</span>
              <span className="text-gray-300">|</span>
              <span className="text-green-600 text-sm font-semibold">✓ In Stock ({product.stockCount})</span>
            </div>

            {/* Price */}
            <div className="bg-orange-50 rounded-2xl p-4">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-4xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                <span className="text-lg text-gray-400 line-through">₹{product.mrp.toLocaleString()}</span>
                <span className="text-green-600 font-bold text-lg">{product.discount}% OFF</span>
              </div>
              <div className="text-green-700 font-semibold text-sm">You save ₹{(product.mrp - product.price).toLocaleString()} on this product!</div>
            </div>

            {/* Gender Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 font-semibold">For:</span>
              {product.gender.map(g => (
                <span key={g} className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold capitalize">{g}</span>
              ))}
              <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">Age: {product.ageRating}</span>
            </div>

            {/* Qty */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-700">Quantity:</span>
              <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded-lg bg-white shadow-sm font-bold text-gray-700 hover:bg-orange-50 transition-colors">−</button>
                <span className="w-8 text-center font-bold">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stockCount, qty + 1))} className="w-8 h-8 rounded-lg bg-white shadow-sm font-bold text-gray-700 hover:bg-orange-50 transition-colors">+</button>
              </div>
              <span className="text-sm text-gray-500">Total: <strong>₹{(product.price * qty).toLocaleString()}</strong></span>
            </div>
            {savings > 0 && <div className="text-green-600 text-sm font-semibold">You save ₹{savings.toLocaleString()} 🎉</div>}

            {/* CTAs */}
            <div className="flex gap-3">
              <button onClick={handleAddToCart} className="flex-1 flex items-center justify-center gap-2 bg-orange-500 text-white py-3.5 rounded-2xl font-bold text-base hover:bg-orange-600 transition-colors active:scale-95">
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <button onClick={handleBuyNow} className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3.5 rounded-2xl font-bold text-base hover:opacity-90 transition-opacity active:scale-95">
                ⚡ Buy Now
              </button>
              <button onClick={() => { toggleFavorite(product.id); toast.success(isFav ? 'Removed' : '❤️ Saved!'); }} className={`w-14 flex items-center justify-center rounded-2xl border-2 ${isFav ? 'border-pink-400 bg-pink-50' : 'border-gray-200 bg-white'} transition-colors`}>
                <Heart size={20} className={isFav ? 'fill-pink-500 text-pink-500' : 'text-gray-400'} />
              </button>
            </div>

            {/* Delivery */}
            <div className="grid grid-cols-3 gap-3">
              {[[<Truck key="t" size={18} />, 'Free Delivery', 'Orders ₹499+'], [<Shield key="s" size={18} />, 'Secure Payment', 'Razorpay'], [<RotateCcw key="r" size={18} />, '7-Day Returns', 'Hassle-free']].map(([icon, title, sub], i) => (
                <div key={i} className="text-center bg-white rounded-xl p-3 shadow-sm">
                  <div className="flex justify-center text-orange-500 mb-1">{icon}</div>
                  <div className="text-xs font-bold text-gray-800">{title as string}</div>
                  <div className="text-xs text-gray-500">{sub as string}</div>
                </div>
              ))}
            </div>

            {/* Manufacturer */}
            <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-600 space-y-1">
              <div><span className="font-semibold">Manufacturer:</span> {product.manufacturer}</div>
              <div><span className="font-semibold">Address:</span> {product.manufacturerAddress}</div>
              <div><span className="font-semibold">Country of Origin:</span> {product.countryOfOrigin}</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10">
          <div className="flex border-b border-gray-200 mb-6 gap-1">
            {(['desc', 'reviews', 'specs'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 font-semibold text-sm rounded-t-xl transition-colors capitalize ${activeTab === tab ? 'bg-orange-500 text-white' : 'text-gray-600 hover:text-orange-500'}`}>
                {tab === 'desc' ? '📋 Description' : tab === 'reviews' ? `⭐ Reviews (${product.reviewCount.toLocaleString()})` : '📦 Specifications'}
              </button>
            ))}
          </div>

          {activeTab === 'desc' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-baloo text-xl font-bold text-gray-800 mb-3">About This Product</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
              <div>
                <h3 className="font-baloo text-xl font-bold text-gray-800 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-500 font-bold mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center gap-4 mb-6 bg-white rounded-2xl p-5 shadow-sm">
                <div className="text-center">
                  <div className="font-baloo text-5xl font-bold text-gray-900">{product.rating}</div>
                  <div className="flex justify-center my-1">
                    {[1,2,3,4,5].map(s => <Star key={s} size={16} className={s <= Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'} />)}
                  </div>
                  <div className="text-sm text-gray-500">{product.reviewCount.toLocaleString()} reviews</div>
                </div>
                <div className="flex-1">
                  {[5,4,3,2,1].map(s => (
                    <div key={s} className="flex items-center gap-2 mb-1">
                      <span className="text-xs w-4">{s}</span>
                      <Star size={10} className="fill-amber-400 text-amber-400" />
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{width: `${s === 5 ? 70 : s === 4 ? 20 : s === 3 ? 7 : 2}%`}} />
                      </div>
                      <span className="text-xs text-gray-500 w-8">{s === 5 ? '70%' : s === 4 ? '20%' : s === 3 ? '7%' : '2%'}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {product.reviews.map(rev => (
                  <div key={rev.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {rev.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-gray-800">{rev.name}</div>
                        <div className="text-xs text-gray-500">{rev.city}, {rev.state}</div>
                      </div>
                      {rev.verified && <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">✓ Verified</span>}
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {[1,2,3,4,5].map(s => <Star key={s} size={11} className={s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'} />)}
                    </div>
                    <p className="text-sm text-gray-600">{rev.comment}</p>
                    <div className="text-xs text-gray-400 mt-2">{rev.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {[
                ['Material', product.material],
                ['Weight', product.weight],
                ['Dimensions', product.dimensions],
                ['Age Rating', product.ageRating],
                ['Age Group', product.ageGroup],
                ['Country of Origin', product.countryOfOrigin],
                ['Manufacturer', product.manufacturer],
                ['Manufacturer Address', product.manufacturerAddress],
              ].map(([key, val], i) => (
                <div key={key} className={`grid grid-cols-2 py-3 px-5 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <span className="text-sm font-semibold text-gray-700">{key}</span>
                  <span className="text-sm text-gray-600">{val}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-baloo text-2xl font-bold text-gray-800 mb-5">You May Also Like 🎁</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
