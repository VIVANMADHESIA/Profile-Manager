import React, { useState, useEffect } from 'react';

interface Profile {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

const profiles: Profile[] = [
  {
    id: 1,
    name: "Vikas",
    description: "Lead Software Engineer",
    latitude: 28.6139,
    longitude: 77.2090
  },
  {
    id: 2,
    name: "John Doe",
    description: "Software Developer",
    latitude: 37.7749,
    longitude: -122.4194
  },
  {
    id: 3,
    name: "Jane Smith",
    description: "UX Designer",
    latitude: 40.7128,
    longitude: -74.0060
  },
  {
    id: 4,
    name: "Bob Johnson",
    description: "Data Analyst",
    latitude: 51.5074,
    longitude: -0.1278
  },
  {
    id: 5,
    name: "Alice Williams",
    description: "Product Manager",
    latitude: 48.8566,
    longitude: 2.3522
  },
  {
    id: 6,
    name: "Charlie Brown",
    description: "Marketing Specialist",
    latitude: 35.6762,
    longitude: 139.6503
  },
  {
    id: 7,
    name: "Diana Lee",
    description: "Frontend Developer",
    latitude: 1.3521,
    longitude: 103.8198
  },
  {
    id: 8,
    name: "Ethan Hunt",
    description: "DevOps Engineer",
    latitude: 52.5200,
    longitude: 13.4050
  },
  {
    id: 9,
    name: "Fiona Green",
    description: "AI Researcher",
    latitude: -33.8688,
    longitude: 151.2093
  },
  {
    id: 10,
    name: "George Taylor",
    description: "Blockchain Developer",
    latitude: 55.7558,
    longitude: 37.6173
  },
  {
    id: 11,
    name: "Hannah Martinez",
    description: "Cybersecurity Analyst",
    latitude: 19.4326,
    longitude: -99.1332
  },
  {
    id: 12,
    name: "Ian Foster",
    description: "Cloud Architect",
    latitude: -37.8136,
    longitude: 144.9631
  },
  {
    id: 13,
    name: "Julia Chang",
    description: "Mobile App Developer",
    latitude: 25.0330,
    longitude: 121.5654
  }
];

const WorldMap: React.FC<{ latitude: number; longitude: number }> = ({ latitude, longitude }) => {
  const mapWidth = 360;
  const mapHeight = 180;
  const dotSize = 5;

  const x = ((longitude + 180) / 360) * mapWidth;
  const y = ((90 - latitude) / 180) * mapHeight;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${mapWidth} ${mapHeight}`} className="bg-blue-100 rounded">
      <rect x="0" y="0" width={mapWidth} height={mapHeight} fill="#A5D6A7" />
      
      {/* Simple continent outlines */}
      <path d="M58 27 L75 45 L95 45 L120 60 L160 70 L180 50 L220 50 L250 70 L300 80 L330 60" stroke="#2E7D32" fill="none" strokeWidth="2"/>
      <path d="M170 100 L200 120 L220 140 L260 150 L300 130" stroke="#2E7D32" fill="none" strokeWidth="2"/>
      <path d="M20 70 L60 90 L80 120 L100 130" stroke="#2E7D32" fill="none" strokeWidth="2"/>
      
      {/* Location marker */}
      <circle cx={x} cy={y} r={dotSize} fill="red" />
      <circle cx={x} cy={y} r={dotSize * 2} fill="red" fillOpacity="0.3" />
    </svg>
  );
};

const SimpleProfileMapper: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate map loading delay
    const timer = setTimeout(() => setIsMapLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, [selectedProfile]);

  return (
    <div className="profile-mapper p-4 min-h-screen bg-gradient-to-br from-[#FFE53B] to-[#00FFFF]">
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Brevis' }}>Profile Mapper</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="profile-list overflow-y-auto max-h-[calc(100vh-100px)]">
          <h2 className="text-2xl font-semibold mb-4">Profiles</h2>
          {profiles.map(profile => (
            <div key={profile.id} className="profile-card p-4 border rounded mb-4 shadow-sm hover:shadow-md transition-shadow bg-white bg-opacity-80">
              <h3 className="font-bold text-lg" style={{ fontFamily: 'INTRO' }}>
                <button
                  onClick={() => {
                    setSelectedProfile(profile);
                    setIsMapLoaded(false);
                  }}
                  className="text-left hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 -ml-2"
                >
                  {profile.name}
                </button>
              </h3>
              <p className="text-gray-700 mb-2" style={{ fontFamily: 'AUGE', color: '#ccccff' }}>{profile.description}</p>
            </div>
          ))}
        </div>
        <div className="map-container sticky top-4">
          <h2 className="text-2xl font-semibold mb-4">Map</h2>
          <div className="fake-map bg-white bg-opacity-80 p-6 rounded shadow-inner min-h-[400px]">
            {selectedProfile ? (
              <div>
                <h3 className="font-bold text-xl mb-2" style={{ fontFamily: 'INTRO' }}>{selectedProfile.name}</h3>
                <p className="mb-1" style={{ fontFamily: 'AUGE', color: '#ccccff' }}><span className="font-semibold">Role:</span> {selectedProfile.description}</p>
                <p className="mb-1"><span className="font-semibold">Latitude:</span> {selectedProfile.latitude.toFixed(4)}</p>
                <p className="mb-1"><span className="font-semibold">Longitude:</span> {selectedProfile.longitude.toFixed(4)}</p>
                <div className="mt-4 h-64 relative">
                  {!isMapLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                  <WorldMap latitude={selectedProfile.latitude} longitude={selectedProfile.longitude} />
                </div>
              </div>
            ) : (
              <p className="text-gray-600 italic">Select a profile to see its location</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleProfileMapper;
