# NASA Dataset Download Guide for "Will It Rain On My Parade?"

REQUIRED_DATASETS = {
    "precipitation": {
        "source": "GPM (Global Precipitation Measurement)",
        "dataset_id": "GPM_3IMERGM.06",
        "url": "https://disc.gsfc.nasa.gov/datasets/GPM_3IMERGM_06/summary",
        "format": "HDF5/NetCDF",
        "variables": ["precipitation", "precipitationCal"]
    },
    
    "temperature": {
        "source": "MODIS Terra Land Surface Temperature",
        "dataset_id": "MOD11A1.061", 
        "url": "https://lpdaac.usgs.gov/products/mod11a1v061/",
        "format": "HDF",
        "variables": ["LST_Day_1km", "LST_Night_1km"]
    },
    
    "wind": {
        "source": "MERRA-2 Reanalysis",
        "dataset_id": "M2T1NXSLV.5.12.4",
        "url": "https://disc.gsfc.nasa.gov/datasets/M2T1NXSLV_5.12.4/summary",
        "format": "NetCDF",
        "variables": ["U10M", "V10M", "SPEED"]  # 10m wind components
    },
    
    "cloud_cover": {
        "source": "MODIS Aqua/Terra",
        "dataset_id": "MOD08_M3.061",
        "url": "https://ladsweb.modaps.eosdis.nasa.gov/",
        "format": "HDF",
        "variables": ["Cloud_Fraction_Mean"]
    }
}

# Quick access URLs for Giovanni (easiest for hackathon)
GIOVANNI_QUICK_ACCESS = {
    "precipitation": "https://giovanni.gsfc.nasa.gov/giovanni/#service=TmAvMp&starttime=2020-01-01&endtime=2023-12-31&data=GPM_3IMERGM_06_precipitation",
    "temperature": "https://giovanni.gsfc.nasa.gov/giovanni/#service=TmAvMp&starttime=2020-01-01&endtime=2023-12-31&data=MOD11C1_061_LST_Day_CMG",
    "wind": "https://giovanni.gsfc.nasa.gov/giovanni/#service=TmAvMp&starttime=2020-01-01&endtime=2023-12-31&data=M2T1NXSLV_5_12_4_SPEED"
}