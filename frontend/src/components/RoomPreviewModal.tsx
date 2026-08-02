'use client';

import React, { useState } from 'react';
import { Artwork } from '@/lib/data';
import { X, Sliders, Maximize2, Check, ShieldCheck, Sparkles } from 'lucide-react';

interface RoomPreviewModalProps {
  artwork: Artwork;
  onClose: () => void;
}

export function RoomPreviewModal({ artwork, onClose }: RoomPreviewModalProps) {
  const [wallTheme, setWallTheme] = useState<'dark-velvet' | 'minimalist-grey' | 'brick-loft' | 'luxury-salon'>('dark-velvet');
  const [sofaColor, setSofaColor] = useState('#1e2330');

  const wallStyles = {
    'dark-velvet': 'bg-gradient-to-b from-[#12141c] to-[#07080b] border-white/10',
    'minimalist-grey': 'bg-gradient-to-b from-[#2a2d36] to-[#1a1c23] border-white/10',
    'brick-loft': 'bg-gradient-to-b from-[#2b1f1a] to-[#150f0d] border-amber-900/30',
    'luxury-salon': 'bg-gradient-to-b from-[#18201a] to-[#0a0f0b] border-emerald-900/30',
  };

  // Convert artwork inches to visual scale percentage inside container
  const scalePercent = Math.min(85, Math.max(35, (artwork.roomScaleWidth / 60) * 60));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8">
      <div className="relative flex flex-col h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-[#d4af37]/40 bg-[#0c0e14] shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center space-x-3">
            <Sparkles className="h-5 w-5 text-[#d4af37]" />
            <div>
              <h3 className="font-serif text-lg font-bold text-white">"View in Living Room" Scale Visualizer</h3>
              <p className="text-xs text-slate-400">Artwork: <span className="text-[#d4af37]">{artwork.title}</span> ({artwork.dimensions})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Interactive Wall Simulation Canvas */}
        <div className={`relative flex-1 flex flex-col items-center justify-center p-8 transition-colors duration-500 ${wallStyles[wallTheme]}`}>
          
          {/* Wall Spotlight Effect */}
          <div className="absolute top-0 h-64 w-96 rounded-full bg-gradient-radial from-amber-100/10 via-transparent to-transparent pointer-events-none" />

          {/* Hanging Artwork Frame with realistic shadow and spotlight */}
          <div
            className="relative z-10 transition-all duration-500 ease-out canvas-frame"
            style={{ width: `${scalePercent}%`, maxWidth: '480px' }}
          >
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-full h-auto object-cover rounded-sm shadow-2xl"
            />
            {/* Gallery Light Spot */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="h-2 w-12 rounded-full bg-[#d4af37]/60 shadow-[0_0_15px_#d4af37]" />
              <div className="h-8 w-0.5 bg-gradient-to-b from-[#d4af37]/60 to-transparent" />
            </div>
          </div>

          {/* Simulated Living Room Furniture / Sofa Silhouette for Scale comparison */}
          <div className="mt-12 w-full max-w-xl z-10 flex flex-col items-center">
            <div className="w-full h-24 rounded-t-3xl border-t border-white/10 shadow-2xl transition-colors duration-500 flex items-center justify-center" style={{ backgroundColor: sofaColor }}>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase">90" Designer Velvet Sofa (Scale Reference)</span>
            </div>
            <div className="w-full h-3 bg-black/60 rounded-b-lg" />
          </div>

          {/* Floor Reflection Line */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />
        </div>

        {/* Control Toolbar */}
        <div className="border-t border-white/10 bg-[#12151f] px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Wall Interior Selector */}
          <div className="flex items-center space-x-3">
            <span className="text-xs font-semibold text-slate-400 uppercase">Wall Interior:</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setWallTheme('dark-velvet')}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-all ${
                  wallTheme === 'dark-velvet'
                    ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#d4af37]'
                    : 'border-white/10 bg-white/5 text-slate-300'
                }`}
              >
                Dark Velvet Gallery
              </button>
              <button
                onClick={() => setWallTheme('minimalist-grey')}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-all ${
                  wallTheme === 'minimalist-grey'
                    ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#d4af37]'
                    : 'border-white/10 bg-white/5 text-slate-300'
                }`}
              >
                Concrete Loft
              </button>
              <button
                onClick={() => setWallTheme('luxury-salon')}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-all ${
                  wallTheme === 'luxury-salon'
                    ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#d4af37]'
                    : 'border-white/10 bg-white/5 text-slate-300'
                }`}
              >
                Emerald Salon
              </button>
            </div>
          </div>

          {/* Buy Action */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase">Acquisition Price</span>
              <p className="font-serif text-lg font-bold text-gold-gradient">${artwork.price.toLocaleString()}</p>
            </div>
            <button
              onClick={() => alert(`Inquiry submitted for "${artwork.title}". Our art concierge will contact you within 2 hours.`)}
              className="rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b87333] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-glow-gold hover:brightness-110"
            >
              Reserve Masterwork
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
