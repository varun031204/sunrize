import pandas as pd
import xarray as xr
import numpy as np
from pathlib import Path

class DataLoader:
    def __init__(self, data_dir="data"):
        self.data_dir = Path(data_dir)
        self.data_dir.mkdir(exist_ok=True)
    
    def load_giovanni_csv(self, filepath):
        """Load Giovanni exported CSV data"""
        df = pd.read_csv(filepath, skiprows=1)  # Giovanni CSVs have header row
        df.columns = ['date', 'lat', 'lon', 'precipitation']
        df['date'] = pd.to_datetime(df['date'])
        return df
    
    def load_giovanni_netcdf(self, filepath):
        """Load NetCDF files from Giovanni"""
        ds = xr.open_dataset(filepath)
        # Convert to DataFrame and clean up
        df = ds.to_dataframe().reset_index()
        df = df.dropna()  # Remove missing values
        return df
    
    def create_weather_categories(self, df):
        """Create challenge-specific weather categories"""
        # Define thresholds for "very" conditions
        df['very_hot'] = (df['temperature'] > df['temperature'].quantile(0.85)).astype(int)
        df['very_cold'] = (df['temperature'] < df['temperature'].quantile(0.15)).astype(int)
        df['very_windy'] = (df.get('wind_speed', df.get('pressure', 1013)) > df.get('wind_speed', df.get('pressure', 1013)).quantile(0.8)).astype(int)
        df['very_wet'] = (df['precipitation'] > df['precipitation'].quantile(0.8)).astype(int)
        
        # Comfort index (combination of temp, humidity, wind)
        if 'humidity' in df.columns:
            df['discomfort_index'] = (df['temperature'] - 0.55 * (1 - df['humidity']/100) * (df['temperature'] - 58))
            df['very_uncomfortable'] = (df['discomfort_index'] > df['discomfort_index'].quantile(0.8)).astype(int)
        else:
            df['very_uncomfortable'] = ((df['temperature'] > 30) | (df['temperature'] < 5)).astype(int)
        
        return df
    
    def load_sample_data(self):
        """Generate sample data matching challenge requirements"""
        dates = pd.date_range('2020-01-01', '2023-12-31', freq='D')
        np.random.seed(42)
        
        data = []
        for date in dates:
            day_of_year = date.dayofyear
            seasonal_temp = 20 + 15 * np.sin(2 * np.pi * day_of_year / 365)
            seasonal_precip = 0.3 + 0.7 * np.sin(2 * np.pi * (day_of_year + 90) / 365)
            
            data.append({
                'date': date,
                'lat': 40.7128,
                'lon': -74.0060,
                'temperature': seasonal_temp + np.random.normal(0, 5),
                'precipitation': max(0, seasonal_precip + np.random.normal(0, 0.2)),
                'humidity': 50 + 30 * np.sin(2 * np.pi * day_of_year / 365) + np.random.normal(0, 10),
                'wind_speed': 5 + 3 * np.sin(2 * np.pi * day_of_year / 365) + np.random.normal(0, 2),
                'cloud_cover': 0.4 + 0.3 * np.sin(2 * np.pi * (day_of_year + 180) / 365) + np.random.normal(0, 0.1)
            })
        
        df = pd.DataFrame(data)
        return self.create_weather_categories(df)