import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/productApi";
import Sidebar from "./Sidebar";

import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaBell,
  FaPlus,
  FaArrowRight,
  FaExclamationTriangle,
  FaBoxes,
  FaLayerGroup,
} from "react-icons/fa";

function AdminDashboard() {
  
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  const handleLogout = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("isAdminLoggedIn");

  navigate("/admin/login", {
    replace: true,
  });
};
  // =====================================================
  // LOAD PRODUCTS
  // =====================================================

  const loadProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts();

      const data = response?.data ?? [];

      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // =====================================================
  // DASHBOARD CALCULATIONS
  // =====================================================

  const totalProducts = products.length;

  const totalStock = useMemo(() => {
    return products.reduce((total, product) => {
      return total + Number(product.stock || 0);
    }, 0);
  }, [products]);

  const lowStock = useMemo(() => {
    return products.filter((product) => {
      return Number(product.stock || 0) <= 5;
    }).length;
  }, [products]);

  const categories = useMemo(() => {
    return new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    ).size;
  }, [products]);

  // =====================================================
  // RECENT PRODUCTS
  // =====================================================

  const recentProducts = useMemo(() => {
    return products.slice(0, 6);
  }, [products]);

  // =====================================================
  // NAVIGATION
  // =====================================================

  const goTo = (path) => {
    window.location.href = path;
  };

  // =====================================================
  // STOCK STATUS
  // =====================================================

  const getStockStatus = (stock) => {
    const quantity = Number(stock || 0);

    if (quantity === 0) {
      return {
        label: "Out of Stock",
        background: "#fef2f2",
        color: "#dc2626",
      };
    }

    if (quantity <= 5) {
      return {
        label: "Low Stock",
        background: "#fff7ed",
        color: "#ea580c",
      };
    }

    return {
      label: "Available",
      background: "#ecfdf5",
      color: "#059669",
    };
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#f6f7fb",
        overflowX: "hidden",
      }}
    >
      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "260px",
          height: "100vh",
          background: "#111827",
          color: "#ffffff",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* LOGO */}

        <div
          style={{
            height: "90px",
            minHeight: "90px",
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            borderBottom:
              "1px solid rgba(255,255,255,0.1)",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              minWidth: "44px",
              borderRadius: "12px",
              background: "#c82b2b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "21px",
              fontWeight: "800",
            }}
          >
            Q
          </div>

          <div>
            <h2
              style={{
                margin: 0,
                color: "#ffffff",
                fontSize: "20px",
                fontWeight: "800",
                lineHeight: 1.1,
              }}
            >
              Qizar
            </h2>

            <p
              style={{
                margin: "4px 0 0",
                color: "#9ca3af",
                fontSize: "10px",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Solutions
            </p>
          </div>
        </div>

        {/* NAVIGATION */}

        <nav
          style={{
            flex: 1,
            padding: "28px 16px",
            overflowY: "auto",
            boxSizing: "border-box",
          }}
        >
          <SidebarButton
            icon={<FaTachometerAlt />}
            label="Dashboard"
            active
            onClick={() => goTo("/admin/dashboard")}
          />

          <SidebarButton
            icon={<FaBoxOpen />}
            label="Products"
            onClick={() => goTo("/admin/products")}
          />

          <SidebarButton
            icon={<FaShoppingCart />}
            label="Orders"
            onClick={() => goTo("/admin/orders")}
          />

          <SidebarButton
            icon={<FaUsers />}
            label="Users"
            onClick={() => goTo("/admin/users")}
          />

          <SidebarButton
            icon={<FaChartBar />}
            label="Analytics"
            onClick={() => goTo("/admin/analytics")}
          />
        </nav>

        <button
  type="button"
  onClick={handleLogout}
  style={{
    margin: "0 16px 12px",
    padding: "12px 16px",
    border: "none",
    borderRadius: "12px",
    background: "#fee2e2",
    color: "#dc2626",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textAlign: "left",
  }}
>
  <span style={{ fontSize: "18px" }}>↪</span>
  Logout
</button>

        {/* PROFILE */}

        <div
          style={{
            padding: "16px",
            borderTop:
              "1px solid rgba(255,255,255,0.1)",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              padding: "12px",
              borderRadius: "12px",
              background:
                "rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                minWidth: "40px",
                borderRadius: "50%",
                background: "#c82b2b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
              }}
            >
              A
            </div>

            <div>
              <p
                style={{
                  margin: 0,
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: "700",
                }}
              >
                Admin
              </p>

              <p
                style={{
                  margin: "3px 0 0",
                  color: "#9ca3af",
                  fontSize: "11px",
                }}
              >
                Administrator
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* =================================================
          MAIN AREA
      ================================================= */}

      <main
        style={{
          marginLeft: "260px",
          width: "calc(100% - 260px)",
          minHeight: "100vh",
          background: "#f6f7fb",
          overflowX: "hidden",
          boxSizing: "border-box",
        }}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <header
          style={{
            minHeight: "90px",
            width: "100%",
            background: "#ffffff",
            borderBottom: "1px solid #e5e7eb",
            padding: "20px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              minWidth: 0,
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#c82b2b",
                fontSize: "10px",
                fontWeight: "800",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Qizar Solutions
            </p>

            <h1
              style={{
                margin: "5px 0 0",
                color: "#111827",
                fontSize: "26px",
                fontWeight: "800",
              }}
            >
              Dashboard
            </h1>

            <p
              style={{
                margin: "5px 0 0",
                color: "#6b7280",
                fontSize: "13px",
              }}
            >
              Welcome back! Here's what's happening
              with your business.
            </p>
          </div>

          {/* HEADER RIGHT */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              flexShrink: 0,
            }}
          >
            <button
              type="button"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "11px",
                border: "1px solid #e5e7eb",
                background: "#ffffff",
                color: "#6b7280",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <FaBell />
            </button>

            <div
              style={{
                width: "1px",
                height: "38px",
                background: "#e5e7eb",
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  minWidth: "40px",
                  borderRadius: "50%",
                  background: "#c82b2b",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                }}
              >
                A
              </div>

              <div>
                <p
                  style={{
                    margin: 0,
                    color: "#111827",
                    fontSize: "13px",
                    fontWeight: "700",
                  }}
                >
                  Admin
                </p>

                <p
                  style={{
                    margin: "2px 0 0",
                    color: "#9ca3af",
                    fontSize: "11px",
                  }}
                >
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* =================================================
            CONTENT
        ================================================= */}

        <section
          style={{
            width: "100%",
            padding: "30px 32px 50px",
            boxSizing: "border-box",
          }}
        >
          {/* =================================================
              WELCOME BANNER
          ================================================= */}

          <div
            style={{
              width: "100%",
              minHeight: "150px",
              marginBottom: "25px",
              padding: "28px 30px",
              borderRadius: "18px",
              background:
                "linear-gradient(135deg,#111827,#1f2937)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "25px",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  color: "#f87171",
                  fontSize: "10px",
                  fontWeight: "800",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                Admin Panel
              </p>

              <h2
                style={{
                  margin: "7px 0 0",
                  color: "#ffffff",
                  fontSize: "25px",
                  fontWeight: "800",
                }}
              >
                Manage your product catalogue
              </h2>

              <p
                style={{
                  margin: "7px 0 0",
                  color: "#9ca3af",
                  fontSize: "13px",
                }}
              >
                Add, update and manage products
                from one place.
              </p>
            </div>

            <button
              type="button"
              onClick={() => goTo("/admin/products")}
              style={{
                flexShrink: 0,
                border: "none",
                borderRadius: "11px",
                padding: "12px 18px",
                background: "#c82b2b",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                gap: "9px",
                cursor: "pointer",
              }}
            >
              <FaPlus />
              Add Product
            </button>
          </div>

          {/* =================================================
              STAT CARDS
              
              PRICE / INVENTORY VALUE COMPLETELY REMOVED
          ================================================= */}

          {loading ? (
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                padding: "60px",
                textAlign: "center",
                color: "#6b7280",
                marginBottom: "25px",
              }}
            >
              Loading dashboard...
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(4,minmax(0,1fr))",
                gap: "18px",
                marginBottom: "25px",
              }}
            >
              <StatCard
                icon={<FaBoxOpen />}
                title="Total Products"
                value={totalProducts}
              />

              <StatCard
                icon={<FaBoxes />}
                title="Total Stock"
                value={totalStock}
              />

              <StatCard
                icon={<FaExclamationTriangle />}
                title="Low Stock"
                value={lowStock}
                warning
              />

              <StatCard
                icon={<FaLayerGroup />}
                title="Categories"
                value={categories}
              />
            </div>
          )}

          {/* =================================================
              RECENT PRODUCTS
          ================================================= */}

          <div
            style={{
              width: "100%",
              background: "#ffffff",
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
              overflow: "hidden",
            }}
          >
            {/* SECTION HEADER */}

            <div
              style={{
                padding: "22px 24px",
                borderBottom:
                  "1px solid #e5e7eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    color: "#111827",
                    fontSize: "18px",
                    fontWeight: "800",
                  }}
                >
                  Recent Products
                </h2>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: "#9ca3af",
                    fontSize: "12px",
                  }}
                >
                  Latest products added to your
                  catalogue
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  goTo("/admin/products")
                }
                style={{
                  border: "none",
                  background: "#fef2f2",
                  color: "#c82b2b",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "12px",
                  fontWeight: "700",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                View All
                <FaArrowRight />
              </button>
            </div>

            {/* EMPTY STATE */}

            {recentProducts.length === 0 ? (
              <div
                style={{
                  padding: "70px 20px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    margin: "0 auto",
                    borderRadius: "15px",
                    background: "#f3f4f6",
                    color: "#9ca3af",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                  }}
                >
                  <FaBoxOpen />
                </div>

                <h3
                  style={{
                    marginTop: "15px",
                    color: "#374151",
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  No products found
                </h3>

                <p
                  style={{
                    marginTop: "7px",
                    color: "#9ca3af",
                    fontSize: "12px",
                  }}
                >
                  Add products from the Products
                  section.
                </p>
              </div>
            ) : (
              /* =================================================
                 TABLE
              ================================================= */

              <div
                style={{
                  width: "100%",
                  overflowX: "auto",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    minWidth: "760px",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        background: "#f9fafb",
                      }}
                    >
                      <TableHeader>
                        Product
                      </TableHeader>

                      <TableHeader>
                        Brand
                      </TableHeader>

                      <TableHeader>
                        Category
                      </TableHeader>

                      <TableHeader>
                        Stock
                      </TableHeader>

                      <TableHeader>
                        Status
                      </TableHeader>
                    </tr>
                  </thead>

                  <tbody>
                    {recentProducts.map(
                      (product) => {
                        const stock = Number(
                          product.stock || 0
                        );

                        const status =
                          getStockStatus(stock);

                        return (
                          <tr
                            key={
                              product._id ||
                              product.id
                            }
                            style={{
                              borderTop:
                                "1px solid #f1f5f9",
                            }}
                          >
                            {/* PRODUCT */}

                            <td
                              style={{
                                padding:
                                  "16px 24px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems:
                                    "center",
                                  gap: "12px",
                                }}
                              >
                                {product.image ? (
                                  <img
                                    src={
                                      product.image
                                    }
                                    alt={
                                      product.name ||
                                      "Product"
                                    }
                                    style={{
                                      width: "58px",
                                      height: "58px",
                                      borderRadius:
                                        "12px",
                                      objectFit:
                                        "contain",
                                      background:
                                        "#ffffff",
                                      border:
                                        "1px solid #e5e7eb",
                                      padding:
                                        "5px",
                                      flexShrink: 0,
                                      boxSizing:
                                        "border-box",
                                    }}
                                    onError={(e) => {
                                      e.currentTarget.style.display =
                                        "none";
                                    }}
                                  />
                                ) : (
                                  <div
                                    style={{
                                      width: "58px",
                                      height: "58px",
                                      borderRadius:
                                        "12px",
                                      background:
                                        "#f3f4f6",
                                      color:
                                        "#9ca3af",
                                      display:
                                        "flex",
                                      alignItems:
                                        "center",
                                      justifyContent:
                                        "center",
                                      flexShrink: 0,
                                    }}
                                  >
                                    <FaBoxOpen />
                                  </div>
                                )}

                                <div
                                  style={{
                                    minWidth: 0,
                                  }}
                                >
                                  <strong
                                    style={{
                                      color:
                                        "#1f2937",
                                      fontSize:
                                        "13px",
                                      display:
                                        "block",
                                      maxWidth:
                                        "240px",
                                      overflow:
                                        "hidden",
                                      textOverflow:
                                        "ellipsis",
                                      whiteSpace:
                                        "nowrap",
                                    }}
                                  >
                                    {product.name ||
                                      "Unnamed Product"}
                                  </strong>

                                  {product.description && (
                                    <p
                                      style={{
                                        margin:
                                          "4px 0 0",
                                        color:
                                          "#9ca3af",
                                        fontSize:
                                          "11px",
                                        maxWidth:
                                          "240px",
                                        overflow:
                                          "hidden",
                                        textOverflow:
                                          "ellipsis",
                                        whiteSpace:
                                          "nowrap",
                                      }}
                                    >
                                      {
                                        product.description
                                      }
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* BRAND */}

                            <td
                              style={{
                                padding:
                                  "16px 24px",
                                color:
                                  "#4b5563",
                                fontSize:
                                  "13px",
                              }}
                            >
                              {product.brand ||
                                "—"}
                            </td>

                            {/* CATEGORY */}

                            <td
                              style={{
                                padding:
                                  "16px 24px",
                              }}
                            >
                              <span
                                style={{
                                  display:
                                    "inline-flex",
                                  padding:
                                    "6px 10px",
                                  borderRadius:
                                    "999px",
                                  background:
                                    "#fef2f2",
                                  color:
                                    "#c82b2b",
                                  fontSize:
                                    "10px",
                                  fontWeight:
                                    "700",
                                  whiteSpace:
                                    "nowrap",
                                }}
                              >
                                {product.category ||
                                  "General"}
                              </span>
                            </td>

                            {/* STOCK */}

                            <td
                              style={{
                                padding:
                                  "16px 24px",
                                color:
                                  "#374151",
                                fontWeight:
                                  "700",
                                fontSize:
                                  "13px",
                              }}
                            >
                              {stock}
                            </td>

                            {/* STATUS */}

                            <td
                              style={{
                                padding:
                                  "16px 24px",
                              }}
                            >
                              <span
                                style={{
                                  display:
                                    "inline-flex",
                                  alignItems:
                                    "center",
                                  gap: "7px",
                                  padding:
                                    "6px 10px",
                                  borderRadius:
                                    "999px",
                                  background:
                                    status.background,
                                  color:
                                    status.color,
                                  fontSize:
                                    "10px",
                                  fontWeight:
                                    "700",
                                  whiteSpace:
                                    "nowrap",
                                }}
                              >
                                <span
                                  style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius:
                                      "50%",
                                    background:
                                      "currentColor",
                                  }}
                                />

                                {status.label}
                              </span>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

// =====================================================
// SIDEBAR BUTTON
// =====================================================

function SidebarButton({
  icon,
  label,
  active = false,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        height: "48px",
        marginBottom: "8px",
        padding: "0 16px",
        border: "none",
        borderRadius: "11px",
        background: active
          ? "#c82b2b"
          : "transparent",
        color: active
          ? "#ffffff"
          : "#9ca3af",
        display: "flex",
        alignItems: "center",
        gap: "13px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        textAlign: "left",
        transition:
          "background 0.2s ease, color 0.2s ease",
      }}
    >
      <span
        style={{
          width: "20px",
          display: "flex",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </span>

      {label}
    </button>
  );
}

// =====================================================
// STAT CARD
// =====================================================

function StatCard({
  icon,
  title,
  value,
  warning = false,
}) {
  return (
    <div
      style={{
        minWidth: 0,
        background: "#ffffff",
        borderRadius: "16px",
        border: "1px solid #e5e7eb",
        padding: "21px",
        boxSizing: "border-box",
        transition:
          "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: warning
            ? "#fff7ed"
            : "#fef2f2",
          color: warning
            ? "#ea580c"
            : "#c82b2b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "700",
          fontSize: "17px",
        }}
      >
        {icon}
      </div>

      <p
        style={{
          margin: "16px 0 0",
          color: "#9ca3af",
          fontSize: "10px",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {title}
      </p>

      <p
        style={{
          margin: "5px 0 0",
          color: "#111827",
          fontSize: "24px",
          fontWeight: "800",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </p>
    </div>
  );
}

// =====================================================
// TABLE HEADER
// =====================================================

function TableHeader({ children }) {
  return (
    <th
      style={{
        padding: "14px 24px",
        color: "#6b7280",
        textAlign: "left",
        fontSize: "10px",
        fontWeight: "800",
        textTransform: "uppercase",
        letterSpacing: "0.7px",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </th>
  );
}

export default AdminDashboard;