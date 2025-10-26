'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCartStore } from '@/store/cartStore';
import { FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    setCartItemCount(getTotalItems());
  }, [getTotalItems]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/story', label: 'Our Story' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="font-display text-2xl md:text-3xl font-bold">
              <span className={isScrolled ? 'text-primary' : 'text-white'}>361</span>
              <span className="text-accent-gold">Degustation</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors hover:text-accent-gold ${
                  isScrolled ? 'text-primary' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link href="/cart" className="relative">
              <FiShoppingCart
                className={`w-6 h-6 transition-colors hover:text-accent-gold ${
                  isScrolled ? 'text-primary' : 'text-white'
                }`}
              />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-red text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* User Account */}
            {session ? (
              <div className="hidden md:flex items-center space-x-4">
                {session.user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className={`font-medium transition-colors hover:text-accent-gold ${
                      isScrolled ? 'text-primary' : 'text-white'
                    }`}
                  >
                    Admin
                  </Link>
                )}
                <Link
                  href="/orders"
                  className={`font-medium transition-colors hover:text-accent-gold ${
                    isScrolled ? 'text-primary' : 'text-white'
                  }`}
                >
                  Orders
                </Link>
                <button
                  onClick={() => signOut()}
                  className={`font-medium transition-colors hover:text-accent-red ${
                    isScrolled ? 'text-primary' : 'text-white'
                  }`}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/auth/signin" className="hidden md:block">
                <FiUser
                  className={`w-6 h-6 transition-colors hover:text-accent-gold ${
                    isScrolled ? 'text-primary' : 'text-white'
                  }`}
                />
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden"
            >
              {isMobileMenuOpen ? (
                <FiX
                  className={`w-6 h-6 ${isScrolled ? 'text-primary' : 'text-white'}`}
                />
              ) : (
                <FiMenu
                  className={`w-6 h-6 ${isScrolled ? 'text-primary' : 'text-white'}`}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t mt-4"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-primary hover:text-accent-gold font-medium"
                >
                  {link.label}
                </Link>
              ))}
              {session ? (
                <>
                  {session.user.role === 'admin' && (
                    <Link
                      href="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-primary hover:text-accent-gold font-medium"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    href="/orders"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-primary hover:text-accent-gold font-medium"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block text-accent-red font-medium w-full text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/signin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-primary hover:text-accent-gold font-medium"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

