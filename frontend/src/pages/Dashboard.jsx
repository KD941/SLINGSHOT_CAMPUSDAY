import { motion } from 'framer-motion';
import { Bell, Apple, ChevronRight, TrendingDown } from 'lucide-react';

// Circular progress ring component
function Ring({ radius, stroke, value, max, color, label, unit }) {
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = Math.min(value / max, 1);
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative">
        <svg width={radius * 2} height={radius * 2} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={radius} cy={radius} r={normalizedRadius}
            fill="none" stroke="#e5e9eb" strokeWidth={stroke}
          />
          <motion.circle
            cx={radius} cy={radius} r={normalizedRadius}
            fill="none" stroke={color} strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ transform: 'none' }}>
          <span className="text-sm font-bold" style={{ color: '#2c2f31' }}>{value}{unit}</span>
        </div>
      </div>
      <span className="text-[11px]" style={{ color: '#595c5e' }}>{label}</span>
    </div>
  );
}

const fadeUp = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

export default function Dashboard() {
  return (
    <div>
      {/* Header */}
      <div className="px-5 pt-12 pb-4" style={{ background: '#f5f7f9' }}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #006947, #58e7ab)' }}
            >K</div>
            <span className="text-sm font-medium" style={{ color: '#595c5e' }}>Good afternoon, Alex</span>
          </div>
          <button className="relative">
            <Bell size={20} style={{ color: '#595c5e' }} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500" />
          </button>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-extrabold mt-3 leading-tight"
          style={{ fontFamily: 'Plus Jakarta Sans', color: '#2c2f31', letterSpacing: '-0.03em' }}
        >
          Ready to stay{' '}
          <span style={{ color: '#006947' }}>on<br />track?</span>
        </motion.h1>
        <p className="text-sm mt-1" style={{ color: '#595c5e' }}>Your health is making great strides today.</p>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="px-5 space-y-5 pb-6"
      >
        {/* Daily Summary Card */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl p-5"
          style={{ background: '#ffffff' }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold" style={{ fontFamily: 'Plus Jakarta Sans', color: '#2c2f31' }}>Daily Summary</span>
            <span
              className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
              style={{ background: '#006947', color: '#ffffff' }}
            >Today</span>
          </div>
          <div className="flex items-center justify-around">
            <Ring radius={42} stroke={7} value={1.4} max={2.2} color="#006947" label="Calories" unit="k" />
            <Ring radius={42} stroke={7} value={1.8} max={3}   color="#0057bd" label="Water"    unit="L" />
            <Ring radius={42} stroke={7} value={45} max={60}   color="#815100" label="Activity"  unit="m" />
          </div>
        </motion.div>

        {/* Weight Trend */}
        <motion.div variants={fadeUp} className="rounded-2xl p-4" style={{ background: '#ffffff' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold" style={{ fontFamily: 'Plus Jakarta Sans', color: '#2c2f31' }}>Weight Trend</span>
            <span className="text-xs" style={{ color: '#595c5e' }}>This Week</span>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: '#eef1f3' }}
            >
              <TrendingDown size={16} style={{ color: '#006947' }} />
            </div>
            <div>
              <p className="text-base font-bold" style={{ color: '#2c2f31' }}>-1.0kg</p>
              <p className="text-xs" style={{ color: '#595c5e' }}>from last week</p>
            </div>
            {/* Mini bar chart */}
            <div className="flex items-end gap-1 ml-auto h-8">
              {[70.5, 70.2, 70.0, 69.8, 69.5, 69.3, 69.0].map((v, i) => (
                <motion.div
                  key={i}
                  className="w-3 rounded-t"
                  style={{ background: i === 6 ? '#006947' : '#e5e9eb' }}
                  initial={{ height: 0 }}
                  animate={{ height: `${((v - 68.5) / 2.5) * 32}px` }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: 'easeOut' }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Food of the Day */}
        <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden" style={{ background: '#ffffff' }}>
          <div
            className="h-36 flex items-end p-4 relative"
            style={{
              background: 'linear-gradient(180deg, rgba(0,105,71,0.1) 0%, rgba(0,105,71,0.05) 100%), #eef1f3',
            }}
          >
            {/* Food emoji as placeholder */}
            <div className="absolute inset-0 flex items-center justify-center text-7xl select-none">🥗</div>
            <span
              className="relative text-xs font-semibold px-2 py-0.5 rounded-full z-10"
              style={{ background: '#006947', color: '#fff' }}
            >AI Pick</span>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="font-bold text-base" style={{ fontFamily: 'Plus Jakarta Sans', color: '#2c2f31' }}>
                Super-Green Power Bowl
              </p>
              <ChevronRight size={16} style={{ color: '#747779' }} />
            </div>
            <div className="flex gap-3 text-xs mb-2" style={{ color: '#595c5e' }}>
              <span><strong style={{ color: '#2c2f31' }}>420</strong> kcal</span>
              <span><strong style={{ color: '#2c2f31' }}>24g</strong> protein</span>
              <span><strong style={{ color: '#2c2f31' }}>42g</strong> carbs</span>
              <span><strong style={{ color: '#2c2f31' }}>12g</strong> fat</span>
            </div>
            <div className="rounded-xl p-3" style={{ background: '#eef1f3' }}>
              <div className="flex items-center gap-1.5 mb-1">
                <Apple size={12} style={{ color: '#006947' }} />
                <span className="text-xs font-semibold" style={{ color: '#006947' }}>AI Insight</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#595c5e' }}>
                Perfect for your morning energy and metabolic boost before your marathon training run.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Upcoming */}
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold" style={{ fontFamily: 'Plus Jakarta Sans', color: '#2c2f31' }}>Upcoming</span>
            <button className="text-xs font-medium" style={{ color: '#006947' }}>View All</button>
          </div>
          <div className="space-y-2">
            {[
              { time: '12:30 PM', label: 'Balanced Lunch', icon: '🥙', color: '#006947' },
              { time: '2:00 PM',  label: '30 min Yoga',    icon: '🧘', color: '#0057bd' },
              { time: '6:00 PM',  label: 'Wind Down',      icon: '🌙', color: '#595c5e' },
            ].map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ x: 3 }}
                className="flex items-center gap-3 rounded-2xl p-3 cursor-pointer"
                style={{ background: '#ffffff' }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0"
                  style={{ background: '#eef1f3' }}
                >{item.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: '#2c2f31' }}>{item.label}</p>
                  <p className="text-xs" style={{ color: '#595c5e' }}>{item.time}</p>
                </div>
                <ChevronRight size={16} style={{ color: '#abadaf' }} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
