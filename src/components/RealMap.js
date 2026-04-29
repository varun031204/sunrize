import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function ClickMarker({ location, setLocation, setLocationName }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLocation({ lat: parseFloat(lat.toFixed(4)), lng: parseFloat(lng.toFixed(4)) });
      setLocationName(`${lat.toFixed(2)}°N, ${lng.toFixed(2)}°E`);
    },
  });
  return location ? (
    <Marker position={[location.lat, location.lng]}>
      <Popup>{location.lat.toFixed(4)}°N, {location.lng.toFixed(4)}°E</Popup>
    </Marker>
  ) : null;
}

const RealMap = ({ location, setLocation, locationName, setLocationName }) => (
  <div className="rounded-xl overflow-hidden border border-slate-200" style={{ height: 260 }}>
    <MapContainer center={[25, 80]} zoom={4} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <ClickMarker location={location} setLocation={setLocation} setLocationName={setLocationName} />
    </MapContainer>
  </div>
);

export default RealMap;
