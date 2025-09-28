import xarray as xr
import pandas as pd
import numpy as np
from data_loader import DataLoader

def process_giovanni_precipitation():
    """Process the downloaded NASA precipitation data"""
    
    # Load the NetCDF file
    filepath = "g4.timeAvgMap.GPM_3IMERGM_07_precipitation.20200101-20250930.180W_90S_180E_90N.nc"
    
    try:
        ds = xr.open_dataset(filepath)
        print("Dataset loaded successfully!")
        print("Dataset info:")
        print(ds)
        print("\nVariables:", list(ds.variables.keys()))
        print("\nDimensions:", ds.dims)
        
        # Convert to DataFrame
        df = ds.to_dataframe().reset_index()
        df = df.dropna()
        
        print(f"\nDataFrame shape: {df.shape}")
        print("\nFirst few rows:")
        print(df.head())
        
        # Save as CSV for easy use
        df.to_csv('nasa_precipitation_processed.csv', index=False)
        print("\nSaved processed data to: nasa_precipitation_processed.csv")
        
        return df
        
    except Exception as e:
        print(f"Error processing file: {e}")
        return None

if __name__ == "__main__":
    df = process_giovanni_precipitation()