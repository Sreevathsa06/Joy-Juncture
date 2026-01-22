import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../../services/firestoreService';
import { Product } from '../../types';
import { motion } from 'framer-motion';

const InputField = ({ label, name, type = "text", value, onChange, placeholder }: any) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-jj-gray-700 dark:text-jj-gray-300 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none backdrop-blur-sm text-jj-gray-900 dark:text-white transition-all"
      required
    />
  </div>
);

const TextArea = ({ label, name, value, onChange, rows = 3 }: any) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-jj-gray-700 dark:text-jj-gray-300 mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none backdrop-blur-sm text-jj-gray-900 dark:text-white transition-all"
      required
    />
  </div>
);

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '', tagline: '', price: 0, imageUrl: '', description: '', concept: '', howToPlay: '',
    playerCount: { min: 2, max: 4 }, category: 'Card Game', occasion: 'Party', mood: 'Funny',
    useCases: [], badges: []
  });

  const [rawUseCases, setRawUseCases] = useState('');
  const [rawBadges, setRawBadges] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'min' || name === 'max') {
        setFormData(prev => ({ ...prev, playerCount: { ...prev.playerCount!, [name]: Number(value) || value } }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const finalProduct = {
        ...formData,
        price: Number(formData.price),
        useCases: rawUseCases.split(',').map(s => s.trim()).filter(Boolean),
        badges: rawBadges.split(',').map(s => s.trim()).filter(Boolean),
      } as Omit<Product, 'id'>;

      await addProduct(finalProduct);
      navigate('/shop');
    } catch (error) {
      alert("Failed to create product");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 dark:bg-jj-gray-800/70 backdrop-blur-2xl rounded-3xl p-8 shadow-xl border border-white/20"
      >
        <h2 className="text-3xl font-bold mb-6 text-jj-gray-900 dark:text-white border-b pb-4 border-gray-200 dark:border-gray-700">Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <InputField label="Name" name="name" value={formData.name} onChange={handleChange} />
             <InputField label="Tagline" name="tagline" value={formData.tagline} onChange={handleChange} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <InputField label="Price (₹)" name="price" type="number" value={formData.price} onChange={handleChange} />
             <InputField label="Image URL" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
          </div>

          <TextArea label="Description" name="description" value={formData.description} onChange={handleChange} />
          <TextArea label="Concept" name="concept" value={formData.concept} onChange={handleChange} />
          <TextArea label="How to Play" name="howToPlay" value={formData.howToPlay} onChange={handleChange} />

          <div className="grid grid-cols-2 gap-4 mb-4">
             <InputField label="Min Players" name="min" type="number" value={formData.playerCount?.min} onChange={handleChange} />
             <InputField label="Max Players" name="max" value={formData.playerCount?.max} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="mb-4">
                <label className="block text-sm font-medium text-jj-gray-700 dark:text-jj-gray-300 mb-1">Category</label>
                <select name="category" onChange={handleChange} className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-gray-700 text-jj-gray-900 dark:text-white">
                    <option>Card Game</option><option>Board Game</option><option>Puzzle</option><option>Murder Mystery</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-jj-gray-700 dark:text-jj-gray-300 mb-1">Occasion</label>
                <select name="occasion" onChange={handleChange} className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-gray-700 text-jj-gray-900 dark:text-white">
                    <option>Party</option><option>Family</option><option>Couples</option><option>Ice Breaker</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-jj-gray-700 dark:text-jj-gray-300 mb-1">Mood</label>
                <select name="mood" onChange={handleChange} className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-gray-700 text-jj-gray-900 dark:text-white">
                    <option>Funny</option><option>Competitive</option><option>Casual</option><option>Strategy</option>
                </select>
            </div>
          </div>

          <InputField label="Use Cases (comma separated)" name="useCases" value={rawUseCases} onChange={(e: any) => setRawUseCases(e.target.value)} placeholder="e.g. Game Night, Travel" />
          <InputField label="Badges (comma separated)" name="badges" value={rawBadges} onChange={(e: any) => setRawBadges(e.target.value)} placeholder="e.g. Best Seller, New" />

          <button disabled={loading} type="submit" className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg transform transition-transform active:scale-95">
             {loading ? 'Creating...' : 'Launch Product'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProduct;