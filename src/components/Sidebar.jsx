import React from 'react';
import { LayoutDashboard, BarChart3, Wallet, Users, Settings, ShieldCheck, HelpCircle } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, darkMode, setDarkMode, lang }) {
  const navItems = [
    { name: 'Dashboard', labelGe: 'მთავარი', labelEn: 'Dashboard', icon: LayoutDashboard },
    { name: 'Analytics', labelGe: 'ანალიტიკა', labelEn: 'Analytics', icon: BarChart3 },
    { name: 'My Wallet', labelGe: 'საფულე', labelEn: 'My Wallet', icon: Wallet },
    { name: 'Accounts', labelGe: 'ანგარიშები', labelEn: 'Accounts', icon: Users },
    { name: 'Settings', labelGe: 'პარამეტრები', labelEn: 'Settings', icon: Settings },
  ];

  return (
    <aside className={`w-64 border-r ${darkMode ? 'border-slate-800 bg-[#0b0914]' : 'border-slate-200 bg-white shadow-lg'} p-6 flex flex-col justify-between hidden md:flex min-h-screen sticky top-0 transition-colors duration-300`}>
      <div>
        <div className="flex items-center gap-2 mb-10">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            u
          </div>
          <span className={`text-xl font-bold tracking-wider ${darkMode ? 'text-white' : 'text-slate-900'}`}>uifry</span>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                    : darkMode ? 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                {lang === 'ge' ? item.labelGe : item.labelEn}
              </button>
            );
          })}
        </nav>

        <div className={`mt-8 pt-8 border-t ${darkMode ? 'border-slate-800' : 'border-slate-200'} space-y-2`}>
          <button onClick={() => setActiveTab('Security')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${activeTab === 'Security' ? 'bg-indigo-600 text-white' : darkMode ? 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200' : 'text-slate-600 hover:bg-slate-100'}`}>
            <ShieldCheck className="w-5 h-5" /> {lang === 'ge' ? 'უსაფრთხოება' : 'Security'}
          </button>
          <button onClick={() => setActiveTab('Help Centre')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${activeTab === 'Help Centre' ? 'bg-indigo-600 text-white' : darkMode ? 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200' : 'text-slate-600 hover:bg-slate-100'}`}>
            <HelpCircle className="w-5 h-5" /> {lang === 'ge' ? 'დახმარება' : 'Help Centre'}
          </button>
        </div>
      </div>

      <div>
        <div className={`flex items-center justify-between px-4 py-3 ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-100 border-slate-200'} rounded-xl border mb-6`}>
          <span className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            {lang === 'ge' ? 'მუქი რეჟიმი' : 'Dark Mode'}
          </span>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="w-11 h-6 bg-indigo-600 rounded-full p-1 flex items-center transition"
          >
            <div className={`w-4 h-4 rounded-full bg-white transition transform ${darkMode ? 'translate-x-5' : ''}`} />
          </button>
        </div>

        <div className="flex items-center gap-3 px-2">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
            alt="Avto Bagaturia" 
            className="w-10 h-10 rounded-full object-cover border border-indigo-500/30"
          />
          <div>
            <h4 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Avto Bagaturia</h4>
            <p className="text-xs text-slate-400">Full-Stack Developer</p>
          </div>
        </div>
      </div>
    </aside>
  );
}