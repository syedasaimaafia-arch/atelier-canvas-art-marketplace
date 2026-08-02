'use client';

import React, { useState } from 'react';
import { ARTWORKS_DATA, Artwork } from '@/lib/data';
import { ArtworkCard } from '@/components/ArtworkCard';
import { RoomPreviewModal } from '@/components/RoomPreviewModal';
import { Search, Filter, SlidersHorizontal, Palette, Sparkles, Grid } from 'lucide-react';

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedium, setSelectedMedium] = useState('All');
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [maxPrice, setMaxPrice] = useState(15000);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const filtered = ARTWORKS_DATA.filter((art) => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.medium.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMedium = selectedMedium === 'All' || art.medium === selectedMedium;
    const matchesStyle = selectedStyle === 'All' || art.style === selectedStyle;
    const matchesPrice = art.price <= maxPrice;

    return matchesSearch && matchesMedium && matchesStyle && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'newest') return b.yearCreated - a.yearCreated;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#07080b] py-12 px-6">
      <div className="mx-auto max-w-7xl">
        
        {/* Page Header */}
        <div className="border-b border-white/10 pb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#d4af37] uppercase tracking-widest">
            <Sparkles className="h-4 w-4" />
            <span>International Curated Catalogue</span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold text-white sm:text-5xl mt-2">
            Fine Art Paintings Gallery
          </h1>
          <p className="mt-2 text-xs text-slate-400 max-w-2xl">
            Browse original oil, acrylic, and mixed media paintings from verified master artists. Every work features cryptographic provenance and living room AR scale previews.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between rounded-2xl border border-white/10 bg-[#0c0e14] p-5">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, artist, or style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#12151f] pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#d4af37] focus:outline-none"
            />
          </div>

          {/* Medium Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400">Medium:</span>
            <select
              value={selectedMedium}
              onChange={(e) => setSelectedMedium(e.target.value)}
              className="rounded-xl border border-white/10 bg-[#12151f] px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
            >
              <option value="All">All Mediums</option>
              <option value="Oil">Oil on Canvas</option>
              <option value="Acrylic">Acrylic</option>
              <option value="Charcoal">Charcoal</option>
            </select>
          </div>

          {/* Style Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400">Style:</span>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="rounded-xl border border-white/10 bg-[#12151f] px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
            >
              <option value="All">All Styles</option>
              <option value="Abstract">Abstract</option>
              <option value="Impressionism">Impressionism</option>
              <option value="Expressionism">Expressionism</option>
              <option value="Surrealism">Surrealism</option>
            </select>
          </div>

          {/* Max Price Slider */}
          <div className="flex items-center space-x-3">
            <span className="text-xs text-slate-400 whitespace-nowrap">Max Price: <span className="font-mono text-[#d4af37]">${maxPrice.toLocaleString()}</span></span>
            <input
              type="range"
              min="3000"
              max="20000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-24 accent-[#d4af37]"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="h-4 w-4 text-[#d4af37]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-white/10 bg-[#12151f] px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Year: Newest</option>
            </select>
          </div>
        </div>

        {/* Gallery Results Count */}
        <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
          <span>Showing <strong className="text-white">{filtered.length}</strong> masterwork paintings</span>
        </div>

        {/* Artworks Grid */}
        {filtered.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                onOpenRoomVisualizer={(art) => setSelectedArtwork(art)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center py-16 rounded-3xl border border-white/10 bg-[#0c0e14]">
            <Palette className="h-12 w-12 text-[#d4af37] mx-auto opacity-50" />
            <h3 className="font-serif text-xl font-bold text-white mt-4">No Artworks Found</h3>
            <p className="text-xs text-slate-400 mt-2">Try adjusting your filters or price slider parameters.</p>
          </div>
        )}
      </div>

      {/* Room Visualizer Modal */}
      {selectedArtwork && (
        <RoomPreviewModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
        />
      )}
    </div>
  );
}
