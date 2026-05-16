import { Link, useLocation } from 'react-router';
import { Heart, Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
            <span className="text-2xl">PetRescue</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`hover:text-rose-500 transition-colors ${
                isActive('/') ? 'text-rose-500' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/adopt"
              className={`hover:text-rose-500 transition-colors ${
                isActive('/adopt') ? 'text-rose-500' : ''
              }`}
            >
              Adopt
            </Link>
            <Link
              to="/ngos"
              className={`hover:text-rose-500 transition-colors ${
                isActive('/ngos') ? 'text-rose-500' : ''
              }`}
            >
              NGOs
            </Link>
            <Link
              to="/donate"
              className={`hover:text-rose-500 transition-colors ${
                isActive('/donate') ? 'text-rose-500' : ''
              }`}
            >
              Donate
            </Link>
            <Link
              to="/volunteer"
              className={`hover:text-rose-500 transition-colors ${
                isActive('/volunteer') ? 'text-rose-500' : ''
              }`}
            >
              Volunteer
            </Link>
            <Link
              to="/success-stories"
              className={`hover:text-rose-500 transition-colors ${
                isActive('/success-stories') ? 'text-rose-500' : ''
              }`}
            >
              Success Stories
            </Link>
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <User size={20} />
                <span>Account</span>
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      My Applications
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Favorites
                    </Link>
                    <hr className="my-2" />
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600">
                      <LogOut size={16} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden mt-4 flex flex-col gap-4 overflow-hidden"
            >
              <Link to="/" className="hover:text-rose-500" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link to="/adopt" className="hover:text-rose-500" onClick={() => setMobileMenuOpen(false)}>
                Adopt
              </Link>
              <Link to="/ngos" className="hover:text-rose-500" onClick={() => setMobileMenuOpen(false)}>
                NGOs
              </Link>
              <Link to="/donate" className="hover:text-rose-500" onClick={() => setMobileMenuOpen(false)}>
                Donate
              </Link>
              <Link to="/volunteer" className="hover:text-rose-500" onClick={() => setMobileMenuOpen(false)}>
                Volunteer
              </Link>
              <Link to="/success-stories" className="hover:text-rose-500" onClick={() => setMobileMenuOpen(false)}>
                Success Stories
              </Link>
              <Link to="/profile" className="hover:text-rose-500" onClick={() => setMobileMenuOpen(false)}>
                My Profile
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
