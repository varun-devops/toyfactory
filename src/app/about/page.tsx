import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us — ToyFactory India | India\'s #1 Toy Store',
  description: 'Learn about ToyFactory India — our story, mission, and commitment to delivering joy to families across India.',
};

export default function AboutPage() {
  const team = [
    { name: 'Aditya Verma', role: 'Founder & CEO', city: 'Noida, UP', emoji: '👨‍💼', bio: '10+ years in retail & e-commerce. Passionate about bringing quality toys to every Indian home.' },
    { name: 'Priya Sharma', role: 'Chief Product Officer', city: 'Delhi', emoji: '👩‍💼', bio: 'Former Funskool executive with deep expertise in toy safety and product curation.' },
    { name: 'Rahul Singh', role: 'Head of Operations', city: 'Gurugram, Haryana', emoji: '👨‍💻', bio: 'Supply chain expert ensuring fastest delivery across 28+ states in India.' },
    { name: 'Sneha Reddy', role: 'Customer Happiness Lead', city: 'Hyderabad, Telangana', emoji: '👩‍🦱', bio: 'Dedicated to ensuring every ToyFactory customer has an amazing experience.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-400 to-pink-500 py-20 text-center text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-6xl mb-4">🧸</div>
          <h1 className="font-baloo text-5xl font-bold mb-4">About ToyFactory India</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            We are India&apos;s fastest-growing online toy store, committed to bringing joy, learning, and happiness to every family across India — at prices that won&apos;t break the bank.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-baloo text-3xl font-bold text-gray-800 mb-4">Our Story 📖</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>ToyFactory India was born in 2022 from a simple belief: every child in India deserves access to the best toys — not just children in metro cities, but kids in Patna, Coimbatore, Rohtak, and every corner of our beautiful country.</p>
              <p>Our founder Aditya Verma, a father of two, was frustrated with the limited selection and exorbitant prices at local toy stores. He set out to build a platform that could source directly from manufacturers and pass on maximum savings to Indian families.</p>
              <p>Today, ToyFactory has served over 5 lakh happy customers across 28 states, with a product catalog spanning kids&apos; toys, STEM kits, adult collectibles, and wellness products — all on one platform.</p>
            </div>
          </div>
          <div className="relative h-80 rounded-3xl overflow-hidden shadow-xl">
            <Image src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="ToyFactory Story" fill className="object-cover" sizes="500px" />
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-baloo text-3xl font-bold text-gray-800 text-center mb-10">Our Mission &amp; Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🎯', title: 'Our Mission', desc: 'To make high-quality toys and wellness products accessible and affordable for every Indian family, regardless of their location.' },
              { icon: '❤️', title: 'Our Vision', desc: 'A future where every Indian child has access to toys that inspire creativity, learning, and happiness — without compromise.' },
              { icon: '🌟', title: 'Our Values', desc: 'Quality, Affordability, Safety, Trust, and Inclusivity. We believe toys are for everyone — boys, girls, adults, and every gender identity.' },
            ].map(v => (
              <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="font-baloo text-xl font-bold text-gray-800 mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-orange-500 to-pink-500 py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[['5L+', 'Happy Customers'], ['1000+', 'Products Listed'], ['28 States', 'Pan-India Delivery'], ['4.8/5', 'Customer Rating']].map(([num, label]) => (
            <div key={label}>
              <div className="font-baloo text-4xl font-bold mb-1">{num}</div>
              <div className="text-white/80 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-baloo text-3xl font-bold text-gray-800 text-center mb-2">Meet Our Team 👋</h2>
          <p className="text-gray-500 text-center mb-10">The passionate people behind ToyFactory India</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(member => (
              <div key={member.name} className="bg-white rounded-2xl p-5 shadow-sm text-center border border-gray-100">
                <div className="text-5xl mb-3">{member.emoji}</div>
                <h3 className="font-bold text-gray-800">{member.name}</h3>
                <div className="text-orange-500 text-sm font-semibold mb-1">{member.role}</div>
                <div className="text-xs text-gray-400 mb-3">📍 {member.city}</div>
                <p className="text-xs text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Address */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-baloo text-3xl font-bold text-gray-800 mb-4">Find Us 📍</h2>
          <div className="bg-white rounded-2xl shadow-sm p-8 text-left max-w-lg mx-auto">
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🏢</span>
                <div>
                  <div className="font-bold text-gray-800">Registered Office</div>
                  <div className="text-sm text-gray-600">42, Sector 18, Atta Market<br />Noida, Uttar Pradesh 201301<br />India</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <div>
                  <div className="font-bold text-gray-800">Phone</div>
                  <a href="tel:+919310123456" className="text-orange-500 hover:underline">+91-9310-123456</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✉️</span>
                <div>
                  <div className="font-bold text-gray-800">Email</div>
                  <a href="mailto:hello@toyfactoryindia.com" className="text-orange-500 hover:underline">hello@toyfactoryindia.com</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">⏰</span>
                <div>
                  <div className="font-bold text-gray-800">Working Hours</div>
                  <div className="text-sm text-gray-600">Monday–Saturday: 9 AM – 7 PM IST<br />Sunday: 10 AM – 4 PM IST</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏛️</span>
                <div>
                  <div className="font-bold text-gray-800">CIN</div>
                  <div className="text-sm text-gray-600">U52100UP2024PTC123456</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🧾</span>
                <div>
                  <div className="font-bold text-gray-800">GSTIN</div>
                  <div className="text-sm text-gray-600">09ABCDE1234F1Z5</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-br from-orange-400 to-pink-500 text-center text-white">
        <h2 className="font-baloo text-3xl font-bold mb-4">Ready to Shop? 🛍️</h2>
        <p className="text-white/90 mb-6">Join 5 lakh+ happy customers across India!</p>
        <Link href="/products" className="inline-block bg-white text-orange-500 font-bold px-10 py-3 rounded-full hover:shadow-xl transition-shadow text-base">
          Shop Now — Up to 83% OFF
        </Link>
      </section>
    </div>
  );
}
