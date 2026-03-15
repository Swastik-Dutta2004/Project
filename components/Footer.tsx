"use client";

import Link from "next/link";

const footerLinks = {
  company: ["About", "Careers", "Blog", "Press"],
  support: ["Help Center", "Contact", "Terms", "Privacy"],
  explore: ["Destinations", "Tours", "Activities", "Travel Guides"],
};

export default function Footer() {
  return (
    <footer className="bg-[#0a1628] text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

        {/* Logo / Brand */}
        <div>
          <h2 className="font-serif text-2xl font-bold mb-4">
            Voy<span className="text-amber-400">age</span>
          </h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Discover the world with curated travel experiences,
            breathtaking destinations, and unforgettable journeys.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Explore</h3>
          <ul className="space-y-2">
            {footerLinks.explore.map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-white/60 hover:text-amber-400 text-sm transition"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Company</h3>
          <ul className="space-y-2">
            {footerLinks.company.map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-white/60 hover:text-amber-400 text-sm transition"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Support</h3>
          <ul className="space-y-2">
            {footerLinks.support.map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-white/60 hover:text-amber-400 text-sm transition"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom section */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <p>© {new Date().getFullYear()} Voyage. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-amber-400">Facebook</Link>
            <Link href="#" className="hover:text-amber-400">Instagram</Link>
            <Link href="#" className="hover:text-amber-400">Twitter</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}