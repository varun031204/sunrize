import requests
import xarray as xr
import pandas as pd
from datetime import datetime, timedelta
import os

class NASADataClient:
    def __init__(self):
        self.earthdata_token = os.getenv('EARTHDATA_TOKEN')
        self.base_urls = {
            'giovanni': 'https://giovanni.gsfc.nasa.gov/giovanni/',
            'ges_disc': 'https://disc2.gesdisc.eosdis.nasa.gov/opendap/',
            'earthdata': 'https://cmr.earthdata.nasa.gov/search/'
        }
    
    def get_precipitation_data(self, lat, lon, start_date, end_date):
        """Get GPM precipitation data from GES DISC"""
        url = f"{self.base_urls['ges_disc']}GPM_3IMERGM/GPM_3IMERGM.06/"
        
        # Format dates for API
        start = datetime.strptime(start_date, '%Y-%m-%d')
        end = datetime.strptime(end_date, '%Y-%m-%d')
        
        datasets = []
        current = start
        while current <= end:
            file_url = f"{url}{current.year}/GPM_3IMERGM.06.{current.strftime('%Y%m')}.HDF5"
            try:
                ds = xr.open_dataset(file_url)
                # Extract data for specific location
                precip = ds.sel(lat=lat, lon=lon, method='nearest')
                datasets.append(precip)
            except Exception as e:
                print(f"Error fetching {file_url}: {e}")
            current += timedelta(days=32)
            current = current.replace(day=1)
        
        return xr.concat(datasets, dim='time') if datasets else None
    
    def get_temperature_data(self, lat, lon, start_date, end_date):
        """Get MODIS temperature data"""
        # Simplified example - actual implementation would use proper NASA APIs
        url = f"{self.base_urls['earthdata']}granules.json"
        params = {
            'collection_concept_id': 'C1000000240-LPDAAC_ECS',  # MODIS Terra
            'bounding_box': f"{lon-0.1},{lat-0.1},{lon+0.1},{lat+0.1}",
            'temporal': f"{start_date}T00:00:00Z,{end_date}T23:59:59Z"
        }
        
        response = requests.get(url, params=params)
        return response.json() if response.status_code == 200 else None
    
    def preprocess_weather_data(self, datasets):
        """Preprocess multiple weather datasets into ML-ready format"""
        processed = []
        
        for ds in datasets:
            if ds is not None:
                # Convert to DataFrame
                df = ds.to_dataframe().reset_index()
                
                # Add temporal features
                df['month'] = pd.to_datetime(df['time']).dt.month
                df['day_of_year'] = pd.to_datetime(df['time']).dt.dayofyear
                df['season'] = df['month'].map({12:0, 1:0, 2:0, 3:1, 4:1, 5:1, 
                                               6:2, 7:2, 8:2, 9:3, 10:3, 11:3})
                
                # Add rolling averages
                numeric_cols = df.select_dtypes(include=['float64', 'int64']).columns
                for col in numeric_cols:
                    df[f'{col}_7day_avg'] = df[col].rolling(7, min_periods=1).mean()
                    df[f'{col}_30day_avg'] = df[col].rolling(30, min_periods=1).mean()
                
                processed.append(df)
        
        return pd.concat(processed, ignore_index=True) if processed else pd.DataFrame()