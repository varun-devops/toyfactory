import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions — ToyFactory India',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 py-12 text-center text-white">
        <h1 className="font-baloo text-4xl font-bold">Terms &amp; Conditions</h1>
        <p className="text-white/80 mt-2">Last updated: 1 January 2024</p>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6 text-gray-700 text-sm leading-relaxed">
          {[
            ['1. Acceptance of Terms', 'By accessing and using ToyFactory India (toyfactoryindia.com), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website.'],
            ['2. Age Restrictions', 'You must be at least 18 years of age to purchase adult wellness products (marked 18+). By purchasing such products, you confirm you are 18 or older. Toy products may be purchased by adults on behalf of children.'],
            ['3. Product Information', 'We strive to display accurate product information, images, and prices. However, minor variations in color due to monitor settings may occur. Product descriptions are for informational purposes only.'],
            ['4. Pricing & Payments', 'All prices are in Indian Rupees (INR) and inclusive of GST. We reserve the right to change prices without prior notice. Payment is processed securely through Razorpay.'],
            ['5. Order Placement & Cancellation', 'Orders are confirmed via email. You may cancel orders within 2 hours of placement by contacting support. Once shipped, cancellation is not possible.'],
            ['6. Delivery', 'We deliver across India. Delivery timelines are 3-7 business days (metro cities: 2-3 days). ToyFactory is not liable for delays caused by courier partners or natural events.'],
            ['7. Returns & Refunds', 'Products may be returned within 7 days of delivery in original condition and packaging. Refunds are processed within 7-10 business days to the original payment method.'],
            ['8. Warranty', 'Products carry manufacturer warranty as specified. ToyFactory provides no additional warranty beyond what manufacturers offer.'],
            ['9. Korea Tour Contest', 'The Korea Tour contest is a promotional lucky draw. Purchase of ₹10,000+ qualifies for one entry per order. Winners are selected randomly each month. ToyFactory\'s decision is final.'],
            ['10. Adult Wellness Products — Disclaimer', 'Wellness products (supplements, cosmetics) are not intended to diagnose, treat, cure, or prevent any disease. Always consult a qualified physician before using supplements. Results may vary.'],
            ['11. Intellectual Property', 'All content on this website (logos, images, text) is the property of ToyFactory India Pvt. Ltd. Unauthorized use is prohibited.'],
            ['12. Governing Law', 'These terms are governed by the laws of India. Disputes will be subject to the exclusive jurisdiction of courts in Noida, Uttar Pradesh.'],
            ['13. Contact', 'For queries: ToyFactory India Pvt. Ltd., 42, Sector 18, Atta Market, Noida, UP 201301 | legal@toyfactoryindia.com'],
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
