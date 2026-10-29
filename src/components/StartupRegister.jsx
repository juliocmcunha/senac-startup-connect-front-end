import React, { useState } from 'react';
import { Rocket } from 'lucide-react';
import { authApi, getApiError } from '../services/api';

export default function StartupRegister({ onLogin }) {
  const [form,setForm]=useState({startupName:'',email:'',password:'',industry:'',stage:'',investmentNeededRange:'',description:'',location:''});
  const [message,setMessage]=useState('');
  const [error,setError]=useState('');
  const set=(field)=>(e)=>setForm({...form,[field]:e.target.value});
  const submit=async(e)=>{e.preventDefault();setError('');setMessage('');try{await authApi.registerStartup(form);setMessage('Cadastro realizado! Agora você já pode fazer login.');}catch(err){setError(getApiError(err));}};
  const inputClass='w-full bg-[#171e2e] border border-gray-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none';
  return <div className='min-h-screen bg-[#07090e] flex items-center justify-center p-4 text-white'>
    <div className='w-full max-w-md bg-[#111622]/90 border border-[#1e2638] rounded-3xl p-8 shadow-2xl'>
      <div className='flex items-center gap-2 mb-6'><div className='w-9 h-9 rounded-xl bg-[#1e2638] flex items-center justify-center text-indigo-400'><Rocket className='w-5 h-5'/></div><h2 className='text-xl font-bold'>Cadastro da Startup</h2></div>
      <form className='space-y-4' onSubmit={submit}>
        <input required value={form.startupName} onChange={set('startupName')} placeholder='Nome da sua startup' className={inputClass}/>
        <input required type='email' value={form.email} onChange={set('email')} placeholder='email@startup.com' className={inputClass}/>
        <input required minLength='6' type='password' value={form.password} onChange={set('password')} placeholder='Crie uma senha' className={inputClass}/>
        <select required value={form.industry} onChange={set('industry')} className={inputClass}><option value=''>Segmento</option><option>Fintech</option><option>Healthtech</option><option>Edtech</option><option>Agtech</option><option>SaaS</option><option>Cleantech</option></select>
        <select required value={form.stage} onChange={set('stage')} className={inputClass}><option value=''>Estágio da startup</option><option>Ideação</option><option>MVP</option><option>Tração</option><option>Série A</option><option>Scale-up</option></select>
        <select required value={form.investmentNeededRange} onChange={set('investmentNeededRange')} className={inputClass}><option value=''>Investimento pretendido</option><option>Até R$ 50.000</option><option>R$ 50.000 - R$ 200.000</option><option>R$ 200.000 - R$ 500.000</option><option>R$ 500 mil a R$ 1 mi</option><option>R$ 1 mi a R$ 3 mi</option><option>Acima de R$ 3 mi</option></select>
        <input value={form.location} onChange={set('location')} placeholder='Localização (ex.: Recife, PE)' className={inputClass}/>
        <textarea required rows='3' value={form.description} onChange={set('description')} placeholder='Descreva o seu negócio...' className={inputClass+' resize-none'}/>
        {error&&<p className='text-xs text-red-400'>{error}</p>}{message&&<p className='text-xs text-emerald-400'>{message}</p>}
        <button className='w-full py-3 bg-[#6366f1] rounded-xl text-xs font-semibold'>Finalizar Cadastro</button>
      </form>
      <div className='mt-6 text-center text-xs text-gray-400'>Já tem cadastro? <button onClick={onLogin} className='text-indigo-400'>Realizar Login</button></div>
    </div>
  </div>;
}
