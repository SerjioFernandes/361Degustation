import mongoose, { Schema, models } from 'mongoose';

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

export interface IOrder extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  orderNumber: string;
  items: IOrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'stripe' | 'paypal' | 'cash';
  deliveryMethod: 'delivery' | 'pickup';
  deliveryAddress?: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  specialInstructions?: string;
  stripePaymentIntentId?: string;
  estimatedDeliveryTime?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        productImage: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['stripe', 'paypal', 'cash'],
      default: 'stripe',
    },
    deliveryMethod: {
      type: String,
      enum: ['delivery', 'pickup'],
      required: true,
    },
    deliveryAddress: {
      street: String,
      city: String,
      zipCode: String,
      country: String,
      phone: String,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    specialInstructions: {
      type: String,
    },
    stripePaymentIntentId: {
      type: String,
    },
    estimatedDeliveryTime: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Generate unique order number
OrderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    this.orderNumber = `361-${timestamp}-${random}`;
  }
  next();
});

const Order = models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;

