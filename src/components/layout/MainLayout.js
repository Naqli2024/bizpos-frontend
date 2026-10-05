import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../helpers/SidebarData.js";
import "../../assets/styles/mainlayout.css";

const MainLayout = ({
  theme,
  setTheme,
  mobileOpen,
  setMobileOpen,
}) => {
  return (
    <div className="app-layout" data-theme={theme}>

      <Sidebar
        theme={theme}
        setTheme={setTheme}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="main-content">
        <Outlet />
      </main>

    </div>
  );
};

export default MainLayout;