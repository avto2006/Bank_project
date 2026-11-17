import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MetricCards from './components/MetricCards';
import AnalyticsChart from './components/AnalyticsChart';
import { CreditCard, Shield, HelpCircle, User, Wallet, BarChart3, Settings, Eye, EyeOff, Plus, RefreshCw, Send, CheckCircle2, Zap, Droplets, Flame, Wifi, Smartphone, BookOpen } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [lang, setLang] = useState('ge'); // 'ge' ან 'en'
  
  // Interactive States
  const [cardBalance, setCardBalance] = useState(5750.20);
  const [showCardNum, setShowCardNum] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [chartYear, setChartYear] = useState('2026');

  // Settings states (fully working)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [currency, setCurrency] = useState('USD ($)');
  
  // Utility Bills State
  const [bills, setBills] = useState([
    { id: 1, nameGe: 'ელექტროენერგია', nameEn: 'Electricity', amount: '45.50 GEL', status: 'Unpaid', icon: Zap },
    { id: 2, nameGe: 'წყალი', nameEn: 'Water', amount: '18.20 GEL', status: 'Paid', icon: Droplets },
    { id: 3, nameGe: 'ბუნებრივი აირი', nameEn: 'Natural Gas', amount: '32.00 GEL', status: 'Unpaid', icon: Flame },
    { id: 4, nameGe: 'ინტერნეტი და ტელევიზია', nameEn: 'Internet & TV', amount: '60.00 GEL', status: 'Paid', icon: Wifi },
  ]);

  // Mobile Top-Up State
  const [phoneNum, setPhoneNum] = useState('+995 5');
  const [topUpAmount, setTopUpAmount] = useState('20');
  const [topUpSuccess, setTopUpSuccess] = useState(false);

  // Transactions State
  const [transactions, setTransactions] = useState([
    { id: 1, name: 'TBC Bank Deposit', dateGe: 'დღეს', dateEn: 'Today', amount: '$500.00', statusGe: 'ჩარიცხულია', statusEn: 'Deposited' },
    { id: 2, name: 'Geocell / Silknet', dateGe: 'გუშინ', dateEn: 'Yesterday', amount: '$20.00', statusGe: 'გადახდილია', statusEn: 'Paid' },
    { id: 3, name: 'Supermarket Nikora', dateGe: '2 დღის წინ', dateEn: '2 days ago', amount: '$45.10', statusGe: 'გადახდილია', statusEn: 'Paid' },
  ]);
  const [newTxName, setNewTxName] = useState('');
  const [newTxAmount, setNewTxAmount] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addTransaction = (e) => {
    e.preventDefault();
    if (!newTxName || !newTxAmount) return;
    const newTx = {
      id: Date.now(),
      name: newTxName,
      dateGe: 'დღეს',
      dateEn: 'Today',
      amount: `$${newTxAmount}`,
      statusGe: 'ჩარიცხულია',
      statusEn: 'Deposited'
    };
    setTransactions([newTx, ...transactions]);
    setNewTxName('');
    setNewTxAmount('');
    setIsModalOpen(false);
  };

  const handlePayBill = (id) => {
    setBills(bills.map(b => b.id === id ? { ...b, status: 'Paid' } : b));
  };

  const handleTopUp = (e) => {
    e.preventDefault();
    if (!phoneNum) return;
    setTopUpSuccess(true);
    setTimeout(() => setTopUpSuccess(false), 3000);
  };

  const filteredTransactions = transactions.filter(tx => 
    tx.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Analytics':
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'ge' ? 'გაფართოებული ფინანსური ანალიტიკა' : 'Advanced Financial Analytics'}
            </h2>
            <div className={`${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-xl'} border p-6 rounded-2xl`}>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {lang === 'ge' ? `${chartYear} წლის მაჩვენებლები` : `Performance for ${chartYear}`}
                  </h3>
                  <p className="text-xs text-slate-400">{lang === 'ge' ? 'შემოსავლებისა და გასავლების ლაივ მატრიცა' : 'Live updated income vs outcome matrix'}</p>
                </div>
                <select 
                  value={chartYear} 
                  onChange={(e) => setChartYear(e.target.value)}
                  className={`${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'} border text-xs rounded-lg px-3 py-1.5 focus:outline-none`}
                >
                  <option value="2020">2020</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026 (Live)</option>
                </select>
              </div>
              <div className="h-64 flex items-end justify-between gap-3 pt-6 border-b border-slate-700">
                {[60, 45, 80, 55, 90, 75, 95, 85].map((val, idx) => {
                  const multiplier = chartYear === '2026' ? 1.2 : chartYear === '2025' ? 1.1 : 1;
                  const computedVal = Math.min(Math.round(val * multiplier), 100);
                  return (
                    <div key={idx} className="w-full flex flex-col items-center gap-2 h-full justify-end">
                      <div className="w-full flex justify-center gap-1.5 items-end h-full">
                        <div className="w-3 bg-indigo-500 rounded-t transition-all duration-500" style={{ height: `${computedVal}%` }}></div>
                        <div className="w-3 bg-cyan-400 rounded-t transition-all duration-500" style={{ height: `${computedVal * 0.7}%` }}></div>
                      </div>
                      <span className="text-xs text-slate-400">M{idx+1}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      case 'My Wallet':
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'ge' ? 'კომუნალურები & მობილურის ბალანსი' : 'Utilities & Mobile Top-Up'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Utility Bills Section */}
              <div className={`${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-xl'} border p-6 rounded-2xl`}>
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4 flex items-center gap-2`}>
                  <Zap className="w-5 h-5 text-amber-400" /> {lang === 'ge' ? 'კომუნალური გადასახადები' : 'Utility Bills'}
                </h3>
                <div className="space-y-3">
                  {bills.map((bill) => {
                    const Icon = bill.icon;
                    return (
                      <div key={bill.id} className={`flex items-center justify-between p-3.5 rounded-xl ${darkMode ? 'bg-slate-800/40 border-slate-700/50' : 'bg-slate-50 border-slate-200'} border`}>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{lang === 'ge' ? bill.nameGe : bill.nameEn}</h4>
                            <p className="text-xs text-slate-400">{bill.amount}</p>
                          </div>
                        </div>
                        {bill.status === 'Paid' ? (
                          <span className="text-xs px-2.5 py-1 bg-emerald-500/10 text-emerald-400 font-semibold rounded-lg">
                            {lang === 'ge' ? 'გადახდილია' : 'Paid'}
                          </span>
                        ) : (
                          <button 
                            onClick={() => handlePayBill(bill.id)}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition"
                          >
                            {lang === 'ge' ? 'გადახდა' : 'Pay Now'}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Top Up Section */}
              <div className={`${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-xl'} border p-6 rounded-2xl`}>
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'} mb-4 flex items-center gap-2`}>
                  <Smartphone className="w-5 h-5 text-indigo-400" /> {lang === 'ge' ? 'მობილურის შევსება' : 'Mobile Top-Up'}
                </h3>
                <form onSubmit={handleTopUp} className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">{lang === 'ge' ? 'ტელეფონის ნომერი' : 'Phone Number (+995)'}</label>
                    <input 
                      type="text" 
                      value={phoneNum}
                      onChange={(e) => setPhoneNum(e.target.value)}
                      className={`w-full ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'} border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500`}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">{lang === 'ge' ? 'თანხა (ლარი)' : 'Amount (GEL)'}</label>
                    <select 
                      value={topUpAmount}
                      onChange={(e) => setTopUpAmount(e.target.value)}
                      className={`w-full ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'} border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500`}
                    >
                      <option value="10">10 GEL</option>
                      <option value="20">20 GEL</option>
                      <option value="50">50 GEL</option>
                      <option value="100">100 GEL</option>
                    </select>
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition"
                  >
                    {lang === 'ge' ? 'ბალანსის შევსება' : 'Top-Up Balance'}
                  </button>
                  {topUpSuccess && (
                    <p className="text-xs text-emerald-400 text-center font-semibold flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> {lang === 'ge' ? 'ბალანსი წარმატებით შეივსო!' : 'Top-up successful!'}
                    </p>
                  )}
                </form>
              </div>

            </div>
          </div>
        );
      case 'Accounts':
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'ge' ? 'ანგარიშის მართვა' : 'Account Management'}
            </h2>
            <div className={`${darkMode ? 'bg-slate-900/40 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-xl'} border p-6 rounded-2xl`}>
              <p className="font-semibold text-lg">{lang === 'ge' ? 'აქტიური პროფილი: ავთო ბაღათურია' : 'Active Profile: Avto Bagaturia'}</p>
              <p className="text-sm text-slate-400 mt-1">{lang === 'ge' ? 'პოზიცია: Full-Stack Developer & IT Student' : 'Role: Full-Stack Developer & IT Student'}</p>
              <span className="inline-block mt-4 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-semibold">
                {lang === 'ge' ? 'სტატუსი: ვერიფიცირებული და აქტიური' : 'Status: Verified & Online'}
              </span>
            </div>
          </div>
        );
      case 'Settings':
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'ge' ? 'სისტემის პარამეტრები' : 'System Settings'}
            </h2>
            <div className={`${darkMode ? 'bg-slate-900/40 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-xl'} border p-6 rounded-2xl space-y-4`}>
              <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
                <span>{lang === 'ge' ? 'მუქი რეჟიმი' : 'Dark Appearance'}</span>
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                    darkMode 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-white text-slate-900 border border-slate-300 shadow-sm'
                  }`}
                >
                  {darkMode ? (lang === 'ge' ? 'ჩართულია' : 'Enabled') : (lang === 'ge' ? 'გამორთულია' : 'Disabled')}
                </button>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
                <span>{lang === 'ge' ? 'შეტყობინებები (Notifications)' : 'Push Notifications'}</span>
                <button 
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                    notificationsEnabled 
                      ? (darkMode ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-700 border border-emerald-300 shadow-sm') 
                      : (darkMode ? 'bg-slate-800 text-slate-400' : 'bg-white text-slate-500 border border-slate-300 shadow-sm')
                  }`}
                >
                  {notificationsEnabled ? (lang === 'ge' ? 'აქტიურია' : 'Active') : (lang === 'ge' ? 'გამორთულია' : 'Muted')}
                </button>
              </div>

              <div className="flex justify-between items-center py-2">
                <span>{lang === 'ge' ? 'ძირითადი ვალუტა' : 'Default Currency'}</span>
                <select 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value)}
                  className={`border text-xs rounded-lg px-3 py-1.5 focus:outline-none ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                >
                  <option value="USD ($)">USD ($)</option>
                  <option value="EUR (€)">EUR (€)</option>
                  <option value="GEL (₾)">GEL (₾)</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 'Security':
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'ge' ? 'უსაფრთხოება და დაცვა' : 'Security & Encryption'}
            </h2>
            <div className={`${darkMode ? 'bg-slate-900/40 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-xl'} border p-6 rounded-2xl`}>
              <p className="text-sm">
                {lang === 'ge' ? 'SSL 256-ბიტიანი დაშიფვრა აქტიურია. ორეტაპიანი ავტორიზაცია ჩართულია ავთო ბაღათურიასთვის.' : 'SSL 256-bit encryption active. Two-factor authentication enabled for Avto Bagaturia.'}
              </p>
            </div>
          </div>
        );
      case 'Help Centre':
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'ge' ? 'დახმარება და ბლოგი' : 'Help Centre & Dev Blog'}
            </h2>
            <div className={`${darkMode ? 'bg-slate-900/40 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-xl'} border p-6 rounded-2xl space-y-4`}>
              <h3 className="font-bold text-lg flex items-center gap-2"><BookOpen className="w-5 h-5 text-indigo-400" /> {lang === 'ge' ? 'დეველოპერის ბლოგი' : 'Developer Blog'}</h3>
              <p className="text-sm text-slate-400">
                {lang === 'ge' ? 'მოგესალმებით ჩემს საბანკო დეშბორდზე! აწყობილია React, Vite და Tailwind CSS-ით. სრულად რესპონსიულია და მოიცავს ლაივ კომუნალურებს.' : 'Welcome to my banking dashboard blog! Built with React, Vite, and Tailwind CSS. Fully responsive with live utility payments and mobile top-ups.'}
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <MetricCards darkMode={darkMode} />
              <AnalyticsChart darkMode={darkMode} />

              {/* Transaction Table with Search & Add */}
              <div className={`${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-xl'} border p-6 rounded-2xl`}>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                  <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {lang === 'ge' ? `ტრანზაქციები (${filteredTransactions.length})` : `Transactions (${filteredTransactions.length})`}
                  </h3>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <input 
                      type="text" 
                      placeholder={lang === 'ge' ? 'ძებნა...' : 'Search transactions...'} 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`${darkMode ? 'bg-slate-800/60 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'} border rounded-lg px-3 py-1.5 text-xs focus:outline-none w-full sm:w-48`} 
                    />
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" /> {lang === 'ge' ? 'დამატება' : 'Add'}
                    </button>
                  </div>
                </div>

                {isModalOpen && (
                  <form onSubmit={addTransaction} className={`mb-4 p-4 ${darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'} rounded-xl border flex flex-col sm:flex-row gap-2`}>
                    <input 
                      type="text" 
                      placeholder={lang === 'ge' ? 'სახელი (მაგ. Netflix)' : 'Name (e.g. Netflix)'} 
                      value={newTxName}
                      onChange={(e) => setNewTxName(e.target.value)}
                      className={`${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'} border rounded-lg px-3 py-1.5 text-xs flex-1 focus:outline-none`}
                    />
                    <input 
                      type="number" 
                      placeholder={lang === 'ge' ? 'თანხა' : 'Amount'} 
                      value={newTxAmount}
                      onChange={(e) => setNewTxAmount(e.target.value)}
                      className={`${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'} border rounded-lg px-3 py-1.5 text-xs sm:w-32 focus:outline-none`}
                    />
                    <button type="submit" className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold">
                      {lang === 'ge' ? 'შენახვა' : 'Save'}
                    </button>
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs">
                      {lang === 'ge' ? 'გაუქმება' : 'Cancel'}
                    </button>
                  </form>
                )}

                <div className="space-y-3 overflow-x-auto">
                  {filteredTransactions.map((tx) => (
                    <div key={tx.id} className={`flex items-center justify-between p-3 rounded-xl ${darkMode ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'} transition min-w-[300px]`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl ${darkMode ? 'bg-slate-800 text-indigo-400' : 'bg-slate-100 text-indigo-600'} flex items-center justify-center font-bold text-xs`}>
                          {tx.name[0]}
                        </div>
                        <div>
                          <h4 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{tx.name}</h4>
                          <p className="text-xs text-slate-400">{lang === 'ge' ? tx.dateGe : tx.dateEn}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{tx.amount}</p>
                        <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full">
                          {lang === 'ge' ? tx.statusGe : tx.statusEn}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar Area (Interactive Cards & Activity) */}
            <div className="space-y-6">
              <div className={`${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-xl'} border p-6 rounded-2xl`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {lang === 'ge' ? 'ჩემი ბარათი' : 'My Card'}
                  </h3>
                  <button onClick={() => setShowCardNum(!showCardNum)} className="text-slate-400 hover:text-white transition">
                    {showCardNum ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-slate-400">{lang === 'ge' ? 'ბარათის ბალანსი' : 'Card Balance'}</p>
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>${cardBalance.toLocaleString()}</h2>

                <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-xl relative overflow-hidden mb-4">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-[10px] text-white/80">{lang === 'ge' ? 'მიმდინარე ბალანსი' : 'Current Balance'}</p>
                      <h4 className="text-xl font-bold">${cardBalance.toFixed(2)}</h4>
                    </div>
                    <CreditCard className="w-8 h-8 opacity-80" />
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-xs tracking-widest">{showCardNum ? "5282 3456 7890 1289" : "•••• •••• •••• 1289"}</span>
                    <span className="text-xs">09/25</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setCardBalance(prev => prev + 100)}
                    className="py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-semibold transition text-white"
                  >
                    {lang === 'ge' ? '+ 100 ლარის დამატება' : '+ Add $100'}
                  </button>
                  <button 
                    onClick={() => setCardBalance(prev => Math.max(0, prev - 50))}
                    className="py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold transition text-white"
                  >
                    {lang === 'ge' ? '- 50 გადახდა' : '- Pay $50'}
                  </button>
                </div>
              </div>

              {/* Activity Section */}
              <div className={`${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-xl'} border p-6 rounded-2xl text-center`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-slate-900'} text-left`}>
                    {lang === 'ge' ? 'აქტივობა' : 'Activity'}
                  </h3>
                  <span className="text-xs text-slate-400">{lang === 'ge' ? 'თვე' : 'Month'}</span>
                </div>
                
                <div className="relative w-36 h-36 mx-auto flex items-center justify-center rounded-full border-8 border-indigo-600 border-r-cyan-400 border-b-purple-500 my-4 animate-pulse">
                  <div className="text-center">
                    <span className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>75%</span>
                  </div>
                </div>

                <div className="flex justify-center gap-6 text-xs text-slate-400 mb-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> {lang === 'ge' ? 'კომუნალურები (55%)' : 'Utilities (55%)'}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> {lang === 'ge' ? 'შევსება (20%)' : 'Top-Up (20%)'}
                  </div>
                </div>

                <button 
                  onClick={() => alert(lang === 'ge' ? 'აქტივობის ანგარიში წარმატებით გაიგზავნა!' : 'Activity report exported successfully!')}
                  className={`w-full py-2.5 ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'} rounded-xl text-xs font-semibold transition`}
                >
                  {lang === 'ge' ? 'ყველა აქტივობის ნახვა →' : 'View all activity →'}
                </button>
              </div>

            </div>
          </div>
        );
    }
  };

  return (
    <div className={`${darkMode ? 'bg-[#0b0914] text-slate-100' : 'bg-slate-100 text-slate-900'} min-h-screen flex font-sans transition-colors duration-300`}>
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        lang={lang}
      />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Header darkMode={darkMode} lang={lang} setLang={setLang} />
        {renderContent()}
      </main>
    </div>
  );
}