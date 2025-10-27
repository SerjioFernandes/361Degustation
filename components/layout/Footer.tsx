'use client';

import Link from 'next/link';
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin, FiYoutube } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="font-display text-2xl font-bold">
              <span className="text-white">361</span>
              <span className="text-accent-gold">Degustation</span>
            </div>
            <p className="text-gray-300 text-sm">
              Beyond perfection. Experience the art of premium sushi crafted with precision and passion.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/361degustation" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors" aria-label="Facebook">
                <FiFacebook size={20} />
              </a>
              <a href="https://instagram.com/361degustation" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors" aria-label="Instagram">
                <FiInstagram size={20} />
              </a>
              <a href="https://twitter.com/361degustation" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors" aria-label="Twitter">
                <FiTwitter size={20} />
              </a>
              <a href="https://youtube.com/@361degustation" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors" aria-label="YouTube">
                <FiYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-accent-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-gray-300 hover:text-accent-gold transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/story" className="text-gray-300 hover:text-accent-gold transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-accent-gold transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-accent-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/orders" className="text-gray-300 hover:text-accent-gold transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/auth/signin" className="text-gray-300 hover:text-accent-gold transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-accent-gold transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-accent-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-accent-gold transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FiMapPin className="text-accent-gold mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-300 text-sm">
                  123 Sushi Street, Tokyo District<br />San Francisco, CA 94102
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="text-accent-gold flex-shrink-0" size={18} />
                <span className="text-gray-300 text-sm">+1 (555) 361-3610</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="text-accent-gold flex-shrink-0" size={18} />
                <span className="text-gray-300 text-sm">info@361degustation.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-gray-300 text-sm font-semibold">Hours:</p>
              <p className="text-gray-400 text-sm">Mon-Fri: 11:00 AM - 10:00 PM</p>
              <p className="text-gray-400 text-sm">Sat-Sun: 12:00 PM - 11:00 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} 361Degustation. All rights reserved. Crafted with precision and passion.
          </p>
        </div>
      </div>
    </footer>
  );
}

