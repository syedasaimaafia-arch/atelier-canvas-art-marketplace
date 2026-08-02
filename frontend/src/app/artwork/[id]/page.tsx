'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ARTWORKS_DATA, Artwork } from '@/lib/data';
import { RoomPreviewModal } from '@/components/RoomPreviewModal';
import { ShieldCheck, Eye, Sparkles, Award, ArrowLeft, CheckCircle2, ShoppingCart, Heart, Lock } from 'lucide-react';

export default function ArtworkDetailPage() {
  const params = useParams();
  const router = useRouter();
  const artworkId = params.id as string;

  const artwork = ARTWORKS_DATA.find((a) => a.id === artworkId) || ARTWORKS_DATA[0];

  const [showRoomModal, setShowRoomModal] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-[#07080b] py-12 px-6">
      <div className="mx-auto max-w-7xl">
        
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-[#d4af37] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Gallery</span>
        </button>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Main Artwork Viewer */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative overflow-hidden rounded-3xl border border-[#d4af37]/40 bg-[#0c0e14] p-4 shadow-canvas-depth">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-black">
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Action Toolbar overlay */}
              <div className="mt-4 flex items-center justify-between px-2">
                <button
                  onClick={() => setShowRoomModal(true)}
                  className="flex items-center space-x-2 rounded-xl border border-[#d4af37]/50 bg-[#12151f] px-4 py-2 text-xs font-semibold text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  <span>Launch Living Room Wall Scale Visualizer</span>
                </button>

                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <Lock className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Cryptographic Certificate: <code className="text-white font-mono">{artwork.certificateHash}</code></span>
                </div>
              </div>
            </div>

            {/* Provenance & History Timeline */}
            <div className="rounded-3xl border border-white/10 bg-[#0c0e14] p-6 space-y-4">
              <h3 className="font-serif text-lg font-bold text-white flex items-center space-x-2">
                <Award className="h-5 w-5 text-[#d4af37]" />
                <span>Exhibition & Provenance Records</span>
              </h3>
              <ul className="space-y-3 pt-2">
                {artwork.provenance.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-xs text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Purchase Details Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#12151f] p-8 space-y-6">
              <div>
                <span className="rounded-md border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-1 text-[10px] font-bold text-[#d4af37] uppercase tracking-wider">
                  {artwork.medium} • {artwork.style}
                </span>
                <h1 className="font-serif text-3xl font-bold text-white mt-3 leading-snug">{artwork.title}</h1>
                <p className="text-xs text-slate-400 mt-1">Created in {artwork.yearCreated}</p>
              </div>

              {/* Artist Card */}
              <div className="flex items-center space-x-3 rounded-2xl border border-white/10 bg-[#0c0e14] p-4">
                <img
                  src={artwork.artist.avatar}
                  alt={artwork.artist.name}
                  className="h-12 w-12 rounded-full border border-[#d4af37] object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{artwork.artist.name}</h4>
                  <p className="text-[11px] text-slate-400">{artwork.artist.nationality} • Verified Atelier Master</p>
                </div>
              </div>

              <div className="space-y-2 border-t border-b border-white/10 py-4 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Dimensions:</span>
                  <span className="font-mono text-white font-semibold">{artwork.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className="text-emerald-400 font-semibold uppercase tracking-wider">Available for Immediate Acquisition</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Shipping:</span>
                  <span className="text-slate-200">White-Glove Insured Global Freight</span>
                </div>
              </div>

              {/* Price & Acquisition CTA */}
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-widest">Collector Acquisition Price</span>
                  <p className="font-serif text-3xl font-extrabold text-gold-gradient">${artwork.price.toLocaleString()}</p>
                </div>

                {purchaseSuccess ? (
                  <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-center">
                    <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto" />
                    <h4 className="text-sm font-bold text-white mt-2">Reservation Request Confirmed!</h4>
                    <p className="text-xs text-slate-300 mt-1">Our fine art advisor will contact your email shortly to finalize delivery details.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => setPurchaseSuccess(true)}
                      className="flex w-full items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#fcf6ba] to-[#b87333] py-4 text-xs font-bold uppercase tracking-wider text-black shadow-glow-gold hover:brightness-110"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Acquire Original Masterwork</span>
                    </button>

                    <button
                      onClick={() => alert(`Private Offer modal opened for ${artwork.title}`)}
                      className="w-full rounded-2xl border border-white/15 bg-white/5 py-3.5 text-xs font-semibold text-white hover:border-[#d4af37]/50 hover:bg-white/10"
                    >
                      Submit Private Offer / Inquiry
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Room Visualizer Modal */}
      {showRoomModal && (
        <RoomPreviewModal
          artwork={artwork}
          onClose={() => setShowRoomModal(false)}
        />
      )}
    </div>
  );
}
