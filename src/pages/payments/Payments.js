import { useEffect, useState } from "react";
import "../../assets/styles/payment.css";

const TODAY = [
  { key: "Cash", amount: 12450 },
  { key: "UPI", amount: 8250 },
  { key: "Card", amount: 5480 },
  { key: "Other", amount: 1200 },
];

const PAYMENTS = [
  { id: "PAY1028", invoice: "INV1028", method: "UPI", amount: 850, status: "Success", date: "Apr 28, 2025" },
  { id: "PAY1027", invoice: "INV1027", method: "Cash", amount: 1250, status: "Success", date: "Apr 28, 2025" },
  { id: "PAY1026", invoice: "INV1026", method: "Card", amount: 340, status: "Success", date: "Apr 27, 2025" },
  { id: "PAY1025", invoice: "INV1025", method: "UPI", amount: 560, status: "Success", date: "Apr 27, 2025" },
  { id: "PAY1024", invoice: "INV1024", method: "Card", amount: 620, status: "Success", date: "Apr 26, 2025" },
  { id: "PAY1023", invoice: "INV1023", method: "Cash", amount: 430, status: "Success", date: "Apr 26, 2025" },
  { id: "PAY1022", invoice: "INV1022", method: "UPI", amount: 975, status: "Pending", date: "Apr 25, 2025" },
  { id: "PAY1021", invoice: "INV1021", method: "Card", amount: 310, status: "Success", date: "Apr 25, 2025" },
  { id: "PAY1020", invoice: "INV1020", method: "Cash", amount: 75, status: "Success", date: "Apr 24, 2025" },
  { id: "PAY1019", invoice: "INV1019", method: "UPI", amount: 198, status: "Failed", date: "Apr 24, 2025" },
  { id: "PAY1018", invoice: "INV1018", method: "Other", amount: 340, status: "Success", date: "Apr 23, 2025" },
  { id: "PAY1017", invoice: "INV1017", method: "Cash", amount: 52, status: "Success", date: "Apr 23, 2025" },
  { id: "PAY1016", invoice: "INV1016", method: "Card", amount: 1480, status: "Success", date: "Apr 22, 2025" },
  { id: "PAY1015", invoice: "INV1015", method: "UPI", amount: 265, status: "Success", date: "Apr 22, 2025" },
  { id: "PAY1014", invoice: "INV1014", method: "Cash", amount: 720, status: "Success", date: "Apr 21, 2025" },
];

const PAGE_SIZE = 5;
const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

const Icon = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
);

const icons = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  bell: <><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10 21a2 2 0 0 0 4 0" /></>,
  left: <path d="m15 18-6-6 6-6" />,
  right: <path d="m9 18 6-6-6-6" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />,
};

export default function Payments({theme}) {
 
  const [page, setPage] = useState(1);

  useEffect(() => {
    try { localStorage.setItem("payment-theme", theme); } catch {}
  }, [theme]);

  const total = TODAY.reduce((sum, t) => sum + t.amount, 0);
  const pages = Math.ceil(PAYMENTS.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const rows = PAYMENTS.slice(start, start + PAGE_SIZE);

  return (
    <div className="payment" data-theme={theme}>
      <header className="payment-topbar">
        <label className="payment-search">
          <Icon d={icons.search} />
          <input type="search" placeholder="Search anything..." aria-label="Search anything" />
        </label>
        <div className="payment-topbar-right">
          <button className="icon-btn has-dot" aria-label="Notifications"><Icon d={icons.bell} /></button>
          <div className="payment-user">
            <span className="avatar" aria-hidden="true">A</span>
            <span className="payment-user-text"><strong>Admin</strong><small>Administrator</small></span>
          </div>
        </div>
      </header>

      <main className="payment-main">
        <h1>Payments</h1>
        <p className="payment-sub">Track and manage payment transactions.</p>

        <section className="payment-summary">
          <div className="today">
            <h2>Today's Payments</h2>
            <div className="today-grid">
              {TODAY.map((t) => (
                <div className="today-item" key={t.key}>
                  <span>{t.key}</span>
                  <strong>{inr(t.amount)}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="total">
            <span>Total</span>
            <strong>{inr(total)}</strong>
          </div>
        </section>

        <section className="payment-card">
          <table className="payment-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Invoice </th>
                <th>Method</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id}>
                  <td data-label="Payment ID" className="col-id">{p.id}</td>
                  <td data-label="Invoice #">{p.invoice}</td>
                  <td data-label="Method">{p.method}</td>
                  <td data-label="Amount" className="col-amount">{inr(p.amount)}</td>
                  <td data-label="Status"><span className={`badge ${p.status.toLowerCase()}`}>{p.status}</span></td>
                  <td data-label="Date" className="col-date">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <footer className="payment-foot">
            <span>Showing {start + 1}-{start + rows.length} of {PAYMENTS.length} items</span>
            <nav className="pager" aria-label="Pagination">
              <button disabled={page === 1} onClick={() => setPage(page - 1)} aria-label="Previous page">
                <Icon d={icons.left} size={15} />
              </button>
              {Array.from({ length: pages }, (_, n) => n + 1).map((n) => (
                <button key={n} className={n === page ? "on" : ""}
                        aria-current={n === page ? "page" : undefined}
                        onClick={() => setPage(n)}>
                  {n}
                </button>
              ))}
              <button disabled={page === pages} onClick={() => setPage(page + 1)} aria-label="Next page">
                <Icon d={icons.right} size={15} />
              </button>
            </nav>
          </footer>
        </section>
      </main>
    </div>
  );
}