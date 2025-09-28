import xarray as xr
import pandas as pd
import numpy as np
from pathlib import Path

def process_all_nasa_datasets():
    """Process all three NASA datasets and combine them"""
    
    datasets = {}
    
    # 1. Process Precipitation
    print("Processing precipitation data...")
    try:
        precip_ds = xr.open_dataset("g4.timeAvgMap.GPM_3IMERGM_07_precipitation.20200101-20250930.180W_90S_180E_90N.nc")
        print("Precipitation dataset variables:", list(precip_ds.variables.keys()))
        print("Precipitation dimensions:", precip_ds.dims)
        datasets['precipitation'] = precip_ds
    except Exception as e:
        print(f"Error loading precipitation: {e}")
    
    # 2. Process Temperature
    print("\nProcessing temperature data...")
    try:
        temp_ds = xr.open_dataset("temp.nc")
        print("Temperature dataset variables:", list(temp_ds.variables.keys()))
        print("Temperature dimensions:", temp_ds.dims)
        datasets['temperature'] = temp_ds
    except Exception as e:
        print(f"Error loading temperature: {e}")
    
    # 3. Process Wind
    print("\nProcessing wind data...")
    try:
        wind_ds = xr.open_dataset("wind.nc")
        print("Wind dataset variables:", list(wind_ds.variables.keys()))
        print("Wind dimensions:", wind_ds.dims)
        datasets['wind'] = wind_ds
    except Exception as e:
        print(f"Error loading wind: {e}")
    
    return datasets

def create_weather_prediction_data(datasets):
    """Convert datasets to prediction-ready format"""
    
    combined_data = []
    
    for name, ds in datasets.items():
        try:
            # Convert to DataFrame
            df = ds.to_dataframe().reset_index()
            df = df.dropna()
            
            # Add dataset identifier
            df['dataset'] = name
            
            print(f"\n{name.title()} data shape: {df.shape}")
            print(f"Columns: {list(df.columns)}")
            print("Sample data:")
            print(df.head(3))
            
            combined_data.append(df)
            
        except Exception as e:
            print(f"Error processing {name}: {e}")
    
    return combined_data

if __name__ == "__main__":
    print("=== NASA Weather Data Processing ===")
    datasets = process_all_nasa_datasets()
    
    if datasets:
        print(f"\nSuccessfully loaded {len(datasets)} datasets")
        combined_data = create_weather_prediction_data(datasets)
        print(f"\nReady for weather prediction system!")
    else:
        print("No datasets loaded successfully")