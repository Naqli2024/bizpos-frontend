import { useEffect, useMemo, useState } from "react";
import "../../assets/styles/inventory.css";
import { MdEdit } from "react-icons/md";

const PRODUCTS = [
  {
    id: 1,
    icon: "🥤",
    name: "Coca Cola 500ml",
    category: "Beverages",
    qty: 24,
    buy: 35,
    sell: 50,
  },
  {
    id: 2,
    icon: "🥤",
    name: "Pepsi 500ml",
    category: "Beverages",
    qty: 18,
    buy: 35,
    sell: 50,
  },
  {
    id: 3,
    icon: "🍟",
    name: "Lays Chips",
    category: "Snacks",
    qty: 3,
    buy: 25,
    sell: 40,
  },
  {
    id: 4,
    icon: "🍞",
    name: "Bread",
    category: "Grocery",
    qty: 5,
    buy: 20,
    sell: 40,
  },
  {
    id: 5,
    icon: "🥛",
    name: "Milk 1L",
    category: "Dairy",
    qty: 2,
    buy: 40,
    sell: 50,
  },
  {
    id: 6,
    icon: "🧈",
    name: "Butter 200g",
    category: "Dairy",
    qty: 12,
    buy: 50,
    sell: 65,
  },
  {
    id: 7,
    icon: "🥚",
    name: "Eggs (10 pcs)",
    category: "Grocery",
    qty: 15,
    buy: 40,
    sell: 55,
  },
  {
    id: 8,
    icon: "🍫",
    name: "Chocolate",
    category: "Snacks",
    qty: 10,
    buy: 15,
    sell: 30,
  },
  {
    id: 9,
    icon: "💧",
    name: "Water 1L",
    category: "Beverages",
    qty: 9,
    buy: 10,
    sell: 20,
  },
];

const LOW_STOCK_LIMIT = 6;
const money = (n) => `₹${n.toFixed(2)}`;
const statusOf = (p) => (p.qty <= LOW_STOCK_LIMIT ? "Low" : "Active");

const Icon = ({ d, size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {d}
  </svg>
);

const icons = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  bell: (
    <>
      <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10 21a2 2 0 0 0 4 0" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,

  trash: (
    <>
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />,
};

export default function Inventory({ theme }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");
  const categories = useMemo(
    () => ["All Categories", ...new Set(PRODUCTS.map((p) => p.category))],
    [],
  );

  const rows = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) &&
      (category === "All Categories" || p.category === category) &&
      (status === "All Status" || statusOf(p) === status),
  );

  return (
    <div className="inv" data-theme={theme}>
      <header className="inv-topbar">
        <label className="inv-search">
          <Icon d={icons.search} />
          <input
            type="search"
            placeholder="Search anything..."
            aria-label="Search anything"
          />
        </label>

        <div className="inv-topbar-right">
          <button className="icon-btn has-dot" aria-label="Notifications">
            <Icon d={icons.bell} />
          </button>
          <div className="inv-user">
            <span className="avatar" aria-hidden="true">
              A
            </span>
            <span className="inv-user-text">
              <strong>Admin</strong>
              <small>Administrator</small>
            </span>
          </div>
        </div>
      </header>

      <div className="inv-main">
        <div className="inv-head">
          <div>
            <h1>Inventory</h1>
            <p>Manage your products and stock.</p>
          </div>
          <button className="btn-primary">
            <Icon d={icons.plus} size={16} /> Add Product
          </button>
        </div>

        <section className="inv-filters">
          <label className="field field-search">
            <Icon d={icons.search} />
            <input
              type="search"
              placeholder="Search product..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search product"
            />
          </label>
          <select
            className="field"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Category"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            className="field"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="Status"
          >
            {["All Status", "Active", "Low"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </section>

        <section className="inv-card">
          <table className="inv-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Stock Qty</th>
                <th>Purchase Price</th>
                <th>Selling Price</th>
                <th>Status</th>
                <th className="col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p, i) => {
                const s = statusOf(p);
                return (
                  <tr key={p.id}>
                    <td data-label="#" className="col-num">
                      {i + 1}
                    </td>
                    <td data-label="Product" className="col-name">
                      <span className="thumb" aria-hidden="true">
                        {p.icon}
                      </span>
                      {p.name}
                    </td>
                    <td data-label="Category">{p.category}</td>
                    <td
                      data-label="Stock Qty"
                      className={s === "Low" ? "qty low" : "qty"}
                    >
                      {p.qty}
                    </td>
                    <td data-label="Purchase Price">{money(p.buy)}</td>
                    <td data-label="Selling Price">{money(p.sell)}</td>
                    <td data-label="Status">
                      <span className={`badge ${s.toLowerCase()}`}>{s}</span>
                    </td>
                    <td className="col-actions">
                      <button
                        className="act edit"
                        aria-label={`Edit ${p.name}`}
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="act del"
                        aria-label={`Delete ${p.name}`}
                      >
                        <Icon d={icons.trash} size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr className="empty-row">
                  <td colSpan="8">
                    No products match these filters. Clear the search or change
                    a filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <footer className="inv-foot">
            Showing {rows.length ? `1-${rows.length}` : "0"} of{" "}
            {PRODUCTS.length} items
          </footer>
        </section>
      </div>
    </div>
  );
}
