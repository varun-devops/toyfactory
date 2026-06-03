'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill all required fields');
      return;
    }
    setSending(true);
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    toast.success('✅ Message sent! We\'ll reply within 24 hours.');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-400 to-pink-500 py-16 text-center text-white">
        <div className="text-5xl mb-3">📞</div>
        <h1 className="font-baloo text-4xl font-bold mb-2">Contact Us</h1>
        <p className="text-white/90">We are here to help! Reach out and we&apos;ll respond within 24 hours.</p>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="font-baloo text-2xl font-bold text-gray-800 mb-4">Get In Touch</h2>
              <p className="text-gray-600 leading-relaxed">Have a question about your order, a product, or just want to say hi? We&apos;d love to hear from you! Our friendly team is available 6 days a week.</p>
            </div>

            {[
              { Icon: MapPin, title: 'Registered Office', content: '42, Sector 18, Atta Market\nNoida, Uttar Pradesh 201301, India', color: 'bg-orange-100 text-orange-600' },
              { Icon: Phone, title: 'Customer Support', content: '+91-9310-123456\n+91-9310-654321', color: 'bg-green-100 text-green-600' },
              { Icon: Mail, title: 'Email Us', content: 'hello@toyfactoryindia.com\nsupport@toyfactoryindia.com', color: 'bg-blue-100 text-blue-600' },
              { Icon: Clock, title: 'Working Hours', content: 'Mon–Sat: 9 AM – 7 PM IST\nSun: 10 AM – 4 PM IST', color: 'bg-purple-100 text-purple-600' },
            ].map(({ Icon, title, content, color }) => (
              <div key={title} className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-sm">{title}</div>
                  <div className="text-sm text-gray-600 whitespace-pre-line mt-0.5">{content}</div>
                </div>
              </div>
            ))}

            {/* Map embed placeholder */}
            <div className="bg-gray-200 rounded-2xl h-48 flex items-center justify-center text-gray-500 text-sm">
              📍 42, Sector 18, Atta Market, Noida UP 201301
              <br />
              (Google Maps integration available with API key)
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-baloo text-2xl font-bold text-gray-800 mb-5">Send Us a Message 💬</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Priya Sharma" className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                  <input value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="9876543210" className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-400 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="priya@example.com" className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-400 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                <select value={form.subject} onChange={e => setForm(f => ({...f, subject: e.target.value}))} className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-400 text-sm bg-white">
                  <option value="">Select Subject</option>
                  <option value="order">Order Related</option>
                  <option value="product">Product Query</option>
                  <option value="return">Return/Refund</option>
                  <option value="payment">Payment Issue</option>
                  <option value="bulk">Bulk Order</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Message *</label>
                <textarea value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} placeholder="Tell us how we can help you..." rows={4} className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-400 text-sm resize-none" />
              </div>
              <button type="submit" disabled={sending} className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3.5 rounded-2xl font-bold hover:opacity-90 transition-opacity disabled:opacity-70">
                {sending ? '⏳ Sending...' : '📩 Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="font-baloo text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              ['How long does delivery take?', 'We deliver within 3-7 business days across India. Metro cities like Delhi, Mumbai, Bengaluru get delivery in 2-3 days.'],
              ['Is there free shipping?', 'Yes! Free shipping on all orders above ₹499. For orders below ₹499, a shipping charge of ₹49 applies.'],
              ['Can I return a product?', 'Yes, we offer a 7-day hassle-free return policy for all products in original condition and packaging.'],
              ['Are wellness products packaged discreetly?', 'Absolutely! All adult wellness products are shipped in plain, unmarked packaging with no mention of product contents.'],
              ['How does the Korea Tour contest work?', 'Purchase products worth ₹10,000 or more in a single order to get a lucky draw entry. Winners are announced monthly.'],
              ['Do you deliver to all cities?', 'Yes! We deliver to 500+ cities across 28 states in India, including Tier 2 and Tier 3 cities.'],
            ].map(([q, a]) => (
              <div key={q} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="font-bold text-gray-800 text-sm mb-1">❓ {q}</div>
                <div className="text-sm text-gray-600">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
