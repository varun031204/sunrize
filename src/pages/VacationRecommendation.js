import React, { useState } from 'react';
import { MapPin, Calendar, Sliders, Search, Star, Rocket, Satellite, Globe, Zap } from 'lucide-react';
import RealMap from '../components/RealMap';

const VacationRecommendation = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    month: '',
    year: new Date().getFullYear(),
    maxWetRisk: 20,
    maxHotRisk: 30,
    maxColdRisk: 15,
    maxWindyRisk: 25,
    activityType: 'outdoor'
  });
  
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchCriteria.month || !searchCriteria.year) {
      alert('Please select both travel month and year');
      return;
    }

    setLoading(true);
    try {
      // Call backend API with actual NASA data analysis
      const response = await fetch('http://localhost:8889/recommend-destinations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          month: searchCriteria.month,
          year: parseInt(searchCriteria.year),
          maxWetRisk: parseInt(searchCriteria.maxWetRisk),
          maxHotRisk: parseInt(searchCriteria.maxHotRisk),
          maxColdRisk: parseInt(searchCriteria.maxColdRisk),
          maxWindyRisk: parseInt(searchCriteria.maxWindyRisk),
          activityType: searchCriteria.activityType
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze destinations with NASA data');
      }
      
      const nasaAnalysis = await response.json();
      setRecommendations(nasaAnalysis.recommendations || nasaAnalysis.destinations || nasaAnalysis);
    } catch (error) {
      console.error('NASA analysis error:', error);
      alert('Failed to analyze destinations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk) => {
    if (risk <= 15) return 'text-green-600 bg-green-100';
    if (risk <= 30) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getActivityPresets = (activity) => {
    const presets = {
      'beach': { maxWetRisk: 10, maxHotRisk: 50, maxColdRisk: 5, maxWindyRisk: 30 },
      'hiking': { maxWetRisk: 15, maxHotRisk: 35, maxColdRisk: 20, maxWindyRisk: 25 },
      'mountaineering': { maxWetRisk: 5, maxHotRisk: 25, maxColdRisk: 40, maxWindyRisk: 15 },
      'cycling': { maxWetRisk: 10, maxHotRisk: 40, maxColdRisk: 15, maxWindyRisk: 20 },
      'camping': { maxWetRisk: 8, maxHotRisk: 45, maxColdRisk: 25, maxWindyRisk: 18 },
      'photography': { maxWetRisk: 12, maxHotRisk: 40, maxColdRisk: 20, maxWindyRisk: 22 },
      'festivals': { maxWetRisk: 5, maxHotRisk: 35, maxColdRisk: 10, maxWindyRisk: 15 },
      'sports': { maxWetRisk: 8, maxHotRisk: 38, maxColdRisk: 12, maxWindyRisk: 25 },
      'agriculture': { maxWetRisk: 25, maxHotRisk: 45, maxColdRisk: 30, maxWindyRisk: 35 },
      'construction': { maxWetRisk: 5, maxHotRisk: 42, maxColdRisk: 15, maxWindyRisk: 20 },
      'aviation': { maxWetRisk: 3, maxHotRisk: 40, maxColdRisk: 10, maxWindyRisk: 8 },
      'sailing': { maxWetRisk: 15, maxHotRisk: 45, maxColdRisk: 20, maxWindyRisk: 40 },
      'wedding': { maxWetRisk: 2, maxHotRisk: 30, maxColdRisk: 8, maxWindyRisk: 10 },
      'sightseeing': { maxWetRisk: 12, maxHotRisk: 38, maxColdRisk: 15, maxWindyRisk: 20 },
      'outdoor': { maxWetRisk: 15, maxHotRisk: 35, maxColdRisk: 18, maxWindyRisk: 22 }
    };
    return presets[activity];
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Revolutionary Header */}
        <div className="relative text-center mb-16">
          <div className="backdrop-blur-xl bg-gradient-to-r from-orange-500/10 via-red-500/10 to-yellow-500/10 border border-white/20 rounded-3xl p-12 shadow-2xl">
            <div className="flex items-center justify-center mb-6">
              <Globe className="w-12 h-12 text-green-400 mr-4 animate-pulse" />
              <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-orange-200 via-red-200 to-yellow-200 bg-clip-text text-transparent">
                Space Explorer
              </h1>
              <Rocket className="w-12 h-12 text-orange-400 ml-4 animate-pulse" />
            </div>
            <div className="h-1 w-32 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 mx-auto rounded-full mb-6"></div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
              The Killer Feature
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Revolutionary approach: We flip the question from "What's the weather?" to "Where should I go?"
            </p>
          </div>
        </div>

        {/* Enhanced Search Criteria */}
        <div className="backdrop-blur-xl bg-white/60 border border-white/30 rounded-3xl shadow-2xl p-8 mb-8 hover:shadow-3xl transition-all duration-300">
          <div className="flex items-center justify-center mb-6">
            <Satellite className="h-8 w-8 mr-3 text-blue-500" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-green-900 bg-clip-text text-transparent">
              Mission Parameters
            </h2>
            <Zap className="h-8 w-8 ml-3 text-yellow-500" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Criteria */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Mission Month
                  </label>
                  <select
                    value={searchCriteria.month}
                    onChange={(e) => setSearchCriteria({...searchCriteria, month: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select month</option>
                    {months.map(month => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🛰️ Mission Year
                  </label>
                  <select
                    value={searchCriteria.year}
                    onChange={(e) => setSearchCriteria({...searchCriteria, year: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Array.from({length: 10}, (_, i) => new Date().getFullYear() + i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🎯 Mission Activity Type
                </label>
                <select
                  value={searchCriteria.activityType}
                  onChange={(e) => {
                    const newActivity = e.target.value;
                    setSearchCriteria({...searchCriteria, activityType: newActivity});
                    
                    // Apply activity presets
                    const presets = getActivityPresets(newActivity);
                    if (presets) {
                      setSearchCriteria(prev => ({...prev, ...presets, activityType: newActivity}));
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="outdoor">🏃 General Outdoor Activities</option>
                  <option value="beach">🏖️ Beach & Water Sports</option>
                  <option value="hiking">🥾 Hiking & Trekking</option>
                  <option value="mountaineering">⛰️ Mountaineering & Climbing</option>
                  <option value="cycling">🚴 Cycling & Biking</option>
                  <option value="camping">🏕️ Camping & Backpacking</option>
                  <option value="photography">📸 Photography & Wildlife</option>
                  <option value="festivals">🎪 Festivals & Events</option>
                  <option value="sports">⚽ Outdoor Sports</option>
                  <option value="agriculture">🌾 Agriculture & Farming</option>
                  <option value="construction">🏗️ Construction & Work</option>
                  <option value="aviation">✈️ Aviation & Flying</option>
                  <option value="sailing">⛵ Sailing & Boating</option>
                  <option value="wedding">💒 Weddings & Ceremonies</option>
                  <option value="sightseeing">🏛️ City Sightseeing</option>
                </select>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Explore NASA Data Coverage</h4>
              <RealMap 
                location={{lat: 20, lng: 78}}
                setLocation={() => {}}
                locationName="Southern Asia Region"
                setLocationName={() => {}}
              />
            </div>
            
            {/* Enhanced Risk Tolerance Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">🎛️ Risk Tolerance Settings</h3>
                <button
                  onClick={() => {
                    const presets = getActivityPresets(searchCriteria.activityType);
                    if (presets) {
                      setSearchCriteria(prev => ({...prev, ...presets}));
                    }
                  }}
                  className="px-3 py-1 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg text-xs font-medium hover:from-blue-600 hover:to-green-600 transition-all"
                >
                  🎯 Apply Preset
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-blue-800">
                      🌧️ Very Wet Risk: {searchCriteria.maxWetRisk}%
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={searchCriteria.maxWetRisk}
                      onChange={(e) => setSearchCriteria({...searchCriteria, maxWetRisk: e.target.value})}
                      className="w-16 px-2 py-1 text-xs border rounded"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={searchCriteria.maxWetRisk}
                    onChange={(e) => setSearchCriteria({...searchCriteria, maxWetRisk: e.target.value})}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="bg-red-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-red-800">
                      🌡️ Very Hot Risk: {searchCriteria.maxHotRisk}%
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={searchCriteria.maxHotRisk}
                      onChange={(e) => setSearchCriteria({...searchCriteria, maxHotRisk: e.target.value})}
                      className="w-16 px-2 py-1 text-xs border rounded"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={searchCriteria.maxHotRisk}
                    onChange={(e) => setSearchCriteria({...searchCriteria, maxHotRisk: e.target.value})}
                    className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="bg-cyan-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-cyan-800">
                      ❄️ Very Cold Risk: {searchCriteria.maxColdRisk}%
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={searchCriteria.maxColdRisk}
                      onChange={(e) => setSearchCriteria({...searchCriteria, maxColdRisk: e.target.value})}
                      className="w-16 px-2 py-1 text-xs border rounded"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={searchCriteria.maxColdRisk}
                    onChange={(e) => setSearchCriteria({...searchCriteria, maxColdRisk: e.target.value})}
                    className="w-full h-2 bg-cyan-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-purple-800">
                      💨 Very Windy Risk: {searchCriteria.maxWindyRisk}%
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={searchCriteria.maxWindyRisk}
                      onChange={(e) => setSearchCriteria({...searchCriteria, maxWindyRisk: e.target.value})}
                      className="w-16 px-2 py-1 text-xs border rounded"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={searchCriteria.maxWindyRisk}
                    onChange={(e) => setSearchCriteria({...searchCriteria, maxWindyRisk: e.target.value})}
                    className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full mt-8 bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 hover:from-orange-700 hover:via-red-700 hover:to-yellow-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            {loading ? (
              <>
                <Satellite className="animate-spin h-5 w-5 mr-2" />
                Scanning Earth from Orbit...
              </>
            ) : (
              <>
                <Rocket className="h-5 w-5 mr-2" />
                Launch Destination Search
              </>
            )}
          </button>
        </div>

        {/* Recommendations */}
        {recommendations && (
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-8">
              <Globe className="w-8 h-8 text-green-500 mr-3" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-900 to-blue-900 bg-clip-text text-transparent">
                NASA Analysis: {searchCriteria.month} {searchCriteria.year}
              </h2>
              <Satellite className="w-8 h-8 text-blue-500 ml-3" />
            </div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 rounded-full">
                <span className="text-sm font-medium text-gray-700">
                  🌡️ FLDAS Temperature • 🌧️ GPM Precipitation • 💨 MERRA-2 Wind Analysis
                </span>
              </div>
            </div>

            {recommendations.map((dest, index) => (
              <div key={index} className="backdrop-blur-xl bg-gradient-to-br from-white/70 to-orange-50/70 border border-white/30 rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Destination Info */}
                  <div className="lg:col-span-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{dest.destination}</h3>
                        <p className="text-gray-600">{dest.country}</p>
                        <p className="text-sm text-gray-500">{dest.coordinates}</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-500 mr-1" />
                        <span className="font-semibold">{index + 1}</span>
                      </div>
                    </div>
                    
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(dest.overallRisk)}`}>
                      {dest.overallRisk}% Overall Risk
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2"><strong>Why recommended:</strong></p>
                      <p className="text-sm text-gray-800">{dest.whyRecommended}</p>
                    </div>
                  </div>

                  {/* Risk Breakdown */}
                  <div className="lg:col-span-1">
                    <h4 className="font-semibold text-gray-900 mb-3">Risk Breakdown</h4>
                    <div className="space-y-2">
                      {Object.entries(dest.riskScores).map(([risk, value]) => (
                        <div key={risk} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 capitalize">
                            {risk.replace('_', ' ')}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(value)}`}>
                            {value}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="lg:col-span-1">
                    <h4 className="font-semibold text-gray-900 mb-3">Climate Data</h4>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Avg Temperature:</span>
                        <span className="text-sm font-medium">{dest.avgTemp}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Avg Precipitation:</span>
                        <span className="text-sm font-medium">{dest.avgPrecip}</span>
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2">Best For:</h4>
                    <div className="flex flex-wrap gap-1">
                      {dest.bestFor.map((activity, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VacationRecommendation;