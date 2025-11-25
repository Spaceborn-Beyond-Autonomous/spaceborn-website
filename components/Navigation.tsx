'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
        ? 'bg-white/5 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/10'
        : 'bg-white/2 backdrop-blur-md border-b border-white/10'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/images/logo.png"
                alt="Spaceborn Logo"
                width={40}
                height={40}
                className="w-auto h-10 transition-transform duration-300 group-hover:scale-110"
              />
              {/* Subtle glow effect on logo */}
              <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
            <span className="text-xl font-bold tracking-[0.3em] bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              SPACEBORN
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white/70 hover:text-white transition-all duration-300 relative group text-sm tracking-wider uppercase font-medium"
              >
                {item.name}
                {/* Animated underline */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-white/50 to-white group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <Button className="bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm rounded-full px-6 py-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/10">
              <span className="uppercase tracking-wider text-sm font-semibold">Get Started</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl mt-2 mb-4 p-6 shadow-2xl shadow-black/20">
                <div className="space-y-4">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="block py-3 text-white/70 hover:text-white transition-all duration-300 text-sm tracking-wider uppercase font-medium border-b border-white/5 last:border-0 hover:pl-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button className="w-full mt-2 bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm rounded-full py-3 transition-all duration-300">
                      <span className="uppercase tracking-wider text-sm font-semibold">
                        Get Started
                      </span>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
