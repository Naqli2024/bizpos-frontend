import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiCreditCard,
  FiFileText,
  FiClock,
  FiPackage,
  FiLayers,
  FiSettings,
  FiUsers,
  FiShoppingBag,
  FiBarChart2,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
} from "react-icons/fi";

import "../assets/styles/sidebar.css"


const Sidebar = ({
  theme = "light",
  setTheme,
  mobileOpen,
  setMobileOpen,
}) => {
    const location = useLocation();
  const menuItems = [
    {
      section: "",
      items: [
        {
          name: "Dashboard",
          icon: <FiGrid />,
          path: "/dashboard",
        },
        {
          name: "Billing",
          icon: <FiCreditCard />,
          path: "/billing",
        },
        {
          name: "Invoices",
          icon: <FiFileText />,
          path: "/invoices",
        },
           {
          name: "Inventory",
          icon: <FiPackage />,
          path: "/inventory",
        },
         {
          name: "Payments",
          icon: <FiShoppingBag />,
          path: "/payments",
        },
          {
          name: "Reports",
          icon: <FiBarChart2 />,
          path: "/reports",
        },
        
        {
          name: "Settings",
          icon: <FiSettings />,
          path: "/settings",
        },
      ],
    }
  ];

  const handleMenuClick = () => {
    if (window.innerWidth < 992) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="sidebar-overlay d-lg-none"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`biz-sidebar ${
          theme === "dark" ? "sidebar-dark" : "sidebar-light"
        } ${mobileOpen ? "sidebar-mobile-open" : ""}`}
      >
        {/* Logo */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">
              <FiShoppingBag />
            </div>

            <span>BizPOS</span>
          </div>

          {/* Mobile close */}
          <button
            className="sidebar-close d-lg-none"
            onClick={() => setMobileOpen(false)}
          >
            <FiX />
          </button>
        </div>

        {/* Menu */}
        <div className="sidebar-menu">
          {menuItems.map((group, groupIndex) => (
            <div
              className="sidebar-menu-group"
              key={groupIndex}
            >
              {group.section && (
                <div className="sidebar-section-title">
                  {group.section}
                </div>
              )}

              {group.items.map((item, index) => (
              <Link
  to={item.path}
  className={`sidebar-item ${
    location.pathname === item.path ? "active" : ""
  }`}
  key={index}
  onClick={handleMenuClick}
>
                  <span className="sidebar-item-icon">
                    {item.icon}
                  </span>

                  <span className="sidebar-item-text">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="sidebar-bottom">
          {/* Theme switch */}
          <div className="sidebar-theme">
            <button
              className={`theme-btn ${
                theme === "light" ? "theme-active" : ""
              }`}
              onClick={() => setTheme("light")}
              title="Light mode"
            >
              <FiSun />
            </button>

            <button
              className={`theme-btn ${
                theme === "dark" ? "theme-active" : ""
              }`}
              onClick={() => setTheme("dark")}
              title="Dark mode"
            >
              <FiMoon />
            </button>
          </div>

          {/* Admin */}
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              A
            </div>

            <div className="sidebar-user-info">
              <div className="sidebar-user-name">
                Admin
              </div>

              <div className="sidebar-user-role">
                Administrator
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;