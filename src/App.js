import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Trade from './pages/Trade';
import Portfolio from './pages/Portfolio';
import BankLink from './pages/BankLink';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation */}
        <nav className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Hart Trade</h1>
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-blue-500 hover:underline">Dashboard</Link></li>
            <li><Link to="/trade" className="text-blue-500 hover:underline">Trade</Link></li>
            <li><Link to="/portfolio" className="text-blue-500 hover:underline">Portfolio</Link></li>
            <li><Link to="/bank" className="text-blue-500 hover:underline">Bank</Link></li>
            <li><Link to="/settings" className="text-blue-500 hover:underline">Settings</Link></li>
          </ul>
        </nav>

        {/* Routes */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/bank" element={<BankLink />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
