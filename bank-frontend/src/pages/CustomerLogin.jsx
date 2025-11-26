import React, { useState } from 'react';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';

export default function CustomerLogin() {
  const [identifier,setIdentifier] = useState('');
  const [password,setPassword] = useState('');
  const nav = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const res = await login(identifier,password);
    if (res.token && res.role === 'customer') {
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.role);
      localStorage.setItem('userId', res.user.id);
      nav('/transactions');
    } else {
      alert(res.error || 'Login failed or not a customer');
    }
  }

  return (
    <div className="container">
      <div className="card" style={{maxWidth:420, margin:'0 auto'}}>
        <div className="header"><h2>Customer Login</h2></div>
        <form onSubmit={handleLogin}>
          <label className="small">Email or Username</label>
          <input value={identifier} onChange={e=>setIdentifier(e.target.value)} className="input" />
          <label className="small">Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="input" />
          <div style={{marginTop:12, display:'flex',justifyContent:'space-between', alignItems:'center'}}>
            <button className="primary" type="submit">Login</button>
            <a href="/register" style={{color:'#ffd166'}}>Register</a>
          </div>
        </form>
      </div>
    </div>
  );
}
