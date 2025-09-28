import requests
import json

# Test the prediction API
url = "http://localhost:8889/predict"
data = {
    "latitude": 28.7041,
    "longitude": 77.1025,
    "event_date": "2024-12-25",
    "location_name": "Delhi"
}

try:
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")