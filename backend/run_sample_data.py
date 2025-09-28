from generate_sample_nasa_data import generate_nasa_sample_data

# Generate sample data immediately
print("Generating NASA-style sample data...")
df = generate_nasa_sample_data()
print("✓ Sample data generated successfully!")
print(f"Created {len(df)} data points")
print("\nFiles created:")
print("- sample_precipitation_mm_2020_2023.csv")
print("- sample_temperature_c_2020_2023.csv") 
print("- sample_wind_speed_ms_2020_2023.csv")
print("\nYou can now start development with this realistic sample data!")