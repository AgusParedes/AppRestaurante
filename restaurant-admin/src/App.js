import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import FloorPage from './pages/FloorPage';
import KitchenPage from './pages/KitchenPage';
import OrdersPage from './pages/OrdersPage';
import './styles/global.scss';
import './App.scss';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="app__main">
          <Routes>
            <Route path="/"        element={<FloorPage />} />
            <Route path="/kitchen" element={<KitchenPage />} />
            <Route path="/orders"  element={<OrdersPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
