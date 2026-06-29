import React, { useState } from 'react';
import './FloorMap.scss';

const STATUS_LABEL = {
  available: 'Disponible',
  occupied: 'Ocupada',
  pending: 'Pendiente',
};

function TableNode({ table, selected, onClick }) {
  const isSquare = table.shape === 'square';

  return (
    <div
      className={`table-node table-node--${table.status} ${isSquare ? 'table-node--square' : ''} ${selected ? 'table-node--selected' : ''}`}
      style={{ left: table.x, top: table.y }}
      onClick={() => onClick(table)}
    >
      <span className="table-node__number">{table.number}</span>
      <span className="table-node__cap">CAP {table.capacity}</span>
    </div>
  );
}

export default function FloorMap({ tables, onTableSelect, selectedTable }) {
  const available = tables.filter((t) => t.status === 'available').length;
  const occupied = tables.filter((t) => t.status === 'occupied').length;
  const pending = tables.filter((t) => t.status === 'pending').length;
  const occupancy = Math.round(((occupied + pending) / tables.length) * 100);

  return (
    <div className="floor-map">
      <div className="floor-map__header">
        <div className="floor-map__title-block">
          <h2 className="floor-map__title">Main Dining Hall</h2>
          <p className="floor-map__occupancy">
            Live Occupancy: <strong>{occupancy}%</strong>
          </p>
        </div>
        <div className="floor-map__legend">
          <span className="floor-map__legend-item floor-map__legend-item--available">
            <span className="floor-map__legend-dot" />
            {available} Disponibles
          </span>
          <span className="floor-map__legend-item floor-map__legend-item--occupied">
            <span className="floor-map__legend-dot" />
            {occupied} Ocupadas
          </span>
          <span className="floor-map__legend-item floor-map__legend-item--pending">
            <span className="floor-map__legend-dot" />
            {pending} Pendientes
          </span>
        </div>
      </div>

      <div className="floor-map__canvas" onClick={(e) => { if (e.target === e.currentTarget) onTableSelect(null); }}>
        {/* Decorative room outline */}
        <svg className="floor-map__room" viewBox="0 0 860 440" xmlns="http://www.w3.org/2000/svg">
          <rect x="80" y="40" width="700" height="360" rx="6" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" />
          <rect x="80" y="40" width="200" height="120" rx="0" fill="rgba(255,255,255,0.015)" />
          <line x1="280" y1="40" x2="280" y2="160" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          <line x1="80" y1="160" x2="780" y2="160" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        </svg>

        {tables.map((table) => (
          <TableNode
            key={table.id}
            table={table}
            selected={selectedTable?.id === table.id}
            onClick={onTableSelect}
          />
        ))}

        {/* Table detail popup */}
        {selectedTable && (
          <div
            className="table-popup"
            style={{
              left: Math.min(selectedTable.x + 60, 680),
              top: selectedTable.y - 20,
            }}
          >
            <div className="table-popup__header">
              <div>
                <p className="table-popup__name">Mesa {selectedTable.number}</p>
                <p className={`table-popup__status table-popup__status--${selectedTable.status}`}>
                  {STATUS_LABEL[selectedTable.status]}
                  {selectedTable.occupiedTime ? ` · ${selectedTable.occupiedTime}` : ''}
                </p>
              </div>
              <button className="table-popup__close" onClick={() => onTableSelect(null)}>✕</button>
            </div>

            {selectedTable.status !== 'available' && (
              <div className="table-popup__detail">
                <div className="table-popup__row">
                  <span>Subtotal</span>
                  <strong>${selectedTable.subtotal.toFixed(2)}</strong>
                </div>
                <div className="table-popup__row">
                  <span>Mesero</span>
                  <strong>{selectedTable.server}</strong>
                </div>
              </div>
            )}

            <button className="table-popup__btn">
              {selectedTable.status === 'available' ? '+ Abrir Mesa' : '+ Agregar Orden'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
