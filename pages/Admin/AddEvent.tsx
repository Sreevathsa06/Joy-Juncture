import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEvent } from '../../services/firestoreService';
import { Event } from '../../types';
import { motion } from 'framer-motion';

const AddEvent: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Event>>({
    name: '', date: '', location: '', description: '', price: 0, imageUrl: '', isPast: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addEvent({ 
        ...formData, 
        price: Number(formData.price),
        date: new Date(formData.date!).toISOString() 
      } as any);
      navigate('/events');
    } catch (err) { alert('Error adding event'); }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/70 dark:bg-jj-gray-800/70 backdrop-blur-2xl rounded-3xl p-8 shadow-xl border border-white/20">
        <h2 className="text-3xl font-bold mb-6 text-jj-gray-900 dark:text-white">Create Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" placeholder="Event Name" onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-gray-700 focus:outline-none text-jj-gray-900 dark:text-white" required />
            <input name="date" type="datetime-local" onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-gray-700 focus:outline-none text-jj-gray-900 dark:text-white" required />
            <input name="location" placeholder="Location" onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-gray-700 focus:outline-none text-jj-gray-900 dark:text-white" required />
            <input name="price" type="number" placeholder="Price (0 for free)" onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-gray-700 focus:outline-none text-jj-gray-900 dark:text-white" required />
            <input name="imageUrl" placeholder="Image URL" onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-gray-700 focus:outline-none text-jj-gray-900 dark:text-white" required />
            <textarea name="description" placeholder="Description" rows={4} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-gray-700 focus:outline-none text-jj-gray-900 dark:text-white" required />
            <button disabled={loading} className="w-full py-4 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl transition-all">{loading ? 'Saving...' : 'Create Event'}</button>
        </form>
      </motion.div>
    </div>
  );
};
export default AddEvent;