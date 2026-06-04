'use client';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS, CATEGORIES, GENDER_FILTERS } from '@/lib/data/products';
import ProductCard from '@/components/ProductCard';
import { SlidersHorizontal, X } from 'lucide-react';
import { Suspense } from 'react';

function ProductsContent() {
  const params = useSearchParams();
  const [showFilters, setShowFilters]         = useState(false);
  const [priceMax, setPriceMax]               = useState(50000);
  const [selectedGenders, setSelectedGenders] = useState<string[]>(() => { const g = params.get('gender'); return g ? [g] : []; });
  const [selectedCats, setSelectedCats]       = useState<string[]>(() => { const c = params.get('category'); return c ? [c] : []; });
  const [sort, setSort]                       = useState('featured');
  const [minRating, setMinRating]             = useState(0);

  const search      = params.get('search') || '';
  const subcategory = params.get('subcategory') || '';

  const filtered = useMemo(() => {
    let items = [...PRODUCTS];
    if (search)      { const q = search.toLowerCase(); items = items.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.tags.some(t => t.includes(q)) || p.subcategory.toLowerCase().includes(q)); }
    if (subcategory) items = items.filter(p => p.subcategory === decodeURIComponent(subcategory));
    if (selectedCats.length)    items = items.filter(p => selectedCats.includes(p.category));
    if (selectedGenders.length) items = items.filter(p => p.gender.some(g => selectedGenders.includes(g)));
    items = items.filter(p => p.price <= priceMax);
    if (minRating) items = items.filter(p => p.rating >= minRating);
    switch (sort) {
      case 'price-asc':  return items.sort((a, b) => a.price - b.price);
      case 'price-desc': return items.sort((a, b) => b.price - a.price);
      case 'rating':     return items.sort((a, b) => b.rating - a.rating);
      case 'discount':   return items.sort((a, b) => b.discount - a.discount);
      case 'bestseller': return items.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
      default:           return items.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [search, subcategory, selectedCats, selectedGenders, priceMax, minRating, sort]);

  const toggleGender   = (id: string) => setSelectedGenders(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);
  const toggleCategory = (id: string) => setSelectedCats(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  const clearAll       = () => { setSelectedGenders([]); setSelectedCats([]); setPriceMax(50000); setMinRating(0); };

  const title = search ? `Results for "${search}"` : subcategory ? decodeURIComponent(subcategory) : selectedCats.length === 1 ? (CATEGORIES.find(c => c.id === selectedCats[0])?.name || 'All Products') : 'All Products';
  const activeFilterCount = selectedGenders.length + selectedCats.length;

  return (
    <div style={{ minHeight: '100vh', background: '#f4f4f4' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(120deg,#FF6B00,#FF3D77)', padding: '28px 20px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h1 className="font-baloo" style={{ fontSize: 'clamp(1.4rem,4vw,2rem)', fontWeight: 800, color: '#fff', marginBottom: 4 }}>{title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13 }}>{filtered.length} products found</p>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 20px 48px' }}>

        {/* Controls bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          {/* Mobile filter button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: '#fff', border: '1.5px solid #e5e5e5', borderRadius: 12,
              padding: '9px 16px', fontSize: 13, fontWeight: 700, boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            <SlidersHorizontal size={15} /> Filters
            {activeFilterCount > 0 && (
              <span style={{ background: '#FF6B00', color: '#fff', fontSize: 11, width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
            <span style={{ fontSize: 13, color: '#666', fontWeight: 600 }} className="hidden sm:block">Sort:</span>
            <select
              value={sort} onChange={e => setSort(e.target.value)}
              style={{ border: '1.5px solid #e5e5e5', borderRadius: 12, padding: '9px 14px', fontSize: 13, background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', outline: 'none', fontFamily: 'inherit', color: '#111' }}
            >
              <option value="featured">Featured</option>
              <option value="bestseller">Bestsellers</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>

          {/* ── Sidebar filters ── */}
          {showFilters && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 60, background: '#fff', overflowY: 'auto', padding: 20 }} className="md:hidden">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontWeight: 800, fontSize: 18, color: '#111' }}>Filters</h3>
                <button onClick={() => setShowFilters(false)} style={{ background: '#f4f4f4', borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={18} />
                </button>
              </div>
              <FilterPanel {...{ selectedGenders, selectedCats, priceMax, minRating, toggleGender, toggleCategory, setPriceMax, setMinRating, clearAll, activeFilterCount, onApply: () => setShowFilters(false) }} />
            </div>
          )}

          <aside style={{ width: 240, flexShrink: 0 }} className="hidden md:block">
            <FilterPanel {...{ selectedGenders, selectedCats, priceMax, minRating, toggleGender, toggleCategory, setPriceMax, setMinRating, clearAll, activeFilterCount }} />
          </aside>

          {/* ── Products grid ── */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>🧸</div>
                <h3 className="font-baloo" style={{ fontSize: 22, fontWeight: 800, color: '#555', marginBottom: 8 }}>No products found</h3>
                <p style={{ color: '#aaa', fontSize: 14, marginBottom: 20 }}>Try adjusting your filters</p>
                <button onClick={clearAll} className="btn btn-primary btn-sm">Clear Filters</button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }} className="plp-grid">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

function FilterPanel({
  selectedGenders, selectedCats, priceMax, minRating,
  toggleGender, toggleCategory, setPriceMax, setMinRating,
  clearAll, activeFilterCount, onApply,
}: {
  selectedGenders: string[]; selectedCats: string[]; priceMax: number; minRating: number;
  toggleGender: (id: string) => void; toggleCategory: (id: string) => void;
  setPriceMax: (v: number) => void; setMinRating: (v: number) => void;
  clearAll: () => void; activeFilterCount: number; onApply?: () => void;
}) {
  const block = { background: '#fff', borderRadius: 18, padding: '18px 18px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: 14 };
  const heading = { fontWeight: 800, fontSize: 14, color: '#111', marginBottom: 14 };

  return (
    <div>
      {activeFilterCount > 0 && (
        <button onClick={clearAll} style={{
          width: '100%', marginBottom: 14, padding: '10px', borderRadius: 12,
          fontSize: 13, fontWeight: 700, color: '#FF6B00',
          border: '1.5px solid #ffcba4', background: '#fff7ed',
        }}>
          ✕ Clear All Filters ({activeFilterCount})
        </button>
      )}

      <div style={block}>
        <h4 style={heading}>Shop For</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {GENDER_FILTERS.map(g => (
            <label key={g.id} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '7px 8px', borderRadius: 10, transition: 'background 0.12s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#fff3ea')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
            >
              <input type="checkbox" checked={selectedGenders.includes(g.id)} onChange={() => toggleGender(g.id)} style={{ accentColor: '#FF6B00', width: 16, height: 16, cursor: 'pointer', flexShrink: 0 }} />
              <span style={{ fontSize: 16 }}>{g.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>{g.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div style={block}>
        <h4 style={heading}>Category</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 300, overflowY: 'auto' }}>
          {CATEGORIES.map(cat => (
            <label key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '7px 8px', borderRadius: 10, transition: 'background 0.12s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#fff3ea')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
            >
              <input type="checkbox" checked={selectedCats.includes(cat.id)} onChange={() => toggleCategory(cat.id)} style={{ accentColor: '#FF6B00', width: 16, height: 16, cursor: 'pointer', flexShrink: 0 }} />
              <span>{cat.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div style={block}>
        <h4 style={heading}>Max Price: ₹{priceMax.toLocaleString()}</h4>
        <input type="range" min={100} max={50000} step={100} value={priceMax} onChange={e => setPriceMax(Number(e.target.value))} style={{ width: '100%', accentColor: '#FF6B00' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#aaa', marginTop: 6 }}>
          <span>₹100</span><span>₹50,000</span>
        </div>
      </div>

      <div style={block}>
        <h4 style={heading}>Min Rating</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[4.5, 4, 3.5, 3].map(r => (
            <label key={r} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 13, color: '#333' }}>
              <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)} style={{ accentColor: '#FF6B00' }} />
              {'⭐'.repeat(Math.floor(r))} {r}+
            </label>
          ))}
        </div>
      </div>

      {onApply && (
        <button onClick={onApply} className="btn btn-primary" style={{ width: '100%', borderRadius: 14 }}>
          Apply Filters
        </button>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return <Suspense><ProductsContent /></Suspense>;
}
