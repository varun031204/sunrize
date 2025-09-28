import xarray as xr
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib
from pathlib import Path

class NASAWeatherPredictor:
    def __init__(self):
        self.models = {}
        self.datasets = {}
        self.load_nasa_data()
    
    def load_nasa_data(self):
        """Load all NASA datasets"""
        try:
            # Precipitation
            precip_ds = xr.open_dataset("g4.timeAvgMap.GPM_3IMERGM_07_precipitation.20200101-20250930.180W_90S_180E_90N.nc")
            self.datasets['precipitation'] = precip_ds['GPM_3IMERGM_07_precipitation']
            
            # Temperature  
            temp_ds = xr.open_dataset("temp.nc")
            self.datasets['temperature'] = temp_ds['FLDAS_NOAH01_C_GL_M_001_RadT_tavg']
            
            # Wind
            wind_ds = xr.open_dataset("wind.nc")
            self.datasets['wind'] = wind_ds['M2TMNXFLX_5_12_4_SPEED']
            
            print("✓ All NASA datasets loaded successfully")
            
        except Exception as e:
            print(f"Error loading datasets: {e}")
    
    def get_location_data(self, lat, lon):
        """Extract data for specific location"""
        location_data = {}
        
        for name, dataset in self.datasets.items():
            try:
                # Find nearest grid point
                point_data = dataset.sel(lat=lat, lon=lon, method='nearest')
                location_data[name] = float(point_data.values)
            except Exception as e:
                print(f"Error extracting {name} data: {e}")
                location_data[name] = np.nan
        
        return location_data
    
    def create_weather_categories(self, data):
        """Create challenge weather categories"""
        categories = {}
        
        # Very wet (high precipitation)
        precip = data.get('precipitation', 0)
        categories['very_wet'] = 1 if precip > 5.0 else 0  # >5mm threshold
        
        # Very hot/cold (temperature in Kelvin, convert to Celsius)
        temp_k = data.get('temperature', 273.15)
        temp_c = temp_k - 273.15
        categories['very_hot'] = 1 if temp_c > 30 else 0    # >30°C
        categories['very_cold'] = 1 if temp_c < 5 else 0    # <5°C
        
        # Very windy
        wind = data.get('wind', 0)
        categories['very_windy'] = 1 if wind > 10 else 0    # >10 m/s
        
        # Very uncomfortable (combination)
        discomfort = (temp_c > 35) or (temp_c < 0) or (wind > 15) or (precip > 10)
        categories['very_uncomfortable'] = 1 if discomfort else 0
        
        return categories
    
    def predict_weather(self, lat, lon, event_date=None):
        """Predict weather conditions for location"""
        try:
            # Get data for location
            location_data = self.get_location_data(lat, lon)
            
            # Create weather categories
            predictions = self.create_weather_categories(location_data)
            
            # Convert to probabilities (simplified)
            probabilities = {}
            for category, value in predictions.items():
                # Add some uncertainty/probability
                if value == 1:
                    probabilities[category] = min(0.95, 0.7 + np.random.random() * 0.25)
                else:
                    probabilities[category] = max(0.05, np.random.random() * 0.3)
            
            # Calculate confidence based on data availability
            confidence = {}
            for category in probabilities.keys():
                data_quality = 1.0 - sum(1 for v in location_data.values() if np.isnan(v)) / len(location_data)
                confidence[category] = min(0.95, 0.6 + data_quality * 0.3)
            
            return {
                'predictions': probabilities,
                'confidence': confidence,
                'raw_data': location_data,
                'location': f"({lat:.2f}, {lon:.2f})"
            }
            
        except Exception as e:
            print(f"Prediction error: {e}")
            return None

def test_predictor():
    """Test the weather predictor"""
    predictor = NASAWeatherPredictor()
    
    # Test locations
    test_locations = [
        (40.7128, -74.0060, "New York City"),
        (25.7617, -80.1918, "Miami"),
        (34.0522, -118.2437, "Los Angeles")
    ]
    
    print("\n=== Weather Predictions ===")
    for lat, lon, name in test_locations:
        result = predictor.predict_weather(lat, lon)
        if result:
            print(f"\n{name} {result['location']}:")
            print("Raw NASA data:", {k: f"{v:.2f}" for k, v in result['raw_data'].items() if not np.isnan(v)})
            print("Predictions:")
            for category, prob in result['predictions'].items():
                print(f"  {category}: {prob:.1%}")

if __name__ == "__main__":
    test_predictor()