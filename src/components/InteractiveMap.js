import React, { useState, useEffect } from 'react';
import { MapPin, Layers } from 'lucide-react';

const InteractiveMap = ({ location, setLocation, locationName, setLocationName }) => {
  const [selectedVariable, setSelectedVariable] = useState('temperature');
  const [mapData, setMapData] = useState(null);

  const variables = [
    { id: 'temperature', name: 'Temperature', color: 'from-blue-500 to-red-500' },
    { id: 'precipitation', name: 'Precipitation', color: 'from-yellow-200 to-blue-600' },
    { id: 'wind', name: 'Wind Speed', color: 'from-green-300 to-purple-600' }
  ];

  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert pixel coordinates to lat/lng (simplified for Southern Asia region)
    const lng = 60 + (x / rect.width) * 40; // 60°E to 100°E
    const lat = 35 - (y / rect.height) * 25; // 35°N to 10°N
    
    setLocation({ lat: parseFloat(lat.toFixed(4)), lng: parseFloat(lng.toFixed(4)) });
    setLocationName(`Location (${lat.toFixed(2)}°N, ${lng.toFixed(2)}°E)`);
  };

  return (
    <div className="space-y-4">
      {/* Variable Selector */}
      <div className="flex items-center space-x-2 mb-4">
        <Layers className="h-4 w-4 text-nasa-blue" />
        <span className="text-sm font-medium text-gray-700">NASA Variable:</span>
        <select
          value={selectedVariable}
          onChange={(e) => setSelectedVariable(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-nasa-blue focus:border-transparent"
        >
          {variables.map(variable => (
            <option key={variable.id} value={variable.id}>{variable.name}</option>
          ))}
        </select>
      </div>

      {/* Interactive Map */}
      <div 
        className="relative h-64 rounded-lg border-2 border-gray-300 cursor-crosshair overflow-hidden"
        onClick={handleMapClick}
        style={{
          backgroundImage: `linear-gradient(45deg, ${variables.find(v => v.id === selectedVariable)?.color})`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px'
        }}
      >
        {/* Map overlay with country boundaries */}
        <div className="absolute inset-0 opacity-30">
          <svg viewBox="0 0 400 250" className="w-full h-full">
            {/* India outline (simplified) */}
            <path d="M120 80 L180 70 L200 90 L190 140 L170 160 L140 150 L120 120 Z" 
                  fill="none" stroke="white" strokeWidth="2"/>
            {/* Pakistan outline */}
            <path d="M80 60 L120 80 L120 120 L100 130 L80 110 Z" 
                  fill="none" stroke="white" strokeWidth="2"/>
            {/* Bangladesh outline */}
            <path d="M200 90 L220 95 L215 115 L200 120 L190 110 Z" 
                  fill="none" stroke="white" strokeWidth="2"/>
            {/* Sri Lanka outline */}
            <path d="M160 180 L170 175 L175 190 L165 195 Z" 
                  fill="none" stroke="white" strokeWidth="2"/>
            {/* Nepal outline */}
            <path d="M140 70 L170 65 L175 75 L145 80 Z" 
                  fill="none" stroke="white" strokeWidth="2"/>
          </svg>
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-5 h-full w-full">
            {Array.from({length: 40}).map((_, i) => (
              <div key={i} className="border border-white"></div>
            ))}
          </div>
        </div>

        {/* Location marker */}
        <div 
          className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            left: `${((location.lng - 60) / 40) * 100}%`,
            top: `${((35 - location.lat) / 25) * 100}%`
          }}
        >
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            <MapPin className="inline h-3 w-3 mr-1" />
            {location.lat.toFixed(2)}°N, {location.lng.toFixed(2)}°E
          </div>
        </div>

        {/* Data points visualization */}
        {selectedVariable === 'temperature' && (
          <>
            <div className="absolute w-2 h-2 bg-red-400 rounded-full" style={{left: '30%', top: '60%'}} title="Hot zone"></div>
            <div className="absolute w-2 h-2 bg-blue-400 rounded-full" style={{left: '45%', top: '25%'}} title="Cool zone"></div>
            <div className="absolute w-2 h-2 bg-yellow-400 rounded-full" style={{left: '60%', top: '45%'}} title="Moderate zone"></div>
          </>
        )}

        {selectedVariable === 'precipitation' && (
          <>
            <div className="absolute w-2 h-2 bg-blue-600 rounded-full" style={{left: '65%', top: '55%'}} title="High precipitation"></div>
            <div className="absolute w-2 h-2 bg-blue-300 rounded-full" style={{left: '50%', top: '40%'}} title="Medium precipitation"></div>
            <div className="absolute w-2 h-2 bg-yellow-300 rounded-full" style={{left: '25%', top: '50%'}} title="Low precipitation"></div>
          </>
        )}

        {selectedVariable === 'wind' && (
          <>
            <div className="absolute w-2 h-2 bg-purple-600 rounded-full" style={{left: '40%', top: '30%'}} title="High wind"></div>
            <div className="absolute w-2 h-2 bg-green-400 rounded-full" style={{left: '55%', top: '50%'}} title="Medium wind"></div>
            <div className="absolute w-2 h-2 bg-green-200 rounded-full" style={{left: '70%', top: '70%'}} title="Low wind"></div>
          </>
        )}

        {/* Coordinate grid labels */}
        <div className="absolute top-2 left-2 text-white text-xs bg-black/50 px-1 rounded">60°E</div>
        <div className="absolute top-2 right-2 text-white text-xs bg-black/50 px-1 rounded">100°E</div>
        <div className="absolute bottom-2 left-2 text-white text-xs bg-black/50 px-1 rounded">10°N</div>
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-white text-xs bg-black/50 px-1 rounded">35°N</div>

        {/* NASA data indicator */}
        <div className="absolute bottom-2 right-2 bg-nasa-blue text-white px-2 py-1 rounded text-xs">
          NASA {selectedVariable.toUpperCase()} Data
        </div>
      </div>

      {/* Instructions */}
      <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
        <strong>Click on the map</strong> to select a location. The map shows NASA {selectedVariable} data coverage for Southern Asia region.
      </div>
    </div>
  );
};

export default InteractiveMap;