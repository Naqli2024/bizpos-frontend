import { useEffect, useMemo, useState } from "react";
import "../../assets/styles/invoice.css";

const INVOICES = [
  {
    no: "INV-001028",
    customer: "Walk-in Customer",
    date: "Apr 28, 2025",
    amount: 560,
    status: "Paid",
  },
  {
    no: "INV-001027",
    customer: "John Doe",
    date: "Apr 28, 2025",
    amount: 925.5,
    status: "Paid",
  },
  {
    no: "INV-001026",
    customer: "Sarah Wilson",
    date: "Apr 27, 2025",
    amount: 120,
    status: "Paid",
  },
  {
    no: "INV-001025",
    customer: "Walk-in Customer",
    date: "Apr 27, 2025",
    amount: 85.75,
    status: "Paid",
  },
  {
    no: "INV-001024",
    customer: "Mike Brown",
    date: "Apr 26, 2025",
    amount: 42.3,
    status: "Pending",
  },
  {
    no: "INV-001023",
    customer: "Emily Carter",
    date: "Apr 26, 2025",
    amount: 620,
    status: "Paid",
  },
  {
    no: "INV-001022",
    customer: "Robert Smith",
    date: "Apr 25, 2025",
    amount: 430,
    status: "Paid",
  },
  {
    no: "INV-001021",
    customer: "Lisa Johnson",
    date: "Apr 25, 2025",
    amount: 310,
    status: "Paid",
  },
  {
    no: "INV-001020",
    customer: "Walk-in Customer",
    date: "Apr 24, 2025",
    amount: 75,
    status: "Paid",
  },
  {
    no: "INV-001019",
    customer: "David Lee",
    date: "Apr 24, 2025",
    amount: 198.2,
    status: "Pending",
  },
  {
    no: "INV-001018",
    customer: "Anita Rao",
    date: "Apr 23, 2025",
    amount: 340,
    status: "Paid",
  },
  {
    no: "INV-001017",
    customer: "Walk-in Customer",
    date: "Apr 23, 2025",
    amount: 52.4,
    status: "Paid",
  },
];

const PAGE_SIZE = 8;
const money = (n) =>
  `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

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
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  print: (
    <>
      <path d="M6 9V3h12v6" />
      <rect x="6" y="14" width="12" height="7" rx="1" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    </>
  ),
  trash: (
    <>
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
    </>
  ),
  left: <path d="m15 18-6-6 6-6" />,
  right: <path d="m9 18 6-6-6-6" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />,
};

export default function Invoices({ theme }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All Status");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      INVOICES.filter(
        (i) =>
          (i.no + " " + i.customer)
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (status === "All Status" || i.status === status),
      ),
    [query, status],
  );

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const start = (current - 1) * PAGE_SIZE;
  const rows = filtered.slice(start, start + PAGE_SIZE);

  return (
    <div className="invoice" data-theme={theme}>
      <header className="invoice-topbar">
        <label className="invoice-search">
          <Icon d={icons.search} />
          <input
            type="search"
            placeholder="Search anything..."
            aria-label="Search anything"
          />
        </label>
        <div className="invoice-topbar-right">
          <button className="icon-btn has-dot" aria-label="Notifications">
            <Icon d={icons.bell} />
          </button>
          <div className="invoice-user">
            <span className="avatar" aria-hidden="true">
              A
            </span>
            <span className="invoice-user-text">
              <strong>Admin</strong>
              <small>Administrator</small>
            </span>
          </div>
        </div>
      </header>

      <main className="invoice-main">
        <h1>Invoices</h1>

        <section className="invoice-filters">
          <label className="field field-search">
            <Icon d={icons.search} />
            <input
              type="search"
              placeholder="Search invoice..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              aria-label="Search invoice"
            />
          </label>
          <button className="field field-date" type="button">
            <Icon d={icons.calendar} size={16} />
            <span>Apr 1, 2025 - Apr 28, 2025</span>
          </button>
          <select
            className="field"
            value={status}
            aria-label="Status"
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            {["All Status", "Paid", "Pending"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </section>

        <section className="invoice-card">
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th className="col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((i) => (
                <tr key={i.no}>
                  <td data-label="Invoice #" className="col-no">
                    {i.no}
                  </td>
                  <td data-label="Customer" className="col-customer">
                    {i.customer}
                  </td>
                  <td data-label="Date">{i.date}</td>
                  <td data-label="Amount" className="col-amount">
                    {money(i.amount)}
                  </td>
                  <td data-label="Status">
                    <span className={`badge ${i.status.toLowerCase()}`}>
                      {i.status}
                    </span>
                  </td>
                  <td className="col-actions">
                    <button className="act view" aria-label={`View ${i.no}`}>
                      <Icon d={icons.eye} size={15} />
                    </button>
                    <button className="act print" aria-label={`Print ${i.no}`}>
                      <Icon d={icons.print} size={15} />
                    </button>
                    <button className="act del" aria-label={`Delete ${i.no}`}>
                      <Icon d={icons.trash} size={15} />
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr className="empty-row">
                  <td colSpan="6">
                    No invoices match these filters. Clear the search or change
                    the status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <footer className="invoice-foot">
            <span>
              Showing{" "}
              {filtered.length ? `${start + 1}-${start + rows.length}` : "0"} of{" "}
              {filtered.length} items
            </span>
            <nav className="pager" aria-label="Pagination">
              <button
                disabled={current === 1}
                onClick={() => setPage(current - 1)}
                aria-label="Previous page"
              >
                <Icon d={icons.left} size={15} />
              </button>
              {Array.from({ length: pages }, (_, n) => n + 1).map((n) => (
                <button
                  key={n}
                  className={n === current ? "on" : ""}
                  aria-current={n === current ? "page" : undefined}
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              ))}
              <button
                disabled={current === pages}
                onClick={() => setPage(current + 1)}
                aria-label="Next page"
              >
                <Icon d={icons.right} size={15} />
              </button>
            </nav>
          </footer>
        </section>
      </main>
    </div>
  );
}
