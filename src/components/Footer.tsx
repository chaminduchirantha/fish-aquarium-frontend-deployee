import { Link, useLocation } from 'react-router-dom'

export default function Footer() {
  const location = useLocation()

  // Hide footer on login/register pages
  const hideFooterRoutes = ['/login', '/register']
  if (hideFooterRoutes.includes(location.pathname)) {
    return null
  }

  return (
    <footer className="bg-sky-950 text-slate-300 pt-20 pb-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Aqua<span className="text-sky-500">World</span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Redefining the aquatic hobby through smart technology and 
              unparalleled care. Your journey to a perfect ecosystem starts here.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {['Fb', 'Ig', 'Tw', 'Li'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 hover:border-sky-500 hover:text-sky-500 transition-all duration-300">
                  <span className="text-xs font-bold">{social}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Services', 'Collections'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '')}`} className="text-sm hover:text-sky-400 transition-colors flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-sky-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products & Support */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Quick Access</h4>
            <ul className="space-y-4">
              <li><Link to="/access" className="text-sm hover:text-sky-400 transition-colors">Premium Accessories</Link></li>
              <li><a href="#smart" className="text-sm hover:text-sky-400 transition-colors">Smart Aquariums</a></li>
              <li><a href="#contact" className="text-sm hover:text-sky-400 transition-colors">Expert Support</a></li>
              <li><a href="#privacy" className="text-sm hover:text-sky-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info Card */}
          <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
            <h4 className="text-white font-bold mb-6 text-lg">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <span className="text-sky-500">📍</span>
                <span>123 Aquatic Lane, <br />Water City, WC 12345</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="text-sky-500">📞</span>
                <a href="tel:+1234567890" className="hover:text-sky-400 transition-colors">+94 0773352204</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="text-sky-500">✉️</span>
                <a href="mailto:info@aquaworld.com" className="hover:text-sky-400 transition-colors">info@aquaworld.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} <span className="text-slate-300">Aqua World Inc.</span> All rights reserved.
          </p>
          
          <div className="flex gap-8 text-xs font-medium">
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#cookies" className="hover:text-white transition-colors">Cookie Policy</a>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-slate-400">Systems Operational</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
