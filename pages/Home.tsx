
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { getEvents } from '../services/firestoreService';
import { Event } from '../types';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

const JourneyCard: React.FC<{ title: string; description: string; link: string; color: string; icon: any }> = ({ title, description, link, color, icon }) => (
    <Link to={link} className="block h-full">
        <MotionDiv 
            whileHover={{ y: -10, scale: 1.02 }}
            className={`h-full p-8 rounded-3xl ${color} backdrop-blur-xl border border-white/20 shadow-lg flex flex-col items-start`}
        >
            <div className="p-3 bg-white/60 dark:bg-white/10 rounded-2xl mb-4 text-jj-gray-900 dark:text-white">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-jj-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-jj-gray-700 dark:text-jj-gray-200 mb-6 flex-grow">{description}</p>
            <span className="font-bold text-jj-gray-900 dark:text-white flex items-center gap-2">
                Explore <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
        </MotionDiv>
    </Link>
);

const Home: React.FC = () => {
  const { totalPoints } = useWallet();
  const [upcomingEvent, setUpcomingEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const allEvents = await getEvents();
      setUpcomingEvent(allEvents.find(e => !e.isPast) || null);
    };
    fetchData();
  }, []);

  return (
    <div className="overflow-x-hidden">
      
      {/* SECTION 1: HERO (Emotional Hook) - Parallax Removed */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 pt-20">
        <div className="max-w-4xl relative z-10">
            <h1 className="text-6xl md:text-8xl font-extrabold text-jj-gray-900 dark:text-white tracking-tight leading-tight mb-6">
                Design Joy.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-jj-purple via-jj-blue to-jj-sky">Build Play.</span><br/>
                Create Belonging.
            </h1>
            <p className="text-xl md:text-2xl text-jj-gray-800 dark:text-jj-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                Games are not just products. They are moments, memories, and shared joy. Discover your next adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/shop" className="bg-jj-yellow text-jj-gray-900 font-bold py-4 px-8 rounded-full text-lg shadow-xl hover:scale-105 transition-transform">
                    Shop Games
                </Link>
                <Link to="/play" className="bg-white/20 backdrop-blur-md border border-white/30 text-jj-gray-900 dark:text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white/30 transition-all">
                    Play Now (Free)
                </Link>
            </div>
        </div>
      </section>

      {/* SECTION 2: CHOOSE YOUR PLAY STYLE (4 Core Journeys) */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-jj-gray-900 dark:text-white">How Do You Want to Play?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <JourneyCard 
                title="Play at Home" 
                description="Board games, card games, and puzzles for friends and family."
                link="/shop"
                color="bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/50 dark:to-indigo-900/50"
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
            />
            <JourneyCard 
                title="Play Together" 
                description="Live game nights, workshops, and community gatherings."
                link="/events"
                color="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/50 dark:to-cyan-900/50"
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.274-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.274.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
            />
            <JourneyCard 
                title="Play for Occasions" 
                description="Curated experiences for corporates, weddings, and birthdays."
                link="/experiences"
                color="bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/50 dark:to-red-900/50"
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" /></svg>}
            />
            <JourneyCard 
                title="Play & Belong" 
                description="Earn points, solve riddles, and join the community."
                link="/community"
                color="bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/50 dark:to-rose-900/50"
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>}
            />
        </div>
      </section>

      {/* SECTION 3: WHAT'S HAPPENING NOW */}
      <section className="py-16 bg-white/30 dark:bg-black/20 backdrop-blur-sm border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4">
             <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-jj-gray-900 dark:text-white flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    What's Happening Now
                </h2>
                <Link to="/events" className="text-jj-purple font-bold hover:underline">View All &rarr;</Link>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Active Event */}
                {upcomingEvent && (
                    <div className="bg-white/70 dark:bg-jj-gray-800/70 p-6 rounded-3xl shadow-lg border border-white/20">
                        <span className="text-xs font-bold text-jj-red uppercase tracking-wider mb-2 block">Upcoming Event</span>
                        <h3 className="text-xl font-bold text-jj-gray-900 dark:text-white mb-2">{upcomingEvent.name}</h3>
                        <p className="text-sm text-jj-gray-600 dark:text-jj-gray-300 mb-4">{upcomingEvent.description}</p>
                        <Link to="/events" className="text-sm font-bold text-jj-blue underline">Register Now</Link>
                    </div>
                )}
                {/* Active Puzzle */}
                <div className="bg-white/70 dark:bg-jj-gray-800/70 p-6 rounded-3xl shadow-lg border border-white/20">
                     <span className="text-xs font-bold text-jj-orange uppercase tracking-wider mb-2 block">Daily Challenge</span>
                     <h3 className="text-xl font-bold text-jj-gray-900 dark:text-white mb-2">Daily Sudoku #42</h3>
                     <p className="text-sm text-jj-gray-600 dark:text-jj-gray-300 mb-4">Solve today's puzzle to earn 25 Joy Points instantly.</p>
                     <Link to="/play" className="text-sm font-bold text-jj-blue underline">Play Now</Link>
                </div>
                {/* New Release */}
                <div className="bg-white/70 dark:bg-jj-gray-800/70 p-6 rounded-3xl shadow-lg border border-white/20">
                     <span className="text-xs font-bold text-jj-purple uppercase tracking-wider mb-2 block">Just Arrived</span>
                     <h3 className="text-xl font-bold text-jj-gray-900 dark:text-white mb-2">Mehfil</h3>
                     <p className="text-sm text-jj-gray-600 dark:text-jj-gray-300 mb-4">A new storytelling game that brings people closer.</p>
                     <Link to="/shop/mehfil" className="text-sm font-bold text-jj-blue underline">Shop Now</Link>
                </div>
             </div>
        </div>
      </section>

      {/* SECTION 4 REMOVED: Proof of Joy / Quotes */}

      {/* SECTION 5: GAMIFICATION TEASER */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-pink-100 dark:bg-pink-950/40 shadow-2xl">
          {/* Animated Floating Shapes Background */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              {/* Material Expressive Shapes: Flower/Scallop, Star, Circle */}
              <MotionDiv initial={{ y: 100, opacity: 0 }} animate={{ y: -500, opacity: [0, 0.4, 0], rotate: 120 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute bottom-[-10%] left-[5%] text-pink-300 dark:text-pink-500/30"><svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C13.1 2 14 2.9 14 4C14 2.9 14.9 2 16 2C17.1 2 18 2.9 18 4C18 5.1 18.9 6 20 6C21.1 6 22 6.9 22 8C22 9.1 21.1 10 20 10C21.1 10 22 10.9 22 12C22 13.1 21.1 14 20 14C21.1 14 22 14.9 22 16C22 17.1 21.1 18 20 18C18.9 18 18 18.9 18 20C18 21.1 17.1 22 16 22C14.9 22 14 21.1 14 20C14 21.1 13.1 22 12 22C10.9 22 10 21.1 10 20C10 21.1 9.1 22 8 22C6.9 22 6 21.1 6 20C6 18.9 5.1 18 4 18C2.9 18 2 17.1 2 16C2 14.9 2.9 14 4 14C2.9 14 2 13.1 2 12C2 10.9 2.9 10 4 10C2.9 10 2 9.1 2 8C2 6.9 2.9 6 4 6C5.1 6 6 5.1 6 4C6 2.9 6.9 2 8 2C9.1 2 10 2.9 10 4C10 2.9 10.9 2 12 2Z"/></svg></MotionDiv>
              <MotionDiv initial={{ y: 100, opacity: 0 }} animate={{ y: -500, opacity: [0, 0.3, 0], rotate: -90 }} transition={{ duration: 25, repeat: Infinity, delay: 3, ease: "linear" }} className="absolute bottom-[-10%] left-[80%] text-purple-300 dark:text-purple-500/30"><svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"/></svg></MotionDiv>
              <MotionDiv initial={{ y: 100, opacity: 0 }} animate={{ y: -500, opacity: [0, 0.3, 0], rotate: 45 }} transition={{ duration: 18, repeat: Infinity, delay: 7, ease: "linear" }} className="absolute bottom-[-10%] left-[40%] text-pink-400 dark:text-pink-600/30"><svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="4" /></svg></MotionDiv>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 p-12 md:p-16">
            <div className="flex-1">
                <span className="bg-white/60 dark:bg-white/10 text-jj-purple dark:text-pink-200 px-4 py-1.5 rounded-full text-sm font-bold mb-6 inline-block backdrop-blur-md">The Joy Engine</span>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-jj-gray-900 dark:text-white">Play More. Earn More.</h2>
                <p className="text-lg md:text-xl text-jj-gray-700 dark:text-pink-100/80 mb-10 leading-relaxed">Every game you buy, every event you attend, and every puzzle you solve adds to your Joy Wallet. Redeem points for exclusive discounts and rewards.</p>
                <Link to="/wallet" className="bg-jj-gray-900 dark:bg-white text-white dark:text-jj-gray-900 font-bold py-4 px-10 rounded-full shadow-xl hover:scale-105 transition-transform inline-block">
                    Check Your Wallet
                </Link>
            </div>
            <div className="flex-1 flex justify-center">
                 <div className="bg-white/40 dark:bg-black/20 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/40 dark:border-white/10 shadow-xl max-w-sm w-full">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-sm font-bold text-jj-gray-600 dark:text-pink-200 tracking-wider">CURRENT BALANCE</span>
                        <svg className="w-6 h-6 text-jj-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div className="text-5xl font-extrabold mb-2 text-jj-gray-900 dark:text-white">{totalPoints}</div>
                    <div className="text-sm text-jj-gray-600 dark:text-pink-200 mb-8">Joy Points</div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-jj-gray-700 dark:text-pink-100">Solved Sudoku</span>
                            <span className="text-green-600 dark:text-green-400 font-bold">+25</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-jj-gray-700 dark:text-pink-100">Purchased Mehfil</span>
                            <span className="text-green-600 dark:text-green-400 font-bold">+250</span>
                        </div>
                    </div>
                 </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
