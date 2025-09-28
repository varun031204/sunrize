import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Globe, Rocket, Satellite, Zap } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: "contact@nasaweatherpredict.com",
      link: "mailto:contact@nasaweatherpredict.com"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      details: "NASA Space Apps Challenge 2024",
      link: "#"
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="h-6 w-6" />,
      name: "GitHub",
      url: "https://github.com/nasaweatherpredict"
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      name: "LinkedIn",
      url: "https://linkedin.com/company/nasaweatherpredict"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      name: "Website",
      url: "https://nasaweatherpredict.com"
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* NASA Mission Control Header */}
        <div className="relative text-center mb-16">
          <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/10 via-green-500/10 to-yellow-500/10 border border-white/20 rounded-3xl p-12 shadow-2xl">
            <div className="flex items-center justify-center mb-6">
              <Satellite className="w-12 h-12 text-blue-400 mr-4 animate-pulse" />
              <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-200 via-green-200 to-yellow-200 bg-clip-text text-transparent">
                Mission Control
              </h1>
              <Rocket className="w-12 h-12 text-orange-400 ml-4 animate-pulse" />
            </div>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ground Control to Major Tom: Connect with our NASA mission team for weather intelligence support
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Mission Communication Form */}
          <div className="backdrop-blur-xl bg-white/60 border border-white/30 rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <Zap className="w-8 h-8 text-yellow-500 mr-3" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-green-900 bg-clip-text text-transparent">
                Transmit Message
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nasa-blue focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nasa-blue focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nasa-blue focus:border-transparent"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nasa-blue focus:border-transparent"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 via-green-600 to-yellow-600 hover:from-blue-700 hover:via-green-700 hover:to-yellow-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <Rocket className="h-5 w-5 mr-2" />
                Launch Transmission
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Mission Control Center */}
            <div className="backdrop-blur-xl bg-white/60 border border-white/30 rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <Satellite className="w-8 h-8 text-blue-500 mr-3" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-green-900 bg-clip-text text-transparent">
                  Ground Control
                </h2>
              </div>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`p-3 rounded-2xl text-white shadow-lg ${
                      index === 0 ? 'bg-gradient-to-r from-blue-500 to-green-500' :
                      index === 1 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                      'bg-gradient-to-r from-red-500 to-orange-500'
                    }`}>
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      {info.link !== "#" ? (
                        <a
                          href={info.link}
                          className="text-nasa-blue hover:text-blue-800 transition-colors"
                        >
                          {info.details}
                        </a>
                      ) : (
                        <p className="text-gray-600">{info.details}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission Network */}
            <div className="backdrop-blur-xl bg-white/60 border border-white/30 rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <Globe className="w-8 h-8 text-green-500 mr-3" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-900 to-blue-900 bg-clip-text text-transparent">
                  Mission Network
                </h2>
              </div>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-nasa-blue hover:text-white text-gray-600 p-3 rounded-lg transition-colors"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Mission Briefing */}
            <div className="backdrop-blur-xl bg-gradient-to-r from-blue-900/80 via-green-900/80 to-yellow-900/80 border border-white/20 text-white rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center mb-4">
                <Rocket className="w-8 h-8 text-orange-400 mr-3" />
                <h2 className="text-2xl font-bold">
                  NASA Space Apps Challenge 2024
                </h2>
              </div>
              <p className="text-white/90 mb-6">
                SUNRIZE mission: Demonstrating the power of NASA Earth observation satellites in 
                strategic weather risk assessment for long-term event planning.
              </p>
              <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-4">
                <div className="flex items-center mb-2">
                  <Satellite className="w-5 h-5 text-blue-300 mr-2" />
                  <h3 className="font-bold">Mission Objective:</h3>
                </div>
                <p className="text-white/90">"Will It Rain On My Parade?" - Strategic Weather Intelligence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;