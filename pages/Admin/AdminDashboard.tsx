import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminCard = ({ title, desc, link, color }: { title: string, desc: string, link: string, color: string }) => (
  <Link to={link}>
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className={`p-6 rounded-3xl backdrop-blur-xl border border-white/20 shadow-lg cursor-pointer h-full ${color}`}
    >
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/80">{desc}</p>
    </motion.div>
  </Link>
);

const AdminDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-jj-gray-900 dark:text-white mb-8 text-center">Admin Command Center</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminCard 
          title="Add New Product" 
          desc="Launch a new game into the shop. Set prices, images, and mechanics."
          link="/admin/add-product"
          color="bg-gradient-to-br from-purple-600 to-indigo-600"
        />
        <AdminCard 
          title="Create Event" 
          desc="Schedule a new community gathering or game night."
          link="/admin/add-event"
          color="bg-gradient-to-br from-pink-500 to-rose-500"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;