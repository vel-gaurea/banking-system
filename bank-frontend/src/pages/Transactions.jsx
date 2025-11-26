import React, { useEffect, useState } from 'react';
import { getTransactions, getBalance, deposit, withdraw } from '../api';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';

export default function Transactions() {
  const nav = useNavigate();
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('role');
  useEffect(()=> {
    if (!localStorage.getItem('token') || role !== 'customer') nav('/login');
  }, []);
  const [tx, setTx] = useState([]);
  const [balance, setBalance] = useState(0);
  const [show, setShow] = useState(false);
  const [type, setType] = useState('deposit');
  const [amount, setAmount] = useState('');

  async function load() {
    const b = await getBalance(userId); setBalance(b.balance);
    const t = await getTransactions(userId); setTx(t);
  }
  useEffect(()=>{ load(); }, []);

  async function doAction() {
    if (!amount || isNaN(amount) || Number(amount) <= 0) { alert('Enter valid amount'); return; }
    const fn = type === 'deposit' ? deposit : withdraw;
    const res = await fn(userId, Number(amount));
    if (res.error) {
      alert(res.error);
    } else {
      setShow(false);
      setAmount('');
      await load();
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
          <h2>Transactions</h2>
          <div>
            <span className="small">Balance: ₹ {balance.toFixed(2)}</span>
            <button className="primary" style={{marginLeft:12}} onClick={()=>{localStorage.clear(); nav('/login')}}>Logout</button>
          </div>
        </div>

        <div style={{marginTop:12}}>
          <button onClick={()=>{ setType('deposit'); setShow(true); }} className="primary">Deposit</button>
          <button onClick={()=>{ setType('withdraw'); setShow(true); }} className="primary" style={{marginLeft:8}}>Withdraw</button>
        </div>

        <div className="table">
          {tx.map(t => (
            <div key={t.id} className="tx-row">
              <div>
                <div><strong>{t.type.toUpperCase()}</strong> - ₹ {Number(t.amount).toFixed(2)}</div>
                <div className="small">{new Date(t.created_at).toLocaleString()}</div>
              </div>
              <div className="small">Balance after: ₹ {Number(t.balance_after).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      {show && (
        <Modal onClose={()=>setShow(false)}>
          <h3>{type === 'deposit' ? 'Deposit' : 'Withdraw'}</h3>
          <div className="small">Available balance: ₹ {balance.toFixed(2)}</div>
          <input className="num" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="Amount" />
          <div style={{marginTop:12, textAlign:'right'}}>
            <button onClick={()=>setShow(false)} style={{marginRight:8}}>Cancel</button>
            <button className="primary" onClick={doAction}>{type === 'deposit' ? 'Deposit' : 'Withdraw'}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
