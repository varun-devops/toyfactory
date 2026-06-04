import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      {/* Korea Tour Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <div className="text-2xl font-baloo font-bold mb-1">🎉 WIN A KOREA TOUR PACKAGE! ✈️</div>
          <div className="text-base opacity-90">Buy products worth ₹10,000 or more and get a chance to win an all-expenses-paid Korea Tour!</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">🧸</span>
            <div>
              <div className="font-baloo text-xl text-white font-bold">ToyFactory</div>
              <div className="text-xs text-gray-400">India&apos;s #1 Toy Store</div>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            Bringing joy to millions of families across India. From Hot Wheels to STEM kits, plush toys to wellness products — one platform for all.
          </p>
          <div className="text-sm space-y-1">
            <div>📍 42, Sector 18, Atta Market</div>
            <div>Noida, Uttar Pradesh 201301</div>
            <div>📞 +91-9310-123456</div>
            <div>✉️ hello@toyfactoryindia.com</div>
          </div>
          <div className="flex gap-3 mt-4">
            {['📘', '📸', '🐦', '▶️'].map((icon, i) => (
              <div key={i} className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 cursor-pointer transition-colors text-base">{icon}</div>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-white font-bold mb-4 font-baloo text-lg">Shop</h4>
          <ul className="space-y-2 text-sm">
            {[['Hot Wheels', '/products?subcategory=Hot+Wheels'], ['Plush Toys', '/products?category=plush'], ['Dolls', '/products?category=dolls'], ['STEM Kits', '/products?category=stem'], ['Ride-On Cars', '/products?subcategory=Toy+cars+(Big)'], ['Scooters', '/products?subcategory=Toy+scooters'], ['Play Kitchen', '/products?category=kitchen'], ['Dollhouses', '/products?category=houses'], ['Collectibles', '/products?category=collectibles'], ['Wellness 18+', '/products?category=wellness']].map(([label, href]) => (
              <li key={href}><Link href={href} className="hover:text-orange-400 transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4 className="text-white font-bold mb-4 font-baloo text-lg">Information</h4>
          <ul className="space-y-2 text-sm">
            {[['About Us', '/about'], ['Contact Us', '/contact'], ['Privacy Policy', '/privacy'], ['Terms & Conditions', '/terms'], ['Shipping Policy', '/shipping'], ['Refund Policy', '/refunds'], ['Toy Safety Policy', '/toy-safety'], ['Age Restrictions', '/age-policy']].map(([label, href]) => (
              <li key={href}><Link href={href} className="hover:text-orange-400 transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Cities SEO */}
        <div>
          <h4 className="text-white font-bold mb-4 font-baloo text-lg">Shop By City</h4>
          <div className="flex flex-wrap gap-1 text-xs">
            {['Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad', 'Noida', 'Gurugram', 'Jaipur', 'Lucknow', 'Chandigarh', 'Indore', 'Bhopal', 'Nagpur', 'Surat', 'Vadodara', 'Coimbatore', 'Patna', 'Ghaziabad', 'Faridabad', 'Meerut', 'Agra', 'Varanasi', 'Rohtak', 'Ambala', 'Dehradun'].map(city => (
              <Link key={city} href={`/products?city=${city}`} className="bg-gray-700 hover:bg-orange-600 px-2 py-0.5 rounded transition-colors">
                {city}
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <h4 className="text-white font-bold mb-3 font-baloo text-lg">We Accept</h4>
            <div className="flex flex-wrap gap-2">
              {['💳 Cards', '📱 UPI', '🏦 NetBanking', '💰 COD', '📲 Wallets'].map(m => (
                <span key={m} className="bg-gray-700 px-2 py-1 rounded text-xs">{m}</span>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
              <span className="text-green-400">🔒</span> 100% Secure Checkout via Razorpay
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-5 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs sm:text-sm text-gray-500">
          <div>© 2024 ToyFactory India Pvt. Ltd. All Rights Reserved. CIN: U52100UP2024PTC123456</div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-orange-400">Privacy</Link>
            <Link href="/terms" className="hover:text-orange-400">Terms</Link>
            <Link href="/contact" className="hover:text-orange-400">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
