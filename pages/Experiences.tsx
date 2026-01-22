
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const VerticalCard: React.FC<{ id: string; title: string; subtitle: string; description: string; items: string[]; color: string }> = ({ id, title, subtitle, description, items, color }) => (
    <div id={id} className="bg-white/70 dark:bg-jj-gray-800/70 backdrop-blur-xl rounded-3xl p-8 border border-white/50 dark:border-white/10 shadow-lg scroll-mt-32">
        <h3 className={`text-2xl font-bold ${color} mb-2`}>{title}</h3>
        <h4 className="text-lg font-semibold text-jj-gray-900 dark:text-white mb-4">{subtitle}</h4>
        <p className="text-jj-gray-700 dark:text-jj-gray-300 mb-6 leading-relaxed">{description}</p>
        <ul className="space-y-2">
            {items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-jj-gray-800 dark:text-jj-gray-200">
                    <svg className={`w-5 h-5 ${color} mt-0.5 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {item}
                </li>
            ))}
        </ul>
        <button className={`mt-8 w-full py-3 rounded-xl border-2 font-bold transition-all ${color.replace('text-', 'border-')} ${color.replace('text-', 'text-')} hover:bg-gray-50 dark:hover:bg-gray-800`}>
            Enquire for {title}
        </button>
    </div>
);

const Experiences: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Our experience designer will contact you shortly.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-jj-gray-900 dark:text-white">Play for Occasions</h1>
          <p className="mt-6 text-xl text-jj-gray-800 dark:text-jj-gray-300 max-w-3xl mx-auto">
            Go beyond standard entertainment. We partner with you to design unforgettable, curated game experiences for your most important events.
          </p>
        </div>

        {/* Verticals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <VerticalCard 
                id="corporate"
                title="Corporate Engagement"
                subtitle="Team Building & Employee Joy"
                description="From silo-breaking workshops to monthly engagement kits. We help you boost morale and foster genuine collaboration."
                color="text-jj-blue"
                items={[
                    "Team Building Workshops",
                    "Monthly Engagement Kits",
                    "Leadership Strategy Games",
                    "Office Olympics"
                ]}
            />
            <VerticalCard 
                id="wedding"
                title="Weddings"
                subtitle="Interactive Entertainment & Hampers"
                description="Ditch the boring reception lulls. We create unique interactive games and bespoke hampers that get guests mingling."
                color="text-jj-pink"
                items={[
                    "Custom 'Couple Trivia'",
                    "Table Ice-Breaker Kits",
                    "Lawn Game Zones",
                    "Return Gift Game Hampers"
                ]}
            />
            <VerticalCard 
                id="birthday"
                title="Birthdays & Private"
                subtitle="Themed Parties & Murder Mysteries"
                description="Make your celebration legendary. Whether it's a murder mystery dinner or a high-energy tournament."
                color="text-jj-purple"
                items={[
                    "Hosted Murder Mysteries",
                    "Themed Game Tournaments",
                    "Customized Birthday Games",
                    "Kids & Adult Parties"
                ]}
            />
            <VerticalCard 
                id="carnival"
                title="Carnivals & Zones"
                subtitle="Large Scale Experience Zones"
                description="We design and manage high-throughput game zones for festivals, malls, and public events."
                color="text-jj-orange"
                items={[
                    "Festival Game Stalls",
                    "Mall Activation Zones",
                    "Crowd Engagement Activities",
                    "Giant Board Games"
                ]}
            />
        </div>

        {/* Corporate Case Study */}
        <div className="bg-white/60 dark:bg-jj-gray-800/60 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-xl border border-white/50 dark:border-white/10 mb-20">
            <h2 className="text-3xl font-bold text-center mb-10 text-jj-gray-900 dark:text-white">Success Story: TechCorp Summit</h2>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                    <h3 className="text-xl font-bold text-jj-red">The Challenge</h3>
                    <p className="mt-2 text-jj-gray-900 dark:text-jj-gray-200">Disconnect between departments at a 200-person summit.</p>
                    <h3 className="text-xl font-bold text-jj-blue mt-6">The Solution</h3>
                    <p className="mt-2 text-jj-gray-900 dark:text-jj-gray-200">A custom 'Game of Zones' rotation featuring strategy, trivia, and collaboration stations.</p>
                </div>
                 <div>
                    <h3 className="text-xl font-bold text-jj-orange">The Outcome</h3>
                    <p className="mt-2 text-jj-gray-900 dark:text-jj-gray-200">"The energy was electric. We saw engineers strategizing with marketers. Best summit ever." — 95% Positive Feedback.</p>
                 </div>
            </div>
        </div>

        {/* Enquiry Form */}
        <div className="bg-white/70 dark:bg-jj-gray-800/70 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-xl border border-white/50 dark:border-white/10">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6 text-jj-gray-900 dark:text-white">Let's Plan Your Experience</h2>
                <form onSubmit={handleSubmit} className="space-y-4 text-left mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-jj-orange focus:border-jj-orange bg-white/50 dark:bg-jj-gray-700/50" placeholder="Full Name" />
                        <input type="email" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-jj-orange focus:border-jj-orange bg-white/50 dark:bg-jj-gray-700/50" placeholder="Email Address" />
                    </div>
                    <select required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-jj-orange focus:border-jj-orange bg-white/50 dark:bg-jj-gray-700/50">
                        <option value="">Select Experience Type...</option>
                        <option value="corporate">Corporate Engagement</option>
                        <option value="wedding">Wedding / Hamper</option>
                        <option value="birthday">Private Birthday</option>
                        <option value="carnival">Carnival / Large Event</option>
                    </select>
                    <textarea rows={4} required className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-jj-orange focus:border-jj-orange bg-white/50 dark:bg-jj-gray-700/50" placeholder="Tell us about your event (date, pax, vibe)..."></textarea>
                    <button type="submit" className="w-full bg-jj-orange text-white font-bold py-4 rounded-full hover:bg-opacity-90 transition-colors shadow-lg">
                        Send Enquiry
                    </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Experiences;
