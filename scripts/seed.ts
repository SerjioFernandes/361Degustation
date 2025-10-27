/**
 * Database Seed Script
 * Run with: npx ts-node scripts/seed.ts
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/361degustation';

// Models
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  createdAt: { type: Date, default: Date.now },
});

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  ingredients: [String],
  isSpecial: Boolean,
  isAvailable: Boolean,
  spicyLevel: Number,
  isVegetarian: Boolean,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

// Sample Products
const sampleProducts = [
  // Nigiri
  {
    name: 'Salmon Nigiri',
    description: 'Fresh Atlantic salmon on seasoned rice',
    price: 6.99,
    category: 'nigiri',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&q=80',
    ingredients: ['Salmon', 'Sushi Rice', 'Wasabi'],
    isSpecial: false,
    isAvailable: true,
    spicyLevel: 0,
    isVegetarian: false,
  },
  {
    name: 'Tuna Nigiri',
    description: 'Premium bluefin tuna on perfectly seasoned rice',
    price: 7.99,
    category: 'nigiri',
    image: 'https://images.unsplash.com/photo-1564489563601-c53cfc451e93?w=500&q=80',
    ingredients: ['Bluefin Tuna', 'Sushi Rice', 'Wasabi'],
    isSpecial: false,
    isAvailable: true,
    spicyLevel: 0,
    isVegetarian: false,
  },
  {
    name: 'Yellowtail Nigiri',
    description: 'Buttery yellowtail with a hint of ponzu',
    price: 8.49,
    category: 'nigiri',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&q=80',
    ingredients: ['Yellowtail', 'Sushi Rice', 'Ponzu', 'Scallion'],
    isSpecial: false,
    isAvailable: true,
    spicyLevel: 0,
    isVegetarian: false,
  },

  // Sashimi
  {
    name: 'Salmon Sashimi',
    description: '8 pieces of premium Atlantic salmon',
    price: 16.99,
    category: 'sashimi',
    image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&q=80',
    ingredients: ['Salmon', 'Daikon', 'Shiso Leaf'],
    isSpecial: false,
    isAvailable: true,
    spicyLevel: 0,
    isVegetarian: false,
  },
  {
    name: 'Tuna Sashimi',
    description: '8 pieces of premium bluefin tuna',
    price: 18.99,
    category: 'sashimi',
    image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&q=80',
    ingredients: ['Bluefin Tuna', 'Daikon', 'Wasabi'],
    isSpecial: false,
    isAvailable: true,
    spicyLevel: 0,
    isVegetarian: false,
  },

  // Maki Rolls
  {
    name: 'California Roll',
    description: 'Classic roll with imitation crab, avocado, and cucumber',
    price: 10.99,
    category: 'maki',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&q=80',
    ingredients: ['Imitation Crab', 'Avocado', 'Cucumber', 'Rice', 'Nori', 'Sesame Seeds'],
    isSpecial: false,
    isAvailable: true,
    spicyLevel: 0,
    isVegetarian: false,
  },
  {
    name: 'Spicy Tuna Roll',
    description: 'Fresh tuna with spicy mayo and cucumber',
    price: 12.99,
    category: 'maki',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&q=80',
    ingredients: ['Tuna', 'Spicy Mayo', 'Cucumber', 'Rice', 'Nori', 'Chili Oil'],
    isSpecial: false,
    isAvailable: true,
    spicyLevel: 2,
    isVegetarian: false,
  },
  {
    name: 'Dragon Roll',
    description: 'Eel and cucumber topped with avocado and eel sauce',
    price: 16.99,
    category: 'maki',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&q=80',
    ingredients: ['Eel', 'Cucumber', 'Avocado', 'Rice', 'Nori', 'Eel Sauce'],
    isSpecial: true,
    isAvailable: true,
    spicyLevel: 0,
    isVegetarian: false,
  },
  {
    name: 'Rainbow Roll',
    description: 'California roll topped with assorted fish',
    price: 17.99,
    category: 'maki',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&q=80',
    ingredients: ['Salmon', 'Tuna', 'Yellowtail', 'Imitation Crab', 'Avocado', 'Cucumber'],
    isSpecial: true,
    isAvailable: true,
    spicyLevel: 0,
    isVegetarian: false,
  },

  // Chef's Special
  {
    name: 'Omakase Selection',
    description: "Chef's choice of 12 premium pieces - nigiri and sashimi",
    price: 49.99,
    category: 'special',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&q=80',
    ingredients: ['Chef Selection', 'Seasonal Fish', 'Premium Cuts'],
    isSpecial: true,
    isAvailable: true,
    spicyLevel: 0,
    isVegetarian: false,
  },
  {
    name: '361 Signature Roll',
    description: 'Our signature creation - beyond perfection',
    price: 24.99,
    category: 'special',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&q=80',
    ingredients: ['Tuna', 'Salmon', 'Yellowtail', 'Avocado', 'Special Sauce', 'Gold Flakes'],
    isSpecial: true,
    isAvailable: true,
    spicyLevel: 1,
    isVegetarian: false,
  },

  // Vegetarian Options
  {
    name: 'Vegetable Roll',
    description: 'Fresh vegetables wrapped in seasoned rice',
    price: 8.99,
    category: 'maki',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&q=80',
    ingredients: ['Cucumber', 'Avocado', 'Carrot', 'Asparagus', 'Rice', 'Nori'],
    isSpecial: false,
    isAvailable: true,
    spicyLevel: 0,
    isVegetarian: true,
  },
  {
    name: 'Avocado Nigiri',
    description: 'Creamy avocado on seasoned rice',
    price: 5.99,
    category: 'nigiri',
    image: 'https://images.unsplash.com/photo-1564489563601-c53cfc451e93?w=500&q=80',
    ingredients: ['Avocado', 'Sushi Rice', 'Sesame Seeds'],
    isSpecial: false,
    isAvailable: true,
    spicyLevel: 0,
    isVegetarian: true,
  },

  // Appetizers
  {
    name: 'Edamame',
    description: 'Steamed soybeans with sea salt',
    price: 5.99,
    category: 'appetizer',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&q=80',
    ingredients: ['Soybeans', 'Sea Salt'],
    isSpecial: false,
    isAvailable: true,
    spicyLevel: 0,
    isVegetarian: true,
  },
  {
    name: 'Gyoza',
    description: 'Pan-fried pork dumplings (6 pieces)',
    price: 7.99,
    category: 'appetizer',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&q=80',
    ingredients: ['Pork', 'Cabbage', 'Garlic', 'Ginger', 'Wrapper'],
    isSpecial: false,
    isAvailable: true,
    spicyLevel: 0,
    isVegetarian: false,
  },

  // Desserts
  {
    name: 'Mochi Ice Cream',
    description: 'Japanese rice cake filled with ice cream (3 pieces)',
    price: 6.99,
    category: 'dessert',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&q=80',
    ingredients: ['Mochi', 'Ice Cream', 'Rice Flour'],
    isSpecial: false,
    isAvailable: true,
    spicyLevel: 0,
    isVegetarian: true,
  },
  {
    name: 'Green Tea Ice Cream',
    description: 'Premium matcha ice cream',
    price: 5.99,
    category: 'dessert',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&q=80',
    ingredients: ['Matcha', 'Cream', 'Sugar'],
    isSpecial: false,
    isAvailable: true,
    spicyLevel: 0,
    isVegetarian: true,
  },

  // Drinks
  {
    name: 'Sake',
    description: 'Premium Japanese rice wine',
    price: 12.99,
    category: 'drink',
    image: 'https://images.unsplash.com/photo-1558642891-54be180ea339?w=500&q=80',
    ingredients: ['Rice', 'Water', 'Koji'],
    isSpecial: false,
    isAvailable: true,
    spicyLevel: 0,
    isVegetarian: true,
  },
  {
    name: 'Green Tea',
    description: 'Traditional Japanese green tea',
    price: 3.99,
    category: 'drink',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80',
    ingredients: ['Green Tea Leaves', 'Water'],
    isSpecial: false,
    isAvailable: true,
    spicyLevel: 0,
    isVegetarian: true,
  },
];

async function seed() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create admin user
    console.log('👤 Creating admin user...');
    const hashedPassword = await bcrypt.hash('Admin@361!', 12);
    await User.create({
      name: 'Admin',
      email: 'admin@361degustation.com',
      password: hashedPassword,
      role: 'admin',
    });
    console.log('✅ Admin user created: admin@361degustation.com / Admin@361!');

    // Create products
    console.log('🍱 Creating sample products...');
    await Product.insertMany(sampleProducts);
    console.log(`✅ ${sampleProducts.length} products created`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Summary:');
    console.log(`   - Admin User: admin@361degustation.com / Admin@361!`);
    console.log(`   - Products: ${sampleProducts.length} items`);
    console.log('\n🚀 You can now start the development server with: npm run dev');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();

