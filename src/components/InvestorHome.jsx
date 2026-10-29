import React, { useEffect, useState } from 'react';
import { LayoutGrid, Search, Lightbulb, Heart, MessageSquare, FileText, Settings, LogOut, Bell, DollarSign, Leaf, HeartPulse, BookOpen } from 'lucide-react';
import { dashboardApi } from '../services/api';

const iconForIndustry=(industry='')=>{const v=industry.toLowerCase();if(v.includes('fintech'))return DollarSign;if(v.includes('health'))return HeartPulse;if(v.includes('edtech'))return BookOpen;return Leaf;};

export default function InvestorHome({ currentUser, onNavigate, onLogout }) {
  const [data,setData]=useState({recommendedStartups:[]});
  useEffect(()=>{if(currentUser?.userId)dashboardApi.investor(currentUser.userId).then(setData).catch(console.error);},[currentUser]);
  return <div className='min-h-screen bg-[#07090e] text-white flex font-sans'>
    <aside className='w-64 border-r border-[#1e2638] bg-[#0b0f19] flex flex-col justify-between p-4 shrink-0'>
      <div><div className='flex items-center gap-2 px-3 py-4 mb-4'><div className='w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center'><LayoutGrid className='w-4 h-4'/></div><span className='font-bold text-lg'>InvestCase</span></div>
      <nav className='space-y-1'>
        <button className='w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#6366f1] text-xs'><LayoutGrid className='w-4 h-4'/>Menu Inicial</button>
        <button onClick={()=>onNavigate('investor-search')} className='w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 text-xs'><Search className='w-4 h-4'/>Buscar</button>
        <button onClick={()=>onNavigate('investor-opportunities')} className='w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 text-xs'><Lightbulb className='w-4 h-4'/>Oportunidades</button>
        <button className='w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 text-xs'><Heart className='w-4 h-4'/>Matches</button>
        <button onClick={()=>onNavigate('investor-messages')} className='w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 text-xs'><MessageSquare className='w-4 h-4'/>Mensagens</button>
        <button className='w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 text-xs'><FileText className='w-4 h-4'/>Cadastro</button>
      </nav></div>
      <div className='pt-4 border-t border-[#1e2638]'><button className='w-full flex gap-3 px-3 py-2.5 text-gray-400 text-xs'><Settings className='w-4 h-4'/>Configurações</button><button onClick={onLogout} className='w-full flex gap-3 px-3 py-2.5 text-red-400 text-xs'><LogOut className='w-4 h-4'/>Sair</button></div>
    </aside>
    <main className='flex-1 flex flex-col min-w-0'>
      <header className='h-16 border-b border-[#1e2638] px-8 flex items-center justify-between'><div className='relative w-96'><Search className='w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2'/><input onFocus={()=>onNavigate('investor-search')} placeholder='Buscar startup, setor ou palavra-chave' className='w-full bg-[#111622] border border-[#1e2638] rounded-xl pl-10 pr-4 py-2 text-xs'/></div><button onClick={()=>onNavigate('investor-messages')}><Bell className='w-4 h-4 text-gray-400'/></button></header>
      <div className='flex-1 p-8 overflow-y-auto space-y-6'><div><h1 className='text-lg font-bold'>Startups recomendadas</h1><p className='text-xs text-gray-500 mt-1'>Olá, {data.investorName??currentUser?.displayName}.</p></div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>{data.recommendedStartups.map(startup=>{const Icon=iconForIndustry(startup.industry);return <div key={startup.id} className='bg-[#111622]/90 border border-[#1e2638] rounded-2xl p-5 h-44 flex flex-col justify-between'><div><div className='flex justify-between mb-4'><div className='w-9 h-9 rounded-xl bg-[#1e2638] text-indigo-400 flex items-center justify-center'><Icon className='w-4 h-4'/></div><Heart className='w-4 h-4 text-gray-500'/></div><h3 className='text-sm font-bold'>{startup.name}</h3><p className='text-[11px] text-gray-400'>{startup.category}</p></div><span className={'text-[10px] w-fit px-2.5 py-0.5 rounded-full border '+(startup.matchType==='high'?'text-emerald-400 border-emerald-500/20':'text-amber-400 border-amber-500/20')}>{startup.match}</span></div>})}</div>
      </div>
    </main>
  </div>;
}
