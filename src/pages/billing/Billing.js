import { useMemo, useState } from "react";
import "../../assets/styles/billing.css";
import { MdDelete } from "react-icons/md";

const CATEGORIES = ["All", "Beverages", "Snacks", "Bakery", "Dairy"];

const PRODUCTS = [
  {
    id: 1,
    name: "Coca Cola 500ml",
    price: 40,
    category: "Beverages",
    tone: "red",
  },
  { id: 2, name: "Lays Chips", price: 20, category: "Snacks", tone: "green" },
  {
    id: 3,
    name: "Orange Juice 1L",
    price: 90,
    category: "Beverages",
    tone: "orange",
  },
  {
    id: 4,
    name: "Cream Biscuits",
    price: 30,
    category: "Snacks",
    tone: "gold",
  },
  {
    id: 5,
    name: "Choco Cookies",
    price: 55,
    category: "Snacks",
    tone: "brown",
  },
  {
    id: 6,
    name: "Mineral Water 1L",
    price: 20,
    category: "Beverages",
    tone: "blue",
  },
  { id: 7, name: "Bread", price: 40, category: "Bakery", tone: "gold" },
  { id: 8, name: "Milk 1L", price: 60, category: "Dairy", tone: "blue" },
];

const PAYMENT_METHODS = ["Cash", "Card", "UPI", "Other"];
const TAX_RATE = 0.05;

const money = (n) => `₹${n.toFixed(2)}`;

