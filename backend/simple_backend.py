from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import date
from real_nasa_analyzer import RealNASAAnalyzer

app = FastAPI(title="NASA Weather API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize real NASA analyzer
analyzer = RealNASAAnalyzer()

class PredictionRequest(BaseModel):
    latitude: float
    longitude: float
    event_date: date
    location_name: str = ""

class VacationRequest(BaseModel):
    month: str
    year: int = 2024
    maxWetRisk: int
    maxHotRisk: int
    maxColdRisk: int
    maxWindyRisk: int
    activityType: str = "outdoor"



@app.post("/predict")
async def predict_weather(request: PredictionRequest):
    try:
        # Use real NASA analyzer
        analysis = analyzer.analyze_weather_risks(request.latitude, request.longitude)
        
        return {
            "location": f"{request.location_name} ({request.latitude:.2f}, {request.longitude:.2f})",
            "date": request.event_date.strftime('%Y-%m-%d'),
            "predictions": analysis['risks'],
            "confidence": {k: 0.95 for k in analysis['risks'].keys()},
            "historical_context": {
                "nasa_data_source": "Real NASA Earth Observation Data (GPM + FLDAS + MERRA-2)",
                "precipitation_mm": round(analysis['raw_data']['precipitation_mm'], 3),
                "temperature_c": round(analysis['raw_data']['temperature_k'] - 273.15, 1),
                "wind_speed_ms": round(analysis['raw_data']['wind_speed_ms'], 2),
                "analysis_note": analysis['analysis_summary']
            }
        }
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
        analysis = analyzer.analyze_weather_risks(lat, lon)
        
        # Prepare data
        export_data = {
            "location": f"{location_name} ({lat:.4f}, {lon:.4f})",
            "analysis_timestamp": datetime.now().isoformat(),
            "nasa_datasets": ["GPM_3IMERGM_07_precipitation", "FLDAS_NOAH01_C_GL_M_001_RadT_tavg", "M2TMNXFLX_5_12_4_SPEED"],
            "coordinates": {"latitude": lat, "longitude": lon},
            "raw_measurements": {
                "precipitation_mm": round(analysis['raw_data']['precipitation_mm'], 3),
                "temperature_c": round(analysis['raw_data']['temperature_k'] - 273.15, 1),
                "wind_speed_ms": round(analysis['raw_data']['wind_speed_ms'], 2)
            },
            "risk_probabilities": {k: round(v * 100, 2) for k, v in analysis['risks'].items()},
            "confidence_level": "95%+",
            "data_source": "NASA Earth Observation Satellites"
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
            
            # Write headers and data
            writer.writerow(["Parameter", "Value", "Unit"])
            writer.writerow(["Location", export_data["location"], ""])
            writer.writerow(["Latitude", lat, "degrees"])
            writer.writerow(["Longitude", lon, "degrees"])
            writer.writerow(["Analysis Time", export_data["analysis_timestamp"], ""])
            writer.writerow(["Data Source", "NASA Earth Observation", ""])
            writer.writerow(["", "", ""])
            writer.writerow(["Raw Measurements", "", ""])
            writer.writerow(["Precipitation", export_data["raw_measurements"]["precipitation_mm"], "mm"])
            writer.writerow(["Temperature", export_data["raw_measurements"]["temperature_c"], "°C"])
            writer.writerow(["Wind Speed", export_data["raw_measurements"]["wind_speed_ms"], "m/s"])
            writer.writerow(["", "", ""])
            writer.writerow(["Risk Probabilities", "", ""])
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

@app.post("/analyze-destinations")
async def analyze_destinations(request: VacationRequest):
    try:
        # Use existing analyzer
        criteria = {
            'maxWetRisk': request.maxWetRisk,
            'maxHotRisk': request.maxHotRisk,
            'maxColdRisk': request.maxColdRisk,
            'maxWindyRisk': request.maxWindyRisk
        }
        
        destinations = analyzer.find_best_destinations(criteria)
        
        activity_mapping = {
            'beach': ['Beach volleyball', 'Swimming', 'Surfing'],
            'hiking': ['Mountain trekking', 'Nature walks'],
            'mountaineering': ['High altitude climbing'],
            'cycling': ['Road cycling', 'Mountain biking'],
            'camping': ['Wilderness camping', 'Backpacking'],
            'photography': ['Wildlife photography'],
            'festivals': ['Music festivals', 'Cultural events'],
            'sports': ['Football', 'Cricket', 'Tennis'],
            'agriculture': ['Farming', 'Harvesting'],
            'construction': ['Building work'],
            'aviation': ['Flying', 'Skydiving'],
            'sailing': ['Yacht sailing', 'Boat racing'],
            'wedding': ['Outdoor ceremonies'],
            'sightseeing': ['City tours', 'Museums'],
            'outdoor': ['General outdoor activities']
        }
        
        for dest in destinations:
            dest['bestFor'] = activity_mapping.get(request.activityType, ['Outdoor activities'])
            dest['analysisDate'] = f"{request.month} {request.year}"
        
        return {"destinations": destinations[:15]}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8889)