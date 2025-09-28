import xarray as xr
import pandas as pd
import numpy as np

class SimpleNASAPredictor:
    def __init__(self):
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
            
            print("All NASA datasets loaded successfully")
            
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
    
    def predict_weather_conditions(self, lat, lon):
        """Predict all 5 weather conditions for the challenge"""
        try:
            # Get NASA data for location
            data = self.get_location_data(lat, lon)
            
            # Extract values
            precip = data.get('precipitation', 0)  # mm/day
            temp_k = data.get('temperature', 273.15)  # Kelvin
            wind = data.get('wind', 0)  # m/s
            
            # Convert temperature to Celsius
            temp_c = temp_k - 273.15
            
            # Calculate probabilities for each condition
            predictions = {}
            
            # Very Wet (based on precipitation)
            if precip > 10:
                predictions['very_wet'] = 0.9
            elif precip > 5:
                predictions['very_wet'] = 0.7
            elif precip > 2:
                predictions['very_wet'] = 0.4
            else:
                predictions['very_wet'] = 0.1
            
            # Very Hot (based on temperature)
            if temp_c > 35:
                predictions['very_hot'] = 0.9
            elif temp_c > 30:
                predictions['very_hot'] = 0.7
            elif temp_c > 25:
                predictions['very_hot'] = 0.4
            else:
                predictions['very_hot'] = 0.1
            
            # Very Cold (based on temperature)
            if temp_c < -5:
                predictions['very_cold'] = 0.9
            elif temp_c < 0:
                predictions['very_cold'] = 0.7
            elif temp_c < 5:
                predictions['very_cold'] = 0.4
            else:
                predictions['very_cold'] = 0.1
            
            # Very Windy (based on wind speed)
            if wind > 15:
                predictions['very_windy'] = 0.9
            elif wind > 10:
                predictions['very_windy'] = 0.7
            elif wind > 7:
                predictions['very_windy'] = 0.4
            else:
                predictions['very_windy'] = 0.1
            
            # Very Uncomfortable (combination of factors)
            discomfort_score = 0
            if temp_c > 35 or temp_c < -5:
                discomfort_score += 0.4
            if wind > 12:
                discomfort_score += 0.3
            if precip > 8:
                discomfort_score += 0.3
            
            predictions['very_uncomfortable'] = min(0.9, max(0.1, discomfort_score))
            
            # Calculate confidence based on data availability
            valid_data_count = sum(1 for v in data.values() if not np.isnan(v))
            confidence_base = valid_data_count / len(data) * 0.8 + 0.2
            
            confidence = {k: confidence_base for k in predictions.keys()}
            
            return {
                'predictions': predictions,
                'confidence': confidence,
                'raw_data': {
                    'precipitation_mm': precip,
                    'temperature_c': temp_c,
                    'wind_speed_ms': wind
                },
                'location': f"({lat:.2f}, {lon:.2f})"
            }
            
        except Exception as e:
            print(f"Prediction error: {e}")
            return None

def test_predictions():
    """Test the weather predictor with sample locations"""
    predictor = SimpleNASAPredictor()
    
    # Test locations
    test_locations = [
        (40.7128, -74.0060, "New York City"),
        (25.7617, -80.1918, "Miami"),
        (34.0522, -118.2437, "Los Angeles"),
        (51.5074, -0.1278, "London"),
        (35.6762, 139.6503, "Tokyo")
    ]
    
    print("\n=== NASA Weather Predictions ===")
    for lat, lon, name in test_locations:
        result = predictor.predict_weather_conditions(lat, lon)
        if result:
            print(f"\n{name} {result['location']}:")
            print(f"NASA Data: Precip={result['raw_data']['precipitation_mm']:.1f}mm, "
                  f"Temp={result['raw_data']['temperature_c']:.1f}°C, "
                  f"Wind={result['raw_data']['wind_speed_ms']:.1f}m/s")
            
            print("Weather Condition Probabilities:")
            for condition, prob in result['predictions'].items():
                risk_level = "HIGH" if prob > 0.7 else "MEDIUM" if prob > 0.4 else "LOW"
                print(f"  {condition.replace('_', ' ').title()}: {prob:.1%} {risk_level}")

if __name__ == "__main__":
    test_predictions()