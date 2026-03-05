'use client'

import { useState, Fragment } from 'react'
import { Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { Link } from "react-router-dom";
import { SparklesIcon } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/home' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Smart Aquarium', href: '/customized' },
  { name: 'Feedback', href: '/feedbacak' },
  { name: 'Collections', href: '/collection' },
]

export default function AnjalFarmHero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-100 bg-sky-900 backdrop-blur-md border-b border-white/10">
      <nav aria-label="Global" className="flex items-center justify-between p-3 lg:px-12 max-w-7xl mx-auto">

        {/* Logo Section */}
        <div className="flex lg:flex-1 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-sky-500 p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <SparklesIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-extrabold text-2xl tracking-tight">
              Aqua<span className="text-sky-400">World</span>
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-full p-2 text-gray-200 hover:bg-white/10 transition-colors"
          >
            <Bars3Icon className="w-7 h-7" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8 items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="relative text-sm font-medium text-gray-200 hover:text-white transition-colors py-2 group"
            >
              {item.name}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-sky-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Link>
          ))}

          {/* Premium Dropdown Menu */}
          <Menu as="div" className="relative">
            <MenuButton className="flex items-center gap-1 text-sm font-medium text-gray-200 hover:text-white bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
              Explore <ChevronDownIcon className="h-4 w-4 opacity-70" />
            </MenuButton>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 mt-3 w-48 origin-top-right rounded-2xl bg-slate-800 border border-white/10 shadow-2xl p-2 focus:outline-none">
                <MenuItem>
                  {({ active }) => (
                    <Link
                      to="/fish"
                      className={`${active ? 'bg-sky-500 text-white' : 'text-gray-300'} block px-4 py-2.5 rounded-xl text-sm transition-colors`}
                    >
                      Rare Fishes
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <Link
                      to="/access"
                      className={`${active ? 'bg-sky-500 text-white' : 'text-gray-300'} block px-4 py-2.5 rounded-xl text-sm transition-colors`}
                    >
                      Premium Kits
                    </Link>
                  )}
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            to="/login"
            className="group relative inline-flex items-center justify-center px-6 py-2.5 font-semibold text-white transition-all duration-200 bg-sky-600 rounded-full hover:bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.4)] hover:shadow-[0_0_20px_rgba(14,165,233,0.6)]"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-slate-900 shadow-2xl p-8 ring-1 ring-white/10">
          <div className="flex items-center justify-between mb-10">
            <span className="font-extrabold text-2xl text-white">Aqua World</span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-full p-2 text-gray-400 hover:bg-white/10"
            >
              <XMarkIcon className="w-7 h-7" />
            </button>
          </div>

          <div className="flex flex-col gap-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-300 hover:text-sky-400 transition"
              >
                {item.name}
              </Link>
            ))}
            <hr className="border-white/5 my-4" />
            <Link to="/fish" className="text-gray-400 hover:text-white">Fishes</Link>
            <Link to="/access" className="text-gray-400 hover:text-white">Accessories</Link>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <Link to="/login" className="text-center py-3 rounded-xl bg-white/5 border border-white/10 font-semibold text-white">Login</Link>
              <Link to="/register" className="text-center py-3 rounded-xl bg-sky-500 font-semibold text-white shadow-lg shadow-sky-500/30">Sign Up</Link>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
