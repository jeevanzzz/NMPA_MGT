import { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const botResponses: Record<string, string> = {
  hello: "Hello! 👋 I'm your PetRescue AI assistant. How can I help you today?",
  adopt: "Great! You can browse available pets in our Adopt section. Each pet has a detailed profile with health info, personality traits, and a trust score. Would you like me to help you find a specific type of pet?",
  dog: "We have several wonderful dogs available for adoption! You can filter by size, age, and breed on our Adopt page. All our dogs are vaccinated and health-checked.",
  cat: "We have lovely cats looking for homes! Visit our Adopt page to see all available cats. Each listing includes personality traits and compatibility information.",
  donate: "Thank you for your interest in donating! Your contributions help us provide medical care, food, and shelter. Visit our Donate page to make a secure contribution.",
  volunteer: "That's wonderful! We always need volunteers. You can help with pet care, events, fostering, and more. Check out our Volunteer page to sign up.",
  ngo: "We partner with verified NGOs across the country. Each NGO has a trust score based on their track record, certifications, and adoption success rate. Visit our NGOs page to learn more.",
  trust: "Our Trust Score system evaluates NGOs and pets based on multiple factors: health status, vaccinations, NGO verification, adoption success rates, and community reviews. Scores above 90 indicate excellent reliability!",
  fee: "Adoption fees vary by pet and cover vaccinations, spaying/neutering, and medical care. Most fees range from $80-$200. This ensures our rescue operations can continue helping more animals.",
  process: "The adoption process is simple: 1) Browse pets 2) Submit an application 3) Meet the pet 4) Home visit (if required) 5) Finalize adoption. We'll guide you through every step!",
  default: "I'm here to help with questions about adoption, donations, volunteering, or our NGO partners. Feel free to ask me anything! 🐾"
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your PetRescue AI assistant. How can I help you today? 🐾",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simple keyword matching for bot response
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let response = botResponses.default;

      for (const [key, value] of Object.entries(botResponses)) {
        if (lowerInput.includes(key)) {
          response = value;
          break;
        }
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInput('');
  };

  const quickQuestions = [
    "How do I adopt?",
    "What's the adoption fee?",
    "How can I volunteer?",
    "Tell me about trust scores"
  ];

  return (
    <>
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-rose-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-rose-600 transition-colors"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-xs text-white/80">Always here to help 🐾</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-rose-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInput(question);
                        handleSend();
                      }}
                      className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <button
                  onClick={handleSend}
                  className="w-10 h-10 bg-rose-500 text-white rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
