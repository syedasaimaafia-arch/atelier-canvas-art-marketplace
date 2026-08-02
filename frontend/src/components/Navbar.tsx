'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Sparkles, Eye, Palette, ShoppingBag, ShieldCheck, User, LogOut, Menu, X } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(1);

  const navItems = [
    { name: 'Curated Gallery', href: '/gallery', icon: Palette },
    { name: 'Room Visualizer', href: '/room-visualizer', icon: Eye },
    { name: 'AI Valuation', href: '/#valuation', icon: Sparkles },
    { name: 'Sell Artwork', href: '/sell', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#07080b]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#d4af37]/40 bg-gradient-to-br from-[#1d2232] to-[#0d0f17] shadow-glow-gold transition-all duration-300 group-hover:border-[#d4af37] group-hover:scale-105">
            <span className="font-serif text-xl font-bold text-[#d4af37]">A</span>
          </div>
          <div>
            <span className="font-serif text-xl tracking-widest text-white transition-colors group-hover:text-[#d4af37]">
              ATELIER
            </span>
            <span className="ml-1 text-xs tracking-widest text-[#d4af37]/80 uppercase">Canvas</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden items-center space-x-8 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center space-x-2 text-sm font-medium transition-all ${
                  isActive ? 'text-[#d4af37]' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Auth & Cart Controls */}
        <div className="hidden items-center space-x-4 md:flex">
          {/* Cart Icon */}
          <div className="relative">
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-200 transition-colors hover:border-[#d4af37]/50 hover:bg-white/10 hover:text-[#d4af37]">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#d4af37] text-[10px] font-bold text-black">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Google Auth Button */}
          {session?.user ? (
            <div className="flex items-center space-x-3 rounded-xl border border-white/10 bg-[#12151f] p-1.5 pr-4">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  className="h-8 w-8 rounded-lg border border-[#d4af37]/40 object-cover"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d4af37]/20 text-[#d4af37]">
                  <User className="h-4 w-4" />
                </div>
              )}
              <div className="text-left text-xs">
                <p className="font-semibold text-white">{session.user.name}</p>
                <p className="text-[10px] text-emerald-400">Collector Account</p>
              </div>
              <button
                onClick={() => signOut()}
                title="Sign out"
                className="ml-2 text-slate-400 hover:text-red-400 transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn('google')}
              className="flex items-center space-x-2 rounded-lg border border-[#d4af37]/50 bg-gradient-to-r from-[#d4af37]/20 to-[#b87333]/20 px-5 py-2.5 text-xs font-semibold text-white tracking-wider uppercase transition-all duration-300 hover:border-[#d4af37] hover:bg-[#d4af37]/30 hover:shadow-glow-gold"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.24 10.285V13.4h6.887c-.58 3.2-3.37 5.568-6.887 5.568-4.14 0-7.5-3.36-7.5-7.5s3.36-7.5 7.5-7.5c1.86 0 3.55.68 4.86 1.8l2.36-2.36C17.5 1.8 15.02 1 12.24 1 6.12 1 1.14 5.98 1.14 12.12s4.98 11.12 11.1 11.12c6.38 0 10.62-4.48 10.62-10.8 0-.72-.08-1.42-.2-2.16H12.24z" />
              </svg>
              <span>Sign In with Google</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-slate-300 md:hidden hover:text-white"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#0c0e14] px-6 py-6 md:hidden">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3 text-base text-slate-200 hover:text-[#d4af37]"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10">
              {session?.user ? (
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-2 text-sm text-red-400"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out ({session.user.name})</span>
                </button>
              ) : (
                <button
                  onClick={() => signIn('google')}
                  className="w-full rounded-lg bg-[#d4af37] px-4 py-3 text-center text-sm font-bold text-black"
                >
                  Sign In with Google
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
