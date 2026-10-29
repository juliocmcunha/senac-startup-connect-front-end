import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Rocket } from 'lucide-react';
import { authApi, getApiError } from '../services/api';

export default function StartupDashboard({ onBack, onRegister, onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('nordestepay@investcase.demo');
  const [password, setPassword] = useState('Demo@123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try { onLoginSuccess(await authApi.login(email, password, 'Startup')); }
    catch (err) { setError(getApiError(err)); }
    finally { setLoading(false); }
  };

  return <div className='min-h-screen bg-[#07090e] flex items-center justify-center p-4 text-white font-sans'>
    <div className='w-full max-w-md bg-[#111622]/90 border border-[#1e2638] rounded-3xl p-8 shadow-2xl flex flex-col items-center'>
      <button onClick={onBack} className='self-start flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-4'><ArrowLeft className='w-3.5 h-3.5'/> Voltar</button>
      <div className='w-12 h-12 rounded-2xl bg-[#1e2638] flex items-center justify-center text-indigo-400 mb-4'><Rocket className='w-6 h-6'/></div>
      <h2 className='text-xl font-bold mb-1'>Entrar como <span className='text-indigo-400'>Startup</span></h2>
      <p className='text-gray-400 text-xs mb-8'>Insira suas credenciais para acessar a plataforma.</p>
      <form className='w-full space-y-4' onSubmit={submit}>
        <input required type='email' value={email} onChange={e=>setEmail(e.target.value)} placeholder='nome@empresa.com' className='w-full bg-[#171e2e] border border-gray-800 rounded-xl px-4 py-3 text-xs'/>
        <div className='relative'><input required type={showPassword?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder='Senha' className='w-full bg-[#171e2e] border border-gray-800 rounded-xl px-4 py-3 text-xs pr-10'/><button type='button' onClick={()=>setShowPassword(!showPassword)} className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'>{showPassword?<EyeOff className='w-4 h-4'/>:<Eye className='w-4 h-4'/>}</button></div>
        {error && <p className='text-xs text-red-400'>{error}</p>}
        <button disabled={loading} className='w-full py-3 bg-[#6366f1] rounded-xl text-xs font-semibold'>{loading?'Entrando...':'Entrar como Startup'}</button>
      </form>
      <div className='mt-8 text-xs text-gray-400'>Ainda não tem conta? <button onClick={onRegister} className='text-indigo-400'>Criar cadastro</button></div>
    </div>
  </div>;
}
