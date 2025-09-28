"""
Comprehensive Southern Asian Cities Database
Coverage: India, Pakistan, Bangladesh, Sri Lanka, Nepal, Bhutan, Maldives, Afghanistan
"""

SOUTHERN_ASIA_CITIES = [
    # India - Major Cities
    {"name": "Mumbai", "state": "Maharashtra", "country": "India", "lat": 19.0760, "lon": 72.8777, "population": 12442373},
    {"name": "Delhi", "state": "Delhi", "country": "India", "lat": 28.7041, "lon": 77.1025, "population": 11034555},
    {"name": "Bangalore", "state": "Karnataka", "country": "India", "lat": 12.9716, "lon": 77.5946, "population": 8443675},
    {"name": "Hyderabad", "state": "Telangana", "country": "India", "lat": 17.3850, "lon": 78.4867, "population": 6809970},
    {"name": "Ahmedabad", "state": "Gujarat", "country": "India", "lat": 23.0225, "lon": 72.5714, "population": 5633927},
    {"name": "Chennai", "state": "Tamil Nadu", "country": "India", "lat": 13.0827, "lon": 80.2707, "population": 4681087},
    {"name": "Kolkata", "state": "West Bengal", "country": "India", "lat": 22.5726, "lon": 88.3639, "population": 4496694},
    {"name": "Surat", "state": "Gujarat", "country": "India", "lat": 21.1702, "lon": 72.8311, "population": 4467797},
    {"name": "Pune", "state": "Maharashtra", "country": "India", "lat": 18.5204, "lon": 73.8567, "population": 3124458},
    {"name": "Jaipur", "state": "Rajasthan", "country": "India", "lat": 26.9124, "lon": 75.7873, "population": 3046163},
    {"name": "Lucknow", "state": "Uttar Pradesh", "country": "India", "lat": 26.8467, "lon": 80.9462, "population": 2817105},
    {"name": "Kanpur", "state": "Uttar Pradesh", "country": "India", "lat": 26.4499, "lon": 80.3319, "population": 2767031},
    {"name": "Nagpur", "state": "Maharashtra", "country": "India", "lat": 21.1458, "lon": 79.0882, "population": 2405421},
    {"name": "Indore", "state": "Madhya Pradesh", "country": "India", "lat": 22.7196, "lon": 75.8577, "population": 1994397},
    {"name": "Thane", "state": "Maharashtra", "country": "India", "lat": 19.2183, "lon": 72.9781, "population": 1818872},
    {"name": "Bhopal", "state": "Madhya Pradesh", "country": "India", "lat": 23.2599, "lon": 77.4126, "population": 1798218},
    {"name": "Visakhapatnam", "state": "Andhra Pradesh", "country": "India", "lat": 17.6868, "lon": 83.2185, "population": 1730320},
    {"name": "Pimpri-Chinchwad", "state": "Maharashtra", "country": "India", "lat": 18.6298, "lon": 73.7997, "population": 1729359},
    {"name": "Patna", "state": "Bihar", "country": "India", "lat": 25.5941, "lon": 85.1376, "population": 1684222},
    {"name": "Vadodara", "state": "Gujarat", "country": "India", "lat": 22.3072, "lon": 73.1812, "population": 1666703},
    {"name": "Ludhiana", "state": "Punjab", "country": "India", "lat": 30.9010, "lon": 75.8573, "population": 1618879},
    {"name": "Agra", "state": "Uttar Pradesh", "country": "India", "lat": 27.1767, "lon": 78.0081, "population": 1585704},
    {"name": "Nashik", "state": "Maharashtra", "country": "India", "lat": 19.9975, "lon": 73.7898, "population": 1486973},
    {"name": "Faridabad", "state": "Haryana", "country": "India", "lat": 28.4089, "lon": 77.3178, "population": 1414050},
    {"name": "Meerut", "state": "Uttar Pradesh", "country": "India", "lat": 28.9845, "lon": 77.7064, "population": 1305429},
    {"name": "Rajkot", "state": "Gujarat", "country": "India", "lat": 22.3039, "lon": 70.8022, "population": 1286995},
    {"name": "Kalyan-Dombivli", "state": "Maharashtra", "country": "India", "lat": 19.2403, "lon": 73.1305, "population": 1246381},
    {"name": "Vasai-Virar", "state": "Maharashtra", "country": "India", "lat": 19.4912, "lon": 72.8054, "population": 1221233},
    {"name": "Varanasi", "state": "Uttar Pradesh", "country": "India", "lat": 25.3176, "lon": 82.9739, "population": 1201815},
    {"name": "Srinagar", "state": "Jammu and Kashmir", "country": "India", "lat": 34.0837, "lon": 74.7973, "population": 1180570},
    {"name": "Aurangabad", "state": "Maharashtra", "country": "India", "lat": 19.8762, "lon": 75.3433, "population": 1175116},
    {"name": "Dhanbad", "state": "Jharkhand", "country": "India", "lat": 23.7957, "lon": 86.4304, "population": 1162472},
    {"name": "Amritsar", "state": "Punjab", "country": "India", "lat": 31.6340, "lon": 74.8723, "population": 1132761},
    {"name": "Navi Mumbai", "state": "Maharashtra", "country": "India", "lat": 19.0330, "lon": 73.0297, "population": 1119477},
    {"name": "Allahabad", "state": "Uttar Pradesh", "country": "India", "lat": 25.4358, "lon": 81.8463, "population": 1117094},
    {"name": "Ranchi", "state": "Jharkhand", "country": "India", "lat": 23.3441, "lon": 85.3096, "population": 1073440},
    {"name": "Howrah", "state": "West Bengal", "country": "India", "lat": 22.5958, "lon": 88.2636, "population": 1072161},
    {"name": "Coimbatore", "state": "Tamil Nadu", "country": "India", "lat": 11.0168, "lon": 76.9558, "population": 1061447},
    {"name": "Jabalpur", "state": "Madhya Pradesh", "country": "India", "lat": 23.1815, "lon": 79.9864, "population": 1055525},
    {"name": "Gwalior", "state": "Madhya Pradesh", "country": "India", "lat": 26.2183, "lon": 78.1828, "population": 1054420},
    {"name": "Vijayawada", "state": "Andhra Pradesh", "country": "India", "lat": 16.5062, "lon": 80.6480, "population": 1048240},
    {"name": "Jodhpur", "state": "Rajasthan", "country": "India", "lat": 26.2389, "lon": 73.0243, "population": 1033756},
    {"name": "Madurai", "state": "Tamil Nadu", "country": "India", "lat": 9.9252, "lon": 78.1198, "population": 1016885},
    {"name": "Raipur", "state": "Chhattisgarh", "country": "India", "lat": 21.2514, "lon": 81.6296, "population": 1010087},
    {"name": "Kota", "state": "Rajasthan", "country": "India", "lat": 25.2138, "lon": 75.8648, "population": 1001365},
    
    # Pakistan - Major Cities
    {"name": "Karachi", "state": "Sindh", "country": "Pakistan", "lat": 24.8607, "lon": 67.0011, "population": 14910352},
    {"name": "Lahore", "state": "Punjab", "country": "Pakistan", "lat": 31.5204, "lon": 74.3587, "population": 11126285},
    {"name": "Faisalabad", "state": "Punjab", "country": "Pakistan", "lat": 31.4504, "lon": 73.1350, "population": 3203846},
    {"name": "Rawalpindi", "state": "Punjab", "country": "Pakistan", "lat": 33.5651, "lon": 73.0169, "population": 2098231},
    {"name": "Gujranwala", "state": "Punjab", "country": "Pakistan", "lat": 32.1877, "lon": 74.1945, "population": 2027001},
    {"name": "Peshawar", "state": "Khyber Pakhtunkhwa", "country": "Pakistan", "lat": 34.0151, "lon": 71.5249, "population": 1970042},
    {"name": "Multan", "state": "Punjab", "country": "Pakistan", "lat": 30.1575, "lon": 71.5249, "population": 1871843},
    {"name": "Hyderabad", "state": "Sindh", "country": "Pakistan", "lat": 25.3960, "lon": 68.3578, "population": 1734309},
    {"name": "Islamabad", "state": "Islamabad Capital Territory", "country": "Pakistan", "lat": 33.6844, "lon": 73.0479, "population": 1014825},
    {"name": "Quetta", "state": "Balochistan", "country": "Pakistan", "lat": 30.1798, "lon": 66.9750, "population": 1001205},
    {"name": "Bahawalpur", "state": "Punjab", "country": "Pakistan", "lat": 29.4000, "lon": 71.6833, "population": 762111},
    {"name": "Sargodha", "state": "Punjab", "country": "Pakistan", "lat": 32.0836, "lon": 72.6711, "population": 659862},
    {"name": "Sialkot", "state": "Punjab", "country": "Pakistan", "lat": 32.4945, "lon": 74.5229, "population": 655852},
    {"name": "Sukkur", "state": "Sindh", "country": "Pakistan", "lat": 27.7058, "lon": 68.8574, "population": 499900},
    {"name": "Larkana", "state": "Sindh", "country": "Pakistan", "lat": 27.5590, "lon": 68.2123, "population": 490508},
    
    # Bangladesh - Major Cities
    {"name": "Dhaka", "state": "Dhaka Division", "country": "Bangladesh", "lat": 23.8103, "lon": 90.4125, "population": 9540000},
    {"name": "Chittagong", "state": "Chittagong Division", "country": "Bangladesh", "lat": 22.3569, "lon": 91.7832, "population": 2592439},
    {"name": "Khulna", "state": "Khulna Division", "country": "Bangladesh", "lat": 22.8456, "lon": 89.5403, "population": 1022000},
    {"name": "Rajshahi", "state": "Rajshahi Division", "country": "Bangladesh", "lat": 24.3745, "lon": 88.6042, "population": 763952},
    {"name": "Sylhet", "state": "Sylhet Division", "country": "Bangladesh", "lat": 24.8949, "lon": 91.8687, "population": 526412},
    {"name": "Rangpur", "state": "Rangpur Division", "country": "Bangladesh", "lat": 25.7439, "lon": 89.2752, "population": 343122},
    {"name": "Barisal", "state": "Barisal Division", "country": "Bangladesh", "lat": 22.7010, "lon": 90.3535, "population": 328278},
    {"name": "Comilla", "state": "Chittagong Division", "country": "Bangladesh", "lat": 23.4607, "lon": 91.1809, "population": 326386},
    {"name": "Mymensingh", "state": "Mymensingh Division", "country": "Bangladesh", "lat": 24.7471, "lon": 90.4203, "population": 258040},
    {"name": "Gazipur", "state": "Dhaka Division", "country": "Bangladesh", "lat": 23.9999, "lon": 90.4203, "population": 1777429},
    
    # Sri Lanka - Major Cities
    {"name": "Colombo", "state": "Western Province", "country": "Sri Lanka", "lat": 6.9271, "lon": 79.8612, "population": 752993},
    {"name": "Dehiwala-Mount Lavinia", "state": "Western Province", "country": "Sri Lanka", "lat": 6.8344, "lon": 79.8428, "population": 245974},
    {"name": "Moratuwa", "state": "Western Province", "country": "Sri Lanka", "lat": 6.7730, "lon": 79.8816, "population": 207755},
    {"name": "Negombo", "state": "Western Province", "country": "Sri Lanka", "lat": 7.2083, "lon": 79.8358, "population": 142136},
    {"name": "Kandy", "state": "Central Province", "country": "Sri Lanka", "lat": 7.2906, "lon": 80.6337, "population": 125351},
    {"name": "Kalmunai", "state": "Eastern Province", "country": "Sri Lanka", "lat": 7.4098, "lon": 81.8344, "population": 106783},
    {"name": "Vavuniya", "state": "Northern Province", "country": "Sri Lanka", "lat": 8.7514, "lon": 80.4971, "population": 99653},
    {"name": "Galle", "state": "Southern Province", "country": "Sri Lanka", "lat": 6.0535, "lon": 80.2210, "population": 99478},
    {"name": "Trincomalee", "state": "Eastern Province", "country": "Sri Lanka", "lat": 8.5874, "lon": 81.2152, "population": 99135},
    {"name": "Batticaloa", "state": "Eastern Province", "country": "Sri Lanka", "lat": 7.7102, "lon": 81.6924, "population": 95489},
    
    # Nepal - Major Cities
    {"name": "Kathmandu", "state": "Bagmati Province", "country": "Nepal", "lat": 27.7172, "lon": 85.3240, "population": 1003285},
    {"name": "Pokhara", "state": "Gandaki Province", "country": "Nepal", "lat": 28.2096, "lon": 83.9856, "population": 414141},
    {"name": "Lalitpur", "state": "Bagmati Province", "country": "Nepal", "lat": 27.6588, "lon": 85.3247, "population": 284922},
    {"name": "Bharatpur", "state": "Bagmati Province", "country": "Nepal", "lat": 27.6766, "lon": 84.4297, "population": 280502},
    {"name": "Biratnagar", "state": "Province No. 1", "country": "Nepal", "lat": 26.4525, "lon": 87.2718, "population": 244750},
    {"name": "Birgunj", "state": "Province No. 2", "country": "Nepal", "lat": 27.0104, "lon": 84.8803, "population": 240922},
    {"name": "Dharan", "state": "Province No. 1", "country": "Nepal", "lat": 26.8055, "lon": 87.2847, "population": 173096},
    {"name": "Butwal", "state": "Lumbini Province", "country": "Nepal", "lat": 27.7000, "lon": 83.4486, "population": 138742},
    {"name": "Hetauda", "state": "Bagmati Province", "country": "Nepal", "lat": 27.4287, "lon": 85.0326, "population": 152875},
    {"name": "Dhangadhi", "state": "Sudurpashchim Province", "country": "Nepal", "lat": 28.6833, "lon": 80.6167, "population": 147742},
    
    # Bhutan - Major Cities
    {"name": "Thimphu", "state": "Thimphu District", "country": "Bhutan", "lat": 27.4728, "lon": 89.6390, "population": 114551},
    {"name": "Phuntsholing", "state": "Chukha District", "country": "Bhutan", "lat": 26.8500, "lon": 89.3833, "population": 27658},
    {"name": "Punakha", "state": "Punakha District", "country": "Bhutan", "lat": 27.5906, "lon": 89.8853, "population": 6262},
    {"name": "Gelephu", "state": "Sarpang District", "country": "Bhutan", "lat": 26.8667, "lon": 90.4833, "population": 9858},
    
    # Maldives - Major Cities
    {"name": "Male", "state": "Kaafu Atoll", "country": "Maldives", "lat": 4.1755, "lon": 73.5093, "population": 133412},
    {"name": "Addu City", "state": "Seenu Atoll", "country": "Maldives", "lat": -0.6833, "lon": 73.1500, "population": 33506},
    
    # Afghanistan - Major Cities (Southern regions)
    {"name": "Kabul", "state": "Kabul Province", "country": "Afghanistan", "lat": 34.5553, "lon": 69.2075, "population": 4635000},
    {"name": "Kandahar", "state": "Kandahar Province", "country": "Afghanistan", "lat": 31.6180, "lon": 65.7372, "population": 614118},
    {"name": "Herat", "state": "Herat Province", "country": "Afghanistan", "lat": 34.3482, "lon": 62.1997, "population": 574276},
    {"name": "Mazar-i-Sharif", "state": "Balkh Province", "country": "Afghanistan", "lat": 36.7008, "lon": 67.1109, "population": 469247},
    {"name": "Kunduz", "state": "Kunduz Province", "country": "Afghanistan", "lat": 36.7289, "lon": 68.8570, "population": 268893},
    {"name": "Jalalabad", "state": "Nangarhar Province", "country": "Afghanistan", "lat": 34.4415, "lon": 70.4518, "population": 356274},
    
    # Additional Cities for Better Search Coverage
    {"name": "Aligarh", "state": "Uttar Pradesh", "country": "India", "lat": 27.8974, "lon": 78.0880, "population": 874408},
    {"name": "Amravati", "state": "Maharashtra", "country": "India", "lat": 20.9374, "lon": 77.7796, "population": 647057},
    {"name": "Bareilly", "state": "Uttar Pradesh", "country": "India", "lat": 28.3670, "lon": 79.4304, "population": 903668},
    {"name": "Belgaum", "state": "Karnataka", "country": "India", "lat": 15.8497, "lon": 74.4977, "population": 610350},
    {"name": "Bikaner", "state": "Rajasthan", "country": "India", "lat": 28.0229, "lon": 73.3119, "population": 644406},
    {"name": "Chandigarh", "state": "Chandigarh", "country": "India", "lat": 30.7333, "lon": 76.7794, "population": 1055450},
    {"name": "Cuttack", "state": "Odisha", "country": "India", "lat": 20.4625, "lon": 85.8828, "population": 663849},
    {"name": "Dehradun", "state": "Uttarakhand", "country": "India", "lat": 30.3165, "lon": 78.0322, "population": 696694},
    {"name": "Erode", "state": "Tamil Nadu", "country": "India", "lat": 11.3410, "lon": 77.7172, "population": 498129},
    {"name": "Gorakhpur", "state": "Uttar Pradesh", "country": "India", "lat": 26.7606, "lon": 83.3732, "population": 673446},
    {"name": "Guntur", "state": "Andhra Pradesh", "country": "India", "lat": 16.3067, "lon": 80.4365, "population": 743354},
    {"name": "Hubli", "state": "Karnataka", "country": "India", "lat": 15.3647, "lon": 75.1240, "population": 943857},
    {"name": "Jalandhar", "state": "Punjab", "country": "India", "lat": 31.3260, "lon": 75.5762, "population": 873725},
    {"name": "Jammu", "state": "Jammu and Kashmir", "country": "India", "lat": 32.7266, "lon": 74.8570, "population": 651826},
    {"name": "Jamshedpur", "state": "Jharkhand", "country": "India", "lat": 22.8046, "lon": 86.2029, "population": 1337131},
    {"name": "Kochi", "state": "Kerala", "country": "India", "lat": 9.9312, "lon": 76.2673, "population": 677381},
    {"name": "Mangalore", "state": "Karnataka", "country": "India", "lat": 12.9141, "lon": 74.8560, "population": 623841},
    {"name": "Mysore", "state": "Karnataka", "country": "India", "lat": 12.2958, "lon": 76.6394, "population": 920550},
    {"name": "Noida", "state": "Uttar Pradesh", "country": "India", "lat": 28.5355, "lon": 77.3910, "population": 642381},
    {"name": "Salem", "state": "Tamil Nadu", "country": "India", "lat": 11.6643, "lon": 78.1460, "population": 831038},
    {"name": "Shimla", "state": "Himachal Pradesh", "country": "India", "lat": 31.1048, "lon": 77.1734, "population": 169578},
    {"name": "Udaipur", "state": "Rajasthan", "country": "India", "lat": 24.5854, "lon": 73.7125, "population": 451735},
    {"name": "Abbottabad", "state": "Khyber Pakhtunkhwa", "country": "Pakistan", "lat": 34.1463, "lon": 73.2211, "population": 120000},
    {"name": "Gujrat", "state": "Punjab", "country": "Pakistan", "lat": 32.5740, "lon": 74.0728, "population": 390533},
    {"name": "Bogra", "state": "Rajshahi Division", "country": "Bangladesh", "lat": 24.8510, "lon": 89.3697, "population": 350000},
    {"name": "Jessore", "state": "Khulna Division", "country": "Bangladesh", "lat": 23.1697, "lon": 89.2072, "population": 237478},
    {"name": "Anuradhapura", "state": "North Central Province", "country": "Sri Lanka", "lat": 8.3114, "lon": 80.4037, "population": 63208},
    {"name": "Jaffna", "state": "Northern Province", "country": "Sri Lanka", "lat": 9.6615, "lon": 80.0255, "population": 88138},
    {"name": "Bhaktapur", "state": "Bagmati Province", "country": "Nepal", "lat": 27.6710, "lon": 85.4298, "population": 83658},
    {"name": "Janakpur", "state": "Province No. 2", "country": "Nepal", "lat": 26.7288, "lon": 85.9266, "population": 159000}
]

def get_cities_by_country(country=None):
    """Get cities filtered by country"""
    if country:
        return [city for city in SOUTHERN_ASIA_CITIES if city['country'] == country]
    return SOUTHERN_ASIA_CITIES

def get_cities_in_bounds(lat_min=5, lat_max=40, lon_min=60, lon_max=100):
    """Get cities within NASA data coverage bounds"""
    return [city for city in SOUTHERN_ASIA_CITIES 
            if lat_min <= city['lat'] <= lat_max and lon_min <= city['lon'] <= lon_max]

def get_major_cities(min_population=500000):
    """Get cities above population threshold"""
    return [city for city in SOUTHERN_ASIA_CITIES if city['population'] >= min_population]

if __name__ == "__main__":
    print(f"Total Southern Asian cities: {len(SOUTHERN_ASIA_CITIES)}")
    
    for country in ['India', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Nepal', 'Bhutan', 'Maldives', 'Afghanistan']:
        cities = get_cities_by_country(country)
        print(f"{country}: {len(cities)} cities")
    
    in_bounds = get_cities_in_bounds()
    print(f"Cities within NASA data bounds: {len(in_bounds)}")
    
    major = get_major_cities()
    print(f"Major cities (>500k population): {len(major)}")