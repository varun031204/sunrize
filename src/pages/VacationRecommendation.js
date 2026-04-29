import React, { useState } from 'react';
import { Calendar, Rocket, Satellite, Globe, Zap, Wind, Thermometer, Droplets, AlertTriangle, CheckCircle } from 'lucide-react';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const ACTIVITY_PRESETS = {
  outdoor:       { maxWetRisk: 15, maxHotRisk: 35, maxColdRisk: 18, maxWindyRisk: 22 },
  beach:         { maxWetRisk: 10, maxHotRisk: 50, maxColdRisk: 5,  maxWindyRisk: 30 },
  hiking:        { maxWetRisk: 15, maxHotRisk: 35, maxColdRisk: 20, maxWindyRisk: 25 },
  mountaineering:{ maxWetRisk: 5,  maxHotRisk: 25, maxColdRisk: 40, maxWindyRisk: 15 },
  cycling:       { maxWetRisk: 10, maxHotRisk: 40, maxColdRisk: 15, maxWindyRisk: 20 },
  camping:       { maxWetRisk: 8,  maxHotRisk: 45, maxColdRisk: 25, maxWindyRisk: 18 },
  photography:   { maxWetRisk: 12, maxHotRisk: 40, maxColdRisk: 20, maxWindyRisk: 22 },
  festivals:     { maxWetRisk: 5,  maxHotRisk: 35, maxColdRisk: 10, maxWindyRisk: 15 },
  sports:        { maxWetRisk: 8,  maxHotRisk: 38, maxColdRisk: 12, maxWindyRisk: 25 },
  agriculture:   { maxWetRisk: 25, maxHotRisk: 45, maxColdRisk: 30, maxWindyRisk: 35 },
  construction:  { maxWetRisk: 5,  maxHotRisk: 42, maxColdRisk: 15, maxWindyRisk: 20 },
  aviation:      { maxWetRisk: 3,  maxHotRisk: 40, maxColdRisk: 10, maxWindyRisk: 8  },
  sailing:       { maxWetRisk: 15, maxHotRisk: 45, maxColdRisk: 20, maxWindyRisk: 40 },
  wedding:       { maxWetRisk: 2,  maxHotRisk: 30, maxColdRisk: 8,  maxWindyRisk: 10 },
  sightseeing:   { maxWetRisk: 12, maxHotRisk: 38, maxColdRisk: 15, maxWindyRisk: 20 },
};

const RISK_META = [
  { key: 'very_wet',   label: 'Very Wet',   icon: <Droplets className="h-3.5 w-3.5" />,     bar: 'bg-blue-500'   },
  { key: 'very_hot',   label: 'Very Hot',   icon: <Thermometer className="h-3.5 w-3.5" />,  bar: 'bg-red-500'    },
  { key: 'very_cold',  label: 'Very Cold',  icon: <Thermometer className="h-3.5 w-3.5" />,  bar: 'bg-cyan-500'   },
  { key: 'very_windy', label: 'Very Windy', icon: <Wind className="h-3.5 w-3.5" />,         bar: 'bg-purple-500' },
];

const riskBadge = (val) => {
  if (val <= 15) return 'text-green-700 bg-green-100 border border-green-200';
  if (val <= 30) return 'text-yellow-700 bg-yellow-100 border border-yellow-200';
  return 'text-red-700 bg-red-100 border border-red-200';
};

const overallBadge = (val) => {
  if (val <= 12) return { cls: 'text-green-700 bg-green-100', label: 'Excellent' };
  if (val <= 22) return { cls: 'text-blue-700 bg-blue-100',   label: 'Good' };
  if (val <= 32) return { cls: 'text-yellow-700 bg-yellow-100', label: 'Moderate' };
  return { cls: 'text-red-700 bg-red-100', label: 'High Risk' };
};

const RiskBar = ({ value, colorClass }) => (
  <div className="flex items-center gap-2">
    <div className="flex-1 bg-gray-100 rounded-full h-1.5">
      <div className={`${colorClass} h-1.5 rounded-full transition-all`} style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
    <span className="text-xs font-medium text-gray-600 w-8 text-right">{value}%</span>
  </div>
);

const SliderRow = ({ emoji, label, colorBg, colorText, field, value, max, onChange }) => (
  <div className={`${colorBg} p-3 rounded-xl`}>
    <div className="flex items-center justify-between mb-1.5">
      <label className={`text-sm font-medium ${colorText}`}>{emoji} {label}: <span className="font-bold">{value}%</span></label>
      <input type="number" min="0" max={max} value={value}
        onChange={e => onChange(field, Number(e.target.value))}
        className="w-14 px-2 py-0.5 text-xs border rounded-lg text-center" />
    </div>
    <input type="range" min="0" max={max} value={value}
      onChange={e => onChange(field, Number(e.target.value))}
      className="w-full h-1.5 rounded-lg appearance-none cursor-pointer" />
  </div>
);

