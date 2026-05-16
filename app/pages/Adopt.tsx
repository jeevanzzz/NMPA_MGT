import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Search, Filter, Heart, Dog, Cat, MapPin } from 'lucide-react';
import { mockPets } from '../data/mockData';
import { TrustScore } from '../components/TrustScore';

export function Adopt() {
  const [searchQuery, setSearchQuery] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState<'all' | 'dog' | 'cat'>('all');
  const [sizeFilter, setSizeFilter] = useState<'all' | 'small' | 'medium' | 'large'>('all');
  const [favorites, setFavorites] = useState<number[]>([1, 3]);

  const filteredPets = mockPets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pet.breed.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecies = speciesFilter === 'all' || pet.species === speciesFilter;
    const matchesSize = sizeFilter === 'all' || pet.size === sizeFilter;
    
    return matchesSearch && matchesSpecies && matchesSize;
  });

  const toggleFavorite = (petId: number) => {
    setFavorites(prev =>
      prev.includes(petId) ? prev.filter(id => id !== petId) : [...prev, petId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl mb-4">Adopt a Pet</h1>
            <p className="text-xl text-gray-600">Find your perfect companion from our verified rescue partners</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-md mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or breed..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            {/* Species Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setSpeciesFilter('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  speciesFilter === 'all'
                    ? 'bg-rose-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSpeciesFilter('dog')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  speciesFilter === 'dog'
                    ? 'bg-rose-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <Dog size={18} /> Dogs
              </button>
              <button
                onClick={() => setSpeciesFilter('cat')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  speciesFilter === 'cat'
                    ? 'bg-rose-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <Cat size={18} /> Cats
              </button>
            </div>

            {/* Size Filter */}
            <select
              value={sizeFilter}
              onChange={(e) => setSizeFilter(e.target.value as any)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="all">All Sizes</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredPets.length} pet{filteredPets.length !== 1 ? 's' : ''}
          </div>
        </motion.div>

        {/* Pet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map((pet, index) => (
            <motion.div
              key={pet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(pet.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Heart
                    size={20}
                    className={favorites.includes(pet.id) ? 'fill-rose-500 text-rose-500' : 'text-gray-600'}
                  />
                </button>

                {/* Trust Score Badge */}
                <div className="absolute top-4 left-4">
                  <TrustScore score={pet.trustScore} size="small" />
                </div>

                {/* Species Badge */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                  {pet.species === 'dog' ? <Dog size={16} /> : <Cat size={16} />}
                  <span className="text-sm">{pet.breed}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl">{pet.name}</h3>
                  <span className="text-gray-600">{pet.age} {pet.age === 1 ? 'year' : 'years'}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <MapPin size={14} />
                  <span>{pet.location}</span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{pet.description}</p>

                <div className="flex gap-2 flex-wrap mb-4">
                  {pet.personality.map((trait, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                      {trait}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex gap-4">
                    {pet.vaccinated && <span className="text-green-600">✓ Vaccinated</span>}
                    {pet.neutered && <span className="text-green-600">✓ Neutered</span>}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl text-rose-500">${pet.adoptionFee}</span>
                  <Link
                    to={`/pet/${pet.id}`}
                    className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPets.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No pets found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSpeciesFilter('all');
                setSizeFilter('all');
              }}
              className="mt-4 px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
