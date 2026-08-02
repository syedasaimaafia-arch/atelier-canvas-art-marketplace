'use client';

import React, { useState } from 'react';
import { ARTWORKS_DATA, Artwork } from '@/lib/data';
import { Eye, Sparkles, Sliders, Check, Palette, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function RoomVisualizerPage() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork>(ARTWORKS_DATA[0]);
  const [wallTheme, setWallTheme] = useState<'dark-velvet' | 'minimalist-grey' | 'brick-loft' | 'luxury-salon'>('dark-velvet');
  const [sofaColor, setSofaColor] = useState('#1e2330');

  const wallStyles = {
    'dark-velvet': 'bg-gradient-to-b from-[#12141c] to-[#07080b] border-white/10',
    'minimalist-grey': 'bg-gradient-to-b from-[#2a2d36] to-[#1a1c23] border-white/10',
    'brick-loft': 'bg-gradient-to-b from-[#2b1f1a] to-[#150f0d] border-amber-900/30',
    'luxury-salon': 'bg-gradient-to-b from-[#18201a] to-[#0a0f0b] border-emerald-900/30',
  };

  const scalePercent = Math.min(85, Math.max(35, (selectedArtwork.roomScaleWidth / 60) * 60));

  return (
    <div className="min-h-screen bg-[#07080b] py-12 px-6">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#d4af37] uppercase tracking-widest">
              <Eye className="h-4 w-4" />
              <span>Interactive Interior Simulation</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl mt-1">
              Virtual Living Room Wall Visualizer
            </h1>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase">Selected Masterwork</span>
              <p className="font-serif text-sm font-bold text-[#d4af37]">{selectedArtwork.title}</p>
            </div>
            <Link
              href={`/artwork/${selectedArtwork.id}`}
              className="rounded-xl bg-[#d4af37] px-4 py-2 text-xs font-bold text-black hover:scale-105 transition-transform"
            >
              Acquire Painting
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Visualizer Stage */}
          <div className="lg:col-span-8 flex flex-col h-[650px] overflow-hidden rounded-3xl border border-[#d4af37]/30 bg-[#0c0e14] shadow-2xl">
            <div className={`relative flex-1 flex flex-col items-center justify-center p-8 transition-colors duration-500 ${wallStyles[wallTheme]}`}>
              
              {/* Spotlight Glow */}
              <div className="absolute top-0 h-72 w-[500px] rounded-full bg-gradient-radial from-amber-100/10 via-transparent to-transparent pointer-events-none" />

              {/* Hanging Canvas */}
              <div
                className="relative z-10 transition-all duration-500 ease-out canvas-frame"
                style={{ width: `${scalePercent}%`, maxWidth: '460px' }}
              >
                <img
                  src={selectedArtwork.imageUrl}
                  alt={selectedArtwork.title}
                  className="w-full h-auto object-cover rounded-sm shadow-2xl"
                />

                {/* Overhead Spotlight fixture */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="h-2.5 w-14 rounded-full bg-[#d4af37]/70 shadow-[0_0_20px_#d4af37]" />
                  <div className="h-6 w-0.5 bg-gradient-to-b from-[#d4af37]/60 to-transparent" />
                </div>
              </div>

              {/* Sofa Scale Benchmark */}
              <div className="mt-12 w-full max-w-xl z-10 flex flex-col items-center">
                <div
                  className="w-full h-24 rounded-t-3xl border-t border-white/10 shadow-2xl transition-colors duration-500 flex items-center justify-center"
                  style={{ backgroundColor: sofaColor }}
                >
                  <span className="text-[10px] tracking-widest text-slate-400 uppercase">90" Designer Velvet Sofa (Scale Benchmark)</span>
                </div>
                <div className="w-full h-3 bg-black/60 rounded-b-lg" />
              </div>

              <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-black/80 to-transparent" />
            </div>

            {/* Stage Footer bar */}
            <div className="border-t border-white/10 bg-[#12151f] px-6 py-3 flex items-center justify-between text-xs text-slate-400">
              <span>Canvas Dimensions: <strong className="text-white font-mono">{selectedArtwork.dimensions}</strong></span>
              <span>Price: <strong className="text-gold-gradient font-serif font-bold text-sm">${selectedArtwork.price.toLocaleString()}</strong></span>
            </div>
          </div>

          {/* Right Selector Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Artwork Selector Carousel */}
            <div className="rounded-3xl border border-white/10 bg-[#12151f] p-6 space-y-4">
              <h3 className="font-serif text-base font-bold text-white uppercase tracking-wider">Select Artwork to Hang</h3>
              <div className="grid grid-cols-2 gap-3 pt-1">
                {ARTWORKS_DATA.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => setSelectedArtwork(art)}
                    className={`group relative aspect-[4/5] overflow-hidden rounded-xl border transition-all ${
                      selectedArtwork.id === art.id
                        ? 'border-[#d4af37] shadow-glow-gold scale-105'
                        : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={art.imageUrl} alt={art.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 bg-black/80 p-1.5 text-center text-[10px] font-semibold text-white truncate">
                      {art.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Wall Theme Controls */}
            <div className="rounded-3xl border border-white/10 bg-[#12151f] p-6 space-y-4">
              <h3 className="font-serif text-base font-bold text-white uppercase tracking-wider">Interior Wall Finish</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setWallTheme('dark-velvet')}
                  className={`rounded-xl p-3 text-xs font-semibold border text-left transition-all ${
                    wallTheme === 'dark-velvet'
                      ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#d4af37]'
                      : 'border-white/10 bg-[#0c0e14] text-slate-300'
                  }`}
                >
                  Dark Velvet
                </button>
                <button
                  onClick={() => setWallTheme('minimalist-grey')}
                  className={`rounded-xl p-3 text-xs font-semibold border text-left transition-all ${
                    wallTheme === 'minimalist-grey'
                      ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#d4af37]'
                      : 'border-white/10 bg-[#0c0e14] text-slate-300'
                  }`}
                >
                  Concrete Loft
                </button>
                <button
                  onClick={() => setWallTheme('luxury-salon')}
                  className={`rounded-xl p-3 text-xs font-semibold border text-left transition-all ${
                    wallTheme === 'luxury-salon'
                      ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#d4af37]'
                      : 'border-white/10 bg-[#0c0e14] text-slate-300'
                  }`}
                >
                  Emerald Salon
                </button>
                <button
                  onClick={() => setWallTheme('brick-loft')}
                  className={`rounded-xl p-3 text-xs font-semibold border text-left transition-all ${
                    wallTheme === 'brick-loft'
                      ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#d4af37]'
                      : 'border-white/10 bg-[#0c0e14] text-slate-300'
                  }`}
                >
                  Terracotta Brick
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
