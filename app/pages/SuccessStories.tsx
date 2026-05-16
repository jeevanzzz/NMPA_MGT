import { motion } from 'motion/react';
import { Star, Heart, Calendar } from 'lucide-react';

const successStories = [
  {
    id: 1,
    petName: 'Max',
    adoptedBy: 'Sarah Johnson',
    date: 'March 2026',
    image: 'https://images.unsplash.com/photo-1641349067134-245df2efdc95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHJlc2N1ZSUyMGRvZ3xlbnwxfHx8fDE3NzU2MjQ0MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    story: "Max has transformed our lives! He was shy at first, but now he's the most loving and playful companion. Adopting him was the best decision we ever made.",
    rating: 5
  },
  {
    id: 2,
    petName: 'Luna',
    adoptedBy: 'Michael Chen',
    date: 'February 2026',
    image: 'https://images.unsplash.com/photo-1570117267998-63272030c1c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwcmVzY3VlJTIwY2F0fGVufDF8fHx8MTc3NTYyNDQwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    story: "Luna is the perfect addition to our family. She's gentle, affectionate, and has brought so much joy to our home. The adoption process was smooth and supportive.",
    rating: 5
  },
  {
    id: 3,
    petName: 'Bella',
    adoptedBy: 'Emily Rodriguez',
    date: 'January 2026',
    image: 'https://images.unsplash.com/photo-1637852422069-81efc85e0a79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2d8ZW58MXx8fHwxNzc1NTMyNDE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    story: "Bella is a senior dog, and we couldn't be happier with our choice. She's calm, well-trained, and has fit perfectly into our lifestyle. Age is just a number!",
    rating: 5
  },
  {
    id: 4,
    petName: 'Rocky',
    adoptedBy: 'David & Lisa Martinez',
    date: 'December 2025',
    image: 'https://images.unsplash.com/photo-1658989982341-0a8848cec1ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGF5ZnVsJTIwcHVwcHl8ZW58MXx8fHwxNzc1NTQ5NTQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    story: "Rocky keeps us active and entertained every day! He's full of energy and love. The trust score system helped us find the perfect match for our active family.",
    rating: 5
  },
  {
    id: 5,
    petName: 'Whiskers',
    adoptedBy: 'Amanda Thompson',
    date: 'November 2025',
    image: 'https://images.unsplash.com/photo-1620021743366-971187586f1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjB0YWJieSUyMGtpdHRlbnxlbnwxfHx8fDE3NzU2MDUxMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    story: "Whiskers is my best friend! He's independent yet loving, exactly what I was looking for. The AI chatbot really helped me through the process.",
    rating: 5
  },
  {
    id: 6,
    petName: 'Snowball',
    adoptedBy: 'James Wilson',
    date: 'October 2025',
    image: 'https://images.unsplash.com/photo-1599907370836-939f2d59b897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzaWFuJTIwY2F0JTIwZmx1ZmZ5fGVufDF8fHx8MTc3NTYwMzE3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    story: "Snowball is absolutely gorgeous and has the sweetest personality. She loves being pampered and has made my apartment feel like a home. Thank you PetRescue!",
    rating: 5
  }
];

export function SuccessStories() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Heart className="w-16 h-16 mx-auto mb-4 fill-white" />
            <h1 className="text-4xl md:text-5xl mb-4">Success Stories</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Celebrating the joy of adoption and the bonds that change lives forever
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Happy Families', value: '2,880+' },
            { label: 'Success Rate', value: '96%' },
            { label: 'Years of Service', value: '15+' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="text-4xl text-green-500 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64">
                <img
                  src={story.image}
                  alt={story.petName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full flex items-center gap-1">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl mb-2">{story.petName}</h3>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Calendar size={14} />
                  <span>Adopted {story.date}</span>
                </div>

                <p className="text-gray-700 mb-4 italic">"{story.story}"</p>

                <div className="flex items-center gap-2 pt-4 border-t">
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white">
                    {story.adoptedBy.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm">{story.adoptedBy}</div>
                    <div className="text-xs text-gray-500">Happy Pet Parent</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center bg-white rounded-lg shadow-md p-12"
        >
          <h2 className="text-3xl mb-4">Ready to Create Your Own Success Story?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Find your perfect companion today and join our community of happy pet parents
          </p>
          <a
            href="/adopt"
            className="inline-block px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors"
          >
            Start Your Journey
          </a>
        </motion.div>
      </div>
    </div>
  );
}
