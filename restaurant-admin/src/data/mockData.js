// Mock data for SOFITA Restaurant Management System

export const tables = [
  { id: 1, number: "01", capacity: 4, status: "available", shape: "circle", x: 455, y: 370, server: null, subtotal: 0, occupiedTime: null, orders: [] },
  { id: 2, number: "02", capacity: 4, status: "pending",   shape: "circle", x: 570, y: 370, server: "María L.", subtotal: 87.50, occupiedTime: "25m", orders: ["2x Agua", "1x Burger"] },
  { id: 3, number: "03", capacity: 4, status: "occupied",  shape: "square", x: 355, y: 265, server: "Carlos R.", subtotal: 124.50, occupiedTime: "42m", orders: ["2x Ribeye Steak", "1x Caesar Salad"] },
  { id: 4, number: "04", capacity: 2, status: "available", shape: "circle", x: 520, y: 265, server: null, subtotal: 0, occupiedTime: null, orders: [] },
  { id: 5, number: "05", capacity: 6, status: "occupied",  shape: "square", x: 685, y: 265, server: "Pedro M.", subtotal: 58.00, occupiedTime: "18m", orders: ["4x Soda Pop", "1x Salmon Pasta"] },
];

export const kitchenOrders = [
  {
    id: "k1",
    tableNumber: "12",
    priority: true,
    timer: "18:42",
    items: ["2x Ribeye Steak", "1x Caesar Salad"],
    status: "cooking",
  },
  {
    id: "k2",
    tableNumber: "05",
    priority: false,
    timer: "04:15",
    items: ["4x Soda Pop", "1x Salmon Pasta"],
    status: "cooking",
  },
  {
    id: "k3",
    tableNumber: "08",
    priority: false,
    timer: "02:30",
    items: ["1x Margherita Pizza", "2x Tiramisu"],
    status: "ready",
  },
];

export const menuItems = [
  { id: "m1", name: "Ribeye Steak", price: 32.00, category: "Mains" },
  { id: "m2", name: "Caesar Salad", price: 14.50, category: "Starters" },
  { id: "m3", name: "Salmon Pasta", price: 24.00, category: "Mains" },
  { id: "m4", name: "Margherita Pizza", price: 18.00, category: "Mains" },
  { id: "m5", name: "Tiramisu", price: 9.50, category: "Desserts" },
  { id: "m6", name: "Soda Pop", price: 3.50, category: "Drinks" },
  { id: "m7", name: "Burger Clásica", price: 16.00, category: "Mains" },
  { id: "m8", name: "Agua Mineral", price: 2.50, category: "Drinks" },
  { id: "m9", name: "Cheesecake", price: 8.00, category: "Desserts" },
  { id: "m10", name: "Nachos", price: 12.00, category: "Starters" },
];
