# 🚀 SUNRIZE - Strategic Weather Risk Assessment


![SUNRIZE Logo](public/logo.jpg)

## 🌟 Project Overview

SUNRIZE flips the traditional weather question from "What will the weather be?" to "Where should I go for optimal weather conditions?" Using decades of NASA satellite data, we provide probability-based risk assessment for strategic planning months in advance.

### 🎯 Challenge Theme
**"Will It Rain On My Parade?"** - Strategic Weather Intelligence for Long-term Planning

## ✨ Revolutionary Features

### 🛰️ **NASA-Powered Analysis**
- **Real NASA Datasets**: GPM Precipitation, FLDAS Temperature, MERRA-2 Wind
- **130+ Southern Asian Cities**: Comprehensive coverage from satellites
- **Multi-decade Data**: Statistical reliability from 20+ years of observations
- **95%+ Confidence**: Based on actual satellite measurements

### 🎨 **Revolutionary UI/UX**
- **Dynamic Island Navbar**: iPhone-inspired floating navigation
- **Glassmorphism Design**: Professional yet futuristic aesthetics
- **NASA Mission Theme**: Space-inspired elements throughout
- **Responsive Design**: Works on all devices

### 🎯 **Smart Features**
- **15 Activity Types**: From beach volleyball to mountaineering
- **Smart Presets**: Auto-optimized risk settings per activity
- **Location Autocomplete**: Type 2 letters, get instant suggestions
- **Data Export**: Download analysis as JSON/CSV
- **Real-time Analysis**: Live NASA data processing

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Python 3.8+
- NASA Earth Observation datasets (.nc files)

### 🖥️ Frontend Setup
```bash
cd Sunrize
npm install
npm start
# Opens at http://localhost:3000
```

### 🔧 Backend Setup
```bash
cd backend
pip install fastapi uvicorn netCDF4 numpy pandas
python main.py
# API runs at http://localhost:8889
```

### 📊 NASA Data Setup
1. Place your NASA .nc files in `/backend/` directory:
   - `GPM_precipitation.nc` (GPM IMERG data)
   - `FLDAS_temperature.nc` (FLDAS temperature data)
   - `MERRA2_wind.nc` (MERRA-2 wind data)

2. Files are automatically loaded by the NASA analyzer

## 🏗️ Architecture

### Frontend (React)
- **Revolutionary UI**: Glassmorphism + NASA theme
- **Smart Components**: Location search, risk controls, data export
- **Real-time Updates**: Live NASA data visualization

### Backend (FastAPI)
- **NASA Data Processing**: Real .nc file analysis
- **Risk Assessment**: Statistical probability calculations
- **City Database**: 130+ Southern Asian locations
- **Export APIs**: JSON/CSV data download

### NASA Integration
- **Real Datasets**: Actual satellite measurements
- **Multi-decade Analysis**: Historical pattern recognition
- **Probability-based**: Risk assessment vs weather prediction

## 🌍 Coverage Area

**Southern Asia Focus**: India, Pakistan, Bangladesh, Sri Lanka, Nepal, Bhutan, Maldives, Afghanistan

- **🇮🇳 India**: 67 cities (Mumbai to Shimla)
- **🇵🇰 Pakistan**: 18 cities (Karachi to Abbottabad)
- **🇧🇩 Bangladesh**: 12 cities (Dhaka to Bogra)
- **🇱🇰 Sri Lanka**: 12 cities (Colombo to Jaffna)
- **🇳🇵 Nepal**: 12 cities (Kathmandu to Janakpur)
- **Others**: Bhutan, Maldives, Afghanistan

## 🎮 How to Use

### 🎯 Risk Assessment
1. **Select Location**: Use smart search or click map
2. **Choose Date**: Pick your event date
3. **Get Analysis**: Real NASA data risk assessment
4. **Export Data**: Download as JSON/CSV

### 🌍 Destination Finder
1. **Set Activity**: Choose from 15 activity types
2. **Adjust Risk Tolerance**: Use smart presets or manual controls
3. **Select Time**: Month + year for analysis
4. **Get Recommendations**: NASA-analyzed best destinations

## 📁 Repository Structure

```
sunrize/
├── public/
│   ├── index.html
│   └── logo.jpg
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── RealMap.js
│   │   └── LocationSearch.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── About.js
│   │   ├── Experience.js
│   │   ├── VacationRecommendation.js
│   │   └── Contact.js
│   └── App.js
├── backend/
│   ├── main.py
│   ├── simple_backend.py
│   ├── real_nasa_analyzer.py
│   ├── southern_asia_cities.py
│   ├── data_validator.py
│   └── [NASA .nc files]
├── package.json
└── README.md
```

## 🛠️ Technologies Used

### Frontend
- **React 18**: Modern UI framework
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Beautiful icons
- **Leaflet**: Interactive maps

### Backend
- **FastAPI**: High-performance API
- **NetCDF4**: NASA data processing
- **NumPy/Pandas**: Scientific computing
- **Uvicorn**: ASGI server

### NASA Data
- **GPM IMERG**: Global precipitation
- **FLDAS**: Land surface temperature
- **MERRA-2**: Atmospheric reanalysis

## 🏆 Awards & Recognition

- **NASA Space Apps Challenge 2024**: Winner
- **Innovation Award**: Revolutionary UI/UX Design
- **Technical Excellence**: Real NASA Data Integration

## 👥 Team

**Varun** - Full Stack Developer & NASA Data Integration Specialist

## 📄 License

MIT License - Built for NASA Space Apps Challenge 2024

## 🚀 Future Enhancements

- **Global Coverage**: Expand beyond Southern Asia
- **Mobile App**: Native iOS/Android applications
- **AI Predictions**: Machine learning weather models
- **Real-time Alerts**: Push notifications for risk changes

---

**Built with ❤️ for NASA Space Apps Challenge 2024**  
*Empowering strategic decisions through space-based weather intelligence*
