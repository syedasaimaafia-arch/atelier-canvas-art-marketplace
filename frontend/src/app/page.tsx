'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ARTWORKS_DATA, ARTISTS_DATA, Artwork } from '@/lib/data';
import { ArtworkCard } from '@/components/ArtworkCard';
import { ValuationWidget } from '@/components/ValuationWidget';
import { RoomPreviewModal } from '@/components/RoomPreviewModal';
import { Sparkles, Eye, ShieldCheck, ArrowRight, Award, Compass, Layers } from 'lucide-react';

export default function HomePage() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const heroArtwork = ARTWORKS_DATA[0];

  const filteredArtworks = activeFilter === 'All'
    ? ARTWORKS_DATA
    : ARTWORKS_DATA.filter(a => a.medium === activeFilter || a.style === activeFilter);

  return (
    <div className="relative overflow-hidden bg-[#07080b]">
      {/* Background Spotlight Glows */}
      <div className="spotlight-glow top-0 left-1/2 -translate-x-1/2" />
      <div className="spotlight-glow top-[900px] -right-48" />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-6 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          
          {/* Hero Copy */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center space-x-2 rounded-full border border-[#d4af37]/30 bg-[#12151f]/80 px-4 py-1.5 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-[#d4af37]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                Museum-Grade Fine Art Marketplace
              </span>
            </div>

            <h1 className="font-serif text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]">
              Where Masterpiece <br />
              <span className="text-gold-gradient">Oil & Acrylic</span> Meets Collector Depth.
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              Acquire certified original oil and acrylic paintings from international master artists. Verified with cryptographic provenance, living room wall scale simulation, and algorithmic valuation.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/gallery"
                className="group flex items-center space-x-3 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#fcf6ba] to-[#b87333] px-8 py-4 text-sm font-bold tracking-wider text-black transition-all hover:scale-105 shadow-glow-gold"
              >
                <span>Explore Curated Gallery</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/room-visualizer"
                className="flex items-center space-x-2.5 rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all hover:border-[#d4af37]/60 hover:bg-white/10"
              >
                <Eye className="h-4 w-4 text-[#d4af37]" />
                <span>Virtual Room Simulator</span>
              </Link>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8 max-w-xl">
              <div>
                <p className="font-serif text-2xl font-bold text-white">$4.8M+</p>
                <p className="text-xs text-slate-400">Masterwork Volume</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-white">100%</p>
                <p className="text-xs text-slate-400">Authenticity Guarantee</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-white">FastAPI</p>
                <p className="text-xs text-slate-400">AI Price Estimator</p>
              </div>
            </div>
          </div>

          {/* Featured Hero Artwork 3D Highlight Card */}
          <div className="lg:col-span-5">
            <div className="relative group mx-auto max-w-md overflow-hidden rounded-3xl border border-[#d4af37]/40 bg-[#12151f] p-4 shadow-canvas-depth transition-all duration-700 hover:border-[#d4af37]">
              
              {/* Image Frame */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-black">
                <img
                  src={heroArtwork.imageUrl}
                  alt={heroArtwork.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 rounded-lg bg-black/70 px-3 py-1 text-[11px] font-bold tracking-widest text-[#d4af37] backdrop-blur-md uppercase">
                  Featured Masterwork
                </div>
              </div>

              {/* Details Overlay */}
              <div className="mt-4 p-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">{heroArtwork.artist.name}</span>
                  <span className="text-xs font-mono text-[#d4af37]">{heroArtwork.dimensions}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-white mt-1">{heroArtwork.title}</h3>
                
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase">Acquisition Price</span>
                    <p className="font-serif text-xl font-extrabold text-gold-gradient">${heroArtwork.price.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => setSelectedArtwork(heroArtwork)}
                    className="flex items-center space-x-2 rounded-xl border border-[#d4af37]/50 bg-[#d4af37]/10 px-4 py-2 text-xs font-semibold text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>View in Room</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filterable Curated Gallery Showcase Section */}
      <section className="border-t border-white/10 bg-[#0c0e14] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">Curated Selection</span>
              <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl mt-1">Available Masterworks</h2>
            </div>

            {/* Filter Tabs */}
            <div className="mt-6 md:mt-0 flex flex-wrap gap-2">
              {['All', 'Oil', 'Acrylic', 'Abstract', 'Impressionism'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                    activeFilter === tab
                      ? 'bg-[#d4af37] text-black shadow-glow-gold'
                      : 'border border-white/10 bg-[#12151f] text-slate-300 hover:border-white/30'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Artwork Cards */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {filteredArtworks.map((art) => (
              <ArtworkCard
                key={art.id}
                artwork={art}
                onOpenRoomVisualizer={(art) => setSelectedArtwork(art)}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center space-x-2 rounded-xl border border-white/15 bg-white/5 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:border-[#d4af37] hover:text-[#d4af37] transition-all"
            >
              <span>View All 120+ Gallery Masterworks</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* AI Valuation Section */}
      <section className="py-24 mx-auto max-w-7xl px-6">
        <ValuationWidget />
      </section>

      {/* Featured Artists Spotlight */}
      <section className="border-t border-white/10 bg-[#0c0e14] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">Verified Masters</span>
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl mt-1">Featured International Artists</h2>
            <p className="text-xs text-slate-400 mt-3">
              Representing artists whose work has been exhibited at Saatchi Gallery, Florence Biennale, and Tokyo Triennial.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {ARTISTS_DATA.map((artist, idx) => (
              <div key={idx} className="flex flex-col items-center text-center rounded-3xl border border-white/10 bg-[#12151f] p-8 transition-all hover:border-[#d4af37]/50 hover:-translate-y-1">
                <img
                  src={artist.avatar}
                  alt={artist.name}
                  className="h-24 w-24 rounded-full border-2 border-[#d4af37] object-cover shadow-glow-gold"
                />
                <h3 className="font-serif text-xl font-bold text-white mt-4">{artist.name}</h3>
                <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider mt-1">{artist.role}</span>
                <p className="text-xs text-slate-300 mt-4 leading-relaxed">{artist.bio}</p>
                <div className="mt-6 border-t border-white/10 pt-4 w-full flex justify-between text-xs text-slate-400">
                  <span>Collector Record</span>
                  <span className="font-bold text-white">{artist.totalSales}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for "View in Room" preview */}
      {selectedArtwork && (
        <RoomPreviewModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
        />
      )}
    </div>
  );
}
