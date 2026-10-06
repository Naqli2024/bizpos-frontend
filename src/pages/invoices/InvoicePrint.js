import React from "react";
import { useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import "../../assets/styles/InvoicePrint.css";

// --------------------------------------------------
// DUMMY INVOICE DATA
// Later replace this with getInvoiceByInvoiceNo()
// --------------------------------------------------
const DUMMY_INVOICE = {
  invoiceNo: "TYRE-INV-20260922-5678",
  date: "22-09-2026",

  seller: {
    name: "SRI MURUGAN TYRES",
    city: "COIMBATORE",
    mobile: "+91 8098765431",
    gstin: "23 0987612",
    logo: "/assets/images/balaji-logo.png",
  },

  customer: {
    name: "TEST",
    city: "CHENNAI",
    mobile: "+91 9876543213",
    gstin: "69ABCDE1234F1Z5",
  },

  items: [
    {
      id: 1,
      name: "Apollo",
      hsn: "543",
      quantity: 2,
      rateIncludingTax: 525,
      rate: 500,
      per: "pcs",
      amount: 1000,
    },
  ],

  taxes: {
    sgst: 25,
    cgst: 25,
    roundOff: 0,
  },

  totals: {
    taxableValue: 1000,
    cgstRate: 2.5,
    cgstAmount: 25,
    sgstRate: 2.5,
    sgstAmount: 25,
    totalTax: 50,
    grandTotal: 1050,
  },

  amountInWords: "Indian Rupees One Thousand Fifty Rupees Only",
  taxAmountInWords: "Indian Rupees Fifty Rupees Only",
};

// --------------------------------------------------

const money = (value) =>
  `₹${Number(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const InvoicePrint = () => {
  const { invoiceNo } = useParams();

  // For now use dummy data.
  // Later:
  // const invoice = apiResponse;
  const invoice = {
    ...DUMMY_INVOICE,
    invoiceNo: invoiceNo || DUMMY_INVOICE.invoiceNo,
  };

  return (
    <div className="invoice-print-page">
      <div className="invoice-print">

        {/* ================= HEADER ================= */}
        <div className="print-header">
          <div className="invoice-title">
            <h2>Tax Invoice</h2>
          </div>

          <div className="invoice-meta">
            <span>
              Invoice No: <strong>{invoice.invoiceNo}</strong>
            </span>

            <span>
              Dated: <strong>{invoice.date}</strong>
            </span>
          </div>
        </div>

        {/* ================= SELLER / CUSTOMER ================= */}
        <div className="party-section">

          {/* SELLER */}
          <div className="seller-details">
            <div className="seller-logo">
              <img
                src={invoice.seller.logo}
                alt="Company Logo"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            <h3>{invoice.seller.name}</h3>

            <p>{invoice.seller.city}</p>
            <p>{invoice.seller.mobile}</p>
            <p className="gst-text">
              GSTIN: {invoice.seller.gstin}
            </p>
          </div>

          {/* CUSTOMER */}
          <div className="customer-details">

            <div className="qr-wrapper">
              <QRCodeSVG
                value={`Invoice:${invoice.invoiceNo}|Amount:${invoice.totals.grandTotal}`}
                size={88}
                level="M"
              />
            </div>

            <div className="bill-to">
              <span className="bill-label">Bill To:</span>

              <h3>{invoice.customer.name}</h3>

              <p>{invoice.customer.city}</p>
              <p>{invoice.customer.mobile}</p>

              <p className="gst-text">
                GSTIN: {invoice.customer.gstin}
              </p>
            </div>
          </div>
        </div>

        <div className="invoice-divider" />

        {/* ================= ITEMS TABLE ================= */}
        <table className="items-table">
          <thead>
            <tr>
              <th className="sl-col">
                SI
                <br />
                No.
              </th>
              <th className="description-col">
                Description of Goods
              </th>
              <th className="hsn-col">
                HSN/SAC
              </th>

              <th className="qty-col">
                Quantity
              </th>

              <th className="tax-rate-col">
                Rate
                <br />
                <span>(Incl. of Tax)</span>
              </th>
              <th className="rate-col">
                Rate
              </th>
              <th className="per-col">
                Per
              </th>
              <th className="amount-col">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={item.id} className="item-row">

                <td className="center">
                  {index + 1}
                </td>

                <td className="item-name">
                  {item.name}
                </td>

                <td className="center">
                  {item.hsn}
                </td>

                <td className="center">
                  {item.quantity}
                </td>

                <td className="right">
                  {money(item.rateIncludingTax)}
                </td>

                <td className="right">
                  {money(item.rate)}
                </td>

                <td className="center">
                  {item.per}
                </td>

                <td className="right amount">
                  {money(item.amount)}
                </td>
              </tr>
            ))}

            {/* Empty space + tax rows */}
            <tr className="tax-space-row">
              <td colSpan="4"></td>

              <td colSpan="3" className="tax-labels">
                <div>SGST</div>
                <div>CGST</div>
                <div>ROUND OFF</div>
              </td>

              <td className="tax-values">
                <div>{money(invoice.taxes.sgst)}</div>
                <div>{money(invoice.taxes.cgst)}</div>
                <div>{money(invoice.taxes.roundOff)}</div>
              </td>
            </tr>

            {/* TOTAL */}
            <tr className="total-row">
              <td colSpan="3"></td>

              <td className="total-label">
                Total
              </td>

              <td colSpan="3" className="total-qty">
                {invoice.items.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                )}{" "}
                pcs
              </td>

              <td className="right total-amount">
                {money(invoice.totals.grandTotal)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* ================= AMOUNT ================= */}
        <div className="amount-section">

          <div className="amount-left">
            <div className="small-label">
              Amount Chargeable (in words)
            </div>

            <strong>
              {invoice.amountInWords}
            </strong>

            <div className="due-amount">
              Due Amount: <strong>{money(invoice.totals.grandTotal)}</strong>
            </div>
          </div>

          <div className="eoe">
            <strong>E. &amp; O. E</strong>
          </div>
        </div>

        {/* ================= TAX SUMMARY ================= */}
        <table className="tax-summary-table">
          <thead>
            <tr>
              <th rowSpan="2">HSN/SAC</th>
              <th rowSpan="2">Taxable Value</th>

              <th colSpan="2">CGST</th>

              <th colSpan="2">SGST/UTGST</th>

              <th rowSpan="2">
                Total
                <br />
                Tax Amount
              </th>
            </tr>

            <tr>
              <th>Rate</th>
              <th>Amount</th>

              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {invoice.items.map((item) => (
              <tr key={item.id}>
                <td>{item.hsn}</td>

                <td className="right">
                  {money(invoice.totals.taxableValue)}
                </td>

                <td className="center">
                  {invoice.totals.cgstRate}%
                </td>

                <td className="right">
                  {money(invoice.totals.cgstAmount)}
                </td>

                <td className="center">
                  {invoice.totals.sgstRate}%
                </td>

                <td className="right">
                  {money(invoice.totals.sgstAmount)}
                </td>

                <td className="right">
                  {money(invoice.totals.totalTax)}
                </td>
              </tr>
            ))}

            <tr className="tax-total">
              <td>
                <strong>Total</strong>
              </td>

              <td className="right">
                <strong>
                  {money(invoice.totals.taxableValue)}
                </strong>
              </td>

              <td></td>

              <td className="right">
                <strong>
                  {money(invoice.totals.cgstAmount)}
                </strong>
              </td>

              <td></td>

              <td className="right">
                <strong>
                  {money(invoice.totals.sgstAmount)}
                </strong>
              </td>

              <td className="right">
                <strong>
                  {money(invoice.totals.totalTax)}
                </strong>
              </td>
            </tr>
          </tbody>
        </table>

        {/* ================= TAX WORDS ================= */}
        <div className="tax-words">
          Tax Amount (in words):{" "}
          <strong>{invoice.taxAmountInWords}</strong>
        </div>

        {/* ================= DECLARATION ================= */}
        <div className="bottom-section">

          <div className="declaration">
            <div className="underline-title">
              Declaration
            </div>

            <p>
              We declare that this invoice shows the actual price
              of the goods described
              <br />
              and that all particulars are true and correct.
            </p>
          </div>

          <div className="signature">
            <strong>
              for {invoice.seller.name}
            </strong>

            <div className="signature-space"></div>

            <span>
              Authorised Signatory
            </span>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="generated-footer">
          This is a Computer Generated Invoice
        </div>

      </div>
    </div>
  );
};

export default InvoicePrint;