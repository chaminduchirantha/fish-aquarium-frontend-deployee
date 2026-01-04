import { Link, useLocation } from 'react-router-dom'

export default function Footer() {
  const location = useLocation()

  // Hide footer on login/register pages
  const hideFooterRoutes = ['/login', '/register']
  if (hideFooterRoutes.includes(location.pathname)) {
    return null
  }

  return (
    <footer className="bg-sky-900 text-white mt-0 py-12 border-t border-sky-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-sky-300">Aqua World</h3>
            <p className="text-sm text-gray-300">
              Your premier destination for aquarium supplies, exotic fish, and aquatic plants. Create the perfect aquatic environment for your home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-sky-300">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-sky-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-sky-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-sky-400 transition">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/collection" className="text-gray-300 hover:text-sky-400 transition">
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-sky-300">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/access" className="text-gray-300 hover:text-sky-400 transition">
                  Accessories
                </Link>
              </li>
              
              <li>
                <a href="#smart" className="text-gray-300 hover:text-sky-400 transition">
                  Smart Aquariums
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-sky-400 transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-sky-300">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-sky-400 mt-1">📍</span>
                <span>123 Aquatic Lane, Water City, WC 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sky-400">📞</span>
                <a href="tel:+1234567890" className="hover:text-sky-400 transition">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sky-400">✉️</span>
                <a href="mailto:info@aquaworld.com" className="hover:text-sky-400 transition">
                  info@aquaworld.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        
        {/* Bottom Section */}
        <div className="border-t border-sky-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2025 Aqua World. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#privacy" className="hover:text-sky-400 transition">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-sky-400 transition">
              Terms of Service
            </a>
            <a href="#cookies" className="hover:text-sky-400 transition">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
