
import React, { useState, useMemo, useEffect, useRef } from 'react';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { getProducts } from '../services/firestoreService';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// FIX: Cast framer-motion components to any to resolve TypeScript errors with props
const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionP = motion.p as any;

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <MotionDiv whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }} className="h-full">
    <Link to={`/shop/${product.id}`} className="group block h-full bg-white/70 dark:bg-jj-gray-800/70 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden relative aspect-square">
      {/* Full bleed image with overlay */}
      <img src={product.imageUrl} alt={product.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
        <div className="absolute top-4 right-4 flex space-x-1">
          {product.badges.map(badge => (
              <span key={badge} className="bg-jj-purple/90 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">{badge}</span>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col">
            <h3 className="text-xl font-bold text-white leading-tight">{product.name}</h3>
            <p className="text-sm text-gray-300 mt-1 line-clamp-2">{product.tagline}</p>
            <div className="mt-4 flex items-end justify-between">
                <p className="text-2xl font-extrabold text-jj-yellow">₹{product.price}</p>
                <span className="text-sm font-medium text-white underline decoration-jj-sky decoration-2 opacity-0 group-hover:opacity-100 transition-opacity">View Details &rarr;</span>
            </div>
        </div>
      </div>
    </Link>
  </MotionDiv>
);

const FilterSection: React.FC<{title: string, description:string, options: string[], selected: string[], onChange: (option: string) => void}> = ({ title, description, options, selected, onChange }) => (
    <div>
        <h3 className="text-sm font-semibold text-jj-gray-600 dark:text-jj-gray-400 uppercase tracking-wider mb-2">{title}</h3>
        <p className="text-xs text-jj-gray-500 dark:text-jj-gray-400 mb-3">{description}</p>
        <div className="space-y-2">
            {options.map(option => (
                <label key={option} className="flex items-center cursor-pointer">
                    <input type="checkbox" checked={selected.includes(option)} onChange={() => onChange(option)} className="h-4 w-4 rounded border-gray-300 text-jj-blue focus:ring-jj-blue" />
                    <span className="ml-3 text-sm text-jj-gray-900 dark:text-jj-gray-200">{option}</span>
                </label>
            ))}
        </div>
    </div>
);


const Shop: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<{occasion: string[], mood: string[], players: string[]}>({
        occasion: [],
        mood: [],
        players: [],
    });
    
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    useEffect(() => {
      const fetchProducts = async () => {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
      }
      fetchProducts();
    }, [])

    const handleFilterChange = (category: keyof typeof filters, option: string) => {
        setFilters(prev => {
            const currentCategoryFilters = prev[category];
            const newCategoryFilters = currentCategoryFilters.includes(option)
                ? currentCategoryFilters.filter(item => item !== option)
                : [...currentCategoryFilters, option];
            return { ...prev, [category]: newCategoryFilters };
        });
    };

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const occasionMatch = filters.occasion.length === 0 || filters.occasion.includes(product.occasion);
            const moodMatch = filters.mood.length === 0 || filters.mood.includes(product.mood);
            const playerCount = product.playerCount.min;
            const playerMatch = filters.players.length === 0 || filters.players.some(p => {
                if (p === '2') return playerCount <= 2;
                if (p === '3-4') return playerCount >= 3 && playerCount <= 4;
                if (p === '5+') return playerCount >= 5;
                return false;
            });

            return occasionMatch && moodMatch && playerMatch;
        });
    }, [filters, products]);
    
    const occasions = useMemo(() => [...new Set(products.map(p => p.occasion))], [products]);
    const moods = useMemo(() => [...new Set(products.map(p => p.mood))], [products]);
    const playerOptions = ['2', '3-4', '5+'];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-12 overflow-hidden">
            <MotionH1 style={{ y }} className="text-4xl font-extrabold text-jj-gray-900 dark:text-white">The Joy Juncture Store</MotionH1>
            <MotionP style={{ y }} className="mt-4 text-lg text-jj-gray-800 dark:text-jj-gray-300 max-w-2xl mx-auto">Welcome to our curated collection of games, each designed to spark conversation, laughter, and connection. Find the perfect game for any mood, moment, and gathering.</MotionP>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-1/4">
                <div className="sticky top-32 bg-white/70 dark:bg-jj-gray-800/70 backdrop-blur-xl p-6 rounded-3xl shadow-sm border border-white/50 dark:border-white/10">
                    <h2 className="text-lg font-bold mb-6 text-jj-gray-900 dark:text-white">Filter Your Fun</h2>
                    <div className="space-y-6">
                        <FilterSection title="By Occasion" description="What's the event? Find a game that fits the moment perfectly." options={occasions} selected={filters.occasion} onChange={(opt) => handleFilterChange('occasion', opt)} />
                        <hr className="border-jj-gray-200 dark:border-jj-gray-700"/>
                        <FilterSection title="By Mood / Vibe" description="How do you want to feel? Choose a vibe for your game night." options={moods} selected={filters.mood} onChange={(opt) => handleFilterChange('mood', opt)} />
                        <hr className="border-jj-gray-200 dark:border-jj-gray-700"/>
                        <FilterSection title="By Players" description="Who's playing? Select the number of players to find the right fit." options={playerOptions} selected={filters.players} onChange={(opt) => handleFilterChange('players', opt)} />
                    </div>
                </div>
            </aside>

            <main className="lg:w-3/4">
                 {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="bg-white/50 dark:bg-jj-gray-800/50 backdrop-blur-xl rounded-3xl p-4 space-y-4 aspect-square flex items-center justify-center">
                                <div>
                                  <div className="mx-auto"><Loading size="large" /></div>
                                </div>
                            </div>
                        ))}
                    </div>
                 ) : filteredProducts.length > 0 ? (
                    <MotionDiv layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredProducts.map(product => (
                            <MotionDiv 
                                layout
                                key={product.id} 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            >
                                <ProductCard product={product} />
                            </MotionDiv>
                        ))}
                    </AnimatePresence>
                    </MotionDiv>
                 ) : (
                    <div className="text-center py-20 bg-white/70 dark:bg-jj-gray-800/70 backdrop-blur-xl rounded-3xl shadow-sm">
                        <h3 className="text-xl font-semibold text-jj-gray-900 dark:text-white">No games match your filters!</h3>
                        <p className="text-jj-gray-800 dark:text-jj-gray-400 mt-2">Try adjusting your selection to find the perfect game for your next gathering.</p>
                    </div>
                 )}
            </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;
