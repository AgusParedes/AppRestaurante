import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar    from "./components/Sidebar/Sidebar";
import BottomNav  from "./components/BottomNav/BottomNav";
import MenuPage   from "./pages/MenuPage/MenuPage";
import CartPage   from "./pages/CartPage/CartPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import WaiterPage from "./pages/WaiterPage/WaiterPage";
import "./styles/global.scss";

/**
 * App — root component. Manages cart state and sidebar.
 * Page routing is handled by React Router.
 */
function AppContent({ cartItems, setCartItems, sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const isPayment = location.pathname === "/payment";

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  return (
    <div className="app">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Routes>
        <Route path="/menu"    element={<MenuPage onAdd={addToCart} onSidebarOpen={() => setSidebarOpen(true)} />} />
        <Route path="/cart"    element={<CartPage cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/payment" element={<PaymentPage cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/waiter"  element={<WaiterPage />} />
        <Route path="*"        element={<Navigate to="/menu" replace />} />
      </Routes>

      {!isPayment && (
        <BottomNav cartCount={cartCount} />
      )}
    </div>
  );
}

export default function App() {
  const [cartItems,   setCartItems]   = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AppContent
      cartItems={cartItems}
      setCartItems={setCartItems}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    />
  );
}
