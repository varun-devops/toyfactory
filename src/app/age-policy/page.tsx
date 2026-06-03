import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Age Restriction Policy — ToyFactory India' };

export default function AgePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-500 to-orange-500 py-12 text-center text-white">
        <h1 className="font-baloo text-4xl font-bold">🔞 Age Restriction Policy</h1>
        <p className="text-white/90 mt-2">Adult products are strictly for users 18 years and above</p>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6 text-gray-700 text-sm leading-relaxed">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-800">
            <p className="font-bold text-lg">🔞 Adult Content Notice</p>
            <p className="mt-1">ToyFactory India sells adult wellness products including sexual wellness devices and supplements. These products are strictly intended for adults aged 18 years and above. By accessing or purchasing these products, you confirm that you are at least 18 years of age.</p>
          </div>
          {[
            ['Compliance with Indian Law', 'ToyFactory India complies with all applicable Indian laws regarding the sale of adult products. We adhere to Information Technology Act 2000, Consumer Protection Act 2019, and applicable state laws.'],
            ['Age Verification', 'We rely on self-declaration for age verification. By completing a purchase of adult products, you legally confirm you are 18+. False declaration is a criminal offence under Indian law.'],
            ['Discreet Packaging', 'All adult products are shipped in plain, unmarked packaging. No product name or description appears on the packaging. Only "ToyFactory India" appears as sender.'],
            ['Platform Safety', 'Adult products are clearly categorised and clearly marked with 🔞 labels. They are not visible in general browsing without selecting adult categories.'],
            ['Medical Disclaimer', 'Supplements and wellness products are NOT medicines and are NOT approved for treating any medical condition. Consult a licensed physician before use. These products are food supplements only.'],
            ['Sexual Wellness Products', 'Sexual wellness devices are legal in India for personal use. They are manufactured with body-safe materials and are for consenting adults only. All products meet international safety standards.'],
          ].map(([title, content]) => (
            <section key={title}>
              <h2 className="font-baloo text-lg font-bold text-gray-800 mb-2">{title}</h2>
              <p>{content}</p>
            </section>
          ))}
          <section className="bg-orange-50 rounded-2xl p-4">
            <p className="font-bold text-orange-800">📞 Report Misuse</p>
            <p className="text-orange-700 text-xs mt-1">If you believe a minor has purchased adult products, please contact us immediately at safety@toyfactoryindia.com or +91-9310-123456</p>
          </section>
        </div>
      </div>
    </div>
  );
}
