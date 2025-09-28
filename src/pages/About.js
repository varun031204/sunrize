import React from 'react';
import { Database, Brain, Satellite, TrendingUp, Rocket, Globe, Zap } from 'lucide-react';

const About = () => {
  const services = [
    {
      icon: <Database className="h-8 w-8" />,
      title: "NASA Data Integration",
      description: "We integrate multiple NASA datasets including GPM precipitation, FLDAS temperature, and MERRA-2 wind data to provide comprehensive weather analysis.",
      gradient: "from-blue-500 to-green-500"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Mission Control",
      description: "Our machine learning models analyze historical patterns and current conditions to predict five key weather categories: very wet, very hot, very cold, very windy, and very uncomfortable.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Satellite className="h-8 w-8" />,
      title: "Satellite Monitoring",
      description: "Continuous monitoring of Earth observation satellites ensures our predictions are based on the most current and accurate data available.",
      gradient: "from-red-500 to-orange-500"
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Predictive Launch",
      description: "Advanced statistical models and feature engineering techniques extract meaningful patterns from complex geospatial and temporal weather data.",
      gradient: "from-green-500 to-blue-500"
    }
  ];

  const datasets = [
    {
      name: "GPM IMERG",
      description: "Global Precipitation Measurement - provides precipitation estimates",
      resolution: "0.1° x 0.1°",
      frequency: "Monthly"
    },
    {
      name: "FLDAS",
      description: "Famine Early Warning Systems Network Land Data Assimilation System",
      resolution: "0.1° x 0.1°", 
      frequency: "Daily"
    },
    {
      name: "MERRA-2",
      description: "Modern-Era Retrospective analysis for Research and Applications",
      resolution: "0.5° x 0.625°",
      frequency: "Hourly"
    }
  ];

  return (
    <div className="min-h-screen py-12">
      {/* Revolutionary Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-yellow-900 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-red-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-orange-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
        
        {/* Glassmorphism Hero Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 max-w-4xl mx-auto text-center shadow-2xl">
            <h1 className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 bg-clip-text text-transparent">
              The Problem
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-yellow-500 to-red-500 mx-auto rounded-full mb-6"></div>
            <h2 className="text-2xl md:text-4xl font-bold mb-6 text-white/90">
              Why Current Tools Fall Short
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Discover how we solve the planning gap with NASA's multi-decade Earth observation data
            </p>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-400/30 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-orange-400/40 rounded-full animate-bounce" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-32 left-20 w-2 h-2 bg-red-400/50 rounded-full animate-bounce" style={{animationDelay: '5s'}}></div>
      </section>

      {/* The Core Problem */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Planning Gap: Why Current Tools Fall Short
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Standard weather apps and historical averages can't help you plan events months in advance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-red-800 mb-3">Problem 1: Short-term Forecasting</h3>
              <p className="text-red-700">Standard weather apps provide 1-2 week forecasts. Useless for planning events months in advance.</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-yellow-800 mb-3">Problem 2: Misleading Averages</h3>
              <p className="text-yellow-700">"Average July temperature is 75°F" hides the risk of extremes. A month can average 75°F but have 5 days over 100°F.</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">The Need</h3>
              <p className="text-blue-700">Event planners need probability of adverse conditions months ahead, not tomorrow's exact temperature.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Our Solution: Climatological Risk Assessment</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-nasa-blue text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Multi-Decade NASA Data</h4>
                    <p className="text-gray-600">Archive of NASA Earth Observation data (MODIS, TRMM) covering decades of temperature, precipitation, wind</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-nasa-blue text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Climatology vs Meteorology</h4>
                    <p className="text-gray-600">We analyze decades of history to quantify probability, not predict tomorrow's exact temperature</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-nasa-blue text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Risk Probability Output</h4>
                    <p className="text-gray-600">Likelihood (e.g., 60% chance) of user-defined extreme event occurring on specific dates</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-nasa-blue text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Strategic Decision Support</h4>
                    <p className="text-gray-600">Enable long-term decisions: Should I book outdoor venue in this location this month?</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Standard App vs Our App</h3>
              <div className="space-y-4">
                <div className="p-4 bg-red-100 rounded border">
                  <h4 className="font-semibold text-red-800 mb-2">Standard Weather App</h4>
                  <p className="text-red-700 text-sm">"It will be 75°F next Friday." (Prediction/Deterministic)</p>
                </div>
                <div className="p-4 bg-green-100 rounded border">
                  <h4 className="font-semibold text-green-800 mb-2">Our Risk Assessment App</h4>
                  <p className="text-green-700 text-sm">"45% chance of 'Very Wet' conditions (≥0.5 inches rain) next June 15th." (Probability/Risk-Based)</p>
                </div>
                <div className="p-4 bg-blue-100 rounded border">
                  <h4 className="font-semibold text-blue-800 mb-2">Key Differentiator</h4>
                  <p className="text-blue-700 text-sm">Enable strategic long-term decisions months in advance, not daily forecasts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revolutionary Services Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-slate-900 to-green-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-200 to-green-200 bg-clip-text text-transparent mb-6">
              Revolutionary Services
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Comprehensive weather analysis powered by cutting-edge NASA technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group relative">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-green-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative">
                    <div className="flex items-center mb-6">
                      <div className={`p-3 bg-gradient-to-r ${service.gradient} rounded-2xl text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        {React.cloneElement(service.icon, { className: "h-8 w-8" })}
                      </div>
                      <h3 className="text-xl font-bold text-white ml-4">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-white/80 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NASA Datasets */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              NASA Datasets We Use
            </h2>
            <p className="text-lg text-gray-600">
              Our platform integrates multiple high-quality NASA Earth observation datasets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {datasets.map((dataset, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-nasa-blue transition-colors">
                <h3 className="text-lg font-semibold text-nasa-blue mb-2">
                  {dataset.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {dataset.description}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Resolution:</span>
                    <span className="font-medium">{dataset.resolution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Frequency:</span>
                    <span className="font-medium">{dataset.frequency}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;