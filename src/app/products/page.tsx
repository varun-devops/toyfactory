'use client';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS, CATEGORIES, GENDER_FILTERS } from '@/lib/data/products';
import ProductCard from '@/components/ProductCard';
import { SlidersHorizontal, X } from 'lucide-react';
import { Suspense } from 'react';

function ProductsContent() {
  const params = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [priceMax, setPriceMax] = useState(50000);
  const [selectedGenders, setSelectedGenders] = useState<string[]>(() => {
    const g = params.get('gender');
    return g ? [g] : [];
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const c = params.get('category');
    return c ? [c] : [];
  });
  const [sort, setSort] = useState('featured');
  const [minRating, setMinRating] = useState(0);

  const search = params.get('search') || '';
  const subcategory = params.get('subcategory') || '';

  const filtered = useMemo(() => {
    let items = [...PRODUCTS];

    if (search) {
      const q = search.toLowerCase();
      items = items.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q)) ||
        p.subcategory.toLowerCase().includes(q)
      );
    }
    if (subcategory) items = items.filter(p => p.subcategory === decodeURIComponent(subcategory));
    if (selectedCategories.length) items = items.filter(p => selectedCategories.includes(p.category));
    if (selectedGenders.length) items = items.filter(p => p.gender.some(g => selectedGenders.includes(g)));
    items = items.filter(p => p.price <= priceMax);
    if (minRating) items = items.filter(p => p.rating >= minRating);

    switch (sort) {
      case 'price-asc': return items.sort((a, b) => a.price - b.price);
      case 'price-desc': return items.sort((a, b) => b.price - a.price);
      case 'rating': return items.sort((a, b) => b.rating - a.rating);
      case 'discount': return items.sort((a, b) => b.discount - a.discount);
      case 'bestseller': return items.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
      default: return items.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [search, subcategory, selectedCategories, selectedGenders, priceMax, minRating, sort]);

  const toggleGender = (id: string) => setSelectedGenders(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);
  const toggleCategory = (id: string) => setSelectedCategories(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  const clearAll = () => { setSelectedGenders([]); setSelectedCategories([]); setPriceMax(50000); setMinRating(0); };

  const title = search ? `Results for "${search}"` : subcategory ? decodeURIComponent(subcategory) : selectedCategories.length === 1 ? CATEGORIES.find(c => c.id === selectedCategories[0])?.name || 'All Products' : 'All Products';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-baloo text-2xl sm:text-3xl font-bold text-white">{title}</h1>
          <p className="text-white/80 mt-1 text-sm">{filtered.length} products found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Mobile filter button & sort */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 sm:px-4 py-2 text-sm font-semibold shadow-sm md:hidden">
            <SlidersHorizontal size={16} /> Filters
            {(selectedGenders.length + selectedCategories.length) > 0 && (
              <span className="bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{selectedGenders.length + selectedCategories.length}</span>
            )}
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-gray-600 hidden sm:block">Sort:</span>
            <select value={sort} onChange={e => setSort(e.target.value)} className="border border-gray-200 rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-white shadow-sm focus:outline-none focus:border-orange-400">
              <option value="featured">Featured</option>
              <option value="bestseller">Bestsellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 lg:gap-6">
          {/* Sidebar Filters — desktop always visible, mobile slides over as overlay */}
          <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-white overflow-y-auto p-4' : 'hidden'} md:block md:static md:z-auto md:bg-transparent md:p-0 md:w-56 lg:w-64 flex-shrink-0`}>
            {showFilters && (
              <div className="flex items-center justify-between mb-4 md:hidden">
                <h3 className="font-bold text-lg">Filters</h3>
                <button onClick={() => setShowFilters(false)}><X /></button>
              </div>
            )}

            <div className="space-y-5">
              {/* Clear */}
              {(selectedGenders.length + selectedCategories.length) > 0 && (
                <button onClick={clearAll} className="w-full text-sm text-orange-600 font-semibold border border-orange-200 rounded-xl py-2 hover:bg-orange-50">
                  Clear All Filters
                </button>
              )}

              {/* Gender */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-3">Shop For</h4>
                <div className="space-y-2">
                  {GENDER_FILTERS.map(g => (
                    <label key={g.id} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-1.5">
                      <input type="checkbox" checked={selectedGenders.includes(g.id)} onChange={() => toggleGender(g.id)} className="accent-orange-500 w-4 h-4" />
                      <span className="text-lg">{g.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{g.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-3">Category</h4>
                <div className="space-y-2">
                  {CATEGORIES.map(cat => (
                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-1.5">
                      <input type="checkbox" checked={selectedCategories.includes(cat.id)} onChange={() => toggleCategory(cat.id)} className="accent-orange-500 w-4 h-4" />
                      <span>{cat.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-3">Max Price: ₹{priceMax.toLocaleString()}</h4>
                <input type="range" min={100} max={50000} step={100} value={priceMax} onChange={e => setPriceMax(Number(e.target.value))} className="w-full accent-orange-500" />
                <div className="flex justify-between text-xs text-gray-500 mt-1"><span>₹100</span><span>₹50,000</span></div>
              </div>

              {/* Rating */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-3">Min Rating</h4>
                {[4.5, 4, 3.5, 3].map(r => (
                  <label key={r} className="flex items-center gap-2 cursor-pointer py-1">
                    <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)} className="accent-orange-500" />
                    <span className="text-sm">{'⭐'.repeat(Math.floor(r))} {r}+</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-16 sm:py-20">
                <div className="text-5xl sm:text-6xl mb-4">🧸</div>
                <h3 className="font-baloo text-xl sm:text-2xl font-bold text-gray-600">No products found</h3>
                <p className="text-gray-400 mt-2 text-sm">Try adjusting your filters</p>
                <button onClick={clearAll} className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-full font-bold hover:bg-orange-600 text-sm">Clear Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsContent />
    </Suspense>
  );
}
