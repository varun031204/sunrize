import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from geopy.distance import geodesic

class WeatherFeatureEngineer:
    def __init__(self):
        self.scaler = StandardScaler()
        
    def create_temporal_features(self, df, date_col='date'):
        """Extract temporal patterns"""
        df[date_col] = pd.to_datetime(df[date_col])
        
        df['month'] = df[date_col].dt.month
        df['day_of_year'] = df[date_col].dt.dayofyear
        df['week_of_year'] = df[date_col].dt.isocalendar().week
        df['is_weekend'] = df[date_col].dt.weekday >= 5
        
        # Cyclical encoding for temporal features
        df['month_sin'] = np.sin(2 * np.pi * df['month'] / 12)
        df['month_cos'] = np.cos(2 * np.pi * df['month'] / 12)
        df['day_sin'] = np.sin(2 * np.pi * df['day_of_year'] / 365)
        df['day_cos'] = np.cos(2 * np.pi * df['day_of_year'] / 365)
        
        return df
    
    def create_geospatial_features(self, df, lat_col='lat', lon_col='lon'):
        """Extract location-based features"""
        # Distance from equator
        df['dist_from_equator'] = np.abs(df[lat_col])
        
        # Elevation proxy (simplified)
        df['elevation_proxy'] = np.where(
            (df[lat_col] > 30) | (df[lat_col] < -30), 
            np.abs(df[lat_col]) * 100, 
            0
        )
        
        # Coastal proximity (simplified - would need actual coastline data)
        df['coastal_proxy'] = np.where(
            (np.abs(df[lon_col]) < 10) | (np.abs(df[lon_col] - 180) < 10), 
            1, 0
        )
        
        return df
    
    def create_weather_features(self, df):
        """Engineer weather-specific features"""
        weather_cols = ['temperature', 'humidity', 'pressure', 'precipitation']
        
        for col in weather_cols:
            if col in df.columns:
                # Statistical features
                df[f'{col}_rolling_7d'] = df[col].rolling(7, min_periods=1).mean()
                df[f'{col}_rolling_30d'] = df[col].rolling(30, min_periods=1).mean()
                df[f'{col}_std_7d'] = df[col].rolling(7, min_periods=1).std()
                
                # Anomaly detection
                df[f'{col}_anomaly'] = np.abs(df[col] - df[f'{col}_rolling_30d'])
                
                # Trend features
                df[f'{col}_trend'] = df[col].diff()
                df[f'{col}_trend_7d'] = df[f'{col}_rolling_7d'].diff()
        
        # Composite indices
        if all(col in df.columns for col in ['temperature', 'humidity']):
            df['heat_index'] = self.calculate_heat_index(df['temperature'], df['humidity'])
        
        return df
    
    def calculate_heat_index(self, temp_f, humidity):
        """Calculate heat index from temperature and humidity"""
        hi = 0.5 * (temp_f + 61.0 + ((temp_f - 68.0) * 1.2) + (humidity * 0.094))
        return np.where(hi > 80, 
                       -42.379 + 2.04901523*temp_f + 10.14333127*humidity - 
                       0.22475541*temp_f*humidity - 0.00683783*temp_f**2 - 
                       0.05481717*humidity**2 + 0.00122874*temp_f**2*humidity + 
                       0.00085282*temp_f*humidity**2 - 0.00000199*temp_f**2*humidity**2,
                       hi)
    
    def prepare_ml_features(self, df, target_cols):
        """Final preprocessing for ML models"""
        # Remove non-numeric columns except targets
        feature_cols = df.select_dtypes(include=[np.number]).columns.tolist()
        feature_cols = [col for col in feature_cols if col not in target_cols]
        
        X = df[feature_cols].fillna(df[feature_cols].median())
        y = df[target_cols]
        
        # Scale features
        X_scaled = pd.DataFrame(
            self.scaler.fit_transform(X),
            columns=X.columns,
            index=X.index
        )
        
        return X_scaled, y