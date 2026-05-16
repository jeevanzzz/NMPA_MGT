import { motion } from 'motion/react';
import { User, Heart, FileText, Settings } from 'lucide-react';
import { Link } from 'react-router';
import { mockUser, mockPets } from '../data/mockData';

export function Profile() {
  const user = mockUser;
  const favoritePets = mockPets.filter(pet => user.favorites.includes(pet.id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl mb-2">My Profile</h1>
            <p className="text-xl text-gray-600">Manage your account and adoption journey</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-4">
                  {user.name.charAt(0)}
                </div>
                <h2 className="text-2xl mb-1">{user.name}</h2>
                <p className="text-gray-600 text-sm mb-4">{user.email}</p>
                <button className="text-rose-500 hover:underline text-sm">Edit Profile</button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-md p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Favorites</span>
                <span className="text-2xl text-rose-500">{user.favorites.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Applications</span>
                <span className="text-2xl text-blue-500">{user.applications.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Donations</span>
                <span className="text-2xl text-green-500">${user.donations}</span>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6 space-y-2"
            >
              <h3 className="text-lg mb-4">Quick Actions</h3>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3">
                <User size={18} className="text-gray-400" />
                <span>Edit Profile</span>
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3">
                <Settings size={18} className="text-gray-400" />
                <span>Settings</span>
              </button>
              <Link
                to="/donate"
                className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3"
              >
                <Heart size={18} className="text-gray-400" />
                <span>Make a Donation</span>
              </Link>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Name</label>
                  <input
                    type="text"
                    value={user.name}
                    readOnly
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={user.phone}
                    readOnly
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Location</label>
                  <input
                    type="text"
                    value={user.location}
                    readOnly
                    className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                  />
                </div>
              </div>
            </motion.div>

            {/* Favorites */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl">My Favorites</h2>
                <Heart className="text-rose-500 fill-rose-500" size={24} />
              </div>

              {favoritePets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favoritePets.map((pet) => (
                    <Link
                      key={pet.id}
                      to={`/pet/${pet.id}`}
                      className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <img
                        src={pet.image}
                        alt={pet.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-lg mb-1">{pet.name}</h3>
                        <p className="text-sm text-gray-600">{pet.breed}</p>
                        <p className="text-sm text-rose-500">${pet.adoptionFee}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Heart size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No favorites yet. Start exploring pets!</p>
                  <Link to="/adopt" className="text-rose-500 hover:underline mt-2 inline-block">
                    Browse Pets
                  </Link>
                </div>
              )}
            </motion.div>

            {/* Applications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl">My Applications</h2>
                <FileText size={24} className="text-blue-500" />
              </div>

              <div className="space-y-4">
                {user.applications.map((appId) => {
                  const pet = mockPets.find(p => p.id === appId);
                  if (!pet) return null;
                  
                  return (
                    <div key={appId} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg">{pet.name}</h3>
                          <p className="text-sm text-gray-600">Applied on April 5, 2026</p>
                        </div>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                          Pending Review
                        </span>
                      </div>
                      <Link
                        to={`/pet/${pet.id}`}
                        className="text-rose-500 hover:underline text-sm"
                      >
                        View Pet Details →
                      </Link>
                    </div>
                  );
                })}

                {user.applications.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>No applications yet.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
