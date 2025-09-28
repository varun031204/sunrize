import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def generate_nasa_sample_data():
    """Generate realistic NASA-style sample data for immediate development"""
    
    # Date range: 2020-2023
    dates = pd.date_range('2020-01-01', '2023-12-31', freq='D')
    
    # Sample locations (you can modify these)
    locations = [
        {'lat': 40.7128, 'lon': -74.0060, 'name': 'New York'},
        {'lat': 34.0522, 'lon': -118.2437, 'name': 'Los Angeles'},
        {'lat': 25.7617, 'lon': -80.1918, 'name': 'Miami'}
    ]
    
    all_data = []
    
    for loc in locations:
        for date in dates:
            day_of_year = date.dayofyear
            
            # Realistic seasonal patterns
            temp_base = 15 + 10 * np.sin(2 * np.pi * (day_of_year - 80) / 365)
            precip_base = 0.1 + 0.4 * np.sin(2 * np.pi * (day_of_year + 90) / 365)
            wind_base = 3 + 2 * np.sin(2 * np.pi * day_of_year / 365)
            
            # Add location-specific adjustments
            if 'Miami' in loc['name']:
                temp_base += 10  # Warmer
                precip_base += 0.3  # More rain
            elif 'Los Angeles' in loc['name']:
                temp_base += 5
                precip_base *= 0.3  # Less rain
            
            all_data.append({
                'date': date.strftime('%Y-%m-%d'),
                'latitude': loc['lat'],
                'longitude': loc['lon'],
                'location': loc['name'],
                'precipitation_mm': max(0, precip_base + np.random.normal(0, 0.2)),
                'temperature_c': temp_base + np.random.normal(0, 3),
                'wind_speed_ms': max(0, wind_base + np.random.normal(0, 1)),
                'humidity_percent': 50 + 30 * np.sin(2 * np.pi * day_of_year / 365) + np.random.normal(0, 10),
                'cloud_cover_fraction': np.clip(0.3 + 0.4 * np.sin(2 * np.pi * (day_of_year + 180) / 365) + np.random.normal(0, 0.1), 0, 1)
            })
    
    df = pd.DataFrame(all_data)
    
    # Save as separate CSV files (like Giovanni exports)
    for var in ['precipitation_mm', 'temperature_c', 'wind_speed_ms']:
        subset = df[['date', 'latitude', 'longitude', 'location', var]].copy()
        subset.rename(columns={var: 'value'}, inplace=True)
        subset['variable'] = var
        subset.to_csv(f'sample_{var}_2020_2023.csv', index=False)
        print(f"Generated: sample_{var}_2020_2023.csv")
    
    return df

if __name__ == "__main__":
    df = generate_nasa_sample_data()
    print(f"Generated {len(df)} data points across {len(df['location'].unique())} locations")
    print("\nSample data preview:")
    print(df.head())