import xarray as xr
import pandas as pd
from pathlib import Path

class MultiDatasetProcessor:
    def __init__(self):
        self.datasets = {}
    
    def load_precipitation(self, filepath):
        """Load precipitation NetCDF"""
        ds = xr.open_dataset(filepath)
        df = ds.to_dataframe().reset_index().dropna()
        df['variable'] = 'precipitation'
        self.datasets['precipitation'] = df
        return df
    
    def load_temperature(self, filepath):
        """Load temperature NetCDF"""
        ds = xr.open_dataset(filepath)
        df = ds.to_dataframe().reset_index().dropna()
        df['variable'] = 'temperature'
        self.datasets['temperature'] = df
        return df
    
    def load_wind(self, filepath):
        """Load wind NetCDF"""
        ds = xr.open_dataset(filepath)
        df = ds.to_dataframe().reset_index().dropna()
        df['variable'] = 'wind'
        self.datasets['wind'] = df
        return df
    
    def combine_datasets(self):
        """Combine all datasets for ML"""
        if not self.datasets:
            return None
            
        # Merge on common columns (time, lat, lon)
        combined = None
        for name, df in self.datasets.items():
            if combined is None:
                combined = df
            else:
                combined = pd.merge(combined, df, on=['time', 'lat', 'lon'], how='outer')
        
        return combined