/* ---------- small inline icons (no extra dependency) ---------- */
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
    {d.map((p, i) => (
      <path key={i} d={p} />
    ))}
  </svg>
);
const I = {
  search: ["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z", "M21 21l-4.3-4.3"],
  bell: [
    "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",
    "M10.3 21a1.94 1.94 0 0 0 3.4 0",
  ],
  plus: ["M12 5v14", "M5 12h14"],
  minus: ["M5 12h14"],
  trash: ["M3 6h18", "M8 6V4h8v2", "M19 6l-1 14H6L5 6"],
  sun: [
    "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z",
    "M12 1v2",
    "M12 21v2",
    "M4.2 4.2l1.4 1.4",
    "M18.4 18.4l1.4 1.4",
    "M1 12h2",
    "M21 12h2",
    "M4.2 19.8l1.4-1.4",
    "M18.4 5.6l1.4-1.4",
  ],
  moon: ["M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"],
  cash: ["M2 6h20v12H2z", "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
  card: ["M2 5h20v14H2z", "M2 10h20"],
  upi: ["M4 4h16v16H4z", "M9 8v5a3 3 0 0 0 6 0V8"],
  other: ["M5 12h.01", "M12 12h.01", "M19 12h.01"],
  hold: ["M10 4H6v16h4z", "M18 4h-4v16h4z"],
  print: ["M6 9V3h12v6", "M6 18H4v-7h16v7h-2", "M6 14h12v7H6z"],
};
const payIcon = { Cash: I.cash, Card: I.card, UPI: I.upi, Other: I.other };

export default function Billing({ theme }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [payment, setPayment] = useState("Cash");
  const [discount, setDiscount] = useState(0);
  const [cart, setCart] = useState([
    { ...PRODUCTS[6], qty: 2 },
    { ...PRODUCTS[7], qty: 1 },
  ]);

  const visible = PRODUCTS.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const addItem = (product) =>
    setCart((c) =>
      c.some((i) => i.id === product.id)
        ? c.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...c, { ...product, qty: 1 }],
    );

  const changeQty = (id, delta) =>
    setCart((c) =>
      c.flatMap((i) => {
        if (i.id !== id) return [i];
        const qty = i.qty + delta;
        return qty > 0 ? [{ ...i, qty }] : [];
      }),
    );

  const removeItem = (id) => setCart((c) => c.filter((i) => i.id !== id));

  const { itemCount, subtotal, tax, total } = useMemo(() => {
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const taxable = Math.max(subtotal - discount, 0);
    const tax = taxable * TAX_RATE;
    return {
      itemCount: cart.reduce((s, i) => s + i.qty, 0),
      subtotal,
      tax,
      total: taxable + tax,
    };
  }, [cart, discount]);

  return (
    <div className="pos" data-theme={theme}>
      {/* ---------- top bar ---------- */}
      <header className="pos__topbar">
        <label className="pos__search">
          <Icon d={I.search} />
          <input
            type="search"
            placeholder="Search anything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        <div className="pos__topbar-actions">
          <button
            className="icon-btn icon-btn--badge"
            aria-label="Notifications"
            data-count="3"
          >
            <Icon d={I.bell} />
          </button>
          <div className="user">
            <span className="user__avatar" aria-hidden="true">
              A
            </span>
            <span className="user__meta">
              <strong>Admin</strong>
              <small>Administrator</small>
            </span>
          </div>
        </div>
      </header>

      <main className="pos__body">
        {/* ---------- products ---------- */}
        <section className="products" aria-label="Products">
          <nav className="chips" aria-label="Categories">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`chip ${category === c ? "is-active" : ""}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </nav>

          <div className="products-grid">
            {visible.map((p) => (
              <article key={p.id} className="product">
                <div
                  className={`product-img tone-${p.tone}`}
                  aria-hidden="true"
                >
                  <span className="product-shape" />
                </div>
                <h3 className="product-name">{p.name}</h3>
                <div className="product-foot">
                  <span className="price-tag">
                    {money(p.price).replace(".00", "")}
                  </span>
                  <button
                    className="add-btn"
                    onClick={() => addItem(p)}
                    aria-label={`Add ${p.name}`}
                  >
                    <Icon d={I.plus} size={16} />
                  </button>
                </div>
              </article>
            ))}
            {visible.length === 0 && (
              <p className="empty">No products match your search.</p>
            )}
          </div>
        </section>

        {/* ---------- current bill ---------- */}
        <aside className="bill" aria-label="Current bill">
          <div className="bill__head">
            <h2>
              Current Bill{" "}
              <span>
                ({itemCount} {itemCount === 1 ? "item" : "items"})
              </span>
            </h2>
            <button className="link-btn" onClick={() => setCart([])}>
              Clear
            </button>
          </div>

          <div className="bill__table-wrap">
            <table className="bill__table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th className="num">Price</th>
                  <th className="num">Total</th>
                  <th>
                    <span className="sr-only">Remove</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.map((i) => (
                  <tr key={i.id}>
                    <td className="bill__item">
                      <span
                        className={`thumb tone-${i.tone}`}
                        aria-hidden="true"
                      />
                      {i.name}
                    </td>
                    <td>
                      <div className="stepper">
                        <button
                          onClick={() => changeQty(i.id, -1)}
                          aria-label={`Decrease ${i.name}`}
                        >
                          <Icon d={I.minus} size={14} />
                        </button>
                        <span>{i.qty}</span>
                        <button
                          onClick={() => changeQty(i.id, 1)}
                          aria-label={`Increase ${i.name}`}
                        >
                          <Icon d={I.plus} size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="num">{money(i.price)}</td>
                    <td className="num">{money(i.price * i.qty)}</td>
                    <td>
                      <button
                        className="icon-btn icon-btn--sm"
                        onClick={() => removeItem(i.id)}
                        aria-label={`Remove ${i.name}`}
                      >
                        <Icon d={I.trash} size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
                {cart.length === 0 && (
                  <tr>
                    <td colSpan="5" className="empty">
                      Tap a product to add it to the bill.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <dl className="totals">
            <div>
              <dt>Subtotal</dt>
              <dd>{money(subtotal)}</dd>
            </div>
            <div>
              <dt>Discount</dt>
              <dd className="discount">
                {discount > 0 ? `-${money(discount)}` : money(0)}
              </dd>
            </div>
            <div>
              <dt>Tax (5%)</dt>
              <dd>{money(tax)}</dd>
            </div>
            <div className="totals__grand">
              <dt>Grand Total</dt>
              <dd>{money(total)}</dd>
            </div>
          </dl>

          <fieldset className="payment">
            <legend>Payment Method</legend>
            <div className="payment-options">
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m}
                  className={`pay-btn ${payment === m ? "is-active" : ""}`}
                  aria-pressed={payment === m}
                  onClick={() => setPayment(m)}
                >
                  <Icon d={payIcon[m]} size={16} />
                  {m}
                </button>
              ))}
            </div>
          </fieldset>

          <button className="complete-btn" disabled={cart.length === 0}>
            Complete Payment
          </button>

          <div className="bill__secondary">
            <button className="btn btn--ghost">
              <Icon d={I.hold} size={16} /> Hold Bill
            </button>
            <button className="btn btn--ghost">
              <Icon d={I.print} size={16} /> Print Invoice
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}
