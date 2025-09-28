import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Layers } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationMarker({ location, setLocation, setLocationName }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLocation({ lat: parseFloat(lat.toFixed(4)), lng: parseFloat(lng.toFixed(4)) });
      setLocationName(`Location (${lat.toFixed(2)}°N, ${lng.toFixed(2)}°E)`);
    },
  });

  return location ? (
    <Marker position={[location.lat, location.lng]}>
      <Popup>
        Selected Location<br />
        {location.lat.toFixed(4)}°N, {location.lng.toFixed(4)}°E
      </Popup>
    </Marker>
  ) : null;
}

const RealMap = ({ location, setLocation, locationName, setLocationName }) => {
  const [selectedVariable, setSelectedVariable] = useState('temperature');

  const variables = [
    { id: 'temperature', name: 'Temperature' },
    { id: 'precipitation', name: 'Precipitation' },
    { id: 'wind', name: 'Wind Speed' }
  ];

  return (
    <div className="space-y-4">
      {/* Enhanced Variable Selector */}
      <div className="flex items-center space-x-2 mb-4">
        <Layers className="h-4 w-4 text-blue-500" />
        <span className="text-sm font-medium text-gray-700">NASA Dataset:</span>
        <select
          value={selectedVariable}
          onChange={(e) => setSelectedVariable(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
        >
          <option value="temperature">🌡️ FLDAS Temperature</option>
          <option value="precipitation">🌧️ GPM Precipitation</option>
          <option value="wind">💨 MERRA-2 Wind Speed</option>
        </select>
      </div>

      {/* Real Map */}
      <div className="h-64 rounded-lg overflow-hidden border-2 border-gray-300">
        <MapContainer
          center={[25, 80]}
          zoom={4}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker 
            location={location} 
            setLocation={setLocation} 
            setLocationName={setLocationName} 
          />
        </MapContainer>
      </div>

      {/* Enhanced Current Selection */}
      <div className={`border rounded-lg p-3 ${
        selectedVariable === 'temperature' ? 'bg-red-50 border-red-200' :
        selectedVariable === 'precipitation' ? 'bg-blue-50 border-blue-200' :
        'bg-purple-50 border-purple-200'
      }`}>
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-blue-900">Selected Location</h4>
            <p className="text-blue-700 text-sm">{locationName}</p>
          </div>
          <div className="text-right">
            <div className="text-blue-900 font-medium">{location.lat.toFixed(4)}°N</div>
            <div className="text-blue-900 font-medium">{location.lng.toFixed(4)}°E</div>
          </div>
        </div>
        <div className="mt-2 text-xs text-blue-600">
          {selectedVariable === 'temperature' && `NASA FLDAS Temperature: Shows heat zones across Southern Asia`}
          {selectedVariable === 'precipitation' && `NASA GPM Precipitation: Shows monsoon patterns and rainfall data`}
          {selectedVariable === 'wind' && `NASA MERRA-2 Wind: Shows wind speed patterns from satellite data`}
        </div>
      </div>

      {/* Variable-specific Instructions */}
      <div className="text-xs text-gray-600 bg-gradient-to-r from-blue-50 to-green-50 p-3 rounded-lg border border-blue-200">
        <strong>Click anywhere on the map</strong> to select coordinates. 
        {selectedVariable === 'temperature' && 'Temperature data shows heat distribution: Pakistan/India plains (hottest), Nepal mountains (coolest).'}
        {selectedVariable === 'precipitation' && 'Precipitation data shows monsoon patterns: Bangladesh/Eastern India (wettest), Pakistan (driest).'}
        {selectedVariable === 'wind' && 'Wind data shows speed patterns: Coastal areas (windiest), Interior regions (calmer).'}
      </div>
    </div>
  );
};

export default RealMap;