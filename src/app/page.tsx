import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS, CATEGORIES, GENDER_FILTERS, RECENT_ORDERS } from '@/lib/data/products';
import ProductCard from '@/components/ProductCard';
import { Star, Truck, Shield, RotateCcw } from 'lucide-react';

export default function HomePage() {
  const featured    = PRODUCTS.filter(p => p.isFeatured).slice(0, 8);
  const bestsellers = PRODUCTS.filter(p => p.isBestseller);

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ padding: 0, background: 'linear-gradient(135deg,#ff6b00 0%,#ff3d77 50%,#7c3aed 100%)', overflow: 'hidden' }}>
        <div className="inner" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 40 }} className="md-hero-grid">
            {/* Left */}
            <div style={{ color: '#fff' }}>
              <div style={{
                display: 'inline-block', background: 'rgba(255,255,255,0.18)',
                backdropFilter: 'blur(12px)', borderRadius: 999, padding: '8px 20px',
                fontSize: 13, fontWeight: 800, marginBottom: 24, letterSpacing: '0.04em',
              }}>
                🎉 MEGA SALE — UP TO 83% OFF!
              </div>

              <h1 className="font-baloo" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: 16 }}>
                India&apos;s #1<br />
                <span style={{ color: '#fde047' }}>Toy Store</span><br />
                for Everyone!
              </h1>

              <p style={{ fontSize: 16, opacity: 0.92, maxWidth: 440, marginBottom: 32, lineHeight: 1.7 }}>
                Hot Wheels, Plush, STEM, Wellness &amp; more — 1000+ products with massive discounts. Delivered across India!
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
                <Link href="/products" className="btn btn-lg" style={{ background: '#fff', color: '#FF6B00', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
                  🛍️ Shop Now
                </Link>
                <Link href="/products?category=wellness" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', border: '2px solid rgba(255,255,255,0.5)', boxShadow: 'none' }}>
                  💆 Wellness 18+
                </Link>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, fontSize: 13, opacity: 0.85 }}>
                {[[<Truck key="t" size={15} />, 'Free Delivery ₹499+'], [<Shield key="s" size={15} />, '100% Secure'], [<RotateCcw key="r" size={15} />, 'Easy Returns']].map(([icon, text]) => (
                  <div key={text as string} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fff' }}>
                    {icon}{text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — product mosaic (desktop only) */}
            <div className="hidden md:grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {PRODUCTS.slice(0, 4).map((p, i) => (
                <Link key={p.id} href={`/products/${p.id}`}
                  style={{
                    position: 'relative', borderRadius: 20, overflow: 'hidden',
                    gridColumn: i === 0 ? 'span 2' : 'auto',
                    height: i === 0 ? 180 : 140,
                    display: 'block', boxShadow: '0 8px 28px rgba(0,0,0,0.25)',
                    transition: 'transform 0.2s',
                  }}
                  className="hero-img-hover"
                >
                  <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="320px" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 60%)' }} />
                  <div style={{ position: 'absolute', bottom: 10, left: 14, right: 14 }}>
                    <div style={{ color: '#fff', fontSize: 12, fontWeight: 700, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                    <div style={{ color: '#fde047', fontSize: 12, fontWeight: 800 }}>₹{p.price.toLocaleString()}</div>
                  </div>
                  <div style={{ position: 'absolute', top: 10, right: 10, background: '#ef4444', color: '#fff', fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 99 }}>
                    {p.discount}% OFF
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <div className="trust-bar">
        <div className="inner">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '8px 24px' }} className="md-trust-grid">
            {[
              { icon: '🚚', title: 'Free Delivery',   sub: 'On orders above ₹499' },
              { icon: '🔒', title: '100% Secure',     sub: 'Razorpay secured checkout' },
              { icon: '↩️', title: 'Easy Returns',    sub: '7-day return policy' },
              { icon: '🏆', title: 'Award Winning',   sub: "India's Most Trusted" },
            ].map(item => (
              <div key={item.title} className="trust-item">
                <span className="trust-item__icon">{item.icon}</span>
                <div>
                  <div className="trust-item__title">{item.title}</div>
                  <div className="trust-item__sub">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Korea Tour promo ── */}
      <section style={{ padding: 0, background: 'linear-gradient(120deg,#7c3aed,#ec4899,#ff6b00)' }}>
        <div className="inner" style={{ paddingTop: 36, paddingBottom: 36, textAlign: 'center', color: '#fff' }}>
          <div className="font-baloo" style={{ fontSize: 'clamp(1.3rem,3vw,2rem)', fontWeight: 900, marginBottom: 10 }}>
            ✈️ WIN A FREE KOREA TOUR!
          </div>
          <p style={{ fontSize: 15, opacity: 0.92, marginBottom: 20, maxWidth: 560, marginInline: 'auto', lineHeight: 1.6 }}>
            Buy products worth ₹10,000 or more &amp; get a chance to win an all-expenses-paid Korea Tour Package!
          </p>
          <Link href="/products" className="btn btn-lg" style={{ background: '#fff', color: '#7c3aed', display: 'inline-flex' }}>
            🛍️ Shop ₹10,000+ Now
          </Link>
        </div>
      </section>

      {/* ── Gender filters ── */}
      <section style={{ background: '#f4f4f4' }}>
        <div className="inner">
          <div className="sec-title sec-title--center">
            <h2>Shop By <span className="gradient-text">Who</span></h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
            {GENDER_FILTERS.map(g => (
              <Link
                key={g.id}
                href={`/products?gender=${g.id}`}
                className={`btn ${g.color}`}
                style={{ borderRadius: 999, padding: '10px 22px', fontSize: 14, gap: 8 }}
              >
                <span style={{ fontSize: 20 }}>{g.icon}</span>
                {g.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section style={{ background: '#fff' }}>
        <div className="inner">
          <div className="sec-title sec-title--center">
            <h2>Shop By <span className="gradient-text">Category</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }} className="cat-grid">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className="cat-item-link"
              >
                <div className={`bg-gradient-to-br ${cat.color}`} style={{
                  width: 56, height: 56, borderRadius: 16,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26, boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                }}>
                  {cat.icon}
                </div>
                <span style={{ fontWeight: 700, fontSize: 12, color: '#333', lineHeight: 1.3 }}>
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured products ── */}
      <section style={{ background: 'linear-gradient(135deg,#fff7f0 0%,#fff0f5 100%)' }}>
        <div className="inner">
          <div className="sec-header">
            <div>
              <h2 className="font-baloo" style={{ fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 800 }}>
                ⭐ Featured <span className="gradient-text">Picks</span>
              </h2>
              <p style={{ color: '#888', fontSize: 13, marginTop: 4 }}>Handpicked by our toy experts</p>
            </div>
            <Link href="/products" className="btn btn-sm btn-primary">View All →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }} className="products-grid">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── Bestsellers ── */}
      <section style={{ background: '#fff' }}>
        <div className="inner">
          <div className="sec-header">
            <h2 className="font-baloo" style={{ fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 800 }}>
              🏆 Best<span className="gradient-text">sellers</span>
            </h2>
            <Link href="/products" style={{ color: '#FF6B00', fontWeight: 700, fontSize: 14 }}>See All →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }} className="products-grid">
            {bestsellers.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── Live orders ── */}
      <section style={{ background: '#f4f4f4' }}>
        <div className="inner">
          <div className="sec-title sec-title--center">
            <h2>🛒 Live Orders — People Are Shopping Now!</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1,1fr)', gap: 12 }} className="orders-grid">
            {RECENT_ORDERS.map((order, i) => (
              <div key={i} className="order-card">
                <div style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: 'linear-gradient(135deg,#FF6B00,#FF3D77)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 13, fontWeight: 900, flexShrink: 0,
                }}>
                  {order.name.charAt(0)}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: '#111' }}>{order.name}</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 1 }}>{order.city}</div>
                  <div style={{ fontSize: 12, color: '#FF6B00', fontWeight: 600, marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order.product}</div>
                  <div style={{ fontSize: 11, color: '#16a34a', marginTop: 2 }}>✓ {order.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: 0, background: 'linear-gradient(120deg,#FF6B00,#FF3D77)' }}>
        <div className="inner" style={{ paddingTop: 48, paddingBottom: 48 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8 }} className="stats-grid">
            {[['5L+', 'Happy Customers'], ['1000+', 'Products'], ['28', 'States Covered'], ['4.8★', 'Avg Rating']].map(([num, label]) => (
              <div key={label} className="stat-block" style={{ color: '#fff' }}>
                <div className="stat-block__num">{num}</div>
                <div className="stat-block__label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section style={{ background: '#fff' }}>
        <div className="inner">
          <div className="sec-title sec-title--center">
            <h2>What India Says <span className="gradient-text">About Us</span></h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 8 }}>
              {[1,2,3,4,5].map(s => <Star key={s} size={16} className="fill-amber-400 text-amber-400" />)}
              <span style={{ fontWeight: 700, fontSize: 13, color: '#555', marginLeft: 4 }}>4.8 / 5 from 50,000+ reviews</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1,1fr)', gap: 16 }} className="reviews-grid">
            {PRODUCTS[0].reviews.slice(0, 6).map((rev, i) => (
              <div key={i} className="review-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'linear-gradient(135deg,#FF6B00,#FF3D77)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 800, fontSize: 15, flexShrink: 0,
                  }}>
                    {rev.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#111' }}>{rev.name}</div>
                    <div style={{ fontSize: 12, color: '#888', marginTop: 1 }}>{rev.city}, {rev.state}</div>
                  </div>
                  {rev.verified && (
                    <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 99, whiteSpace: 'nowrap' }}>
                      ✓ Verified
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={12} className={s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'} />)}
                </div>
                <p style={{ fontSize: 13, color: '#555', lineHeight: 1.65 }}>{rev.comment}</p>
                <div style={{ fontSize: 11, color: '#bbb' }}>{rev.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO cities ── */}
      <section style={{ background: '#f4f4f4' }}>
        <div className="inner">
          <div className="sec-title sec-title--center">
            <h2>Buy Toys Online Across India</h2>
            <p style={{ maxWidth: 640, marginInline: 'auto', marginTop: 8, lineHeight: 1.7 }}>
              ToyFactory delivers premium toys, wellness products, and STEM kits to every corner of India — with free shipping on orders above ₹499.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
            {['Toys in Delhi','Toys in Mumbai','Toys in Bengaluru','Toys in Hyderabad','Toys in Chennai','Toys in Pune','Toys in Noida','Toys in Gurugram','Toys in Kolkata','Toys in Ahmedabad','Toys in Jaipur','Toys in Lucknow','Hot Wheels Delhi','STEM Toys India','Imported Toys India','Toys NCR','Kids Toys Online India'].map(tag => (
              <span key={tag} style={{ background: '#fff', border: '1px solid #e5e5e5', padding: '5px 13px', borderRadius: 99, fontSize: 12, color: '#666' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
