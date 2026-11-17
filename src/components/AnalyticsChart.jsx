import React from 'react';

export default function AnalyticsChart() {
  return (
    <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-bold text-lg text-white">Analytics</h3>
          <p className="text-xs text-slate-400">Income vs Outcome</p>
        </div>
        <select className="bg-slate-800 border border-slate-700 text-xs text-white rounded-lg px-3 py-1.5 focus:outline-none">
          <option>2020</option>
          <option>2025</option>
          <option>2026</option>
        </select>
      </div>

      <div className="h-48 flex items-end justify-between gap-2 pt-4 border-b border-slate-800">
        {[40, 65, 45, 80, 55, 90, 75, 95].map((val, idx) => (
          <div key={idx} className="w-full flex flex-col items-center gap-2">
            <div className="w-full flex justify-center gap-1 items-end h-full">
              <div className="w-2.5 bg-indigo-500 rounded-t" style={{ height: `${val}%` }}></div>
              <div className="w-2.5 bg-cyan-400 rounded-t" style={{ height: `${val * 0.7}%` }}></div>
            </div>
            <span className="text-[10px] text-slate-400">M{idx+1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}