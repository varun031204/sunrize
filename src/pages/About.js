import React from 'react';
import { Database, Satellite, BarChart3, Map } from 'lucide-react';

const DATASETS = [
  { name: 'GPM IMERG', full: 'Global Precipitation Measurement', res: '0.1° × 0.1°', freq: 'Monthly avg', color: 'bg-blue-500' },
  { name: 'FLDAS',     full: 'Famine Early Warning Land Data Assimilation', res: '0.1° × 0.1°', freq: 'Monthly avg', color: 'bg-orange-500' },
  { name: 'MERRA-2',   full: 'Modern-Era Retrospective Analysis', res: '0.5° × 0.625°', freq: 'Monthly avg', color: 'bg-purple-500' },
];

const STEPS = [
  { n: '01', title: 'Multi-Decade NASA Data', body: 'We load real .nc satellite files — GPM precipitation, FLDAS surface temperature, and MERRA-2 wind speed — covering Southern Asia from 2020 to 2025.' },
  { n: '02', title: 'Climatology, Not Forecast', body: 'Instead of predicting tomorrow\'s weather, we analyze the statistical distribution of conditions across years to quantify risk probability.' },
  { n: '03', title: 'Risk Probability Output', body: 'For any location, we compute the likelihood of Very Wet, Very Hot, Very Cold, Very Windy, and Very Uncomfortable conditions.' },
  { n: '04', title: 'Strategic Decision Support', body: 'You set your own risk tolerance per activity. We filter 130+ cities and rank them — so you know exactly where to go and when.' },
];

const About = () => (
  <div className="min-h-screen bg-slate-50">

    {/* Hero */}
    <section className="bg-slate-900 text-white pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-6">
          <Satellite className="w-3.5 h-3.5" />
          How It Works
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
          The Science Behind SUNRIZE
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
          Standard weather apps tell you what the weather will be. We tell you the <em>probability of risk</em> — months before your event.
        </p>
      </div>
    </section>

    {/* The Problem */}
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Why Current Tools Fall Short</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Short-term Only', body: 'Standard apps give 7–14 day forecasts. Useless for planning events 3–6 months ahead.', color: 'border-red-200 bg-red-50', tc: 'text-red-800', bc: 'text-red-700' },
            { title: 'Misleading Averages', body: '"Average July temp is 28°C" hides the risk of extremes — 5 days over 42°C in the same month.', color: 'border-amber-200 bg-amber-50', tc: 'text-amber-800', bc: 'text-amber-700' },
            { title: 'No Risk Framing', body: 'Event planners need probability of adverse conditions, not a single deterministic number.', color: 'border-blue-200 bg-blue-50', tc: 'text-blue-800', bc: 'text-blue-700' },
          ].map((c) => (
            <div key={c.title} className={`border rounded-2xl p-6 ${c.color}`}>
              <h3 className={`font-semibold mb-2 ${c.tc}`}>{c.title}</h3>
              <p className={`text-sm leading-relaxed ${c.bc}`}>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* How it works */}
    <section className="py-16 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center">Our Approach</h2>
        <div className="space-y-6">
          {STEPS.map((s) => (
            <div key={s.n} className="flex gap-6 bg-white rounded-2xl p-6 border border-slate-100">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black text-sm">
                {s.n}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* NASA Datasets */}
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">NASA Datasets</h2>
          <p className="text-slate-500">Three real satellite datasets powering every analysis.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DATASETS.map((d) => (
            <div key={d.name} className="border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 ${d.color} rounded-xl flex items-center justify-center mb-4`}>
                <Database className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">{d.name}</h3>
              <p className="text-slate-500 text-sm mb-4">{d.full}</p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Resolution</span>
                  <span className="font-medium text-slate-700">{d.res}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Frequency</span>
                  <span className="font-medium text-slate-700">{d.freq}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Coverage */}
    <section className="py-16 bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Map className="w-10 h-10 text-blue-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Coverage Area</h2>
        <p className="text-slate-300 mb-8">Southern Asia — 130+ cities across 8 countries</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {['🇮🇳 India (67)', '🇵🇰 Pakistan (18)', '🇧🇩 Bangladesh (12)', '🇱🇰 Sri Lanka (12)', '🇳🇵 Nepal (12)', '🇧🇹 Bhutan (4)', '🇲🇻 Maldives (2)', '🇦🇫 Afghanistan (6)'].map((c) => (
            <div key={c} className="bg-white/10 rounded-xl px-4 py-3 text-sm font-medium">{c}</div>
          ))}
        </div>
      </div>
    </section>

  </div>
);

export default About;
