import xarray as xr
import pandas as pd
import numpy as np

class VacationRecommender:
    def __init__(self):
        self.datasets = {}
        self.load_nasa_data()
        self.create_city_database()
    
    def load_nasa_data(self):
        """Load actual NASA datasets"""
        try:
            # Precipitation
            precip_ds = xr.open_dataset("precipitation.nc")
            # Get the first data variable (whatever it's called)
            precip_var = [v for v in precip_ds.data_vars if 'precip' in v.lower() or 'rain' in v.lower()]
            if precip_var:
                self.datasets['precipitation'] = precip_ds[precip_var[0]]
            
            # Temperature  
            temp_ds = xr.open_dataset("temp.nc")
            temp_var = [v for v in temp_ds.data_vars if 'temp' in v.lower() or 'T' in v]
            if temp_var:
                self.datasets['temperature'] = temp_ds[temp_var[0]]
            
            # Wind
            wind_ds = xr.open_dataset("wind.nc")
            wind_var = [v for v in wind_ds.data_vars if 'wind' in v.lower() or 'speed' in v.lower()]
            if wind_var:
                self.datasets['wind'] = wind_ds[wind_var[0]]
            
            print("NASA datasets loaded successfully")
            
        except Exception as e:
            print(f"Error loading datasets: {e}")
    
    def create_city_database(self):
        """Create database of Southern Asian cities with coordinates"""
        self.cities = [
            {"name": "Mumbai, India", "lat": 19.0760, "lon": 72.8777, "country": "India"},
            {"name": "Delhi, India", "lat": 28.7041, "lon": 77.1025, "country": "India"},
            {"name": "Bangalore, India", "lat": 12.9716, "lon": 77.5946, "country": "India"},
            {"name": "Chennai, India", "lat": 13.0827, "lon": 80.2707, "country": "India"},
            {"name": "Kolkata, India", "lat": 22.5726, "lon": 88.3639, "country": "India"},
            {"name": "Hyderabad, India", "lat": 17.3850, "lon": 78.4867, "country": "India"},
            {"name": "Pune, India", "lat": 18.5204, "lon": 73.8567, "country": "India"},
            {"name": "Karachi, Pakistan", "lat": 24.8607, "lon": 67.0011, "country": "Pakistan"},
            {"name": "Lahore, Pakistan", "lat": 31.5204, "lon": 74.3587, "country": "Pakistan"},
            {"name": "Islamabad, Pakistan", "lat": 33.6844, "lon": 73.0479, "country": "Pakistan"},
            {"name": "Dhaka, Bangladesh", "lat": 23.8103, "lon": 90.4125, "country": "Bangladesh"},
            {"name": "Chittagong, Bangladesh", "lat": 22.3569, "lon": 91.7832, "country": "Bangladesh"},
            {"name": "Colombo, Sri Lanka", "lat": 6.9271, "lon": 79.8612, "country": "Sri Lanka"},
            {"name": "Kandy, Sri Lanka", "lat": 7.2906, "lon": 80.6337, "country": "Sri Lanka"},
            {"name": "Kathmandu, Nepal", "lat": 27.7172, "lon": 85.3240, "country": "Nepal"},
            {"name": "Pokhara, Nepal", "lat": 28.2096, "lon": 83.9856, "country": "Nepal"},
            {"name": "Thimphu, Bhutan", "lat": 27.4728, "lon": 89.6390, "country": "Bhutan"}
        ]
    
    def get_city_weather_data(self, lat, lon):
        """Extract actual NASA data for city coordinates"""
        city_data = {}
        
        for name, dataset in self.datasets.items():
            try:
                # Find nearest grid point to city
                point_data = dataset.sel(lat=lat, lon=lon, method='nearest')
                city_data[name] = float(point_data.values)
            except Exception as e:
                print(f"Error extracting {name} data for {lat}, {lon}: {e}")
                city_data[name] = np.nan
        
        return city_data
    
    def calculate_risk_scores(self, weather_data):
        """Calculate risk scores from actual NASA data"""
        precip = weather_data.get('precipitation', 0)
        temp_k = weather_data.get('temperature', 273.15)
        wind = weather_data.get('wind', 0)
        
        # Convert temperature to Celsius
        temp_c = temp_k - 273.15
        
        # Calculate risk probabilities based on actual data
        risks = {}
        
        # Very Wet Risk (based on precipitation)
        if precip > 10:
            risks['very_wet'] = min(90, 60 + precip * 2)
        elif precip > 5:
            risks['very_wet'] = min(60, 30 + precip * 4)
        else:
            risks['very_wet'] = max(5, precip * 3)
        
        # Very Hot Risk (based on temperature)
        if temp_c > 35:
            risks['very_hot'] = min(90, 50 + (temp_c - 35) * 3)
        elif temp_c > 30:
            risks['very_hot'] = min(60, 20 + (temp_c - 30) * 6)
        else:
            risks['very_hot'] = max(5, max(0, temp_c - 20) * 2)
        
        # Very Cold Risk (based on temperature)
        if temp_c < 0:
            risks['very_cold'] = min(90, 70 + abs(temp_c) * 2)
        elif temp_c < 10:
            risks['very_cold'] = min(60, (10 - temp_c) * 5)
        else:
            risks['very_cold'] = max(2, (20 - temp_c) * 1.5) if temp_c < 20 else 2
        
        # Very Windy Risk (based on wind speed)
        if wind > 15:
            risks['very_windy'] = min(90, 40 + (wind - 15) * 3)
        elif wind > 10:
            risks['very_windy'] = min(50, 15 + (wind - 10) * 5)
        else:
            risks['very_windy'] = max(5, wind * 2)
        
        # Overall discomfort
        risks['very_uncomfortable'] = (risks['very_hot'] + risks['very_cold'] + 
                                     risks['very_windy'] * 0.7 + risks['very_wet'] * 0.5) / 3.2
        
        return {k: max(1, min(95, v)) for k, v in risks.items()}
    
    def recommend_destinations(self, criteria):
        """Find cities that meet risk criteria using actual NASA data"""
        recommendations = []
        
        for city in self.cities:
            # Get actual NASA weather data for this city
            weather_data = self.get_city_weather_data(city['lat'], city['lon'])
            
            # Skip if no valid data
            if all(np.isnan(v) for v in weather_data.values()):
                continue
            
            # Calculate risk scores from actual data
            risk_scores = self.calculate_risk_scores(weather_data)
            
            # Check if city meets criteria
            meets_criteria = (
                risk_scores['very_wet'] <= criteria['maxWetRisk'] and
                risk_scores['very_hot'] <= criteria['maxHotRisk'] and
                risk_scores['very_cold'] <= criteria['maxColdRisk'] and
                risk_scores['very_windy'] <= criteria['maxWindyRisk']
            )
            
            if meets_criteria:
                # Calculate overall risk score
                overall_risk = (risk_scores['very_wet'] + risk_scores['very_hot'] + 
                              risk_scores['very_cold'] + risk_scores['very_windy']) / 4
                
                temp_c = weather_data.get('temperature', 273.15) - 273.15
                precip = weather_data.get('precipitation', 0)
                
                recommendations.append({
                    'destination': city['name'],
                    'country': city['country'],
                    'coordinates': f"{city['lat']:.1f}°N, {city['lon']:.1f}°E",
                    'riskScores': risk_scores,
                    'overallRisk': round(overall_risk, 1),
                    'avgTemp': f"{temp_c:.1f}°C",
                    'avgPrecip': f"{precip:.1f}mm",
                    'nasaData': weather_data
                })
        
        # Sort by overall risk (lowest first)
        recommendations.sort(key=lambda x: x['overallRisk'])
        
        return recommendations[:10]  # Return top 10

def test_recommender():
    """Test the vacation recommender with actual NASA data"""
    recommender = VacationRecommender()
    
    # Test criteria
    criteria = {
        'maxWetRisk': 25,
        'maxHotRisk': 40,
        'maxColdRisk': 20,
        'maxWindyRisk': 30
    }
    
    print("Testing vacation recommender with actual NASA data...")
    recommendations = recommender.recommend_destinations(criteria)
    
    print(f"\nFound {len(recommendations)} destinations meeting criteria:")
    for i, rec in enumerate(recommendations[:5]):
        print(f"\n{i+1}. {rec['destination']}")
        print(f"   Overall Risk: {rec['overallRisk']}%")
        print(f"   Temperature: {rec['avgTemp']}, Precipitation: {rec['avgPrecip']}")
        print(f"   Risks - Wet: {rec['riskScores']['very_wet']:.0f}%, Hot: {rec['riskScores']['very_hot']:.0f}%")

if __name__ == "__main__":
    test_recommender()