from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, date
import joblib
import pandas as pd
try:
    from simple_nasa_predictor import SimpleNASAPredictor
    nasa_predictor = SimpleNASAPredictor()
except Exception as e:
    print(f"NASA predictor failed: {e}")
    from simple_predictor import SimplePredictor
    nasa_predictor = SimplePredictor()

# Load vacation recommender
try:
    from vacation_recommender import VacationRecommender
    vacation_recommender = VacationRecommender()
except Exception as e:
    print(f"Vacation recommender failed: {e}")
    vacation_recommender = None
import numpy as np

app = FastAPI(title="Weather Prediction API", version="1.0.0")

# CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# NASA predictor initialized above - now validates Southern Asia only

# Load pre-trained models (you'll train these)
try:
    rain_model = joblib.load('models/rain_model.pkl')
    heat_model = joblib.load('models/heat_model.pkl')
    wind_model = joblib.load('models/wind_model.pkl')
except FileNotFoundError:
    rain_model = heat_model = wind_model = None

class PredictionRequest(BaseModel):
    latitude: float
    longitude: float
    event_date: date
    location_name: str = ""

class PredictionResponse(BaseModel):
    location: str
    date: str
    predictions: dict
    confidence: dict
    historical_context: dict

class VacationRequest(BaseModel):
    month: str
    maxWetRisk: int
    maxHotRisk: int
    maxColdRisk: int
    maxWindyRisk: int
    activityType: str = "outdoor"

@app.get("/")
async def root():
    return {"message": "Weather Prediction API for NASA Space Apps Challenge"}

@app.post("/predict", response_model=PredictionResponse)
async def predict_weather(request: PredictionRequest):
    try:
        import sys
        import os
        sys.path.append(os.path.dirname(__file__))
        from data_validator import validate_location_coverage, get_actual_nasa_data
        
        # Validate location is in Southern Asia
        valid, msg = validate_location_coverage(request.latitude, request.longitude)
        if not valid:
            raise HTTPException(status_code=400, detail=msg)
        
        # Get actual NASA data
        nasa_data = get_actual_nasa_data(request.latitude, request.longitude)
        
        # Calculate risk scores from actual data
        temp_c = nasa_data['temperature_k'] - 273.15
        precip = nasa_data['precipitation_mm']
        wind = nasa_data['wind_speed_ms']
        
        # Risk calculations based on actual NASA data
        predictions = {}
        
        # Very Wet (precipitation based)
        if precip > 10:
            predictions['very_wet'] = min(0.9, 0.6 + precip * 0.02)
        elif precip > 5:
            predictions['very_wet'] = min(0.6, 0.3 + precip * 0.04)
        else:
            predictions['very_wet'] = max(0.05, precip * 0.03)
        
        # Very Hot (temperature based)
        if temp_c > 35:
            predictions['very_hot'] = min(0.9, 0.5 + (temp_c - 35) * 0.03)
        elif temp_c > 30:
            predictions['very_hot'] = min(0.6, 0.2 + (temp_c - 30) * 0.06)
        else:
            predictions['very_hot'] = max(0.05, max(0, temp_c - 20) * 0.02)
        
        # Very Cold (temperature based)
        if temp_c < 0:
            predictions['very_cold'] = min(0.9, 0.7 + abs(temp_c) * 0.02)
        elif temp_c < 10:
            predictions['very_cold'] = min(0.6, (10 - temp_c) * 0.05)
        else:
            predictions['very_cold'] = max(0.02, (20 - temp_c) * 0.015) if temp_c < 20 else 0.02
        
        # Very Windy (wind based)
        if wind > 15:
            predictions['very_windy'] = min(0.9, 0.4 + (wind - 15) * 0.03)
        elif wind > 10:
            predictions['very_windy'] = min(0.5, 0.15 + (wind - 10) * 0.05)
        else:
            predictions['very_windy'] = max(0.05, wind * 0.02)
        
        # Very Uncomfortable (combined)
        predictions['very_uncomfortable'] = (predictions['very_hot'] + predictions['very_cold'] + 
                                           predictions['very_windy'] * 0.7 + predictions['very_wet'] * 0.5) / 3.2
        
        # Ensure all values are between 0.01 and 0.95
        predictions = {k: max(0.01, min(0.95, v)) for k, v in predictions.items()}
        
        return PredictionResponse(
            location=f"{request.location_name} ({request.latitude:.2f}, {request.longitude:.2f})",
            date=request.event_date.strftime('%Y-%m-%d'),
            predictions=predictions,
            confidence={k: 0.95 for k in predictions.keys()},  # High confidence from NASA data
            historical_context={
                "nasa_data_source": "Southern Asia NASA Earth Observation Data",
                "precipitation_mm": round(precip, 2),
                "temperature_c": round(temp_c, 2),
                "wind_speed_ms": round(wind, 2)
            }
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"NASA data processing error: {str(e)}")

