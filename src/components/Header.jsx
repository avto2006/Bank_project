import React from 'react';
import { Search, Globe } from 'lucide-react';

export default function Header({ darkMode, lang, setLang }) {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          {lang === 'ge' ? 'მოგესალმები, ავთო ' : 'Welcome Back, Avto '}
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          {lang === 'ge' ? 'შენი პერსონალური ფინანსური და პროდუქტიულობის პანელი.' : 'Here is your personal financial & productivity dashboard.'}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Language Switcher */}
        <button 
          onClick={() => setLang(lang === 'ge' ? 'en' : 'ge')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold ${darkMode ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-white text-slate-800 border-slate-300 shadow-sm'} border transition hover:bg-indigo-600 hover:text-white`}
        >
          <Globe className="w-4 h-4" />
          {lang === 'ge' ? '🇬🇪 ქართული' : '🇬🇧 English'}
        </button>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input 
            type="text" 
            placeholder={lang === 'ge' ? 'მოძებნე...' : 'Search anything...'} 
            className={`w-full md:w-60 ${darkMode ? 'bg-slate-900/60 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-sm'} border rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-indigo-500`}
          />
        </div>
      </div>
    </header>
  );
}