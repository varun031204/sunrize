import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Satellite, Globe, BarChart3, Shield, Zap, Target } from 'lucide-react';

const FEATURES = [
  {
    icon: Target,
    title: 'Risk Assessment',
    description: '45% chance of "Very Wet" conditions next June — not tomorrow\'s exact temperature. Plan months ahead with confidence.',
    color: 'text-red-500',
    bg: 'bg-red-50',
  },
  {
    icon: Shield,
    title: 'Personalized Thresholds',
    description: 'Define your own risk limits: Very Hot ≥ 38°C, Very Windy ≥ 25 km/h — tailored to your specific activity.',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
  {
    icon: Globe,
    title: 'Destination Finder',
    description: 'Find cities with ≤ 15% chance of bad weather in your chosen month across 130+ Southern Asian locations.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
  },
  {
    icon: Satellite,
    title: 'Real NASA Data',
    description: 'GPM precipitation, FLDAS temperature, and MERRA-2 wind data — decades of satellite observations.',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
];

const STATS = [
  { value: '130+', label: 'Cities Covered' },
  { value: '3',    label: 'NASA Datasets' },
  { value: '5+',   label: 'Years of Data' },
  { value: '95%+', label: 'Confidence' },
];

const Home = () => (
  <div className="min-h-screen bg-slate-50">

    {/* Hero */}
    <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-6">
            <Satellite className="w-3.5 h-3.5" />
            NASA Space Apps Challenge 2024
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
            Strategic Weather<br />
            <span className="text-blue-400">Risk Intelligence</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-2xl">
            Stop asking "What will the weather be?" — start asking "Where should I go?"
            SUNRIZE uses real NASA satellite data to give you probability-based risk scores
            for planning events months in advance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/experience"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors duration-150"
            >
              Assess a Location
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/vacation"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-colors duration-150"
            >
              Find Best Destinations
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black text-blue-400">{s.value}</div>
                <div className="text-sm text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Why SUNRIZE is Different
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Traditional weather apps give you tomorrow's forecast. We give you strategic intelligence for decisions months away.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(({ icon: Icon, title, description, color, bg }) => (
            <div key={title} className="p-6 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-200 bg-white">
              <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Comparison */}
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Forecast vs Risk Assessment</h2>
          <p className="text-slate-500">Understanding the difference changes how you plan.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="font-semibold text-red-800">Standard Weather App</span>
            </div>
            <p className="text-red-700 text-sm leading-relaxed">
              "It will be 28°C next Friday." — Deterministic, short-range, useless for planning 3 months ahead.
            </p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-semibold text-emerald-800">SUNRIZE Risk Assessment</span>
            </div>
            <p className="text-emerald-700 text-sm leading-relaxed">
              "45% probability of Very Wet conditions in June at this location." — Probabilistic, strategic, actionable months in advance.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to plan smarter?
        </h2>
        <p className="text-blue-100 text-lg mb-8">
          Use real NASA satellite data to make confident, long-term outdoor decisions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/vacation"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors"
          >
            Find Best Destinations <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/15 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/25 transition-colors"
          >
            Learn How It Works
          </Link>
        </div>
      </div>
    </section>

  </div>
);

export default Home;
