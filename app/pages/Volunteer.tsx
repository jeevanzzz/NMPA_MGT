import { motion } from 'motion/react';
import { Users, Heart, Calendar, MapPin } from 'lucide-react';
import { useState } from 'react';

export function Volunteer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    interest: '',
    availability: ''
  });

  const opportunities = [
    {
      icon: Heart,
      title: 'Pet Care',
      description: 'Help with feeding, grooming, and socializing our rescue pets',
      commitment: '4-8 hours/week'
    },
    {
      icon: Users,
      title: 'Foster Care',
      description: 'Provide temporary homes for pets awaiting adoption',
      commitment: 'Flexible'
    },
    {
      icon: Calendar,
      title: 'Event Support',
      description: 'Assist with adoption events and fundraising activities',
      commitment: 'Weekends'
    },
    {
      icon: MapPin,
      title: 'Transport',
      description: 'Help transport pets to vet appointments or adoption events',
      commitment: 'As needed'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your interest! We will contact you soon with volunteer opportunities.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Users className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl mb-4">Become a Volunteer</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join our community of passionate volunteers making a difference in pets' lives
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Opportunities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {opportunities.map((opp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <opp.icon className="w-12 h-12 mb-4 text-blue-500" />
              <h3 className="text-xl mb-2">{opp.title}</h3>
              <p className="text-gray-600 mb-3 text-sm">{opp.description}</p>
              <div className="text-sm text-blue-600">
                Time: {opp.commitment}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sign Up Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8"
        >
          <h2 className="text-2xl mb-6">Volunteer Application</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Phone *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Location *</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Area of Interest *</label>
              <select
                required
                value={formData.interest}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select...</option>
                <option value="pet-care">Pet Care</option>
                <option value="foster">Foster Care</option>
                <option value="events">Event Support</option>
                <option value="transport">Transport</option>
                <option value="admin">Administrative</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">Availability *</label>
              <textarea
                required
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                rows={4}
                placeholder="Tell us about your availability..."
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-lg"
            >
              Submit Application
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
