'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiAward, FiHeart, FiTrendingUp } from 'react-icons/fi';

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1920&q=80"
            alt="Our Story"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-4">
            Our <span className="text-accent-gold">Story</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            The philosophy of going beyond perfection
          </p>
        </motion.div>
      </section>

      {/* Main Story */}
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="font-display text-4xl font-bold text-center mb-8">
              Beyond Perfection: The <span className="text-accent-gold">361° Philosophy</span>
            </h2>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              In geometry, a perfect circle completes at 360 degrees. But at 361Degustation, 
              we believe that true excellence lies not in perfection itself, but in the constant 
              pursuit of surpassing it. That extra degree represents our commitment to going 
              beyond expectations, pushing boundaries, and creating experiences that transcend 
              the ordinary.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Founded in 2020 by Master Chef Hiroshi Tanaka, 361Degustation was born from a 
              simple yet profound vision: to bring the authentic art of Japanese sushi craftsmanship 
              to the modern world, while embracing innovation and sustainability. Chef Tanaka, 
              trained in Tokyo's prestigious Tsukiji fish market district, spent over 20 years 
              perfecting his craft before establishing 361Degustation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
              {[
                {
                  icon: <FiAward className="w-10 h-10" />,
                  title: 'Excellence',
                  description: 'Award-winning chefs dedicated to the highest standards',
                },
                {
                  icon: <FiHeart className="w-10 h-10" />,
                  title: 'Passion',
                  description: 'Every dish crafted with love and respect for tradition',
                },
                {
                  icon: <FiTrendingUp className="w-10 h-10" />,
                  title: 'Innovation',
                  description: 'Constantly evolving while honoring our roots',
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="text-center p-6 bg-gray-50 rounded-lg"
                >
                  <div className="flex justify-center text-accent-gold mb-4">
                    {value.icon}
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our name, "361Degustation," combines this philosophy with the French word for 
              tasting - "dégustation" - emphasizing our belief that dining is not just about 
              eating, but about experiencing, savoring, and appreciating every element of the 
              culinary journey.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Every ingredient is carefully sourced from sustainable suppliers. Our fish is 
              delivered fresh daily from trusted partners who share our commitment to ocean 
              conservation. Our rice comes from select farms in Japan, and our vegetables are 
              sourced from local organic growers whenever possible.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Today, 361Degustation stands as a testament to what happens when tradition meets 
              innovation, when perfection is seen not as a destination, but as a journey. We 
              invite you to be part of this journey, to taste the difference that passion, 
              dedication, and that one extra degree can make.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Experience the <span className="text-accent-gold">361° Difference</span>
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join us on this culinary journey and discover what lies beyond perfection
            </p>
            <Link href="/menu" className="btn-secondary inline-flex items-center">
              Explore Our Menu
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

