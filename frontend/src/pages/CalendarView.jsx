import { motion } from 'framer-motion';
import { CalendarDays, Plus, Trophy, Heart, Leaf } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const eventTypeConfig = {
  endurance: { color: 'bg-orange-500/15 text-orange-400 border-orange-800/30', icon: Trophy },
  wellness:  { color: 'bg-emerald-500/15 text-emerald-400 border-emerald-800/30', icon: Leaf },
  milestone: { color: 'bg-purple-500/15 text-purple-400 border-purple-800/30', icon: Heart },
};

const events = [
  { title: 'Marathon', date: '2026-04-03', eventType: 'endurance', description: 'City marathon — 42km race. Preparing with high-carb meals.' },
  { title: 'Yoga Day', date: '2026-04-05', eventType: 'wellness', description: 'Group yoga session in the park. Light meal recommended beforehand.' },
  { title: 'Wedding', date: '2026-04-28', eventType: 'milestone', description: 'Family wedding. Aiming to reach target weight by this date.' },
];

// Get current month's calendar days
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const daysInMonth = new Date(year, month + 1, 0).getDate();
const firstDay = new Date(year, month, 1).getDay();

const eventDates = new Set(events.map(e => new Date(e.date).getDate()));

export default function CalendarView() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Calendar</h1>
          <p className="text-slate-400 mt-1 text-sm">Your upcoming events and meal plan schedule.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} /> Add Event
        </motion.button>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Calendar grid */}
        <motion.div
          variants={fadeUp}
          className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <CalendarDays size={18} className="text-emerald-400" />
            <h2 className="font-semibold text-slate-100">
              {today.toLocaleString('default', { month: 'long' })} {year}
            </h2>
          </div>

          {/* Day headings */}
          <div className="grid grid-cols-7 mb-2">
            {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
              <div key={d} className="text-center text-xs text-slate-500 font-medium py-1">{d}</div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
              const isToday = day === today.getDate();
              const hasEvent = eventDates.has(day);
              return (
                <motion.div
                  key={day}
                  whileHover={{ scale: 1.1 }}
                  className={`relative aspect-square flex flex-col items-center justify-center rounded-lg text-sm cursor-pointer transition-colors
                    ${isToday ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'}
                  `}
                >
                  {day}
                  {hasEvent && !isToday && (
                    <div className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-400" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Event list */}
        <motion.div
          variants={fadeUp}
          className="bg-slate-900 border border-slate-800 rounded-xl p-6"
        >
          <h2 className="font-semibold text-slate-100 mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {events.map((event) => {
              const cfg = eventTypeConfig[event.eventType];
              const Icon = cfg.icon;
              return (
                <motion.div
                  key={event.title}
                  whileHover={{ x: 3 }}
                  className={`border rounded-lg p-4 ${cfg.color}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={14} />
                    <p className="text-sm font-semibold">{event.title}</p>
                  </div>
                  <p className="text-xs opacity-70 mb-2">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  <p className="text-xs opacity-80 leading-relaxed">{event.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
