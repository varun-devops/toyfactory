import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Toy Safety Policy — ToyFactory India' };

export default function ToySafetyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-500 to-teal-500 py-12 text-center text-white">
        <h1 className="font-baloo text-4xl font-bold">🛡️ Toy Safety Policy</h1>
        <p className="text-white/90 mt-2">Your child&apos;s safety is our #1 priority</p>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6 text-gray-700 text-sm leading-relaxed">
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
            <p className="font-bold text-yellow-800">⚠️ Important Safety Warning</p>
            <p className="text-yellow-700 mt-1">Always check age recommendations on products. Small parts (choking hazard) — Not suitable for children under 3 years. Always supervise young children during play.</p>
          </div>
          {[
            ['BIS Certification', 'All toys sold on ToyFactory India comply with Bureau of Indian Standards (BIS) IS 9873 toy safety standards. We source only from certified manufacturers and conduct regular quality audits.'],
            ['Age Ratings', 'Every product clearly displays age ratings. Please follow these guidelines strictly. Age ratings are determined by toy complexity, small parts, and potential hazards.'],
            ['Material Safety', 'All toys use non-toxic, BPA-free, phthalate-free materials. Plush toys use hypoallergenic, washable stuffing. Electronic toys use CE/FCC-certified components.'],
            ['Small Parts Warning', 'Products containing small parts are clearly labelled "Not suitable for children under 3." If you notice any product without this label that contains small parts, please report it to us immediately.'],
            ['Recall Policy', 'In the unlikely event of a product safety recall, we will immediately notify all purchasers via email and phone and arrange free collection and full refund.'],
            ['Product Testing', 'Our quality team physically tests a sample of every product batch before listing. We also rely on manufacturer certifications including CE, ASTM F963, and EN71 standards.'],
          ].map(([title, content]) => (
            <section key={title}>
              <h2 className="font-baloo text-lg font-bold text-gray-800 mb-2 text-green-700">✓ {title}</h2>
              <p>{content}</p>
            </section>
          ))}
          <section>
            <h2 className="font-baloo text-lg font-bold text-gray-800 mb-2">Report a Safety Concern</h2>
            <p>If you notice a safety issue with any product, please contact us immediately:<br /><strong>Email:</strong> safety@toyfactoryindia.com<br /><strong>Phone:</strong> +91-9310-123456 (Safety Helpline)</p>
          </section>
        </div>
      </div>
    </div>
  );
}
