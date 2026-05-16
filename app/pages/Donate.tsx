import { motion } from 'motion/react';
import { Heart, CreditCard, Building2, DollarSign } from 'lucide-react';
import { useState } from 'react';

export function Donate() {
  const [amount, setAmount] = useState<number | ''>('');
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const quickAmounts = [25, 50, 100, 250, 500];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for your donation of $${amount}! Your support helps save lives.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Heart className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl mb-4">Make a Difference</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Your donation helps us rescue, rehabilitate, and rehome pets in need
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Heart, label: 'Save Lives', description: 'Help rescue abandoned pets' },
            { icon: Building2, label: 'Support Shelters', description: 'Maintain safe facilities' },
            { icon: DollarSign, label: 'Medical Care', description: 'Provide necessary treatment' }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <item.icon className="w-12 h-12 mx-auto mb-3 text-rose-500" />
              <h3 className="text-lg mb-2">{item.label}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Donation Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl mb-6">Choose Your Donation</h2>

            {/* Donation Type */}
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => setDonationType('one-time')}
                className={`flex-1 py-3 rounded-lg transition-colors ${
                  donationType === 'one-time'
                    ? 'bg-rose-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                One-Time
              </button>
              <button
                type="button"
                onClick={() => setDonationType('monthly')}
                className={`flex-1 py-3 rounded-lg transition-colors ${
                  donationType === 'monthly'
                    ? 'bg-rose-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Monthly
              </button>
            </div>

            {/* Quick Amounts */}
            <div className="mb-6">
              <label className="block text-sm mb-3">Select Amount</label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                {quickAmounts.map(amt => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt)}
                    className={`py-3 rounded-lg transition-colors ${
                      amount === amt
                        ? 'bg-rose-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Custom amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                required
              />
            </div>

            {/* Personal Info */}
            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                required
              />
              <textarea
                placeholder="Message (Optional)"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            {/* Payment Info */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="text-gray-600" size={20} />
                <span>Payment Information</span>
              </div>
              <p className="text-sm text-gray-600">
                This is a demo. In production, this would integrate with a secure payment processor like Stripe or PayPal.
              </p>
            </div>

            <button
              type="submit"
              disabled={!amount}
              className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-lg"
            >
              {amount ? `Donate $${amount}` : 'Enter Amount'}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Your donation is tax-deductible. You'll receive a receipt via email.
            </p>
          </form>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-white rounded-lg shadow-md p-8"
        >
          <h3 className="text-2xl mb-6 text-center">Your Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl text-rose-500 mb-2">$50</div>
              <p className="text-gray-600">Provides food for a pet for one month</p>
            </div>
            <div>
              <div className="text-3xl text-rose-500 mb-2">$150</div>
              <p className="text-gray-600">Covers basic medical care and vaccinations</p>
            </div>
            <div>
              <div className="text-3xl text-rose-500 mb-2">$500</div>
              <p className="text-gray-600">Supports a pet's complete rehabilitation</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
