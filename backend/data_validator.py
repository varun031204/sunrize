import xarray as xr
import numpy as np

def validate_location_coverage(lat, lon):
    """Check if location is within Southern Asia NASA data coverage"""
    # Southern Asia bounds
    lat_min, lat_max = 5, 40    # 5°N to 40°N
    lon_min, lon_max = 60, 100  # 60°E to 100°E
    
    if not (lat_min <= lat <= lat_max and lon_min <= lon <= lon_max):
        return False, f"Location ({lat:.2f}°N, {lon:.2f}°E) is outside Southern Asia coverage area"
    
    return True, "Location within NASA data coverage"

def get_actual_nasa_data(lat, lon):
    """Extract actual NASA data for given coordinates"""
    try:
        # Load datasets
        precip_ds = xr.open_dataset("precipitation.nc")
        temp_ds = xr.open_dataset("temp.nc")
        wind_ds = xr.open_dataset("wind.nc")
        
        # Get variable names dynamically
        precip_var = [v for v in precip_ds.data_vars][0]
        temp_var = [v for v in temp_ds.data_vars][0]
        wind_var = [v for v in wind_ds.data_vars][0]
        
        # Extract data at location
        precip_data = precip_ds[precip_var].sel(lat=lat, lon=lon, method='nearest')
        temp_data = temp_ds[temp_var].sel(lat=lat, lon=lon, method='nearest')
        wind_data = wind_ds[wind_var].sel(lat=lat, lon=lon, method='nearest')
        
        return {
            'precipitation_mm': float(precip_data.values),
            'temperature_k': float(temp_data.values),
            'wind_speed_ms': float(wind_data.values),
            'data_source': 'NASA Earth Observation Data'
        }
        
    except Exception as e:
        raise Exception(f"Failed to extract NASA data: {str(e)}")

if __name__ == "__main__":
    # Test with Southern Asia locations
    test_locations = [
        (28.7041, 77.1025, "Delhi"),
        (19.0760, 72.8777, "Mumbai"),
        (40.7128, -74.0060, "New York - Should Fail")
    ]
    
    for lat, lon, name in test_locations:
        valid, msg = validate_location_coverage(lat, lon)
        print(f"{name}: {msg}")
        
        if valid:
            try:
                data = get_actual_nasa_data(lat, lon)
                print(f"  NASA Data: {data}")
            except Exception as e:
                print(f"  Error: {e}")
        print()