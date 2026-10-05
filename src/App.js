import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "./components/layout/MainLayout.js";
import Dashboard from "./pages/dashboard/Dashboard.js";
import Billing from "./pages/billing/Billing";
import Invoices from "./pages/invoices/Invoices";
import Reports from "./pages/reports/Reports";
import Inventory from "./pages/inventory/Inventory";
import Payments from "./pages/payments/Payments.js";
import Settings from "./pages/settings/Settings.js";




const App = () => {
  const [theme, setTheme] = useState("light");
  const [mobileOpen, setMobileOpen] = useState(false);

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

          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard theme={theme} />}
          />

          <Route
            path="/billing"
            element={<Billing theme={theme} />}
          />

          <Route
            path="/invoices"
            element={<Invoices theme={theme} />}
          />

          <Route
            path="/inventory"
            element={<Inventory theme={theme}  />}
          />

          <Route
            path="/payments"
            element={<Payments theme={theme}/>}
          />

          <Route
            path="/reports"
            element={<Reports />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
};

export default App;