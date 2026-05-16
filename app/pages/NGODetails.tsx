import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Phone, Mail, Globe, Award, CheckCircle, TrendingUp } from 'lucide-react';
import { mockNGOs, mockPets } from '../data/mockData';
import { TrustScore } from '../components/TrustScore';

export function NGODetails() {
  const { id } = useParams();
  const ngo = mockNGOs.find(n => n.id === Number(id));
  const ngoPets = mockPets.filter(pet => pet.ngoId === Number(id));

  if (!ngo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Organization not found</h2>
          <Link to="/ngos" className="text-rose-500 hover:underline">
            Back to NGOs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link to="/ngos" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft size={20} />
            Back to NGOs
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <div className="flex items-start gap-6 mb-6">
                <img
                  src={ngo.image}
                  alt={ngo.name}
                  className="w-32 h-32 rounded-lg object-cover shadow-md"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-4xl">{ngo.name}</h1>
                    {ngo.verified && (
                      <CheckCircle className="text-blue-500" size={28} />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <MapPin size={18} />
                    <span>{ngo.location}</span>
                  </div>
                  <TrustScore score={ngo.trustScore} size="large" showDetails />
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {ngo.description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-3xl text-rose-500 mb-1">{ngo.totalAdoptions}</div>
                  <div className="text-sm text-gray-600">Total Adoptions</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-3xl text-blue-500 mb-1">{ngo.activePets}</div>
                  <div className="text-sm text-gray-600">Active Pets</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-3xl text-green-500 mb-1">{ngo.successRate}%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-3xl text-purple-500 mb-1">{new Date().getFullYear() - ngo.established}</div>
                  <div className="text-sm text-gray-600">Years Active</div>
                </div>
              </div>
            </motion.div>

            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-24"
            >
              <h3 className="text-xl mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone size={20} className="text-gray-400 mt-1" />
                  <div>
                    <div className="text-sm text-gray-600">Phone</div>
                    <div>{ngo.contactPhone}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={20} className="text-gray-400 mt-1" />
                  <div>
                    <div className="text-sm text-gray-600">Email</div>
                    <div className="break-all">{ngo.contactEmail}</div>
                  </div>
                </div>
                {ngo.website && (
                  <div className="flex items-start gap-3">
                    <Globe size={20} className="text-gray-400 mt-1" />
                    <div>
                      <div className="text-sm text-gray-600">Website</div>
                      <div className="text-blue-500">{ngo.website}</div>
                    </div>
                  </div>
                )}
              </div>

              <button className="w-full mt-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors">
                Contact Organization
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-yellow-500" size={24} />
            <h2 className="text-2xl">Certifications & Credentials</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {ngo.certifications.map((cert, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg flex items-center gap-2"
              >
                <CheckCircle size={16} />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trust Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h2 className="text-2xl mb-6">Trust Metrics Breakdown</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Verification Status</span>
                <span className="text-green-600">100%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Success Rate</span>
                <span className="text-blue-600">{ngo.successRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${ngo.successRate}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Community Reviews</span>
                <span className="text-purple-600">4.8/5.0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-purple-500 h-3 rounded-full" style={{ width: '96%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Transparency Score</span>
                <span className="text-orange-600">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-orange-500 h-3 rounded-full" style={{ width: '92%' }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Available Pets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h2 className="text-2xl mb-6">Available Pets from {ngo.name}</h2>
          {ngoPets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ngoPets.map((pet) => (
                <Link
                  key={pet.id}
                  to={`/pet/${pet.id}`}
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl mb-2">{pet.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{pet.breed}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-rose-500">${pet.adoptionFee}</span>
                      <TrustScore score={pet.trustScore} size="small" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No pets currently available</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
