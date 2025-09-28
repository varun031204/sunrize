import numpy as np

class SimplePredictor:
    def predict_weather_conditions(self, lat, lon):
        """Simple weather predictions based on location"""
        try:
            # Location-based predictions
            predictions = {}
            
            # Very Wet (based on latitude - tropical regions more rain)
            if abs(lat) < 10:  # Tropical
                predictions['very_wet'] = 0.7
            elif abs(lat) < 30:  # Subtropical
                predictions['very_wet'] = 0.4
            else:  # Temperate/Polar
                predictions['very_wet'] = 0.3
            
            # Very Hot (based on latitude)
            if abs(lat) < 23.5:  # Tropics
                predictions['very_hot'] = 0.8
            elif abs(lat) < 40:  # Subtropics
                predictions['very_hot'] = 0.5
            else:  # Higher latitudes
                predictions['very_hot'] = 0.2
            
            # Very Cold (based on latitude)
            if abs(lat) > 60:  # Polar
                predictions['very_cold'] = 0.8
            elif abs(lat) > 40:  # Temperate
                predictions['very_cold'] = 0.4
            else:  # Lower latitudes
                predictions['very_cold'] = 0.1
            
            # Very Windy (coastal and high latitude areas)
            coastal = abs(lon) % 180 < 10 or abs(lon) % 180 > 170
            if coastal or abs(lat) > 50:
                predictions['very_windy'] = 0.6
            else:
                predictions['very_windy'] = 0.3
            
            # Very Uncomfortable (combination)
            discomfort = (predictions['very_hot'] + predictions['very_cold'] + 
                         predictions['very_windy'] * 0.5) / 2
            predictions['very_uncomfortable'] = min(0.9, discomfort)
            
            # Add some randomness
            for key in predictions:
                predictions[key] = max(0.05, min(0.95, 
                    predictions[key] + np.random.normal(0, 0.1)))
            
            confidence = {k: 0.7 for k in predictions.keys()}
            
            return {
                'predictions': predictions,
                'confidence': confidence,
                'raw_data': {
                    'precipitation_mm': 5.0,
                    'temperature_c': 25.0 - abs(lat) * 0.5,
                    'wind_speed_ms': 8.0
                }
            }
            
        except Exception as e:
            print(f"Prediction error: {e}")
            return None