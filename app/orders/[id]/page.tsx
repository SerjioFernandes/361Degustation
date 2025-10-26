'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiMapPin,
  FiPhone,
  FiMail,
} from 'react-icons/fi';

interface Order {
  _id: string;
  orderNumber: string;
  items: Array<{
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  deliveryMethod: string;
  deliveryAddress?: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialInstructions?: string;
  createdAt: string;
  estimatedDeliveryTime?: string;
}

export default function OrderDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    if (session && params.id) {
      fetchOrder();
    }
  }, [session, params.id]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setOrder(data);
      } else {
        router.push('/orders');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      router.push('/orders');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusSteps = () => {
    const steps = [
      { label: 'Order Placed', status: 'pending', icon: <FiCheckCircle /> },
      { label: 'Confirmed', status: 'confirmed', icon: <FiCheckCircle /> },
      { label: 'Preparing', status: 'preparing', icon: <FiPackage /> },
      { label: order?.deliveryMethod === 'delivery' ? 'Out for Delivery' : 'Ready for Pickup', status: 'ready', icon: <FiTruck /> },
      { label: order?.deliveryMethod === 'delivery' ? 'Delivered' : 'Picked Up', status: 'delivered', icon: <FiCheckCircle /> },
    ];

    const statusOrder = ['pending', 'confirmed', 'preparing', 'ready', 'delivered'];
    const currentIndex = statusOrder.indexOf(order?.status || '');

    return steps.map((step, index) => ({
      ...step,
      isCompleted: index <= currentIndex,
      isCurrent: index === currentIndex,
    }));
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading order...</p>
        </div>
      </div>
    );
  }

  if (!session || !order) {
    return null;
  }

  const statusSteps = getStatusSteps();

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold">
                Order <span className="text-accent-gold">#{order.orderNumber}</span>
              </h1>
              <p className="text-gray-600 mt-2">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <Link href="/orders" className="text-accent-red hover:text-red-700 font-semibold">
              ← Back to Orders
            </Link>
          </div>

          {/* Order Status Timeline */}
          <div className="bg-white rounded-lg p-6 shadow-md mb-6">
            <h2 className="font-display text-xl font-semibold mb-6">Order Status</h2>
            <div className="relative">
              <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
                <div
                  className="h-full bg-accent-gold transition-all duration-500"
                  style={{
                    width: `${(statusSteps.filter((s) => s.isCompleted).length - 1) * 25}%`,
                  }}
                />
              </div>
              <div className="relative flex justify-between">
                {statusSteps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        step.isCompleted
                          ? 'bg-accent-gold text-white'
                          : 'bg-gray-200 text-gray-400'
                      } ${step.isCurrent ? 'ring-4 ring-accent-gold ring-opacity-30' : ''}`}
                    >
                      {step.icon}
                    </div>
                    <span
                      className={`mt-2 text-xs md:text-sm font-medium text-center ${
                        step.isCompleted ? 'text-gray-900' : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Order Items */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="font-display text-xl font-semibold mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold">{item.productName}</h3>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <div className="font-semibold text-accent-gold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="font-display text-xl font-bold">Total</span>
                  <span className="font-display text-2xl font-bold text-accent-gold">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery/Contact Information */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h2 className="font-display text-xl font-semibold mb-4">
                  {order.deliveryMethod === 'delivery' ? 'Delivery Information' : 'Pickup Information'}
                </h2>
                {order.deliveryMethod === 'delivery' && order.deliveryAddress ? (
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <FiMapPin className="text-accent-gold mt-1" />
                      <div>
                        <p className="font-semibold">Delivery Address:</p>
                        <p className="text-gray-600">
                          {order.deliveryAddress.street}<br />
                          {order.deliveryAddress.city}, {order.deliveryAddress.zipCode}<br />
                          {order.deliveryAddress.country}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FiClock className="text-accent-gold" />
                      <div>
                        <p className="font-semibold">Estimated Delivery:</p>
                        <p className="text-gray-600">30-45 minutes</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <FiMapPin className="text-accent-gold mt-1" />
                      <div>
                        <p className="font-semibold">Pickup Location:</p>
                        <p className="text-gray-600">
                          361Degustation<br />
                          123 Sushi Street, Tokyo District<br />
                          San Francisco, CA 94102
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FiClock className="text-accent-gold" />
                      <div>
                        <p className="font-semibold">Ready in:</p>
                        <p className="text-gray-600">20-30 minutes</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h2 className="font-display text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <FiMail className="text-accent-gold" />
                    <div>
                      <p className="font-semibold">Email:</p>
                      <p className="text-gray-600">{order.customerEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiPhone className="text-accent-gold" />
                    <div>
                      <p className="font-semibold">Phone:</p>
                      <p className="text-gray-600">{order.customerPhone}</p>
                    </div>
                  </div>
                </div>
                {order.specialInstructions && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="font-semibold mb-1">Special Instructions:</p>
                    <p className="text-gray-600 text-sm">{order.specialInstructions}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

