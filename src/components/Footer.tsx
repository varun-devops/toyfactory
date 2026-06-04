import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#111', color: '#bbb' }}>

      {/* Korea Tour Banner */}
      <div style={{ background: 'linear-gradient(120deg,#7c3aed,#ec4899,#ff6b00)', padding: '28px 20px', textAlign: 'center' }}>
        <div className="font-baloo" style={{ fontSize: 'clamp(1.2rem,3vw,1.6rem)', fontWeight: 900, color: '#fff', marginBottom: 8 }}>
          🎉 WIN A KOREA TOUR PACKAGE! ✈️
        </div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
          Buy products worth ₹10,000 or more and get a chance to win an all-expenses-paid Korea Tour!
        </div>
      </div>

      {/* Main footer grid */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 20px 32px' }}>
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 32 }}>🧸</span>
              <div>
                <div className="font-baloo" style={{ fontSize: 20, color: '#fff', fontWeight: 800 }}>ToyFactory</div>
                <div style={{ fontSize: 11, color: '#666', fontWeight: 700 }}>India&apos;s #1 Toy Store</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: '#888', lineHeight: 1.7, marginBottom: 16, maxWidth: 300 }}>
              Bringing joy to millions of families across India. From Hot Wheels to STEM kits, plush toys to wellness products — one platform for all.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#888', marginBottom: 18 }}>
              <div>📍 42, Sector 18, Atta Market, Noida, UP 201301</div>
              <div>📞 +91-9310-123456</div>
              <div>✉️ hello@toyfactoryindia.com</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {['📘', '📸', '🐦', '▶️'].map((icon, i) => (
                <div key={i} className="footer-social">{icon}</div>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-baloo footer-col-heading">Shop</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[['Hot Wheels', '/products?subcategory=Hot+Wheels'], ['Plush Toys', '/products?category=plush'], ['Dolls', '/products?category=dolls'], ['STEM Kits', '/products?category=stem'], ['Ride-On Cars', '/products?subcategory=Toy+cars+(Big)'], ['Scooters', '/products?subcategory=Toy+scooters'], ['Play Kitchen', '/products?category=kitchen'], ['Dollhouses', '/products?category=houses'], ['Collectibles', '/products?category=collectibles'], ['Wellness 18+', '/products?category=wellness']].map(([label, href]) => (
                <li key={href}><Link href={href} className="footer-link">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-baloo footer-col-heading">Information</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[['About Us', '/about'], ['Contact Us', '/contact'], ['Privacy Policy', '/privacy'], ['Terms & Conditions', '/terms'], ['Shipping Policy', '/shipping'], ['Refund Policy', '/refunds'], ['Toy Safety Policy', '/toy-safety'], ['Age Restrictions', '/age-policy']].map(([label, href]) => (
                <li key={href}><Link href={href} className="footer-link">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Cities + payments */}
          <div className="footer-cities">
            <h4 className="font-baloo footer-col-heading">Shop By City</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
              {['Delhi','Mumbai','Bengaluru','Hyderabad','Chennai','Pune','Kolkata','Ahmedabad','Noida','Gurugram','Jaipur','Lucknow','Chandigarh','Indore','Bhopal','Nagpur','Surat','Vadodara','Coimbatore','Patna'].map(city => (
                <Link key={city} href={`/products?city=${city}`} className="footer-city-tag">{city}</Link>
              ))}
            </div>
            <h4 className="font-baloo footer-col-heading">We Accept</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
              {['💳 Cards', '📱 UPI', '🏦 NetBanking', '💰 COD', '📲 Wallets'].map(m => (
                <span key={m} style={{ background: '#1f1f1f', padding: '6px 14px', borderRadius: 8, fontSize: 12, color: '#999' }}>{m}</span>
              ))}
            </div>
            <div style={{ fontSize: 12, color: '#666', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#4ade80' }}>🔒</span> 100% Secure Checkout via Razorpay
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid #222', padding: '18px 20px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 12, color: '#555' }}>© 2024 ToyFactory India Pvt. Ltd. All Rights Reserved.</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Privacy', '/privacy'], ['Terms', '/terms'], ['Contact', '/contact']].map(([l, h]) => (
              <Link key={h} href={h} className="footer-link" style={{ fontSize: 12 }}>{l}</Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px 24px;
        }
        .footer-brand { grid-column: span 2; }
        .footer-cities { grid-column: span 2; }
        .footer-col-heading { color: #fff; font-weight: 800; font-size: 16px; margin-bottom: 16px; }
        .footer-link { font-size: 13px; color: #888; transition: color 0.15s; }
        .footer-link:hover { color: #FF6B00; }
        .footer-social {
          width: 38px; height: 38px; border-radius: 50%;
          background: #222; display: flex; align-items: center;
          justify-content: center; font-size: 15px; cursor: pointer;
          transition: background 0.15s;
        }
        .footer-social:hover { background: #FF6B00; }
        .footer-city-tag {
          background: #1f1f1f; padding: 4px 12px;
          border-radius: 99px; font-size: 12px; color: #888;
          transition: all 0.15s;
        }
        .footer-city-tag:hover { background: #FF6B00; color: #fff; }
        @media(min-width: 768px){
          .footer-grid   { grid-template-columns: 2fr 1fr 1fr 1.5fr !important; gap: 0 32px !important; }
          .footer-brand  { grid-column: auto !important; }
          .footer-cities { grid-column: auto !important; }
        }
      `}</style>
    </footer>
  );
}
