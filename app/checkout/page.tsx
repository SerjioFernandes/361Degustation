'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { motion } from 'framer-motion';
import { FiTruck, FiPackage } from 'react-icons/fi';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '');

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { items, getTotalPrice } = useCartStore();
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?redirect=/checkout');
    }
  }, [status, router]);

  useEffect(() => {
    if (mounted && items.length === 0) {
      router.push('/cart');
    }
  }, [items, router, mounted]);

  if (!mounted || status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (!session || items.length === 0) {
    return null;
  }

  const totalPrice = getTotalPrice();
  const deliveryFee = deliveryMethod === 'delivery' && totalPrice < 50 ? 5.99 : 0;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + deliveryFee + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 text-center">
            <span className="text-accent-gold">Checkout</span>
          </h1>

          {/* Delivery Method Selection */}
          <div className="bg-white rounded-lg p-6 shadow-md mb-6">
            <h2 className="font-display text-2xl font-semibold mb-4">
              Select Delivery Method
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setDeliveryMethod('delivery')}
                className={`p-6 rounded-lg border-2 transition-all ${
                  deliveryMethod === 'delivery'
                    ? 'border-accent-red bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <FiTruck className="w-8 h-8 mx-auto mb-3 text-accent-red" />
                <h3 className="font-semibold text-lg mb-2">Delivery</h3>
                <p className="text-gray-600 text-sm">
                  Delivered to your doorstep in 30-45 minutes
                </p>
                <p className="text-sm mt-2 text-accent-gold font-semibold">
                  {totalPrice >= 50 ? 'FREE' : '$5.99 delivery fee'}
                </p>
              </button>
              <button
                onClick={() => setDeliveryMethod('pickup')}
                className={`p-6 rounded-lg border-2 transition-all ${
                  deliveryMethod === 'pickup'
                    ? 'border-accent-red bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <FiPackage className="w-8 h-8 mx-auto mb-3 text-accent-red" />
                <h3 className="font-semibold text-lg mb-2">Pickup</h3>
                <p className="text-gray-600 text-sm">
                  Pick up your order from our restaurant
                </p>
                <p className="text-sm mt-2 text-green-600 font-semibold">
                  FREE - Ready in 20-30 minutes
                </p>
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg p-6 shadow-md mb-6">
            <h2 className="font-display text-2xl font-semibold mb-4">
              Order Summary
            </h2>
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-semibold">
                  {deliveryFee === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `$${deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8%)</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between items-center">
                <span className="font-display text-xl font-bold">Total</span>
                <span className="font-display text-2xl font-bold text-accent-gold">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Stripe Checkout Form */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="font-display text-2xl font-semibold mb-6">
              Payment & Delivery Information
            </h2>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                amount={finalTotal}
                deliveryMethod={deliveryMethod}
              />
            </Elements>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

