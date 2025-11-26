import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles.css'

import CustomerLogin from './pages/CustomerLogin.jsx'
import BankerLogin from './pages/BankerLogin.jsx'
import Register from './pages/Register.jsx'
import Transactions from './pages/Transactions.jsx'
import BankerAccounts from './pages/BankerAccounts.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerLogin />} />
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/register" element={<Register />} />

        {/* banker login is intentionally a direct URL */}
        <Route path="/banker/login" element={<BankerLogin />} />
        <Route path="/banker/accounts" element={<BankerAccounts />} />

        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
