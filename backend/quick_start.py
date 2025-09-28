from data_loader import DataLoader
from feature_engineering import WeatherFeatureEngineer
import pandas as pd

# Quick start with sample data
loader = DataLoader()
engineer = WeatherFeatureEngineer()

# Generate sample data
df = loader.load_sample_data()
print("Sample data shape:", df.shape)
print(df.head())

# Process for ML
df = engineer.create_temporal_features(df)
df = engineer.create_weather_features(df)

# Create target variables (weather events)
df['rain_event'] = (df['precipitation'] > df['precipitation'].quantile(0.7)).astype(int)
df['heat_event'] = (df['temperature'] > df['temperature'].quantile(0.8)).astype(int)
df['wind_event'] = (df['pressure'] < df['pressure'].quantile(0.3)).astype(int)

print("Processed data ready for ML:", df.shape)