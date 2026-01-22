
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts } from '../services/firestoreService';

interface BlogPost {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    imageUrl: string;
}

const Community: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const data = await getBlogPosts();
            setPosts(data as BlogPost[]);
            setLoading(false);
        }
        fetchPosts();
    }, []);

  return (
    <div className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-jj-gray-900 dark:text-white">Play & Belong</h1>
          <p className="mt-4 text-lg text-jj-gray-900 dark:text-jj-gray-300 max-w-3xl mx-auto">This is the heart of Joy Juncture. Dive into stories from our community, learn new game strategies, and get a behind-the-scenes look at what we're building.</p>
        </div>

        {loading ? <p className="text-center">Loading posts...</p> : (
            <div className="space-y-12">
            {posts.map((post) => (
                <Link to="#" key={post.id} className="group block bg-white/70 dark:bg-jj-gray-800/70 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-white/50 dark:border-white/10">
                <div className="md:flex">
                    <div className="md:w-1/3">
                        <img className="w-full h-64 object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none" src={post.imageUrl} alt={post.title} />
                    </div>
                    <div className="p-8 md:w-2/3">
                    <p className="text-sm text-jj-orange font-semibold">{new Date(post.date).toLocaleDateString()}</p>
                    <h2 className="mt-2 text-2xl font-bold text-jj-gray-900 dark:text-white group-hover:text-jj-blue transition-colors">{post.title}</h2>
                    <p className="mt-4 text-jj-gray-900 dark:text-jj-gray-300">{post.excerpt}</p>
                    <div className="mt-6 flex items-center">
                        <span className="font-semibold text-jj-blue group-hover:underline">Read The Full Story &rarr;</span>
                    </div>
                    </div>
                </div>
                </Link>
            ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default Community;
