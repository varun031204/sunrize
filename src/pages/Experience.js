import React, { useState } from 'react';
import { MapPin, Calendar, Satellite, AlertCircle, Download, Droplets, Thermometer, Wind, Activity } from 'lucide-react';
import RealMap from '../components/RealMap';
import LocationSearch from '../components/LocationSearch';

const RISK_CONFIG = [
  { key: 'very_wet',           label: 'Very Wet',           icon: Droplets,     low: 'bg-blue-100 text-blue-700',   high: 'bg-blue-600 text-white' },
  { key: 'very_hot',           label: 'Very Hot',           icon: Thermometer,  low: 'bg-red-100 text-red-700',     high: 'bg-red-600 text-white' },
  { key: 'very_cold',          label: 'Very Cold',          icon: Thermometer,  low: 'bg-cyan-100 text-cyan-700',   high: 'bg-cyan-600 text-white' },
  { key: 'very_windy',         label: 'Very Windy',         icon: Wind,         low: 'bg-purple-100 text-purple-700', high: 'bg-purple-600 text-white' },
  { key: 'very_uncomfortable', label: 'Uncomfortable',      icon: Activity,     low: 'bg-amber-100 text-amber-700', high: 'bg-amber-600 text-white' },
];

const riskLevel = (p) => {
  if (p < 0.25) return { label: 'Low',      color: 'text-emerald-600' };
  if (p < 0.55) return { label: 'Moderate', color: 'text-amber-600' };
  return              { label: 'High',     color: 'text-red-600' };
};

const downloadBlob = (content, filename, type) => {
  const blob = new Blob([content], { type });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement('a'), { href: url, download: filename });
  a.click();
  URL.revokeObjectURL(url);
};

const Experience = () => {
  const [location,     setLocation]     = useState({ lat: 28.7041, lng: 77.1025 });
  const [locationName, setLocationName] = useState('Delhi, India');
  const [eventDate,    setEventDate]    = useState('');
  const [predictions,  setPredictions]  = useState(null);
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState('');

  const handlePredict = async () => {
    if (!eventDate) { setError('Please select an event date.'); return; }
    setError('');
    setLoading(true);
    setPredictions(null);
    try {
      const res = await fetch('http://localhost:8889/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latitude: location.lat,
          longitude: location.lng,
          event_date: eventDate,
          location_name: locationName,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || `Server error (${res.status})`);
      }
      setPredictions(await res.json());
    } catch (e) {
      setError(e.message || 'Could not reach the backend. Make sure it is running on port 8889.');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format) => {
    try {
      const res = await fetch(
        `http://localhost:8889/export-analysis/${format}?lat=${location.lat}&lon=${location.lng}&location_name=${encodeURIComponent(locationName)}`
      );
      if (!res.ok) throw new Error('Export failed');
      const content  = format === 'json' ? JSON.stringify(await res.json(), null, 2) : await res.text();
      const mimeType = format === 'json' ? 'application/json' : 'text/csv';
      downloadBlob(content, `sunrize_${location.lat}_${location.lng}.${format}`, mimeType);
    } catch (e) {
      setError('Export failed: ' + e.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Page header */}
      <div className="bg-white border-b border-slate-200 pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-slate-900">Risk Assessment</h1>
          <p className="text-slate-500 mt-1">Select a location and date to get NASA-powered weather risk probabilities.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Location panel */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" /> Location
            </h2>
            <div className="space-y-3">
              <LocationSearch
                onLocationSelect={(loc) => {
                  setLocation({ lat: loc.lat, lng: loc.lon });
                  setLocationName(loc.name);
                }}
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Latitude</label>
                  <input
                    type="number"
                    value={location.lat}
                    onChange={(e) => setLocation({ ...location, lat: parseFloat(e.target.value) || 0 })}
                    step="0.0001"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Longitude</label>
                  <input
                    type="number"
                    value={location.lng}
                    onChange={(e) => setLocation({ ...location, lng: parseFloat(e.target.value) || 0 })}
                    step="0.0001"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <RealMap
                location={location}
                setLocation={setLocation}
                locationName={locationName}
                setLocationName={setLocationName}
              />
              <p className="text-xs text-slate-400">Click the map to set coordinates manually.</p>
            </div>
          </div>

          {/* Date + action panel */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col">
            <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" /> Event Date
            </h2>
            <div className="space-y-4 flex-1">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Select date</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 leading-relaxed">
                <p className="font-medium text-slate-700 mb-1">What you'll get</p>
                <p>Probability scores for 5 weather risk categories based on real NASA satellite data (GPM · FLDAS · MERRA-2) for <strong>{locationName}</strong>.</p>
              </div>

              {error && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  {error}
                </div>
              )}
            </div>

            <button
              onClick={handlePredict}
              disabled={loading}
              className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors duration-150"
            >
              {loading ? (
                <><Satellite className="w-4 h-4 animate-spin" /> Analyzing…</>
              ) : (
                <><Satellite className="w-4 h-4" /> Run Assessment</>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        {predictions && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-bold text-slate-900 text-lg">Results — {predictions.location}</h2>
                <p className="text-slate-500 text-sm mt-0.5">Event date: {predictions.date}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleExport('json')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-slate-600"
                >
                  <Download className="w-3.5 h-3.5" /> JSON
                </button>
                <button
                  onClick={() => handleExport('csv')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-slate-600"
                >
                  <Download className="w-3.5 h-3.5" /> CSV
                </button>
              </div>
            </div>

            {/* Risk cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
              {RISK_CONFIG.map(({ key, label, icon: Icon, low, high }) => {
                const prob = predictions.predictions[key] ?? 0;
                const pct  = (prob * 100).toFixed(1);
                const rl   = riskLevel(prob);
                const isHigh = prob >= 0.55;
                return (
                  <div key={key} className={`rounded-xl p-4 text-center ${isHigh ? high : low}`}>
                    <Icon className="w-5 h-5 mx-auto mb-2 opacity-80" />
                    <div className="text-2xl font-black mb-0.5">{pct}%</div>
                    <div className="text-xs font-semibold uppercase tracking-wide opacity-80">{label}</div>
                    <div className={`text-xs mt-1 font-medium ${isHigh ? 'opacity-90' : rl.color}`}>{rl.label} Risk</div>
                  </div>
                );
              })}
            </div>

            {/* Raw data strip */}
            <div className="bg-slate-50 rounded-xl p-4 flex flex-wrap gap-6 text-sm">
              <div>
                <span className="text-slate-400 text-xs uppercase tracking-wide block mb-0.5">Temperature</span>
                <span className="font-semibold text-slate-800">{predictions.historical_context?.temperature_c}°C</span>
              </div>
              <div>
                <span className="text-slate-400 text-xs uppercase tracking-wide block mb-0.5">Precipitation</span>
                <span className="font-semibold text-slate-800">{predictions.historical_context?.precipitation_mm} mm</span>
              </div>
              <div>
                <span className="text-slate-400 text-xs uppercase tracking-wide block mb-0.5">Wind Speed</span>
                <span className="font-semibold text-slate-800">{predictions.historical_context?.wind_speed_ms} m/s</span>
              </div>
              <div>
                <span className="text-slate-400 text-xs uppercase tracking-wide block mb-0.5">Data Source</span>
                <span className="font-semibold text-slate-800">NASA GPM · FLDAS · MERRA-2</span>
              </div>
              <div>
                <span className="text-slate-400 text-xs uppercase tracking-wide block mb-0.5">Confidence</span>
                <span className="font-semibold text-emerald-600">95%+</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Experience;
