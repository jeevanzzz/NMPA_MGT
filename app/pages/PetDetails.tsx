import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Calendar, Heart, CheckCircle, AlertCircle, Phone, Mail, Share2 } from 'lucide-react';
import { mockPets, mockNGOs } from '../data/mockData';
import { TrustScore } from '../components/TrustScore';
import { useState } from 'react';

export function PetDetails() {
  const { id } = useParams();
  const pet = mockPets.find(p => p.id === Number(id));
  const ngo = pet ? mockNGOs.find(n => n.id === pet.ngoId) : null;
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    reason: ''
  });

  if (!pet || !ngo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Pet not found</h2>
          <Link to="/adopt" className="text-rose-500 hover:underline">
            Back to adoption page
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Application submitted successfully! The NGO will contact you soon.');
    setShowApplicationForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link to="/adopt" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft size={20} />
            Back to Adopt
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-96 object-cover"
              />
            </motion.div>

            {/* Basic Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl mb-2">{pet.name}</h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={18} />
                    <span>{pet.location}</span>
                  </div>
                </div>
                <TrustScore score={pet.trustScore} size="large" showDetails />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1">{pet.age}</div>
                  <div className="text-sm text-gray-600">Years Old</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1 capitalize">{pet.gender}</div>
                  <div className="text-sm text-gray-600">Gender</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1 capitalize">{pet.size}</div>
                  <div className="text-sm text-gray-600">Size</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1">{pet.breed}</div>
                  <div className="text-sm text-gray-600">Breed</div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl mb-4">About {pet.name}</h3>
                <p className="text-gray-700 leading-relaxed">{pet.description}</p>
              </div>
            </motion.div>

            {/* Personality & Health */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl mb-4">Personality Traits</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {pet.personality.map((trait, i) => (
                  <span key={i} className="px-4 py-2 bg-rose-100 text-rose-700 rounded-full">
                    {trait}
                  </span>
                ))}
              </div>

              <h3 className="text-xl mb-4">Health Status</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span>Health Status: <strong>{pet.healthStatus}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  {pet.vaccinated ? (
                    <>
                      <CheckCircle className="text-green-500" size={20} />
                      <span>Fully Vaccinated</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="text-yellow-500" size={20} />
                      <span>Vaccination Pending</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {pet.neutered ? (
                    <>
                      <CheckCircle className="text-green-500" size={20} />
                      <span>Spayed/Neutered</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="text-yellow-500" size={20} />
                      <span>Not Spayed/Neutered</span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* NGO Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl mb-4">Rescue Organization</h3>
              <div className="flex items-start gap-4">
                <img
                  src={ngo.image}
                  alt={ngo.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-lg">{ngo.name}</h4>
                    {ngo.verified && (
                      <CheckCircle className="text-blue-500" size={18} />
                    )}
                  </div>
                  <TrustScore score={ngo.trustScore} size="small" />
                  <p className="text-gray-600 mt-2 text-sm line-clamp-2">{ngo.description}</p>
                  <Link
                    to={`/ngo/${ngo.id}`}
                    className="text-rose-500 hover:underline text-sm mt-2 inline-block"
                  >
                    View Organization Profile →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Adoption Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-md p-6 sticky top-24"
            >
              <div className="text-center mb-6">
                <div className="text-3xl text-rose-500 mb-2">${pet.adoptionFee}</div>
                <div className="text-sm text-gray-600">Adoption Fee</div>
              </div>

              {!showApplicationForm ? (
                <button
                  onClick={() => setShowApplicationForm(true)}
                  className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors mb-3 flex items-center justify-center gap-2"
                >
                  <Heart size={20} />
                  Apply to Adopt
                </button>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg mb-4">Adoption Application</h3>
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <textarea
                    placeholder="Tell us why you want to adopt..."
                    required
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowApplicationForm(false)}
                    className="w-full py-2 text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                </form>
              )}

              <button className="w-full py-3 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Share2 size={18} />
                Share
              </button>

              <div className="mt-6 pt-6 border-t space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={18} className="text-gray-400" />
                  <span>{ngo.contactPhone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={18} className="text-gray-400" />
                  <span className="break-all">{ngo.contactEmail}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
