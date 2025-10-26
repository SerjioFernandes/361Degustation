'use client';

import { useState, FormEvent } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';

interface CheckoutFormProps {
  amount: number;
  deliveryMethod: 'delivery' | 'pickup';
}

export default function CheckoutForm({ amount, deliveryMethod }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { data: session } = useSession();
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '',
    street: '',
    city: '',
    zipCode: '',
    country: 'USA',
    specialInstructions: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!formData.phone || (deliveryMethod === 'delivery' && (!formData.street || !formData.city))) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);

    try {
      // Create payment intent
      const response = await fetch('/api/payment/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(amount * 100) }), // Convert to cents
      });

      const { clientSecret } = await response.json();

      // Confirm payment
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: formData.name,
            email: formData.email,
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent.status === 'succeeded') {
        // Create order
        const orderResponse = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items,
            totalAmount: amount,
            deliveryMethod,
            deliveryAddress: deliveryMethod === 'delivery' ? {
              street: formData.street,
              city: formData.city,
              zipCode: formData.zipCode,
              country: formData.country,
              phone: formData.phone,
            } : undefined,
            customerName: formData.name,
            customerEmail: formData.email,
            customerPhone: formData.phone,
            specialInstructions: formData.specialInstructions,
            stripePaymentIntentId: paymentIntent.id,
          }),
        });

        const order = await orderResponse.json();

        if (orderResponse.ok) {
          clearCart();
          toast.success('Order placed successfully!');
          router.push(`/orders/${order._id}`);
        } else {
          throw new Error(order.error || 'Failed to create order');
        }
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#1a1a1a',
        '::placeholder': {
          color: '#9ca3af',
        },
      },
      invalid: {
        color: '#dc2626',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent-red focus:border-accent-red"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent-red focus:border-accent-red"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent-red focus:border-accent-red"
            />
          </div>
        </div>
      </div>

      {/* Delivery Address (only for delivery) */}
      {deliveryMethod === 'delivery' && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Delivery Address</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Street Address *
            </label>
            <input
              type="text"
              required
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent-red focus:border-accent-red"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent-red focus:border-accent-red"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent-red focus:border-accent-red"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent-red focus:border-accent-red"
              />
            </div>
          </div>
        </div>
      )}

      {/* Special Instructions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Special Instructions (Optional)
        </label>
        <textarea
          rows={3}
          value={formData.specialInstructions}
          onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
          placeholder="Any dietary restrictions, allergies, or special requests..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent-red focus:border-accent-red"
        />
      </div>

      {/* Payment Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Payment Information</h3>
        <div className="p-4 border border-gray-300 rounded-md">
          <CardElement options={cardElementOptions} />
        </div>
        <p className="text-xs text-gray-500">
          Test card: 4242 4242 4242 4242 | Any future date | Any 3 digits
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <span className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Processing...
          </span>
        ) : (
          `Place Order - $${amount.toFixed(2)}`
        )}
      </button>
    </form>
  );
}

