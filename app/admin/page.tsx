'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiPackage, FiShoppingBag, FiDollarSign, FiUsers } from 'react-icons/fi';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (session && session.user.role !== 'admin') {
      router.push('/');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session || session.user.role !== 'admin') {
    return null;
  }

  const dashboardCards = [
    {
      title: 'Manage Orders',
      description: 'View and update order statuses',
      icon: <FiPackage className="w-8 h-8" />,
      href: '/admin/orders',
      color: 'bg-blue-500',
    },
    {
      title: 'Manage Products',
      description: 'Add, edit, or remove menu items',
      icon: <FiShoppingBag className="w-8 h-8" />,
      href: '/admin/products',
      color: 'bg-green-500',
    },
    {
      title: 'Sales Report',
      description: 'View sales analytics and reports',
      icon: <FiDollarSign className="w-8 h-8" />,
      href: '/admin/sales',
      color: 'bg-accent-gold',
    },
    {
      title: 'Manage Users',
      description: 'View and manage user accounts',
      icon: <FiUsers className="w-8 h-8" />,
      href: '/admin/users',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Admin <span className="text-accent-gold">Dashboard</span>
          </h1>
          <p className="text-gray-600 mb-12">
            Welcome back, {session.user.name}! Manage your restaurant from here.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link
                  href={card.href}
                  className="block bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow card-hover"
                >
                  <div className={`${card.color} w-16 h-16 rounded-lg flex items-center justify-center text-white mb-4`}>
                    {card.icon}
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{card.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

