import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — ToyFactory India',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 py-12 text-center text-white">
        <h1 className="font-baloo text-4xl font-bold">Privacy Policy</h1>
        <p className="text-white/80 mt-2">Last updated: 1 January 2024</p>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-10 prose prose-gray">
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6 text-gray-700 text-sm leading-relaxed">
          <section>
            <h2 className="font-baloo text-xl font-bold text-gray-800 mb-2">1. Information We Collect</h2>
            <p>ToyFactory India (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) collects the following information when you use our website (toyfactoryindia.com):</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Personal Information:</strong> Name, email address, phone number, delivery address.</li>
              <li><strong>Payment Information:</strong> We do NOT store card details. Payments are processed securely by Razorpay.</li>
              <li><strong>Order Information:</strong> Products purchased, order history, delivery details.</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent, device type, browser, IP address (anonymized).</li>
              <li><strong>Cookies:</strong> We use essential cookies for cart functionality and analytics cookies (with consent).</li>
            </ul>
          </section>
          <section>
            <h2 className="font-baloo text-xl font-bold text-gray-800 mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Process and deliver your orders</li>
              <li>Send order confirmation and shipping updates</li>
              <li>Respond to customer service queries</li>
              <li>Improve our website and product catalog</li>
              <li>Send promotional emails (you can unsubscribe anytime)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>
          <section>
            <h2 className="font-baloo text-xl font-bold text-gray-800 mb-2">3. Data Sharing</h2>
            <p>We do NOT sell your personal data. We share data only with:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Logistics Partners</strong> (Delhivery, BlueDart) for delivery purposes</li>
              <li><strong>Razorpay</strong> for payment processing</li>
              <li><strong>Legal authorities</strong> when required by law</li>
            </ul>
          </section>
          <section>
            <h2 className="font-baloo text-xl font-bold text-gray-800 mb-2">4. Data Security</h2>
            <p>We use industry-standard SSL encryption, secure servers, and regular security audits to protect your data. Payment data is handled exclusively by Razorpay and never stored on our servers.</p>
          </section>
          <section>
            <h2 className="font-baloo text-xl font-bold text-gray-800 mb-2">5. Your Rights</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Right to access your personal data</li>
              <li>Right to correct inaccurate data</li>
              <li>Right to delete your account and data</li>
              <li>Right to withdraw marketing consent</li>
            </ul>
            <p className="mt-2">To exercise these rights, email us at <a href="mailto:privacy@toyfactoryindia.com" className="text-orange-500">privacy@toyfactoryindia.com</a></p>
          </section>
          <section>
            <h2 className="font-baloo text-xl font-bold text-gray-800 mb-2">6. Contact</h2>
            <p>For privacy concerns: <strong>ToyFactory India Pvt. Ltd.</strong><br />42, Sector 18, Atta Market, Noida, UP 201301<br />Email: privacy@toyfactoryindia.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
