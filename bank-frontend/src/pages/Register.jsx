import React, { useState } from 'react';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg('');
    if (!name || !email || !password) { setMsg('Please fill required fields'); return; }

    // register API uses role='customer' by default
    const res = await register(name, email, username, password, 'customer');

    if (res && res.id) {
      setMsg('Account created. Redirecting to Transactions…');
      setTimeout(() => navigate('/transactions'), 1000);
    } else {
      setMsg(res.error || 'Registration failed');
    }
  }

  return (
    <div className="container">
      <div className="card" style={{maxWidth:420, margin:'0 auto'}}>
        <div className="header"><h2>Customer Register</h2></div>

        <form onSubmit={handleSubmit}>
          <label className="small">Full Name</label>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} />

          <label className="small">Email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />

          <label className="small">Username (optional)</label>
          <input className="input" value={username} onChange={e=>setUsername(e.target.value)} />

          <label className="small">Password</label>
          <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} />

          <div style={{marginTop:12, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <button className="primary" type="submit">Register</button>
            <a href="/login" style={{color:'#ffd166'}}>Already have account?</a>
          </div>

          <div style={{marginTop:12, color:'#ffd166'}}>{msg}</div>
        </form>
      </div>
    </div>
  );
}
