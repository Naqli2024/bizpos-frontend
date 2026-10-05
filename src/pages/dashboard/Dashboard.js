import { useEffect, useState } from "react";
import "../../assets/styles/dashboard.css";

const STATS = [
  {
    label: "Today's Sales",
    value: "₹24,580",
    icon: "🛒",
    tone: "green",
    foot: { up: "▲ 12.5%" },
  },
  {
    label: "Today's Orders",
    value: "128",
    icon: "🛍️",
    tone: "blue",
    foot: { up: "▲ 8.2%" },
  },
  {
    label: "Pending Payments",
    value: "₹4,250",
    icon: "💳",
    tone: "orange",
    foot: { text: "5 transactions", left: true },
  },
  {
    label: "Low Stock Items",
    value: "8",
    icon: "📦",
    tone: "red",
    red: true,
    foot: { link: "View Details" },
  },
];

const TRANSACTIONS = [
  {
    id: "INV-001028",
    customer: "Walk-in Customer",
    amount: "₹560.00",
    method: "Cash",
    status: "Paid",
    time: "09:45 AM",
  },
  {
    id: "INV-001027",
    customer: "John Doe",
    amount: "₹325.50",
    method: "Card",
    status: "Paid",
    time: "09:45 AM",
  },
  {
    id: "INV-001026",
    customer: "Sarah Wilson",
    amount: "₹410.00",
    method: "UPI",
    status: "Paid",
    time: "09:45 AM",
  },
  {
    id: "INV-001025",
    customer: "Walk-in Customer",
    amount: "₹85.75",
    method: "Cash",
    status: "Paid",
    time: "09:45 AM",
  },
  {
    id: "INV-001024",
    customer: "Mike Brown",
    amount: "₹42.30",
    method: "Card",
    status: "Pending",
    time: "09:45 AM",
  },
];

const LOW_STOCK = [
  { name: "Coca-Cola 500ml", icon: "🥤", qty: 4, status: "Low" },
  { name: "Lays Chips", icon: "🍟", qty: 3, status: "Low" },
  { name: "Butter 200g", icon: "🧈", qty: 2, status: "Low" },
  { name: "Milk 1L", icon: "🥛", qty: 5, status: "Low" },
  { name: "Bread", icon: "🍞", qty: 1, status: "Critical" },
];

const SALES = [
  { d: "Apr 22", v: 5 },
  { d: "Apr 23", v: 7.5 },
  { d: "Apr 24", v: 11 },
  { d: "Apr 25", v: 10 },
  { d: "Apr 26", v: 15 },
  { d: "Apr 27", v: 13.5 },
  { d: "Apr 28", v: 22 },
];

function SalesChart() {
  const W = 420,
    H = 230,
    L = 34,
    R = 14,
    T = 12,
    B = 28;
  const max = 25;
  const x = (i) => L + (i * (W - L - R)) / (SALES.length - 1);
  const y = (v) => T + (1 - v / max) * (H - T - B);
  const line = SALES.map((p, i) => `${i ? "L" : "M"}${x(i)},${y(p.v)}`).join(
    " ",
  );
  const area = `${line} L${x(SALES.length - 1)},${H - B} L${x(0)},${H - B} Z`;

  return (
    <svg
      className="chart"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Sales over the last 7 days"
    >
      {[0, 5, 10, 15, 20, 25].map((t) => (
        <g key={t}>
          <line className="grid-line" x1={L} x2={W - R} y1={y(t)} y2={y(t)} />
          <text x={L - 6} y={y(t) + 3} textAnchor="end">
            {t === 0 ? "0" : `${t}K`}
          </text>
        </g>
      ))}
      <path className="area" d={area} />
      <path className="line" d={line} />
      {SALES.map((p, i) => (
        <g key={p.d}>
          <circle className="pt" cx={x(i)} cy={y(p.v)} r="3.5" />
          <text x={x(i)} y={H - 8} textAnchor="middle">
            {p.d}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function Dashboard({ theme }) {
  return (
    <div className="dash" data-theme={theme}>
      {/* Top bar */}
      <header className="topbar">
        <label className="search">
          <span aria-hidden="true">🔍</span>
          <input
            type="search"
            placeholder="Search anything..."
            aria-label="Search"
          />
        </label>

        <div className="topbar-right">
          <button className="icon-btn" aria-label="Notifications">
            🔔
            <span className="dot" />
          </button>
          <span className="date-chip">Apr 28, 2025</span>
          <div className="user">
            <div className="avatar">A</div>
            <div className="user-meta">
              <strong>Admin</strong>
              <span>Administrator</span>
            </div>
          </div>
        </div>
      </header>
      <section className="greeting">
        <h1>Good Morning, Admin!</h1>
        <p>Here's what's happening with your store today.</p>
      </section>
      <section className="stats">
        {STATS.map((s) => (
          <article className="card stat" key={s.label}>
            <div className={`stat-icon ${s.tone}`}>{s.icon}</div>
            <div className="stat-body">
              <p className="stat-label">{s.label}</p>
              <p className={`stat-value ${s.red ? "red" : ""}`}>{s.value}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="grid">
        <div className="card">
          <div className="card-head">
            <h2>Sales Overview</h2>
            <select className="select" defaultValue="7" aria-label="Date range">
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
            </select>
          </div>
          <SalesChart />
        </div>

        <div className="card transactions">
          <div className="card-head">
            <h2>Recent Transactions</h2>
            <button className="link">View all</button>
          </div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map((t) => (
                  <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>{t.customer}</td>
                    <td className="strong">{t.amount}</td>
                    <td>{t.method}</td>
                    <td>
                      <span className={`badge ${t.status.toLowerCase()}`}>
                        {t.status}
                      </span>
                    </td>
                    <td>{t.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <h2>Low Stock Items</h2>
            <button className="link">View all</button>
          </div>
          <div className="table-wrap">
            <table className="table stock">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>In Stock</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {LOW_STOCK.map((p) => (
                  <tr key={p.name}>
                    <td>
                      <div className="product">
                        <span className="thumb" aria-hidden="true">
                          {p.icon}
                        </span>
                        {p.name}
                      </div>
                    </td>
                    <td className="qty-low">{p.qty}</td>
                    <td>
                      <span className={`badge ${p.status.toLowerCase()}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
