import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin } from 'lucide-react';

const CITIES = [
  { name: 'Mumbai',        country: 'India',       lat: 19.0760, lon: 72.8777 },
  { name: 'Delhi',         country: 'India',       lat: 28.7041, lon: 77.1025 },
  { name: 'Bangalore',     country: 'India',       lat: 12.9716, lon: 77.5946 },
  { name: 'Chennai',       country: 'India',       lat: 13.0827, lon: 80.2707 },
  { name: 'Kolkata',       country: 'India',       lat: 22.5726, lon: 88.3639 },
  { name: 'Hyderabad',     country: 'India',       lat: 17.3850, lon: 78.4867 },
  { name: 'Pune',          country: 'India',       lat: 18.5204, lon: 73.8567 },
  { name: 'Ahmedabad',     country: 'India',       lat: 23.0225, lon: 72.5714 },
  { name: 'Jaipur',        country: 'India',       lat: 26.9124, lon: 75.7873 },
  { name: 'Lucknow',       country: 'India',       lat: 26.8467, lon: 80.9462 },
  { name: 'Nagpur',        country: 'India',       lat: 21.1458, lon: 79.0882 },
  { name: 'Indore',        country: 'India',       lat: 22.7196, lon: 75.8577 },
  { name: 'Bhopal',        country: 'India',       lat: 23.2599, lon: 77.4126 },
  { name: 'Visakhapatnam', country: 'India',       lat: 17.6868, lon: 83.2185 },
  { name: 'Patna',         country: 'India',       lat: 25.5941, lon: 85.1376 },
  { name: 'Vadodara',      country: 'India',       lat: 22.3072, lon: 73.1812 },
  { name: 'Ludhiana',      country: 'India',       lat: 30.9010, lon: 75.8573 },
  { name: 'Agra',          country: 'India',       lat: 27.1767, lon: 78.0081 },
  { name: 'Nashik',        country: 'India',       lat: 19.9975, lon: 73.7898 },
  { name: 'Srinagar',      country: 'India',       lat: 34.0837, lon: 74.7973 },
  { name: 'Chandigarh',    country: 'India',       lat: 30.7333, lon: 76.7794 },
  { name: 'Kochi',         country: 'India',       lat: 9.9312,  lon: 76.2673 },
  { name: 'Coimbatore',    country: 'India',       lat: 11.0168, lon: 76.9558 },
  { name: 'Goa',           country: 'India',       lat: 15.2993, lon: 74.1240 },
  { name: 'Karachi',       country: 'Pakistan',    lat: 24.8607, lon: 67.0011 },
  { name: 'Lahore',        country: 'Pakistan',    lat: 31.5204, lon: 74.3587 },
  { name: 'Islamabad',     country: 'Pakistan',    lat: 33.6844, lon: 73.0479 },
  { name: 'Faisalabad',    country: 'Pakistan',    lat: 31.4504, lon: 73.1350 },
  { name: 'Rawalpindi',    country: 'Pakistan',    lat: 33.5651, lon: 73.0169 },
  { name: 'Multan',        country: 'Pakistan',    lat: 30.1575, lon: 71.5249 },
  { name: 'Peshawar',      country: 'Pakistan',    lat: 34.0151, lon: 71.5249 },
  { name: 'Quetta',        country: 'Pakistan',    lat: 30.1798, lon: 66.9750 },
  { name: 'Dhaka',         country: 'Bangladesh',  lat: 23.8103, lon: 90.4125 },
  { name: 'Chittagong',    country: 'Bangladesh',  lat: 22.3569, lon: 91.7832 },
  { name: 'Khulna',        country: 'Bangladesh',  lat: 22.8456, lon: 89.5403 },
  { name: 'Colombo',       country: 'Sri Lanka',   lat: 6.9271,  lon: 79.8612 },
  { name: 'Kandy',         country: 'Sri Lanka',   lat: 7.2906,  lon: 80.6337 },
  { name: 'Galle',         country: 'Sri Lanka',   lat: 6.0535,  lon: 80.2210 },
  { name: 'Kathmandu',     country: 'Nepal',       lat: 27.7172, lon: 85.3240 },
  { name: 'Pokhara',       country: 'Nepal',       lat: 28.2096, lon: 83.9856 },
  { name: 'Thimphu',       country: 'Bhutan',      lat: 27.4728, lon: 89.6390 },
  { name: 'Male',          country: 'Maldives',    lat: 4.1755,  lon: 73.5093 },
  { name: 'Kabul',         country: 'Afghanistan', lat: 34.5553, lon: 69.2075 },
];

const LocationSearch = ({ onLocationSelect }) => {
  const [query, setQuery]           = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen]             = useState(false);
  const wrapperRef                  = useRef(null);

  useEffect(() => {
    if (query.length >= 2) {
      const q = query.toLowerCase();
      setSuggestions(
        CITIES.filter(c => c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)).slice(0, 7)
      );
      setOpen(true);
    } else {
      setSuggestions([]);
      setOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const select = (city) => {
    setQuery(`${city.name}, ${city.country}`);
    setOpen(false);
    onLocationSelect({ lat: city.lat, lon: city.lon, name: `${city.name}, ${city.country}` });
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder="Search city (e.g. Mumbai, Delhi…)"
          className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        />
      </div>

      {open && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
          {suggestions.map((city, i) => (
            <button
              key={i}
              onMouseDown={() => select(city)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
              <div>
                <span className="text-sm font-medium text-slate-900">{city.name}</span>
                <span className="text-xs text-slate-400 ml-2">{city.country}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
