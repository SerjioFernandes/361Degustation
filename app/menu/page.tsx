'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';
import { FiShoppingCart, FiStar, FiInfo } from 'react-icons/fi';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  ingredients: string[];
  isSpecial: boolean;
  spicyLevel: number;
  isVegetarian: boolean;
}

export default function MenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  const categories = [
    { value: 'all', label: 'All Items' },
    { value: 'nigiri', label: 'Nigiri' },
    { value: 'sashimi', label: 'Sashimi' },
    { value: 'maki', label: 'Maki Rolls' },
    { value: 'special', label: 'Chef\'s Special' },
    { value: 'appetizer', label: 'Appetizers' },
    { value: 'dessert', label: 'Desserts' },
    { value: 'drink', label: 'Drinks' },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load menu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const SpicyIndicator = ({ level }: { level: number }) => {
    if (level === 0) return null;
    return (
      <div className="flex items-center space-x-1">
        {[...Array(level)].map((_, i) => (
          <span key={i} className="text-accent-red">🌶️</span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
              Our <span className="text-accent-gold">Menu</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore our carefully curated selection of premium sushi and Japanese delicacies
            </p>
          </motion.div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-16 z-40 bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category.value
                    ? 'bg-accent-red text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="h-48 bg-gray-200 skeleton" />
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-200 skeleton rounded" />
                  <div className="h-4 bg-gray-200 skeleton rounded" />
                  <div className="h-8 bg-gray-200 skeleton rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600">No products found in this category</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg card-hover"
              >
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {product.isSpecial && (
                    <div className="absolute top-2 right-2 bg-accent-gold text-primary px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <FiStar className="mr-1" /> Special
                    </div>
                  )}
                  {product.isVegetarian && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      🌱 Vegetarian
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-xl font-semibold">{product.name}</h3>
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="text-gray-500 hover:text-accent-gold"
                    >
                      <FiInfo size={20} />
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-accent-gold">
                      ${product.price.toFixed(2)}
                    </span>
                    <SpicyIndicator level={product.spicyLevel} />
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full btn-primary flex items-center justify-center"
                  >
                    <FiShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="font-display text-3xl font-bold mb-4">
                  {selectedProduct.name}
                </h2>
                <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                <div className="space-y-3 mb-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Ingredients:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.ingredients.map((ingredient, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {selectedProduct.isVegetarian && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        🌱 Vegetarian
                      </span>
                    )}
                    {selectedProduct.spicyLevel > 0 && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold">Spicy Level:</span>
                        <SpicyIndicator level={selectedProduct.spicyLevel} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-accent-gold">
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => {
                      handleAddToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="btn-primary flex items-center"
                  >
                    <FiShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

