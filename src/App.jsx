import React, { useState } from 'react';
import { TrendingUp, Rocket } from 'lucide-react';
import InvestorDashboard from './components/InvestorDashboard';
import StartupDashboard from './components/StartupDashboard';
import InvestorRegister from './components/InvestorRegister';
import StartupRegister from './components/StartupRegister';
import StartupHome from './components/StartupHome';
import StartupSearch from './components/StartupSearch';
import StartupOpportunities from './components/StartupOpportunities';
import StartupMessages from './components/StartupMessages';
import InvestorHome from './components/InvestorHome';
import InvestorSearch from './components/InvestorSearch';
import InvestorOpportunities from './components/InvestorOpportunities';
import InvestorMessages from './components/InvestorMessages';

export default function App() {
  const [view, setView] = useState('home');
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('investcase-user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('investcase-user', JSON.stringify(user));
    setView(user.role === 'Investor' ? 'investor-main' : 'startup-main');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('investcase-user');
    setView('home');
  };

  if (view === 'investor-main') {
    return <InvestorHome currentUser={currentUser} onNavigate={setView} onLogout={handleLogout} />;
  }

  if (view === 'investor-search') {
    return <InvestorSearch currentUser={currentUser} onNavigate={setView} onLogout={handleLogout} />;
  }

  if (view === 'investor-opportunities') {
    return <InvestorOpportunities currentUser={currentUser} onNavigate={setView} onLogout={handleLogout} />;
  }

  if (view === 'investor-messages') {
    return <InvestorMessages currentUser={currentUser} onNavigate={setView} onLogout={handleLogout} />;
  }

  if (view === 'startup-main') {
    return <StartupHome currentUser={currentUser} onNavigate={setView} onLogout={handleLogout} />;
  }

  if (view === 'startup-search') {
    return <StartupSearch currentUser={currentUser} onNavigate={setView} onLogout={handleLogout} />;
  }

  if (view === 'startup-opportunities') {
    return <StartupOpportunities currentUser={currentUser} onNavigate={setView} onLogout={handleLogout} />;
  }

  if (view === 'startup-messages') {
    return <StartupMessages currentUser={currentUser} onNavigate={setView} onLogout={handleLogout} />;
  }

  if (view === 'investor-login') {
    return (
      <InvestorDashboard
        onBack={() => setView('home')}
        onRegister={() => setView('investor-register')}
        onLoginSuccess={handleLogin}
      />
    );
  }

  if (view === 'startup-login') {
    return (
      <StartupDashboard
        onBack={() => setView('home')}
        onRegister={() => setView('startup-register')}
        onLoginSuccess={handleLogin}
      />
    );
  }

  if (view === 'investor-register') {
    return <InvestorRegister onLogin={() => setView('investor-login')} />;
  }

  if (view === 'startup-register') {
    return <StartupRegister onLogin={() => setView('startup-login')} />;
  }

  return (
    <div className='min-h-screen bg-[#0b0f19] flex items-center justify-center p-4 text-white font-sans'>
      <div className='w-full max-w-3xl bg-[#111827]/80 border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl relative'>
        <div className='text-center mb-10'>
          <div className='inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 mb-4 border border-indigo-500/30'>
            <TrendingUp className='w-6 h-6' />
          </div>
          <h1 className='text-2xl md:text-3xl font-bold tracking-tight'>InvestCase</h1>
          <p className='text-gray-400 text-sm mt-2'>Bem-vindo de volta</p>
          <p className='text-gray-500 text-xs'>Como você deseja entrar hoje?</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
          <div onClick={() => setView('investor-login')} className='bg-[#1f2937]/50 hover:bg-[#1f2937] border border-gray-800 hover:border-indigo-500/50 transition-all rounded-2xl p-6 flex flex-col justify-between group cursor-pointer'>
            <div>
              <div className='flex justify-between items-start mb-4'>
                <div className='p-3 rounded-xl bg-indigo-600/10 text-indigo-400 group-hover:scale-110 transition-transform'>
                  <TrendingUp className='w-6 h-6' />
                </div>
                <span className='text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'>
                  IN
                </span>
              </div>
              <h3 className='text-lg font-semibold mb-2'>Sou Investidor</h3>
              <p className='text-gray-400 text-xs leading-relaxed'>
                Explore startups compatíveis com sua tese e encontre oportunidades de investimento.
              </p>
            </div>
            <button className='mt-6 w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-xl transition-colors shadow-lg shadow-indigo-600/20 cursor-pointer'>
              Entrar como Investidor
            </button>
          </div>

          <div onClick={() => setView('startup-login')} className='bg-[#1f2937]/50 hover:bg-[#1f2937] border border-gray-800 hover:border-indigo-500/50 transition-all rounded-2xl p-6 flex flex-col justify-between group cursor-pointer'>
            <div>
              <div className='flex justify-between items-start mb-4'>
                <div className='p-3 rounded-xl bg-indigo-600/10 text-indigo-400 group-hover:scale-110 transition-transform'>
                  <Rocket className='w-6 h-6' />
                </div>
                <span className='text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'>
                  NP
                </span>
              </div>
              <h3 className='text-lg font-semibold mb-2'>Sou uma Startup</h3>
              <p className='text-gray-400 text-xs leading-relaxed'>
                Encontre investidores alinhados ao seu negócio e acelere sua captação.
              </p>
            </div>
            <button className='mt-6 w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-xl transition-colors shadow-lg shadow-indigo-600/20 cursor-pointer'>
              Entrar como Startup
            </button>
          </div>
        </div>

        <div className='text-center text-xs text-gray-400 flex justify-center items-center gap-2'>
          <span>Ainda não tem conta?</span>
          <button onClick={() => setView('investor-register')} className='text-indigo-400 hover:underline font-medium cursor-pointer'>
            Cadastrar Investidor
          </button>
          <span>•</span>
          <button onClick={() => setView('startup-register')} className='text-indigo-400 hover:underline font-medium cursor-pointer'>
            Cadastrar Startup
          </button>
        </div>
      </div>
    </div>
  );
}