const VacationRecommendation = () => {
  const [criteria, setCriteria] = useState({
    month: '', year: new Date().getFullYear(),
    maxWetRisk: 15, maxHotRisk: 35, maxColdRisk: 18, maxWindyRisk: 22,
    activityType: 'outdoor',
  });
  const [results, setResults]   = useState(null);
  const [total, setTotal]       = useState(0);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const update = (field, val) => setCriteria(prev => ({ ...prev, [field]: val }));

  const applyActivity = (activity) => {
    const preset = ACTIVITY_PRESETS[activity] || {};
    setCriteria(prev => ({ ...prev, activityType: activity, ...preset }));
  };

  const handleSearch = async () => {
    if (!criteria.month) { setError('Please select a travel month.'); return; }
    setError('');
    setLoading(true);
    setResults(null);
    try {
      const res = await fetch('http://localhost:8889/recommend-destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          month: criteria.month,
          year: parseInt(criteria.year),
          maxWetRisk: criteria.maxWetRisk,
          maxHotRisk: criteria.maxHotRisk,
          maxColdRisk: criteria.maxColdRisk,
          maxWindyRisk: criteria.maxWindyRisk,
          activityType: criteria.activityType,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).detail || 'Server error');
      const data = await res.json();
      setResults(data.recommendations || []);
      setTotal(data.total_analyzed || (data.recommendations || []).length);
    } catch (e) {
      setError(e.message || 'Failed to reach backend. Is it running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 pt-20">
          <div className="backdrop-blur-xl bg-gradient-to-r from-orange-500/10 via-red-500/10 to-yellow-500/10 border border-white/20 rounded-3xl p-10 shadow-2xl">
            <div className="flex items-center justify-center mb-4">
              <Globe className="w-10 h-10 text-green-400 mr-3 animate-pulse" />
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
                Destination Finder
              </h1>
              <Rocket className="w-10 h-10 text-orange-400 ml-3 animate-pulse" />
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We flip the question — not <em>"What's the weather?"</em> but <em>"Where should I go?"</em><br />
              Powered by real NASA satellite data across 130+ Southern Asian cities.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/30 rounded-3xl shadow-2xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <Satellite className="h-6 w-6 mr-2 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-800">Mission Parameters</h2>
            <Zap className="h-6 w-6 ml-2 text-yellow-500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: month / year / activity */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="inline h-4 w-4 mr-1" />Travel Month
                  </label>
                  <select value={criteria.month} onChange={e => update('month', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                    <option value="">Select month</option>
                    {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">🛰️ Year</label>
                  <select value={criteria.year} onChange={e => update('year', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                    {Array.from({ length: 8 }, (_, i) => new Date().getFullYear() + i).map(y =>
                      <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">🎯 Activity Type</label>
                <select value={criteria.activityType} onChange={e => applyActivity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  <option value="outdoor">🏃 General Outdoor</option>
                  <option value="beach">🏖️ Beach & Water Sports</option>
                  <option value="hiking">🥾 Hiking & Trekking</option>
                  <option value="mountaineering">⛰️ Mountaineering</option>
                  <option value="cycling">🚴 Cycling & Biking</option>
                  <option value="camping">🏕️ Camping</option>
                  <option value="photography">📸 Photography</option>
                  <option value="festivals">🎪 Festivals & Events</option>
                  <option value="sports">⚽ Outdoor Sports</option>
                  <option value="agriculture">🌾 Agriculture</option>
                  <option value="construction">🏗️ Construction</option>
                  <option value="aviation">✈️ Aviation</option>
                  <option value="sailing">⛵ Sailing</option>
                  <option value="wedding">💒 Weddings</option>
                  <option value="sightseeing">🏛️ Sightseeing</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Risk thresholds auto-adjusted for selected activity.</p>
              </div>
            </div>

            {/* Right: sliders */}
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-gray-700">🎛️ Max Acceptable Risk</h3>
                <button onClick={() => applyActivity(criteria.activityType)}
                  className="px-3 py-1 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg text-xs font-medium hover:opacity-90 transition-all">
                  Reset Preset
                </button>
              </div>
              <SliderRow emoji="🌧️" label="Very Wet"   colorBg="bg-blue-50"   colorText="text-blue-800"   field="maxWetRisk"   value={criteria.maxWetRisk}   max={60} onChange={update} />
              <SliderRow emoji="🌡️" label="Very Hot"   colorBg="bg-red-50"    colorText="text-red-800"    field="maxHotRisk"   value={criteria.maxHotRisk}   max={60} onChange={update} />
              <SliderRow emoji="❄️" label="Very Cold"  colorBg="bg-cyan-50"   colorText="text-cyan-800"   field="maxColdRisk"  value={criteria.maxColdRisk}  max={60} onChange={update} />
              <SliderRow emoji="💨" label="Very Windy" colorBg="bg-purple-50" colorText="text-purple-800" field="maxWindyRisk" value={criteria.maxWindyRisk} max={60} onChange={update} />
            </div>
          </div>

          {error && (
            <div className="mt-4 flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />{error}
            </div>
          )}

          <button onClick={handleSearch} disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 hover:opacity-90 disabled:opacity-50 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl text-lg">
            {loading
              ? <><Satellite className="animate-spin h-5 w-5" />Scanning {criteria.month || 'all months'} from orbit...</>
              : <><Rocket className="h-5 w-5" />Find Best Destinations</>}
          </button>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white/60 rounded-3xl p-6 animate-pulse">
                <div className="flex gap-4">
                  <div className="h-6 bg-gray-200 rounded w-48" />
                  <div className="h-6 bg-gray-200 rounded w-24" />
                </div>
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {[1,2,3,4].map(j => <div key={j} className="h-4 bg-gray-200 rounded" />)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {!loading && results !== null && (
          <div>
            {/* Summary bar */}
            <div className="flex items-center justify-between mb-6 px-1">
              <div className="flex items-center gap-2">
                {results.length > 0
                  ? <CheckCircle className="h-5 w-5 text-green-500" />
                  : <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                <span className="font-semibold text-gray-800">
                  {results.length > 0
                    ? <>{results.length} destinations found for <span className="text-blue-600">{criteria.month} {criteria.year}</span></>
                    : <>No destinations matched your criteria for {criteria.month} {criteria.year}</>}
                </span>
              </div>
              <div className="text-xs text-gray-500 bg-white/70 px-3 py-1 rounded-full border">
                🛰️ GPM · FLDAS · MERRA-2
              </div>
            </div>

            {/* Empty state */}
            {results.length === 0 && (
              <div className="text-center py-16 bg-white/60 rounded-3xl border border-white/30">
                <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium">No destinations match your current risk thresholds.</p>
                <p className="text-gray-400 text-sm mt-1">Try increasing the max risk values or choosing a different month.</p>
              </div>
            )}

            {/* Cards */}
            <div className="space-y-4">
              {results.map((dest, i) => {
                const badge = overallBadge(dest.overallRisk);
                return (
                  <div key={i} className="backdrop-blur-xl bg-white/75 border border-white/30 rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-200">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                      {/* Col 1: identity */}
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-bold text-gray-400">#{i + 1}</span>
                              <h3 className="text-lg font-bold text-gray-900">{dest.destination}</h3>
                            </div>
                            {dest.state && <p className="text-xs text-gray-500">{dest.state}</p>}
                            <p className="text-xs text-gray-400 mt-0.5">{dest.coordinates}</p>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${badge.cls}`}>
                            {badge.label}
                          </span>
                        </div>

                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold ${badge.cls} mb-3`}>
                          {dest.overallRisk}% overall risk
                        </div>

                        {/* Climate snapshot */}
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-orange-50 rounded-xl p-2">
                            <Thermometer className="h-4 w-4 text-orange-500 mx-auto mb-0.5" />
                            <p className="text-xs font-bold text-gray-800">{dest.avgTemp}</p>
                            <p className="text-xs text-gray-500">Temp</p>
                          </div>
                          <div className="bg-blue-50 rounded-xl p-2">
                            <Droplets className="h-4 w-4 text-blue-500 mx-auto mb-0.5" />
                            <p className="text-xs font-bold text-gray-800">{dest.avgPrecip}</p>
                            <p className="text-xs text-gray-500">Precip</p>
                          </div>
                          <div className="bg-purple-50 rounded-xl p-2">
                            <Wind className="h-4 w-4 text-purple-500 mx-auto mb-0.5" />
                            <p className="text-xs font-bold text-gray-800">{dest.avgWind}</p>
                            <p className="text-xs text-gray-500">Wind</p>
                          </div>
                        </div>
                      </div>

                      {/* Col 2: risk bars */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Risk Breakdown</h4>
                        <div className="space-y-2.5">
                          {RISK_META.map(({ key, label, icon, bar }) => (
                            <div key={key}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="flex items-center gap-1 text-xs text-gray-600">
                                  {icon}{label}
                                </span>
                                <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${riskBadge(dest.riskScores[key])}`}>
                                  {dest.riskScores[key]}%
                                </span>
                              </div>
                              <RiskBar value={dest.riskScores[key]} colorClass={bar} />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Col 3: why + best for */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Why Recommended</h4>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">{dest.whyRecommended}</p>

                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Best For</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {dest.bestFor.map((act, j) => (
                            <span key={j} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                              {act}
                            </span>
                          ))}
                        </div>

                        <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-400">
                          <Satellite className="h-3 w-3" />
                          {dest.nasaDataSource}
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VacationRecommendation;
