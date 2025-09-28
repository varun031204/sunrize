import React, { useState, useEffect } from 'react';
import { MapPin, Search } from 'lucide-react';

const LocationSearch = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Southern Asian cities database
  const cities = [
    { name: "Mumbai", country: "India", lat: 19.0760, lon: 72.8777 },
    { name: "Delhi", country: "India", lat: 28.7041, lon: 77.1025 },
    { name: "Bangalore", country: "India", lat: 12.9716, lon: 77.5946 },
    { name: "Chennai", country: "India", lat: 13.0827, lon: 80.2707 },
    { name: "Kolkata", country: "India", lat: 22.5726, lon: 88.3639 },
    { name: "Hyderabad", country: "India", lat: 17.3850, lon: 78.4867 },
    { name: "Pune", country: "India", lat: 18.5204, lon: 73.8567 },
    { name: "Ahmedabad", country: "India", lat: 23.0225, lon: 72.5714 },
    { name: "Jaipur", country: "India", lat: 26.9124, lon: 75.7873 },
    { name: "Lucknow", country: "India", lat: 26.8467, lon: 80.9462 },
    { name: "Kanpur", country: "India", lat: 26.4499, lon: 80.3319 },
    { name: "Nagpur", country: "India", lat: 21.1458, lon: 79.0882 },
    { name: "Indore", country: "India", lat: 22.7196, lon: 75.8577 },
    { name: "Bhopal", country: "India", lat: 23.2599, lon: 77.4126 },
    { name: "Visakhapatnam", country: "India", lat: 17.6868, lon: 83.2185 },
    { name: "Patna", country: "India", lat: 25.5941, lon: 85.1376 },
    { name: "Vadodara", country: "India", lat: 22.3072, lon: 73.1812 },
    { name: "Ludhiana", country: "India", lat: 30.9010, lon: 75.8573 },
    { name: "Agra", country: "India", lat: 27.1767, lon: 78.0081 },
    { name: "Nashik", country: "India", lat: 19.9975, lon: 73.7898 },
    { name: "Karachi", country: "Pakistan", lat: 24.8607, lon: 67.0011 },
    { name: "Lahore", country: "Pakistan", lat: 31.5204, lon: 74.3587 },
    { name: "Faisalabad", country: "Pakistan", lat: 31.4504, lon: 73.1350 },
    { name: "Rawalpindi", country: "Pakistan", lat: 33.5651, lon: 73.0169 },
    { name: "Islamabad", country: "Pakistan", lat: 33.6844, lon: 73.0479 },
    { name: "Multan", country: "Pakistan", lat: 30.1575, lon: 71.5249 },
    { name: "Peshawar", country: "Pakistan", lat: 34.0151, lon: 71.5249 },
    { name: "Quetta", country: "Pakistan", lat: 30.1798, lon: 66.9750 },
    { name: "Dhaka", country: "Bangladesh", lat: 23.8103, lon: 90.4125 },
    { name: "Chittagong", country: "Bangladesh", lat: 22.3569, lon: 91.7832 },
    { name: "Khulna", country: "Bangladesh", lat: 22.8456, lon: 89.5403 },
    { name: "Rajshahi", country: "Bangladesh", lat: 24.3745, lon: 88.6042 },
    { name: "Sylhet", country: "Bangladesh", lat: 24.8949, lon: 91.8687 },
    { name: "Colombo", country: "Sri Lanka", lat: 6.9271, lon: 79.8612 },
    { name: "Kandy", country: "Sri Lanka", lat: 7.2906, lon: 80.6337 },
    { name: "Galle", country: "Sri Lanka", lat: 6.0535, lon: 80.2210 },
    { name: "Kathmandu", country: "Nepal", lat: 27.7172, lon: 85.3240 },
    { name: "Pokhara", country: "Nepal", lat: 28.2096, lon: 83.9856 },
    { name: "Thimphu", country: "Bhutan", lat: 27.4728, lon: 89.6390 },
    { name: "Male", country: "Maldives", lat: 4.1755, lon: 73.5093 },
    { name: "Kabul", country: "Afghanistan", lat: 34.5553, lon: 69.2075 }
  ];

  useEffect(() => {
    if (query.length >= 2) {
      const filtered = cities
        .filter(city => 
          city.name.toLowerCase().includes(query.toLowerCase()) ||
          city.country.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleCitySelect = (city) => {
    setQuery(`${city.name}, ${city.country}`);
    setShowSuggestions(false);
    onLocationSelect({
      lat: city.lat,
      lon: city.lon,
      name: `${city.name}, ${city.country}`
    });
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search cities (e.g., 'De' for Delhi)..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 backdrop-blur-xl bg-white/90 border border-white/30 rounded-2xl shadow-2xl max-h-64 overflow-y-auto">
          {suggestions.map((city, index) => (
            <button
              key={index}
              onClick={() => handleCitySelect(city)}
              className="w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 transition-all duration-200 flex items-center space-x-3 first:rounded-t-2xl last:rounded-b-2xl"
            >
              <MapPin className="h-4 w-4 text-blue-500 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900">{city.name}</div>
                <div className="text-sm text-gray-600">{city.country}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;