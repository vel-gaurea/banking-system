const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

function authHeaders() {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}


export async function login(identifier, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password })
  });
  return res.json();
}

export async function getBalance(userId) {
  const res = await fetch(`${API_BASE}/user/${userId}/balance`, {
    headers: authHeaders()
  });
  return res.json();
}

export async function getTransactions(userId) {
  const res = await fetch(`${API_BASE}/user/${userId}/transactions`, {
    headers: authHeaders()
  });
  return res.json();
}

export async function deposit(userId, amount) {
  const res = await fetch(`${API_BASE}/user/${userId}/deposit`, {
    method:'POST',
    headers: authHeaders(),
    body: JSON.stringify({ amount })
  });
  return res.json();
}

export async function withdraw(userId, amount) {
  const res = await fetch(`${API_BASE}/user/${userId}/withdraw`, {
    method:'POST',
    headers: authHeaders(),
    body: JSON.stringify({ amount })
  });
  return res.json();
}

export async function getAllAccounts() {
  const res = await fetch(`${API_BASE}/accounts/all`, {
    headers: authHeaders()
  });
  return res.json();
}

export async function register(name, email, username, password, role='customer') {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, username, password, role })
  });
  return res.json();
}
