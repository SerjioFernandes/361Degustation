'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiStar, FiTruck, FiAward } from 'react-icons/fi';

export default function HomePage() {
  const features = [
    {
      icon: <FiStar className="w-8 h-8 text-accent-gold" />,
      title: 'Premium Quality',
      description: 'Only the finest, freshest ingredients selected daily',
    },
    {
      icon: <FiTruck className="w-8 h-8 text-accent-gold" />,
      title: 'Fast Delivery',
      description: 'Delivered fresh to your door within 30-45 minutes',
    },
    {
      icon: <FiAward className="w-8 h-8 text-accent-gold" />,
      title: 'Master Chefs',
      description: 'Crafted by award-winning Japanese sushi masters',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      text: 'The best sushi I\'ve ever had! The quality is outstanding and delivery is always on time.',
    },
    {
      name: 'Michael Chen',
      rating: 5,
      text: 'Authentic flavors that remind me of Tokyo. 361Degustation never disappoints!',
    },
    {
      name: 'Emily Rodriguez',
      rating: 5,
      text: 'Exceptional experience every time. The attention to detail is remarkable.',
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1920&q=80"
            alt="Sushi Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-display text-5xl md:text-7xl font-bold mb-6"
          >
            Beyond <span className="text-accent-gold">Perfection</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl mb-8 text-gray-200"
          >
            Experience the art of premium sushi at 361Degustation
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/menu" className="btn-primary inline-flex items-center justify-center">
              Order Now <FiArrowRight className="ml-2" />
            </Link>
            <Link href="/story" className="btn-outline inline-flex items-center justify-center">
              Our Story
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-accent-gold">361Degustation</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We go beyond the ordinary to deliver an extraordinary sushi experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-gray-50 p-8 rounded-lg text-center card-hover"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="font-display text-2xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Chef's <span className="text-accent-gold">Specials</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Handcrafted masterpieces that showcase our culinary excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: 'Dragon Roll',
                image: 'https://images.unsplash.com/photo-1617196035752-4d038f12eac0?w=500&q=80',
                price: 24.99,
              },
              {
                name: 'Omakase Selection',
                image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&q=80',
                price: 49.99,
              },
              {
                name: 'Rainbow Sashimi',
                image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&q=80',
                price: 34.99,
              },
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg card-hover"
              >
                <div className="relative h-64">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-semibold mb-2">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-accent-gold text-xl font-bold">
                      ${product.price}
                    </span>
                    <Link
                      href="/menu"
                      className="text-accent-red hover:text-red-700 font-semibold"
                    >
                      View Menu →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/menu" className="btn-primary inline-flex items-center">
              View Full Menu <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              What Our <span className="text-accent-gold">Customers Say</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust 361Degustation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="w-5 h-5 text-accent-gold fill-current" />
                  ))}
                </div>
                <p className="text-gray-200 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-accent-gold">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-accent-red to-red-700 text-white">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Ready to Experience Perfection?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Order now and taste the difference that 361° makes
            </p>
            <Link href="/menu" className="btn-secondary inline-flex items-center">
              Start Your Order <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

