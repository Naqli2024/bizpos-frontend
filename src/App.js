import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout.js";
import Dashboard from "./pages/dashboard/Dashboard.js";
import Billing from "./pages/billing/Billing.js";
import Inventory from "./pages/inventory/Inventory.js";
import Invoices from "./pages/invoices/Invoices.js";
import Payments from "./pages/payments/Payments.js";
import Reports from "./pages/reports/Reports.js";
import Settings from "./pages/settings/Settings.js";
import InvoicePrint from "./pages/invoices/InvoicePrint.js";

const App = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <MainLayout
              theme={theme}
              setTheme={setTheme}
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
            />
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard theme={theme} />} />
          <Route path="/billing" element={<Billing theme={theme} />} />
          <Route path="/invoices" element={<Invoices theme={theme} />} />
          <Route path="/invoices/:invoiceNo" element={<InvoicePrint theme={theme} />}/>
          <Route path="/inventory" element={<Inventory theme={theme} />} />
          <Route path="/payments" element={<Payments theme={theme} />} />
          <Route path="/reports" element={<Reports theme={theme} />} />
          <Route path="/settings" element={<Settings theme={theme} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
