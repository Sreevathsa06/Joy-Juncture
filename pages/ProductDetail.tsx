
import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import { Link, useParams } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { useCart } from '../contexts/CartContext';
import { getProductById, getProducts } from '../services/firestoreService';
import { Product } from '../types';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { totalPoints } = useWallet();
  const { addToCart } = useCart();

  useEffect(() => {
    if(!productId) return;
    const fetchProduct = async () => {
        setLoading(true);
        const data = await getProductById(productId);
        setProduct(data);

        if (data) {
          const allProducts = await getProducts();
          const related = allProducts.filter(p => p.id !== data.id && p.mood === data.mood).slice(0, 2);
          setRelatedProducts(related);
        }

        setLoading(false);
    }
    fetchProduct();
  }, [productId]);
  
  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    alert(`${product.name} added to your cart!`);
  };

  // Discount logic: 10 INR off per 1000 points
  const discountUnits = Math.floor(totalPoints / 1000);
  const discountAmount = discountUnits * 10;

  if (loading) {
    return <div className="text-center py-20"><Loading size="large" label="Loading game" /></div>;
  }

  if (!product) {
    return <div className="text-center py-20">Product not found!</div>;
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-jj-gray-800/50 backdrop-blur-xl rounded-3xl shadow-lg p-8 border border-white/50 dark:border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
             <img src={product.imageUrl} alt={product.name} className="w-full rounded-3xl shadow-2xl object-cover aspect-square" />
          </div>

          <div>
            <div className="flex space-x-2 mb-2">
                {product.badges.map(badge => (
                    <span key={badge} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-jj-yellow text-jj-gray-900">{badge}</span>
                ))}
            </div>
            <h1 className="text-4xl font-extrabold text-jj-gray-900 dark:text-white tracking-tight">{product.name}</h1>
            <p className="mt-2 text-xl text-jj-gray-600 dark:text-jj-gray-300">{product.tagline}</p>
            
            <div className="mt-6">
                <p className="text-3xl font-bold text-jj-orange">₹{product.price}</p>
                {discountAmount > 0 && (
                    <div className="mt-3 p-3 bg-green-100 dark:bg-green-900/30 rounded-xl border border-green-200 dark:border-green-800 inline-block">
                        <p className="text-sm text-green-800 dark:text-green-300 font-bold flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
                            Loyalty Reward Available
                        </p>
                        <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                            You have {totalPoints} Points. Redeem them at <span className="font-extrabold">Checkout</span> to save up to ₹{discountAmount}!
                        </p>
                    </div>
                )}
            </div>
            
            <p className="mt-6 text-base text-jj-gray-900 dark:text-jj-gray-200 leading-relaxed">{product.description}</p>
            
            <div className="mt-8">
              <button onClick={handleAddToCart} className="w-full bg-jj-orange text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg">
                Add to Cart
              </button>
              <p className="mt-2 text-xs text-center text-jj-gray-500 dark:text-jj-gray-400">
                  Earn Joy Points by playing games in our Arcade!
              </p>
            </div>
            
            <div className="mt-10 border-t dark:border-jj-gray-700 pt-8">
                <div className="grid grid-cols-2 gap-4 text-sm text-jj-gray-900 dark:text-jj-gray-200">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-jj-blue" viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0115 15v3h1zM4.75 12.094A5.973 5.973 0 004 15v3H3v-3a3.005 3.005 0 011.25-2.406z" /></svg>
                        <span>{product.playerCount.min} - {product.playerCount.max} Players</span>
                    </div>
                     <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-jj-blue" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z" clipRule="evenodd" /></svg>
                        <span>{product.category}</span>
                    </div>
                </div>
            </div>

          </div>
        </div>

        <div className="mt-16 lg:mt-24 border-t dark:border-jj-gray-700 pt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-jj-gray-900 dark:text-white">Game Details</h2>
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold text-jj-gray-900 dark:text-white">The Concept</h3>
                            <p className="mt-2 text-jj-gray-800 dark:text-jj-gray-300">{product.concept}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-jj-gray-900 dark:text-white">How to Play</h3>
                            <p className="mt-2 text-jj-gray-800 dark:text-jj-gray-300 whitespace-pre-line">{product.howToPlay}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-jj-gray-900 dark:text-white">Ideal For</h3>
                            <ul className="mt-2 list-disc list-inside text-jj-gray-800 dark:text-jj-gray-300 space-y-1">
                                {product.useCases.map(useCase => <li key={useCase}>{useCase}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
                 <div>
                    <h2 className="text-2xl font-bold mb-6 text-jj-gray-900 dark:text-white">What's in the Box?</h2>
                    <ul className="list-disc list-inside text-jj-gray-800 dark:text-jj-gray-300 space-y-2 bg-white/50 dark:bg-jj-gray-700/50 p-6 rounded-3xl">
                        {/* This would come from the product data in a real app */}
                        <li>100x Custom Illustrated Cards</li>
                        <li>1x Rulebook</li>
                        <li>1x Scorepad</li>
                        <li>Endless Fun & Laughter</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-12 mb-6 text-jj-gray-900 dark:text-white">Pairs Well With</h2>
                    <div className="space-y-4">
                        {relatedProducts.map(rp => (
                            <Link to={`/shop/${rp.id}`} key={rp.id} className="flex items-center bg-white/50 dark:bg-jj-gray-700/50 p-3 rounded-3xl hover:shadow-lg transition-shadow">
                                <img src={rp.imageUrl} alt={rp.name} className="w-16 h-16 object-cover rounded-md mr-4"/>
                                <div>
                                    <p className="font-bold text-jj-gray-900 dark:text-white">{rp.name}</p>
                                    <p className="text-sm text-jj-gray-600 dark:text-jj-gray-400">{rp.tagline}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
