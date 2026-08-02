import React from 'react';
import Link from 'next/link';
import { Shield, Sparkles, Award, Globe, Database, Server, Code } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#07080b] pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#d4af37]/40 bg-[#1d2232]">
                <span className="font-serif text-lg font-bold text-[#d4af37]">A</span>
              </div>
              <span className="font-serif text-xl tracking-wider text-white">ATELIER CANVAS</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              The premier fine art marketplace connecting international collectors with verified masterwork oil and acrylic paintings. Cryptographic provenance, AI valuation, and living room AR visualization.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-white uppercase">Curated Collections</h4>
            <ul className="mt-4 space-y-2 text-xs text-slate-400">
              <li><Link href="/gallery?medium=Oil" className="hover:text-[#d4af37] transition-colors">Oil Paintings on Canvas</Link></li>
              <li><Link href="/gallery?style=Impressionism" className="hover:text-[#d4af37] transition-colors">Impressionist Canalscapes</Link></li>
              <li><Link href="/gallery?style=Abstract" className="hover:text-[#d4af37] transition-colors">Abstract & Gold Impasto</Link></li>
              <li><Link href="/gallery?style=Expressionism" className="hover:text-[#d4af37] transition-colors">Charcoal & Obsidian Portraits</Link></li>
            </ul>
          </div>

          {/* Technology & Infrastructure */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-white uppercase">Technical Stack</h4>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center space-x-2">
                <Code className="h-3.5 w-3.5 text-[#d4af37]" />
                <span>Frontend: Next.js 14 (App Router)</span>
              </li>
              <li className="flex items-center space-x-2">
                <Server className="h-3.5 w-3.5 text-cyan-400" />
                <span>Backend: FastAPI Python Service</span>
              </li>
              <li className="flex items-center space-x-2">
                <Database className="h-3.5 w-3.5 text-emerald-400" />
                <span>Data Access: Supabase Postgres & Drizzle ORM</span>
              </li>
              <li className="flex items-center space-x-2">
                <Globe className="h-3.5 w-3.5 text-indigo-400" />
                <span>Auth & Deployment: NextAuth Google + Vercel</span>
              </li>
            </ul>
          </div>

          {/* Trust Guarantees */}
          <div className="rounded-2xl border border-[#d4af37]/20 bg-[#0c0e14] p-5">
            <h4 className="font-serif text-sm font-semibold text-[#d4af37]">Authenticity Guarantee</h4>
            <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
              Every physical painting is delivered with a physical & cryptographic Certificate of Authenticity signed by the artist and registered on Supabase ledger.
            </p>
            <div className="mt-4 flex items-center space-x-2 text-xs text-emerald-400">
              <Shield className="h-4 w-4" />
              <span>100% Insured Global Shipping</span>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 Atelier Canvas Fine Art Inc. All rights reserved.</p>
          <p className="mt-2 md:mt-0 text-[11px]">Powered by Next.js • FastAPI • Supabase • Drizzle ORM</p>
        </div>
      </div>
    </footer>
  );
}
