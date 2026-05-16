import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Search, MapPin, CheckCircle, Award, TrendingUp } from 'lucide-react';
import { mockNGOs } from '../data/mockData';
import { TrustScore } from '../components/TrustScore';
import { useState } from 'react';

export function NGOs() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNGOs = mockNGOs.filter(ngo =>
    ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ngo.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl mb-4">Verified NGO Partners</h1>
            <p className="text-xl text-gray-600">
              Trusted rescue organizations working to save and rehome pets
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-md mb-8"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search NGOs by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredNGOs.length} organization{filteredNGOs.length !== 1 ? 's' : ''}
          </div>
        </motion.div>

        {/* NGO Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNGOs.map((ngo, index) => (
            <motion.div
              key={ngo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={ngo.image}
                  alt={ngo.name}
                  className="w-full h-full object-cover"
                />
                {ngo.verified && (
                  <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                    <CheckCircle size={16} />
                    Verified
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <TrustScore score={ngo.trustScore} size="small" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl mb-2">{ngo.name}</h3>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <MapPin size={14} />
                  <span>{ngo.location}</span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">{ngo.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-lg text-rose-500">{ngo.totalAdoptions}</div>
                    <div className="text-xs text-gray-600">Total Adoptions</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-lg text-blue-500">{ngo.activePets}</div>
                    <div className="text-xs text-gray-600">Active Pets</div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award size={16} className="text-yellow-500" />
                    <span className="text-sm">Certifications:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ngo.certifications.slice(0, 2).map((cert, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-yellow-50 text-yellow-700 rounded-full">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Success Rate */}
                <div className="flex items-center gap-2 mb-4 text-sm text-green-600">
                  <TrendingUp size={16} />
                  <span>{ngo.successRate}% Success Rate</span>
                </div>

                <Link
                  to={`/ngo/${ngo.id}`}
                  className="block w-full text-center py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors"
                >
                  View Profile
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
