import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Shipping Policy — ToyFactory India' };

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 py-12 text-center text-white">
        <h1 className="font-baloo text-4xl font-bold">🚚 Shipping Policy</h1>
        <p className="text-white/80 mt-2">Last updated: 1 January 2024</p>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6 text-gray-700 text-sm leading-relaxed">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[['🚚', 'Free Shipping', 'On orders ₹499+'], ['⚡', 'Express Delivery', '1-2 days in metros'], ['📦', 'Pan-India', '500+ cities covered']].map(([icon, title, sub]) => (
              <div key={title} className="text-center bg-orange-50 rounded-2xl p-4">
                <div className="text-3xl mb-1">{icon}</div>
                <div className="font-bold text-gray-800">{title}</div>
                <div className="text-xs text-gray-500">{sub}</div>
              </div>
            ))}
          </div>
          {[
            ['Delivery Timeframes', [['Metro Cities (Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata)', '2-3 Business Days'], ['Tier 2 Cities (Noida, Pune, Ahmedabad, Jaipur, Lucknow, etc.)', '3-5 Business Days'], ['Tier 3 Cities & Remote Areas', '5-7 Business Days']]],
            ['Shipping Charges', [['Orders above ₹499', 'FREE Shipping'], ['Orders below ₹499', '₹49 Flat Shipping Fee'], ['Express Delivery (Metro Cities)', '₹99 Additional']]],
            ['Tracking Your Order', [['Email confirmation', 'Sent immediately after order placement'], ['Shipping confirmation', 'Sent when order is dispatched with tracking link'], ['Delivery updates', 'Real-time SMS/WhatsApp updates']]],
          ].map(([title, rows]) => (
            <section key={title as string}>
              <h2 className="font-baloo text-xl font-bold text-gray-800 mb-3">{title as string}</h2>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                {(rows as string[][]).map(([col1, col2], i) => (
                  <div key={i} className={`grid grid-cols-2 p-3 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <span className="font-medium text-gray-700">{col1}</span>
                    <span className="text-gray-600">{col2}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
          <section>
            <h2 className="font-baloo text-xl font-bold text-gray-800 mb-2">Logistics Partners</h2>
            <p>We partner with Delhivery, BlueDart, DTDC, and India Post for reliable pan-India delivery. The courier partner is automatically selected based on your location for fastest delivery.</p>
          </section>
          <section>
            <h2 className="font-baloo text-xl font-bold text-gray-800 mb-2">Adult Wellness Products — Discreet Packaging</h2>
            <p>All adult wellness products are shipped in plain, unmarked brown boxes with no indication of the contents. The shipping label only shows &quot;ToyFactory India&quot; as sender.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
