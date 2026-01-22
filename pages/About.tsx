
import React from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;
const MotionImg = motion.img as any;

const About: React.FC = () => {
  return (
    <div>
      {/* BRAND STORY */}
      <section className="py-24 bg-white/30 dark:bg-jj-gray-800/30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 text-center">
            <MotionDiv 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-5xl font-extrabold text-jj-gray-900 dark:text-white mb-8">Designing Joy, Building Connection</h1>
                <p className="text-xl md:text-2xl text-jj-gray-800 dark:text-jj-gray-200 leading-relaxed max-w-4xl mx-auto">
                    Joy Juncture is a playful, experience-driven brand built on one core belief: <span className="font-bold text-jj-purple">Games are not just products. They are moments, memories, and shared joy.</span>
                </p>
                <p className="mt-6 text-lg text-jj-gray-700 dark:text-jj-gray-300 max-w-3xl mx-auto">
                    We operate at the intersection of board games, live events, and community. We aren't just a store; we are a digital playground designed to bring people together, offline and online.
                </p>
            </MotionDiv>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white/60 dark:bg-jj-gray-800/60 rounded-3xl shadow-lg border-t-4 border-jj-pink">
                <h3 className="text-2xl font-bold text-jj-pink mb-4">Playfulness First</h3>
                <p className="text-jj-gray-700 dark:text-jj-gray-300">We champion the pure, unfiltered fun of play. Laughter is our primary metric of success.</p>
            </div>
            <div className="p-8 bg-white/60 dark:bg-jj-gray-800/60 rounded-3xl shadow-lg border-t-4 border-jj-blue">
                <h3 className="text-2xl font-bold text-jj-blue mb-4">Connection</h3>
                <p className="text-jj-gray-700 dark:text-jj-gray-300">Games are tools to break ice and build bonds. We design for interaction, not just distraction.</p>
            </div>
            <div className="p-8 bg-white/60 dark:bg-jj-gray-800/60 rounded-3xl shadow-lg border-t-4 border-jj-orange">
                <h3 className="text-2xl font-bold text-jj-orange mb-4">Belonging</h3>
                <p className="text-jj-gray-700 dark:text-jj-gray-300">Everyone is welcome at our table. We build communities where every player feels at home.</p>
            </div>
        </div>
      </section>

      {/* FOUNDER STORY */}
      <section className="py-24 bg-jj-blue/10 dark:bg-jj-blue/5">
        <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2 relative">
                    <div className="absolute inset-0 bg-jj-yellow rounded-3xl transform rotate-3"></div>
                    <MotionImg 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        src="https://picsum.photos/seed/founder/600/700" 
                        alt="Founder" 
                        className="relative rounded-3xl shadow-2xl w-full object-cover transform -rotate-2 hover:rotate-0 transition-transform duration-500" 
                    />
                </div>
                <div className="md:w-1/2">
                    <h2 className="text-4xl font-extrabold text-jj-gray-900 dark:text-white mb-6">The Origin Story</h2>
                    <p className="text-lg text-jj-gray-800 dark:text-jj-gray-300 mb-4">
                        Joy Juncture started not in a boardroom, but around a dining table cluttered with game boards and snack bowls. Growing up, our founder realized that game nights were sacred—a time when screens were down, and genuine laughter filled the room.
                    </p>
                    <p className="text-lg text-jj-gray-800 dark:text-jj-gray-300 mb-4">
                        After witnessing the disconnect in modern social gatherings and corporate environments, the mission became clear: <span className="font-bold">Bottle that magic.</span>
                    </p>
                    <p className="text-lg text-jj-gray-800 dark:text-jj-gray-300">
                        What began as a simple prototype for "Dead Man's Deck" has evolved into a movement. Today, Joy Juncture helps thousands of people reclaim the simple art of playing together.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* TIMELINE SECTION REMOVED */}
    </div>
  );
};

export default About;
