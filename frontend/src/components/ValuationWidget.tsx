'use client';

import React, { useState } from 'react';
import { Sparkles, Calculator, CheckCircle2, TrendingUp, ShieldAlert, ArrowRight } from 'lucide-react';

export function ValuationWidget() {
  const [medium, setMedium] = useState('Oil');
  const [style, setStyle] = useState('Impressionism');
  const [width, setWidth] = useState(36);
  const [height, setHeight] = useState(48);
  const [year, setYear] = useState(2025);
  const [exhibitions, setExhibitions] = useState(8);
  const [hasCert, setHasCert] = useState(true);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          medium,
          style,
          width_inches: Number(width),
          height_inches: Number(height),
          year_created: Number(year),
          artist_exhibitions: Number(exhibitions),
          has_certificate: hasCert
        })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="valuation" className="relative overflow-hidden rounded-3xl border border-[#d4af37]/30 bg-[#0c0e14] p-8 shadow-2xl">
      {/* Background Ambient Glow */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#d4af37]/10 blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Form Inputs */}
        <div className="lg:w-1/2 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4af37]/20 text-[#d4af37]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">FastAPI Algorithmic Valuation</span>
              <h2 className="font-serif text-2xl font-bold text-white">Fine Art AI Price Estimator</h2>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Estimate primary and secondary market collector pricing for original oil/acrylic paintings using canvas area metrics, medium rarity, style demand index, and artist exhibition provenance.
          </p>

          <form onSubmit={handleCalculate} className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Medium</label>
              <select
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#12151f] px-3.5 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
              >
                <option value="Oil">Oil on Canvas</option>
                <option value="Acrylic">Acrylic on Canvas</option>
                <option value="Watercolor">Watercolor on Paper</option>
                <option value="Charcoal">Charcoal & Mixed Media</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Artistic Style</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#12151f] px-3.5 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
              >
                <option value="Impressionism">Impressionism</option>
                <option value="Abstract">Abstract & Impasto</option>
                <option value="Surrealism">Surrealism</option>
                <option value="Expressionism">Expressionism</option>
                <option value="Realism">Realism</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Width (Inches)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full rounded-xl border border-white/10 bg-[#12151f] px-3.5 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Height (Inches)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full rounded-xl border border-white/10 bg-[#12151f] px-3.5 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Solo/Group Exhibitions</label>
              <input
                type="number"
                value={exhibitions}
                onChange={(e) => setExhibitions(Number(e.target.value))}
                className="w-full rounded-xl border border-white/10 bg-[#12151f] px-3.5 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Year Created</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full rounded-xl border border-white/10 bg-[#12151f] px-3.5 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
              />
            </div>

            <div className="col-span-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b87333] py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-all hover:brightness-110 shadow-glow-gold"
              >
                {loading ? (
                  <span>Evaluating Market Data...</span>
                ) : (
                  <>
                    <Calculator className="h-4 w-4" />
                    <span>Run AI Valuation Model</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Panel */}
        <div className="lg:w-1/2 flex flex-col justify-center rounded-2xl border border-white/10 bg-[#12151f]/90 p-6 backdrop-blur-xl">
          {result ? (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400">Verified Valuation Estimate</span>
                <div className="flex items-baseline space-x-3 mt-1">
                  <span className="font-serif text-4xl font-extrabold text-gold-gradient">
                    ${result.estimated_val_usd?.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400">USD</span>
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  Estimated Range: <span className="font-mono text-slate-200">${result.val_range_low?.toLocaleString()}</span> – <span className="font-mono text-slate-200">${result.val_range_high?.toLocaleString()}</span>
                </p>
              </div>

              <div className="rounded-xl border border-[#d4af37]/30 bg-[#0c0e14] p-4">
                <div className="flex items-center justify-between text-xs font-semibold text-white">
                  <span>Market Classification</span>
                  <span className="rounded-md bg-[#d4af37]/20 px-2.5 py-1 text-[10px] text-[#d4af37] uppercase">{result.market_tier}</span>
                </div>
                <div className="mt-3 flex items-center space-x-2 text-[11px] text-emerald-400">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>Model Confidence Score: {(result.confidence_score * 100).toFixed(0)}%</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Valuation Drivers</h4>
                <ul className="space-y-2">
                  {result.valuation_factors?.map((factor: string, idx: number) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-[#d4af37] shrink-0 mt-0.5" />
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#07080b] text-[#d4af37]">
                <Sparkles className="h-8 w-8 animate-pulse" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Ready for Instant Art Valuation</h3>
                <p className="text-xs text-slate-400 max-w-xs mt-1">
                  Adjust artwork parameters on the left and click submit to trigger our FastAPI pricing engine.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
