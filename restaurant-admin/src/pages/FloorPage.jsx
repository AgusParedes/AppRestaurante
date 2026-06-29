import React, { useState } from 'react';
import LiveKitchen from '../components/LiveKitchen/LiveKitchen';
import FloorMap from '../components/FloorMap/FloorMap';
import { tables as initialTables, kitchenOrders as initialOrders } from '../data/mockData';
import './FloorPage.scss';

export default function FloorPage() {
  const [tables, setTables] = useState(initialTables);
  const [orders, setOrders] = useState(initialOrders);
  const [selectedTable, setSelectedTable] = useState(null);

  const handleMarkReady = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <div className="floor-page">
      <LiveKitchen orders={orders} onMarkReady={handleMarkReady} />
      <FloorMap
        tables={tables}
        selectedTable={selectedTable}
        onTableSelect={setSelectedTable}
      />
    </div>
  );
}
