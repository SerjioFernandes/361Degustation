'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80',
      title: 'Fresh Nigiri Selection',
      category: 'Nigiri',
    },
    {
      src: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80',
      title: 'Dragon Roll Special',
      category: 'Maki',
    },
    {
      src: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800&q=80',
      title: 'Premium Sashimi Platter',
      category: 'Sashimi',
    },
    {
      src: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=800&q=80',
      title: 'Elegant Presentation',
      category: 'Special',
    },
    {
      src: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80',
      title: 'Colorful Maki Rolls',
      category: 'Maki',
    },
    {
      src: 'https://images.unsplash.com/photo-1564489563601-c53cfc451e93?w=800&q=80',
      title: 'Traditional Nigiri',
      category: 'Nigiri',
    },
    {
      src: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80',
      title: 'Chef\'s Special Creation',
      category: 'Special',
    },
    {
      src: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800&q=80',
      title: 'Artisanal Sushi',
      category: 'Special',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
              Our <span className="text-accent-gold">Gallery</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A visual journey through our culinary creations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-display text-lg font-semibold mb-1">
                      {image.title}
                    </h3>
                    <span className="text-sm text-accent-gold">{image.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl font-bold mb-4">
              Follow Our <span className="text-accent-gold">Journey</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Stay updated with our latest creations and behind-the-scenes moments
            </p>
            <a
              href="https://instagram.com/361degustation"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center"
            >
              Follow @361degustation
            </a>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-4xl hover:text-accent-gold"
            >
              ×
            </button>
            <div className="relative w-full h-[80vh]">
              <Image
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].title}
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute bottom-8 left-0 right-0 text-center text-white">
              <h3 className="font-display text-2xl font-semibold mb-2">
                {galleryImages[selectedImage].title}
              </h3>
              <span className="text-accent-gold">
                {galleryImages[selectedImage].category}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

