import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";
import Invoices from "./pages/Invoices";
import Inventory from "./pages/Inventory";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

const App = () => {
  const [theme, setTheme] = useState("light");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>

       
      </Routes>
    </BrowserRouter>
  );
};

export default App;