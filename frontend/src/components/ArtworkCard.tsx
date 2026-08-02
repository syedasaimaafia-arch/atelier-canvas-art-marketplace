'use client';

import React from 'react';
import Link from 'next/link';
import { Artwork } from '@/lib/data';
import { ShieldCheck, Eye, Sparkles, Heart } from 'lucide-react';

interface ArtworkCardProps {
  artwork: Artwork;
  onOpenRoomVisualizer?: (artwork: Artwork) => void;
}

export function ArtworkCard({ artwork, onOpenRoomVisualizer }: ArtworkCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#12151f] transition-all duration-500 hover:-translate-y-2 hover:border-[#d4af37]/60 hover:shadow-canvas-depth">
      {/* Artwork Canvas Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0a0c12]">
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-transparent to-black/30 opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Medium & Style Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="rounded-md border border-white/20 bg-black/60 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white backdrop-blur-md uppercase">
            {artwork.medium}
          </span>
          <span className="rounded-md border border-[#d4af37]/30 bg-[#1d2232]/80 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-[#d4af37] backdrop-blur-md uppercase">
            {artwork.style}
          </span>
        </div>

        {/* Favorite Icon */}
        <button className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-slate-300 backdrop-blur-md transition-colors hover:border-rose-500/50 hover:bg-rose-500/20 hover:text-rose-400">
          <Heart className="h-4 w-4" />
        </button>

        {/* Hover Quick Actions */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {onOpenRoomVisualizer && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onOpenRoomVisualizer(artwork);
              }}
              className="flex items-center space-x-1.5 rounded-lg border border-[#d4af37]/40 bg-[#07080b]/90 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:border-[#d4af37] hover:text-[#d4af37]"
            >
              <Eye className="h-3.5 w-3.5 text-[#d4af37]" />
              <span>View in Room</span>
            </button>
          )}
          <Link
            href={`/artwork/${artwork.id}`}
            className="ml-auto rounded-lg bg-[#d4af37] px-3.5 py-1.5 text-xs font-bold text-black transition-transform hover:scale-105"
          >
            Details & Purchase
          </Link>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={artwork.artist.avatar}
              alt={artwork.artist.name}
              className="h-6 w-6 rounded-full border border-[#d4af37]/40 object-cover"
            />
            <span className="text-xs font-medium text-slate-300">{artwork.artist.name}</span>
          </div>
          <div className="flex items-center space-x-1 text-[10px] text-emerald-400" title="Cryptographic Certificate Verified">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Certified</span>
          </div>
        </div>

        <Link href={`/artwork/${artwork.id}`} className="mt-2 group-hover:text-[#d4af37] transition-colors">
          <h3 className="font-serif text-lg font-bold leading-snug text-white line-clamp-1">{artwork.title}</h3>
        </Link>

        <p className="mt-1 text-xs text-slate-400 line-clamp-2">{artwork.description}</p>

        <div className="mt-4 flex items-end justify-between border-t border-white/10 pt-3">
          <div>
            <span className="text-[10px] uppercase text-slate-400">Dimensions</span>
            <p className="text-xs font-mono text-slate-300">{artwork.dimensions}</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase text-slate-400">Collector Price</span>
            <p className="font-serif text-lg font-extrabold text-gold-gradient">${artwork.price.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
