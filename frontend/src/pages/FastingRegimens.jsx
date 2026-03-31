import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const exercises = [
  { name: '5-min Desk Stretch', duration: '5 min', icon: '🧘', color: '#006947', bg: 'linear-gradient(135deg,#006947,#58e7ab)' },
  { name: '10-min Cardio Burst', duration: '10 min', icon: '🏃', color: '#0057bd', bg: 'linear-gradient(135deg,#0057bd,#a9c4ff)' },
  { name: '5-min Mindful Breathing', duration: '5 min', icon: '🌬️', color: '#815100', bg: 'linear-gradient(135deg,#815100,#f8a010)' },
];

const badges = [
  { label: 'Daily Move', icon: '🏅', unlocked: true },
  { label: 'Consistent', icon: '🏆', unlocked: true },
  { label: 'Night Owl', icon: '🌙', unlocked: false },
];

const fadeUp = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

export default function FastingRegimens() {
  const [active, setActive] = useState(null);

  return (
    <div>
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <h1 className="text-2xl font-extrabold" style={{ fontFamily: 'Plus Jakarta Sans', color: '#2c2f31', letterSpacing: '-0.03em' }}>
          Pulse Exercises
        </h1>
        <p className="text-sm mt-0.5" style={{ color: '#595c5e' }}>Quick wins for a healthier day.</p>
      </div>

      <motion.div variants={stagger} initial="hidden" animate="show" className="px-5 space-y-4 pb-6">
        {/* Streak Hero Card */}
        <motion.div
          variants={fadeUp}
          className="rounded-3xl p-5 text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #005a3c 0%, #006947 60%, #00b468 100%)' }}
        >
          <div className="absolute top-3 right-4 text-xs font-semibold opacity-70 uppercase tracking-widest">Daily Momentum</div>
          <div className="mt-6">
            <p className="text-4xl font-extrabold" style={{ fontFamily: 'Plus Jakarta Sans', letterSpacing: '-0.04em' }}>
              7 Day Pulse<br />Streak!
            </p>
            <p className="text-sm mt-2 opacity-80">
              You're in the top 5% of "Healthifiers" users this week. Keep the energy flowing!
            </p>
          </div>
          {/* Streak dots */}
          <div className="flex gap-2 mt-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <motion.div
                key={i}
                className="h-1.5 flex-1 rounded-full"
                style={{ background: 'rgba(255,255,255,0.5)' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Smart Nudge */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl p-4"
          style={{ background: '#eef1f3' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg" style={{ background: '#ffffff' }}>✨</div>
            <div className="flex-1">
              <p className="text-xs font-semibold" style={{ color: '#006947' }}>Smart Nudge</p>
              <p className="text-sm" style={{ color: '#2c2f31' }}>
                Feeling a bit sluggish? A 2-min walk at 60% max heart rate can boost your step count up to 78%.
              </p>
            </div>
          </div>
          <button className="mt-2 text-xs font-semibold" style={{ color: '#006947' }}>Let's go →</button>
        </motion.div>

        {/* Quick Wins */}
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold" style={{ fontFamily: 'Plus Jakarta Sans', color: '#2c2f31' }}>Quick Wins</p>
            <button className="text-xs" style={{ color: '#006947' }}>See all</button>
          </div>
          <div className="space-y-3">
            {exercises.map((ex, i) => (
              <motion.div key={ex.name} variants={fadeUp} className="rounded-2xl overflow-hidden" style={{ background: '#ffffff' }}>
                <div className="flex items-center justify-between p-3 pb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
                      style={{ background: '#eef1f3' }}
                    >{ex.icon}</div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#2c2f31' }}>{ex.name}</p>
                      <p className="text-xs" style={{ color: '#595c5e' }}>{ex.duration}</p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#eef1f3', color: '#595c5e' }}>Done</span>
                </div>
                <div className="px-3 pb-3">
                  <AnimatePresence>
                    {active === i && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="text-xs mb-2 overflow-hidden"
                        style={{ color: '#595c5e' }}
                      >
                        Stand up from your desk and follow along. Start slow and breathe deeply.
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActive(active === i ? null : i)}
                    className="w-full py-2 rounded-full text-sm font-semibold text-white flex items-center justify-center gap-2"
                    style={{ background: ex.bg }}
                  >
                    {active === i ? 'Stop ✓' : 'Start Now'} <ChevronRight size={14} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievement Badges */}
        <motion.div variants={fadeUp}>
          <p className="text-sm font-semibold mb-3" style={{ fontFamily: 'Plus Jakarta Sans', color: '#2c2f31' }}>Achievement Badges</p>
          <div className="flex gap-3">
            {badges.map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-1">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                  style={{
                    background: b.unlocked ? '#eef1f3' : '#f5f7f9',
                    opacity: b.unlocked ? 1 : 0.4,
                    border: b.unlocked ? '2px solid #69f6b8' : '2px solid #d9dde0',
                  }}
                >
                  {b.icon}
                </div>
                <span className="text-[10px] text-center" style={{ color: '#595c5e' }}>{b.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
