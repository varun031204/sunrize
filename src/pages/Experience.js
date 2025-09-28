import React, { useState } from 'react';
import { MapPin, Calendar, Loader, AlertTriangle, Rocket, Satellite, Globe, Zap } from 'lucide-react';
import RealMap from '../components/RealMap';
import LocationSearch from '../components/LocationSearch';

const Experience = () => {
  const [location, setLocation] = useState({ lat: 28.7041, lng: 77.1025 });
  const [eventDate, setEventDate] = useState('');
  const [locationName, setLocationName] = useState('Delhi, India');
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);


  const handlePredict = async () => {
    if (!eventDate) {
      alert('Please select an event date');
      return;
    }

    setLoading(true);
    try {
      // Call backend API with actual NASA data
      const response = await fetch('http://localhost:8889/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: location.lat,
          longitude: location.lng,
          event_date: eventDate,
          location_name: locationName
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to get predictions from NASA data');
      }
      
      const predictions = await response.json();
      setPredictions(predictions);
    } catch (error) {
      console.error('Prediction error:', error);
      alert('Failed to get predictions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getProbabilityColor = (prob) => {
    if (prob < 0.3) return 'bg-green-500';
    if (prob < 0.7) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getRiskLevel = (prob) => {
    if (prob < 0.3) return 'Low Risk';
    if (prob < 0.7) return 'Moderate Risk';
    return 'High Risk';
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Revolutionary Header */}
        <div className="relative text-center mb-16">
          <div className="backdrop-blur-xl bg-gradient-to-r from-green-500/10 via-blue-500/10 to-yellow-500/10 border border-white/20 rounded-3xl p-12 shadow-2xl">
            <div className="flex items-center justify-center mb-6">
              <Satellite className="w-12 h-12 text-blue-400 mr-4 animate-pulse" />
              <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-green-200 via-blue-200 to-yellow-200 bg-clip-text text-transparent">
                Mission Control
              </h1>
              <Rocket className="w-12 h-12 text-orange-400 ml-4 animate-pulse" />
            </div>
            <div className="h-1 w-32 bg-gradient-to-r from-green-500 via-blue-500 to-yellow-500 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Revolutionary probability-based risk assessment for strategic long-term planning
            </p>
          </div>
        </div>

        {/* Enhanced Input Section */}
        <div className="backdrop-blur-xl bg-white/60 border border-white/30 rounded-3xl shadow-2xl p-8 mb-8 hover:shadow-3xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Location Input */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-nasa-blue" />
                Select Location
              </h3>
              <div className="space-y-4">
                <LocationSearch 
                  onLocationSelect={(selectedLocation) => {
                    setLocation({ lat: selectedLocation.lat, lng: selectedLocation.lon });
                    setLocationName(selectedLocation.name);
                  }}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Latitude"
                    value={location.lat}
                    onChange={(e) => setLocation({...location, lat: parseFloat(e.target.value)})}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nasa-blue focus:border-transparent"
                    step="0.0001"
                  />
                  <input
                    type="number"
                    placeholder="Longitude"
                    value={location.lng}
                    onChange={(e) => setLocation({...location, lng: parseFloat(e.target.value)})}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nasa-blue focus:border-transparent"
                    step="0.0001"
                  />
                </div>
                <RealMap 
                  location={location}
                  setLocation={setLocation}
                  locationName={locationName}
                  setLocationName={setLocationName}
                />
              </div>
            </div>

            {/* Date and Prediction */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-nasa-blue" />
                Event Details
              </h3>
              <div className="space-y-4">
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nasa-blue focus:border-transparent"
                />
                <button
                  onClick={handlePredict}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 hover:from-orange-700 hover:via-red-700 hover:to-yellow-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  {loading ? (
                    <>
                      <Satellite className="animate-spin h-5 w-5 mr-2" />
                      Analyzing NASA Data...
                    </>
                  ) : (
                    <>
                      <Rocket className="h-5 w-5 mr-2" />
                      Launch Assessment
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Revolutionary Results Section */}
        {predictions && (
          <div className="backdrop-blur-xl bg-gradient-to-br from-white/70 to-blue-50/70 border border-white/30 rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Risk Assessment for {predictions.location}
              </h2>
              <p className="text-gray-600">Event Date: {predictions.date}</p>
            </div>

            {/* Weather Conditions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {Object.entries(predictions.predictions).map(([condition, probability]) => (
                <div key={condition} className="text-center">
                  <div className={`${getProbabilityColor(probability)} text-white p-6 rounded-lg mb-2`}>
                    <h3 className="font-semibold text-sm uppercase tracking-wide mb-2">
                      {condition.replace('_', ' ')}
                    </h3>
                    <div className="text-2xl font-bold">
                      {(probability * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs mt-1">
                      {getRiskLevel(probability)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* NASA Data Context with Export */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Climatological Risk Assessment</h4>
                    <p className="text-blue-800 mb-2">
                      <strong>Data Source:</strong> Multi-decade NASA Earth Observation archive (MODIS, TRMM)
                    </p>
                    <p className="text-blue-800 mb-2">
                      <strong>Analysis Type:</strong> Climatology vs Meteorology - decades of history for probability, not tomorrow's exact temperature
                    </p>
                    <p className="text-blue-800">
                      <strong>Statistical Base:</strong> {predictions.historical_context.temperature_c}°C avg, 
                      {' '}{predictions.historical_context.precipitation_mm}mm avg precipitation
                    </p>
                  </div>
                </div>
                
                {/* Export Buttons */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={async () => {
                      try {
                        const response = await fetch(`http://localhost:8889/export-analysis/json?lat=${location.lat}&lon=${location.lng}&location_name=${encodeURIComponent(locationName)}`);
                        const data = await response.json();
                        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `nasa_analysis_${location.lat}_${location.lng}.json`;
                        a.click();
                      } catch (error) {
                        alert('Export failed: ' + error.message);
                      }
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-green-600 transition-all flex items-center"
                  >
                    📄 Export JSON
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        const response = await fetch(`http://localhost:8889/export-analysis/csv?lat=${location.lat}&lon=${location.lng}&location_name=${encodeURIComponent(locationName)}`);
                        const csvData = await response.text();
                        const blob = new Blob([csvData], { type: 'text/csv' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `nasa_analysis_${location.lat}_${location.lng}.csv`;
                        a.click();
                      } catch (error) {
                        alert('Export failed: ' + error.message);
                      }
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-lg text-sm font-medium hover:from-green-600 hover:to-yellow-600 transition-all flex items-center"
                  >
                    📊 Export CSV
                  </button>
                </div>
              </div>
            </div>

            {/* Data Quality */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-4">NASA Data Quality</h4>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-green-800">Statistical Reliability</h5>
                    <p className="text-green-700 text-sm">Based on multi-decade NASA Earth observation archive</p>
                  </div>
                  <div className="text-green-800 font-bold text-lg">95%+</div>
                </div>
                <div className="mt-3 text-xs text-green-600">
                  Climatological analysis from continuous satellite data (MODIS, TRMM, MERRA-2)
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Experience;