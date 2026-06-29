// backend/server.js
import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

const app = express();
const db = new Database("orders.db");

app.use(cors());
app.use(express.json());

db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'paid',
    payment_method TEXT NOT NULL,
    subtotal REAL NOT NULL,
    service REAL NOT NULL,
    total REAL NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id TEXT NOT NULL,
    name TEXT NOT NULL,
    qty INTEGER NOT NULL,
    unit_price REAL NOT NULL,
    line_total REAL NOT NULL,
    FOREIGN KEY(order_id) REFERENCES orders(id)
  );
`);

app.post("/api/orders", (req, res) => {
  const { items, paymentMethod } = req.body;

  if (!items?.length) {
    return res.status(400).json({ error: "El carrito está vacío" });
  }

  const subtotal = items.reduce((sum, item) => {
    return sum + Number(item.price) * Number(item.qty);
  }, 0);

  const service = subtotal * 0.1;
  const total = subtotal + service;
  const code = `LM-${Date.now().toString().slice(-6)}`;

  const createOrder = db.transaction(() => {
    const order = db.prepare(`
      INSERT INTO orders (code, payment_method, subtotal, service, total)
      VALUES (?, ?, ?, ?, ?)
    `).run(code, paymentMethod, subtotal, service, total);

    const insertItem = db.prepare(`
      INSERT INTO order_items
      (order_id, product_id, name, qty, unit_price, line_total)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (const item of items) {
      insertItem.run(
        order.lastInsertRowid,
        item.id,
        item.name,
        item.qty,
        item.price,
        item.price * item.qty
      );
    }

    return order.lastInsertRowid;
  });

  const orderId = createOrder();

  res.status(201).json({
    id: orderId,
    code,
    subtotal,
    service,
    total,
    status: "paid"
  });
});

app.get("/api/orders", (req, res) => {
  const orders = db.prepare(`
    SELECT * FROM orders
    ORDER BY created_at DESC
  `).all();

  res.json(orders);
});

app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});