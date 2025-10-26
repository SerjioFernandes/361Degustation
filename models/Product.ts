import mongoose, { Schema, models } from 'mongoose';

export interface IProduct extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  category: 'nigiri' | 'sashimi' | 'maki' | 'special' | 'appetizer' | 'dessert' | 'drink';
  image: string;
  ingredients: string[];
  isSpecial: boolean;
  isAvailable: boolean;
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  spicyLevel?: number;
  isVegetarian: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be positive'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['nigiri', 'sashimi', 'maki', 'special', 'appetizer', 'dessert', 'drink'],
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    ingredients: {
      type: [String],
      default: [],
    },
    isSpecial: {
      type: Boolean,
      default: false,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    nutritionInfo: {
      calories: Number,
      protein: Number,
      carbs: Number,
      fat: Number,
    },
    spicyLevel: {
      type: Number,
      min: 0,
      max: 3,
      default: 0,
    },
    isVegetarian: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;

