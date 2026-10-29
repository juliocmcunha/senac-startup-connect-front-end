import React, { useEffect, useState } from 'react';
import { LayoutGrid, Search, Lightbulb, Heart, MessageSquare, LogOut, DollarSign, Leaf, HeartPulse, BookOpen } from 'lucide-react';
import { interestsApi, searchApi, getApiError } from '../services/api';

const iconForIndustry=(tags=[])=>{const v=tags.join(' ').toLowerCase();if(v.includes('fintech'))return DollarSign;if(v.includes('health'))return HeartPulse;if(v.includes('edtech'))return BookOpen;return Leaf;};

export default function InvestorSearch({ currentUser, onNavigate, onLogout }) {
  const [searchTerm,setSearchTerm]=useState('');
  const [startups,setStartups]=useState([]);
  const [message,setMessage]=useState('');

  useEffect(()=>{const t=setTimeout(()=>{searchApi.startups({search:searchTerm,investorUserId:currentUser?.userId}).then(setStartups).catch(console.error);},250);return()=>clearTimeout(t);},[searchTerm,currentUser]);
  const expressInterest=async(startup)=>{try{const r=await interestsApi.create(currentUser.userId,startup.userId);setMessage(r.status==='Match'?`Match com ${startup.name}!`:`Interesse enviado para ${startup.name}.`);}catch(err){setMessage(getApiError(err));}};

  return <div className='min-h-screen bg-[#07090e] text-white flex'>
    <aside className='w-64 border-r border-[#1e2638] bg-[#0b0f19] p-4'><div className='font-bold text-lg p-3 mb-4'>InvestCase</div><nav className='space-y-1'><button onClick={()=>onNavigate('investor-main')} className='w-full flex gap-3 px-3 py-2.5 text-gray-400 text-xs'><LayoutGrid className='w-4 h-4'/>Menu Inicial</button><button className='w-full flex gap-3 px-3 py-2.5 bg-[#6366f1] rounded-xl text-xs'><Search className='w-4 h-4'/>Buscar</button><button onClick={()=>onNavigate('investor-opportunities')} className='w-full flex gap-3 px-3 py-2.5 text-gray-400 text-xs'><Lightbulb className='w-4 h-4'/>Oportunidades</button><button className='w-full flex gap-3 px-3 py-2.5 text-gray-400 text-xs'><Heart className='w-4 h-4'/>Matches</button><button onClick={()=>onNavigate('investor-messages')} className='w-full flex gap-3 px-3 py-2.5 text-gray-400 text-xs'><MessageSquare className='w-4 h-4'/>Mensagens</button><button onClick={onLogout} className='w-full flex gap-3 px-3 py-2.5 text-red-400 text-xs mt-6'><LogOut className='w-4 h-4'/>Sair</button></nav></aside>
    <main className='flex-1 p-8 overflow-y-auto'><h1 className='text-xl font-bold'>Buscar startups</h1><p className='text-gray-400 text-xs mt-1 mb-5'>Encontre negócios alinhados à sua tese de investimento.</p><div className='relative max-w-xl mb-5'><Search className='w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2'/><input value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} placeholder='Buscar startup, setor ou palavra-chave' className='w-full bg-[#111622] border border-[#1e2638] rounded-xl pl-10 pr-4 py-3 text-xs'/></div>{message&&<p className='text-xs text-indigo-300 mb-4'>{message}</p>}<div className='text-xs text-gray-400 mb-3'>{startups.length} resultados</div>
      <div className='space-y-3'>{startups.map(s=>{const Icon=iconForIndustry(s.tags);return <div key={s.id} className='bg-[#111622] border border-[#1e2638] rounded-2xl p-5 flex justify-between items-center'><div className='flex gap-4 items-center'><div className='w-12 h-12 rounded-2xl bg-[#1e2638] flex items-center justify-center'><Icon className='w-5 h-5 text-indigo-400'/></div><div><div className='flex gap-2 items-center'><h3 className='text-sm font-bold'>{s.name}</h3><span className='text-[10px] text-emerald-400'>{s.match}</span></div><p className='text-xs text-gray-400'>{s.location}</p><div className='flex gap-1 mt-1'>{s.tags?.map(t=><span key={t} className='text-[10px] text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded'>{t}</span>)}</div></div></div><button onClick={()=>expressInterest(s)} className='px-4 py-2.5 bg-[#6366f1] rounded-xl text-xs'>Tenho Interesse</button></div>})}</div>
    </main>
  </div>;
}