@app.post("/recommend-destinations")
async def recommend_destinations(request: VacationRequest):
    try:
        from real_nasa_analyzer import RealNASAAnalyzer
        
        # Use real NASA analyzer
        analyzer = RealNASAAnalyzer()
        
        criteria = {
            'maxWetRisk': request.maxWetRisk,
            'maxHotRisk': request.maxHotRisk,
            'maxColdRisk': request.maxColdRisk,
            'maxWindyRisk': request.maxWindyRisk,
            'activityType': request.activityType
        }
        
        # Get real NASA analysis
        recommendations = analyzer.find_best_destinations(criteria)
        
        return {"recommendations": recommendations[:15]}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/export-analysis/{format}")
async def export_analysis(format: str, lat: float, lon: float, location_name: str = ""):
    try:
        from fastapi.responses import Response
        import json
        import csv
        from io import StringIO
        
        # Get NASA analysis
        from data_validator import get_actual_nasa_data
        nasa_data = get_actual_nasa_data(lat, lon)
        temp_c = nasa_data['temperature_k'] - 273.15
        
        # Calculate risks
        precip = nasa_data['precipitation_mm']
        wind = nasa_data['wind_speed_ms']
        
        risks = {
            'very_wet': min(90, max(5, precip * 30)),
            'very_hot': min(90, max(5, (temp_c - 20) * 3)) if temp_c > 20 else 5,
            'very_cold': min(90, max(5, (15 - temp_c) * 4)) if temp_c < 15 else 5,
            'very_windy': min(90, max(5, wind * 15))
        }
        
        export_data = {
            "location": f"{location_name} ({lat:.4f}, {lon:.4f})",
            "analysis_timestamp": datetime.now().isoformat(),
            "coordinates": {"latitude": lat, "longitude": lon},
            "raw_measurements": {
                "precipitation_mm": round(precip, 3),
                "temperature_c": round(temp_c, 1),
                "wind_speed_ms": round(wind, 2)
            },
            "risk_probabilities": {k: round(v, 2) for k, v in risks.items()}
        }
        
        if format.lower() == "json":
            return Response(
                content=json.dumps(export_data, indent=2),
                media_type="application/json",
                headers={"Content-Disposition": f"attachment; filename=nasa_analysis_{lat}_{lon}.json"}
            )
        
        elif format.lower() == "csv":
            output = StringIO()
            writer = csv.writer(output)
            writer.writerow(["Parameter", "Value", "Unit"])
            writer.writerow(["Location", export_data["location"], ""])
            writer.writerow(["Latitude", lat, "degrees"])
            writer.writerow(["Longitude", lon, "degrees"])
            writer.writerow(["Precipitation", export_data["raw_measurements"]["precipitation_mm"], "mm"])
            writer.writerow(["Temperature", export_data["raw_measurements"]["temperature_c"], "°C"])
            writer.writerow(["Wind Speed", export_data["raw_measurements"]["wind_speed_ms"], "m/s"])
            for risk, prob in export_data["risk_probabilities"].items():
                writer.writerow([risk.replace('_', ' ').title(), prob, "%"])
            
            return Response(
                content=output.getvalue(),
                media_type="text/csv",
                headers={"Content-Disposition": f"attachment; filename=nasa_analysis_{lat}_{lon}.csv"}
            )
        
        else:
            raise HTTPException(status_code=400, detail="Format must be 'json' or 'csv'")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {
        "status": "healthy", 
        "models_loaded": rain_model is not None,
        "vacation_recommender": vacation_recommender is not None
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8889)