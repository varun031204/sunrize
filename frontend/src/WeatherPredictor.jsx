import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const WeatherPredictor = () => {
  const [location, setLocation] = useState({ lat: 40.7128, lng: -74.0060 });
  const [eventDate, setEventDate] = useState('');
  const [locationName, setLocationName] = useState('New York City');
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return <Marker position={[location.lat, location.lng]} />;
  };

  const handlePredict = async () => {
    if (!eventDate) {
      alert('Please select an event date');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8888/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latitude: location.lat,
          longitude: location.lng,
          event_date: eventDate,
          location_name: locationName
        })
      });

      const data = await response.json();
      setPredictions(data);
    } catch (error) {
      console.error('Prediction error:', error);
      alert('Failed to get predictions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getProbabilityColor = (prob) => {
    if (prob < 0.3) return '#4CAF50'; // Green
    if (prob < 0.7) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  const chartData = predictions ? {
    labels: ['Very Wet', 'Very Hot', 'Very Cold', 'Very Windy', 'Very Uncomfortable'],
    datasets: [{
      data: [
        predictions.predictions.very_wet * 100,
        predictions.predictions.very_hot * 100,
        predictions.predictions.very_cold * 100,
        predictions.predictions.very_windy * 100,
        predictions.predictions.very_uncomfortable * 100
      ],
      backgroundColor: [
        getProbabilityColor(predictions.predictions.very_wet),
        getProbabilityColor(predictions.predictions.very_hot),
        getProbabilityColor(predictions.predictions.very_cold),
        getProbabilityColor(predictions.predictions.very_windy),
        getProbabilityColor(predictions.predictions.very_uncomfortable)
      ],
      borderWidth: 2
    }]
  } : null;

  const confidenceData = predictions ? {
    labels: ['Very Wet', 'Very Hot', 'Very Cold', 'Very Windy', 'Very Uncomfortable'],
    datasets: [{
      label: 'Confidence %',
      data: [
        predictions.confidence.very_wet * 100,
        predictions.confidence.very_hot * 100,
        predictions.confidence.very_cold * 100,
        predictions.confidence.very_windy * 100,
        predictions.confidence.very_uncomfortable * 100
      ],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  } : null;

  return (
    <div className="weather-predictor" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>NASA Weather Prediction Tool</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div>
          <h3>Select Location</h3>
          <input
            type="text"
            placeholder="Location name"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <div style={{ height: '300px', border: '1px solid #ccc' }}>
            <MapContainer center={[location.lat, location.lng]} zoom={5} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker />
            </MapContainer>
          </div>
          <p>Coordinates: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
        </div>

        <div>
          <h3>Event Details</h3>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
          />
          
          <button
            onClick={handlePredict}
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Analyzing...' : 'Predict Weather'}
          </button>
        </div>
      </div>

      {predictions && (
        <div style={{ marginTop: '30px' }}>
          <h2>Weather Predictions for {predictions.location}</h2>
          <p>Event Date: {predictions.date}</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
            <div>
              <h3>Probability Distribution</h3>
              <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <Doughnut data={chartData} options={{
                  plugins: {
                    legend: { position: 'bottom' },
                    tooltip: {
                      callbacks: {
                        label: (context) => `${context.label}: ${context.parsed.toFixed(1)}%`
                      }
                    }
                  }
                }} />
              </div>
            </div>
            
            <div>
              <h3>Model Confidence</h3>
              <Bar data={confidenceData} options={{
                scales: {
                  y: { beginAtZero: true, max: 100 }
                },
                plugins: {
                  legend: { display: false }
                }
              }} />
            </div>
          </div>

          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <h4>Risk Assessment</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
              {Object.entries(predictions.predictions).map(([weather, prob]) => (
                <div key={weather} style={{
                  padding: '10px',
                  backgroundColor: getProbabilityColor(prob),
                  color: 'white',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  <strong>{weather.replace('_', ' ').toUpperCase()}</strong>
                  <br />
                  {(prob * 100).toFixed(1)}% chance
                  <br />
                  <small>{prob < 0.3 ? 'Low Risk' : prob < 0.7 ? 'Moderate Risk' : 'High Risk'}</small>
                </div>
              ))}
            </div>
          </div>

          {predictions.historical_context && (
            <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
              <h5>NASA Data Source</h5>
              <p><strong>Data:</strong> {predictions.historical_context.nasa_data_source || 'NASA Earth Observation'}</p>
              {predictions.historical_context.temperature_c && (
                <p><strong>Current Conditions:</strong> {predictions.historical_context.temperature_c.toFixed(1)}°C, 
                {predictions.historical_context.precipitation_mm?.toFixed(1) || 'N/A'}mm precip, 
                {predictions.historical_context.wind_speed_ms?.toFixed(1) || 'N/A'}m/s wind</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherPredictor;