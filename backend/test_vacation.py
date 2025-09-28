import requests
import json

# Test vacation recommendation API
url = "http://localhost:8889/recommend-destinations"
data = {
    "month": "January",
    "maxWetRisk": 20,
    "maxHotRisk": 30,
    "maxColdRisk": 15,
    "maxWindyRisk": 25,
    "activityType": "outdoor"
}

try:
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")