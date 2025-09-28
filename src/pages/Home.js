import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Satellite, Globe, BarChart3, Shield, Rocket, Zap, Target } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Risk Assessment vs Prediction",
      description: "45% chance of 'Very Wet' conditions next June 15th - not tomorrow's exact temperature",
      gradient: "from-red-500 to-orange-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Personalized Risk Index",
      description: "Define your own thresholds: Very Hot ≥90°F, Very Windy ≥25mph for your specific activity",
      gradient: "from-yellow-500 to-red-500"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Travel Recommendation Engine",
      description: "Find destinations with ≤15% chance of 'Very Cold' weather in February",
      gradient: "from-blue-500 to-green-500"
    },
    {
      icon: <Satellite className="h-8 w-8" />,
      title: "Multi-Decade NASA Data",
      description: "Decades of MODIS, TRMM data for statistically sound probability analysis",
      gradient: "from-green-500 to-blue-500"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* NASA-Inspired Revolutionary Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-green-900 text-white overflow-hidden">
        {/* NASA-Style Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '6s'}}></div>
        </div>
        
        {/* Floating NASA Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <Satellite className="absolute top-20 left-20 w-8 h-8 text-blue-400/30 animate-bounce" style={{animationDelay: '1s'}} />
          <Rocket className="absolute top-40 right-32 w-6 h-6 text-orange-400/40 animate-bounce" style={{animationDelay: '3s'}} />
          <Globe className="absolute bottom-32 right-20 w-10 h-10 text-green-400/30 animate-pulse" style={{animationDelay: '2s'}} />
          <Zap className="absolute bottom-40 left-32 w-5 h-5 text-yellow-400/40 animate-ping" style={{animationDelay: '4s'}} />
        </div>
        
        {/* Glassmorphism Hero Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 max-w-4xl mx-auto text-center shadow-2xl">
            <div className="mb-8">
              <div className="flex items-center justify-center mb-6">
                <Rocket className="w-12 h-12 text-orange-400 mr-4 animate-pulse" />
                <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 bg-clip-text text-transparent">
                  SUNRIZE
                </h1>
                <Satellite className="w-12 h-12 text-blue-400 ml-4 animate-pulse" />
              </div>
              <div className="h-1 w-32 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 mx-auto rounded-full mb-6"></div>
              <h2 className="text-2xl md:text-4xl font-bold mb-6 text-white/90">
                Strategic Weather Risk Assessment
              </h2>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                Revolutionary decision-support tool powered by NASA Earth Observation Data 
                for strategic long-term outdoor event planning
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/experience"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                to="/vacation"
                className="group relative px-8 py-4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-white/20"
              >
                <span className="flex items-center justify-center">
                  Find Destinations
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-blue-400/30 rounded-full animate-bounce" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-32 left-20 w-2 h-2 bg-purple-400/40 rounded-full animate-bounce" style={{animationDelay: '5s'}}></div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Rocket className="w-8 h-8 text-orange-500 mr-3" />
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-900 via-red-900 to-yellow-900 bg-clip-text text-transparent">
                NASA-Powered Features
              </h2>
              <Satellite className="w-8 h-8 text-blue-500 ml-3" />
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Move beyond short-term forecasting to strategic, decades-backed insight into weather risk
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className="backdrop-blur-xl bg-white/60 border border-white/20 rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-white/80">
                  <div className="flex justify-center mb-6">
                    <div className={`p-3 bg-gradient-to-r ${feature.gradient} rounded-2xl text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      {React.cloneElement(feature.icon, { className: "h-8 w-8" })}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revolutionary CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready for the Future?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Experience revolutionary weather risk assessment powered by decades of NASA data
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/vacation"
                className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center justify-center">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                to="/about"
                className="group px-10 py-4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-white/20"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;