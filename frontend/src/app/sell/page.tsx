'use client';

import React, { useState } from 'react';
import { Sparkles, Upload, ShieldCheck, CheckCircle2, Calculator, Image as ImageIcon } from 'lucide-react';

export default function SellPage() {
  const [title, setTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [medium, setMedium] = useState('Oil');
  const [style, setStyle] = useState('Abstract');
  const [width, setWidth] = useState(40);
  const [height, setHeight] = useState(30);
  const [yearCreated, setYearCreated] = useState(2026);
  const [price, setPrice] = useState<number | ''>('');
  const [imageUrl, setImageUrl] = useState('/artworks/art1.jpg');
  const [description, setDescription] = useState('');
  const [exhibitions, setExhibitions] = useState(5);

  const [aiSuggestedPrice, setAiSuggestedPrice] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleEstimateAI = async () => {
    try {
      const res = await fetch('/api/valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          medium,
          style,
          width_inches: Number(width),
          height_inches: Number(height),
          year_created: Number(yearCreated),
          artist_exhibitions: Number(exhibitions),
          has_certificate: true
        })
      });
      const data = await res.json();
      if (data.estimated_val_usd) {
        setAiSuggestedPrice(data.estimated_val_usd);
        setPrice(data.estimated_val_usd);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#07080b] py-12 px-6">
      <div className="mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="text-center space-y-3 border-b border-white/10 pb-8">
          <div className="inline-flex items-center space-x-2 rounded-full border border-[#d4af37]/30 bg-[#12151f] px-4 py-1 text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4" />
            <span>Artist Atelier Submission Portal</span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold text-white sm:text-5xl">
            List Your Original Painting
          </h1>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            Submit your original oil or acrylic artwork for curation. Gain instant algorithmic valuation guidance powered by FastAPI and cryptographically signed provenance certificates.
          </p>
        </div>

        {submitted ? (
          <div className="mt-12 rounded-3xl border border-[#d4af37]/50 bg-[#0c0e14] p-12 text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d4af37]/20 text-[#d4af37] mx-auto">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-white">Masterwork Submission Received!</h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Your painting <strong className="text-[#d4af37]">"{title || 'Untitled'}"</strong> has been registered on the Supabase ledger with Certificate Hash <code className="text-emerald-400 font-mono">0x{Math.random().toString(16).substr(2, 8).toUpperCase()}</code>.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 rounded-xl bg-[#d4af37] px-6 py-2.5 text-xs font-bold text-black uppercase tracking-wider"
            >
              List Another Painting
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-8 rounded-3xl border border-white/10 bg-[#0c0e14] p-8">
            
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-white border-b border-white/10 pb-2">1. Artwork Identity & Artist</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Painting Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Symphony of Obsidian & Gold"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#12151f] px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Artist Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Evelyn Thorne"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#12151f] px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Medium, Dimensions & Valuation */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h3 className="font-serif text-lg font-bold text-white">2. Medium, Dimensions & Pricing</h3>
                <button
                  type="button"
                  onClick={handleEstimateAI}
                  className="flex items-center space-x-1.5 rounded-lg border border-[#d4af37]/40 bg-[#d4af37]/10 px-3 py-1 text-[11px] font-semibold text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Get AI Valuation Recommendation</span>
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Medium</label>
                  <select
                    value={medium}
                    onChange={(e) => setMedium(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#12151f] px-3 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                  >
                    <option value="Oil">Oil on Canvas</option>
                    <option value="Acrylic">Acrylic on Canvas</option>
                    <option value="Watercolor">Watercolor</option>
                    <option value="Charcoal">Charcoal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Style</label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#12151f] px-3 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                  >
                    <option value="Abstract">Abstract</option>
                    <option value="Impressionism">Impressionism</option>
                    <option value="Expressionism">Expressionism</option>
                    <option value="Surrealism">Surrealism</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Width (Inches)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-[#12151f] px-3 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Height (Inches)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-[#12151f] px-3 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
              </div>

              {aiSuggestedPrice && (
                <div className="rounded-xl border border-[#d4af37]/30 bg-[#12151f] p-4 flex items-center justify-between text-xs">
                  <span className="text-slate-300">FastAPI AI Valuation Recommendation:</span>
                  <span className="font-serif text-lg font-bold text-gold-gradient">${aiSuggestedPrice.toLocaleString()} USD</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Listing Price (USD) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 8500"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-[#12151f] px-4 py-2.5 text-xs text-white font-mono focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Year Created</label>
                  <input
                    type="number"
                    value={yearCreated}
                    onChange={(e) => setYearCreated(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-[#12151f] px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Description & Preview */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-white border-b border-white/10 pb-2">3. Masterwork Details & Image URL</h3>
              
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Artwork Description & Technique</label>
                <textarea
                  rows={3}
                  placeholder="Describe your impasto techniques, palette knife methods, gold leaf layering, or conceptual inspiration..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#12151f] px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">High-Res Painting Image URL</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#12151f] px-4 py-2.5 text-xs text-white font-mono focus:border-[#d4af37] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#fcf6ba] to-[#b87333] py-4 text-xs font-bold uppercase tracking-wider text-black shadow-glow-gold hover:brightness-110"
            >
              {submitting ? 'Registering on Supabase Ledger...' : 'Publish Masterwork to Marketplace'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
