import { motion } from 'framer-motion';
import { Activity, TrendingUp, Brain, ChevronRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

// A simple chart bar placeholder
function BarChart({ data }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-2 h-24">
      {data.map((val, i) => (
        <motion.div
          key={i}
          className="flex-1 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t"
          initial={{ height: 0 }}
          animate={{ height: `${(val / max) * 100}%` }}
          transition={{ duration: 0.6, delay: i * 0.05, ease: 'easeOut' }}
          title={`${val}`}
        />
      ))}
    </div>
  );
}

export default function HealthAnalysis() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-white">Health Analysis</h1>
        <p className="text-slate-400 mt-1 text-sm">AI-powered insights based on your weekly data.</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* AI Insight Card */}
        <motion.div
          variants={fadeUp}
          className="lg:col-span-2 bg-gradient-to-br from-emerald-950 to-slate-900 border border-emerald-800/40 rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Brain size={18} className="text-emerald-400" />
            <h2 className="font-semibold text-slate-100">Gemini AI Summary</h2>
            <span className="text-xs bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full ml-auto">This Week</span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">
            You are maintaining a great streak and your weight trend is steadily improving. Keep up
            the high-carb, moderate-protein diet as you prepare for your upcoming marathon — your
            body is adapting well and your fasting adherence has been excellent this week!
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs text-slate-500">Trend Score:</span>
            <div className="flex gap-1">
              {[1,2,3,4,5,6,7,8,9,10].map(n => (
                <div
                  key={n}
                  className={`w-3 h-3 rounded-sm ${n <= 8 ? 'bg-emerald-500' : 'bg-slate-700'}`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-emerald-400 ml-1">8/10</span>
          </div>
        </motion.div>

        {/* Weight Chart */}
        <motion.div
          variants={fadeUp}
          className="bg-slate-900 border border-slate-800 rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={18} className="text-sky-400" />
            <h2 className="font-semibold text-slate-100">Weight (kg)</h2>
          </div>
          <BarChart data={[70.5, 70.2, 70.0, 69.8, 69.5, 69.3, 69.0]} />
          <div className="flex justify-between mt-2 text-xs text-slate-500">
            <span>Mon</span><span>Tue</span><span>Wed</span>
            <span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </motion.div>

        {/* Fasting Adherence */}
        <motion.div
          variants={fadeUp}
          className="bg-slate-900 border border-slate-800 rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Activity size={18} className="text-violet-400" />
            <h2 className="font-semibold text-slate-100">Fasting Adherence</h2>
          </div>
          <BarChart data={[16, 14, 16, 15, 16, 16, 12]} />
          <div className="flex justify-between mt-2 text-xs text-slate-500">
            <span>Mon</span><span>Tue</span><span>Wed</span>
            <span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
          <p className="text-xs text-slate-500 mt-4">Target: 16h fast per day</p>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          variants={fadeUp}
          className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6"
        >
          <h2 className="font-semibold text-slate-100 mb-4">Recommendations for Next Week</h2>
          <div className="space-y-3">
            {[
              'Increase water intake to 3L/day in preparation for the marathon.',
              'Focus on recovery meals high in antioxidants post long-run sessions.',
              'Maintain 16:8 fasting but ease off on rest days — allow a 14:10 window.',
            ].map((rec, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                {rec}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
