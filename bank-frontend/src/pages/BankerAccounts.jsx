import React, { useEffect, useState } from 'react';
import { getAllAccounts, getTransactions } from '../api';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';

export default function BankerAccounts() {
  const nav = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [tx, setTx] = useState([]);

  useEffect(()=>{
    if (!localStorage.getItem('token') || localStorage.getItem('role') !== 'banker') nav('/banker');
    load();
  }, []);

  async function load() {
    const res = await getAllAccounts();
    setAccounts(res);
  }

  async function viewUser(u) {
    setSelected(u);
    const t = await getTransactions(u.id);
    setTx(t);
  }

  return (
    <div className="container">
      <div className="card">
        <div className="header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
<h2>All Customer Accounts</h2>
        <div>
          <button className="primary" onClick={()=>{localStorage.clear(); nav('/banker')}}>Logout</button>
        </div>
        </div>

        <div style={{marginTop:12}}>
          {accounts.map(a=>(
            <div key={a.id} className="tx-row">
              <div>
                <div><strong>{a.name}</strong> <div className="small">{a.email}</div></div>
              </div>
              <div style={{display:'flex',alignItems:'center'}}>
                <div className="small">Balance: ₹ {Number(a.balance).toFixed(2)}</div>
                <button className="primary" style={{marginLeft:12}} onClick={()=>viewUser(a)}>View</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <Modal onClose={()=>{ setSelected(null); setTx([]); }}>
          <h3>{selected.name} - Transactions</h3>
          <div className="small">Email: {selected.email}</div>
          <div style={{marginTop:12}}>
            {tx.map(t => (
              <div key={t.id} style={{padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                <div><strong>{t.type}</strong> - ₹ {Number(t.amount).toFixed(2)}</div>
                <div className="small">{new Date(t.created_at).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}
