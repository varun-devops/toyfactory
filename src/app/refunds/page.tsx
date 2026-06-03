import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Refund & Return Policy — ToyFactory India' };

export default function RefundsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 py-12 text-center text-white">
        <h1 className="font-baloo text-4xl font-bold">↩️ Return &amp; Refund Policy</h1>
        <p className="text-white/80 mt-2">Hassle-free returns within 7 days</p>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6 text-gray-700 text-sm leading-relaxed">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-green-800 font-semibold text-center">
            ✅ 7-Day Hassle-Free Returns — No Questions Asked (for eligible products)
          </div>
          {[
            ['Eligible for Return', 'Products are eligible for return if: (1) Received in damaged or defective condition, (2) Wrong product delivered, (3) Product significantly different from description, (4) Unused and in original packaging within 7 days.'],
            ['NOT Eligible for Return', 'The following cannot be returned: (1) Adult wellness products once opened (for hygiene reasons), (2) Supplements once opened, (3) Products damaged due to misuse, (4) Products without original packaging after 7 days.'],
            ['How to Initiate a Return', 'Email support@toyfactoryindia.com or call +91-9310-123456 within 7 days of delivery. Provide: Order ID, reason for return, photos of the product. We will arrange free pickup within 2-3 business days.'],
            ['Refund Processing', 'Refunds are processed within 7-10 business days after we receive and inspect the returned product. Refunds are credited to the original payment method (UPI/Card/Bank Account).'],
            ['COD Refunds', 'For Cash on Delivery orders, refunds are processed via bank transfer. Please share your bank details when initiating the return.'],
            ['Exchange Policy', 'We offer free exchanges for defective or wrong products. For other exchanges, standard return + new order process applies.'],
          ].map(([title, content]) => (
            <section key={title}>
              <h2 className="font-baloo text-lg font-bold text-gray-800 mb-2">{title}</h2>
              <p>{content}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
