import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";


function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <FaBoxOpen />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <FaShoppingCart />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <FaUsers />,
    },
    {
      name: "Analytics",
      path: "/admin/analytics",
      icon: <FaChartBar />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("isAdminLoggedIn");

    navigate("/admin/login", {
      replace: true,
    });
  };

  return (
    <aside className="admin-sidebar">

      {/* ==============================
          LOGO
      ============================== */}

      <div className="sidebar-logo">

        <div className="sidebar-logo-icon">
          Q
        </div>

        <div className="sidebar-logo-text">
          <h2>Qizar</h2>
          <span>SOLUTIONS</span>
        </div>

      </div>


      {/* ==============================
          NAVIGATION
      ============================== */}

      <nav className="sidebar-navigation">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >

            <span className="sidebar-link-icon">
              {item.icon}
            </span>

            <span>
              {item.name}
            </span>

          </NavLink>
        ))}

      </nav>


      {/* ==============================
          SIDEBAR BOTTOM
      ============================== */}

      <div className="sidebar-bottom">

        <div className="admin-profile">

          <div className="admin-avatar">
            A
          </div>

          <div className="admin-profile-info">

            <strong>
              Admin
            </strong>

            <span>
              Administrator
            </span>

          </div>

        </div>


        {/* LOGOUT */}

        <button
          type="button"
          onClick={handleLogout}
          className="
            mt-4
            w-full
            flex
            items-center
            justify-center
            gap-3
            px-4
            py-3
            rounded-xl
            bg-red-50
            text-red-600
            font-semibold
            hover:bg-red-100
            transition
          "
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;