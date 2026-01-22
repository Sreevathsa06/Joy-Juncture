
import React, { useState, useEffect, useMemo } from 'react';
import { Event } from '../types';
import { useWallet } from '../contexts/WalletContext';
import { getEvents } from '../services/firestoreService';
import { animated, useTrail } from '@react-spring/web';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const { addPoints } = useWallet();
  const randomButtonColor = useMemo(() => (Math.random() > 0.5 ? 'bg-jj-sky' : 'bg-jj-pink'), []);

  const handleRegister = async () => {
    // Mock registration
    const pointsEarned = 50;
    await addPoints(`Registered for: ${event.name}`, pointsEarned);
    alert(`You're registered for ${event.name}! You've earned ${pointsEarned} Joy Points!`);
  };

  return (
    <MotionDiv 
        whileHover={{ scale: 1.01, transition: { type: 'spring', stiffness: 400 } }}
        className="w-full bg-white/50 dark:bg-jj-gray-800/50 backdrop-blur-2xl rounded-2xl shadow-lg border border-white/50 dark:border-white/10 overflow-hidden flex flex-row items-stretch h-32 sm:h-36 mb-4"
    >
      {/* Image Strip - Fixed width, full height */}
      <div className="w-32 sm:w-48 flex-shrink-0 relative">
          <img src={event.imageUrl} alt={event.name} className="absolute inset-0 w-full h-full object-cover" />
          {event.isPast && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><span className="text-white font-bold uppercase tracking-wider text-xs">Past</span></div>}
      </div>
      
      {/* Content Strip */}
      <div className="flex-grow p-4 flex flex-col justify-center min-w-0">
        <div className="flex justify-between items-center mb-1">
             <div className="flex items-center gap-2">
                 <span className="px-2 py-0.5 rounded-md bg-white/60 dark:bg-black/30 text-xs font-bold text-jj-gray-600 dark:text-jj-gray-300 uppercase tracking-wide">
                    {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
                <span className="text-xs text-jj-gray-500 dark:text-jj-gray-400 truncate hidden sm:inline">@ {event.location}</span>
            </div>
            {!event.isPast && (
                <span className="text-base font-bold text-jj-purple whitespace-nowrap">₹{event.price}</span>
            )}
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-jj-gray-900 dark:text-white leading-tight truncate pr-2">{event.name}</h3>
        <p className="text-sm text-jj-gray-700 dark:text-jj-gray-400 mt-1 line-clamp-1 sm:line-clamp-2">{event.description}</p>
        
        {!event.isPast && (
            <div className="mt-auto pt-2 flex justify-end">
                <button onClick={handleRegister} className={`text-xs ${randomButtonColor} text-white font-bold py-1.5 px-4 rounded-full hover:bg-opacity-90 transition-colors shadow-sm`}>
                Register
                </button>
            </div>
        )}
      </div>
    </MotionDiv>
  );
};

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const data = await getEvents();
      // Add many more events for demonstration
      const moreEvents: Event[] = [
        { id: 'evt10', name: 'Couples Game Night: Valentine\'s Special', date: '2026-02-14T19:00:00Z', location: 'The Love Shack Cafe', description: 'A romantic evening of two-player games.', price: 2999, imageUrl: 'https://picsum.photos/seed/love/600/400', isPast: false },
        { id: 'evt11', name: 'Strategy Board Game Bootcamp', date: '2026-03-05T10:00:00Z', location: 'University Hall', description: 'A full-day deep dive into complex strategy games.', price: 4999, imageUrl: 'https://picsum.photos/seed/strategy/600/400', isPast: false },
        { id: 'evt12', name: 'Family Fun Day', date: '2026-03-20T13:00:00Z', location: 'City Park Pavilion', description: 'Easy-to-learn games for all ages. Kids play free!', price: 799, imageUrl: 'https://picsum.photos/seed/family/600/400', isPast: false },
        { id: 'evt13', name: 'Indie Game Showcase', date: '2026-04-10T18:00:00Z', location: 'Artisan Gallery', description: 'Play the latest creations from independent game designers.', price: 249, imageUrl: 'https://picsum.photos/seed/indie/600/400', isPast: false },
        { id: 'evt14', name: 'Murder Mystery: The Great Gatsby', date: '2025-11-15T19:30:00Z', location: 'The Grand Hotel', description: 'A 1920s themed murder mystery dinner party.', price: 7999, imageUrl: 'https://picsum.photos/seed/gatsby/600/400', isPast: false },
        { id: 'evt15', name: 'Learn to Play: Dungeons & Dragons', date: '2025-10-05T18:00:00Z', location: 'The Adventurer\'s Guild', description: 'A beginner-friendly introduction to the world\'s most popular RPG.', price: 999, imageUrl: 'https://picsum.photos/seed/dnd/600/400', isPast: false },
      ];
      setEvents([...data, ...moreEvents]);
      setLoading(false);
    }
    fetchEvents();
  }, []);
  
  const upcomingEvents = events.filter(e => !e.isPast);
  const pastEvents = events.filter(e => e.isPast);

  const trail = useTrail(upcomingEvents.length, {
      from: { opacity: 0, transform: 'translateY(10px)' },
      to: { opacity: 1, transform: 'translateY(0px)' },
      config: { mass: 1, tension: 300, friction: 30 },
  });

  return (
    <div className="py-16 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-jj-gray-900 dark:text-white">Play Together (Live)</h1>
          <p className="mt-6 text-xl text-jj-gray-900 dark:text-jj-gray-300 max-w-3xl mx-auto">There's a special kind of magic that happens when people play together in person. Join our game nights, workshops, and community gatherings.</p>
        </div>

        <section className="w-full">
          <h2 className="text-3xl font-bold mb-8 text-jj-gray-900 dark:text-white">Upcoming Events</h2>
          {loading ? <p>Loading events...</p> : (
            <div className="flex flex-col w-full">
              {upcomingEvents.length > 0 ? (
                trail.map((style, index) => (
                    <animated.div style={style} key={upcomingEvents[index].id} className="w-full">
                        <EventCard event={upcomingEvents[index]} />
                    </animated.div>
                ))
              ) : (
                <p className="text-center text-jj-gray-800 dark:text-jj-gray-400 py-8 bg-white/50 rounded-3xl">No upcoming events are scheduled at the moment.</p>
              )}
            </div>
          )}
        </section>

        <section className="mt-20 w-full">
          <h2 className="text-3xl font-bold mb-8 text-jj-gray-900 dark:text-white">Past Event Showcase</h2>
           {loading ? <p>Loading events...</p> : (
            <div className="flex flex-col w-full">
              {pastEvents.map(event => <EventCard key={event.id} event={event} />)}
            </div>
           )}
        </section>
      </div>
    </div>
  );
};

export default Events;