import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import axios from "axios";

// =====================================================
// PUBLIC PAGES
// =====================================================

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";

// =====================================================
// ADMIN PAGES
// =====================================================

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ProductsPage from "./admin/ProductsPage";

// =====================================================
// API
// =====================================================

import { getProducts } from "./api/productApi";
import ProtectedRoute from "./admin/ProtectedRoute";


// =====================================================
// ADMIN PRODUCTS WRAPPER
// =====================================================

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===================================================
  // LOAD PRODUCTS
  // ===================================================

  const loadProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts();

      const data = response?.data ?? [];

      setProducts(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "Failed to load products:",
        error
      );

      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // ===================================================
  // LOAD PRODUCTS
  // ===================================================

  useEffect(() => {
    loadProducts();
  }, []);

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">

          <div
            className="
              w-12
              h-12
              border-4
              border-red-100
              border-t-[#c82b2b]
              rounded-full
              animate-spin
              mx-auto
              mb-4
            "
          />

          <p className="text-gray-500 font-medium">
            Loading products...
          </p>

        </div>
      </div>
    );
  }

  // ===================================================
  // PRODUCTS PAGE
  // ===================================================

  return (
    <ProductsPage
      products={products}
      setProducts={setProducts}
      editingProduct={editingProduct}
      setEditingProduct={setEditingProduct}
      loadProducts={loadProducts}
    />
  );
}


// =====================================================
// PROTECTED ADMIN ROUTE
// =====================================================

function ProtectedAdminRoute({ children }) {
  const location = useLocation();

  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;

    const verifyAdmin = async () => {
      const token = localStorage.getItem("adminToken");

      // -----------------------------------------------
      // NO TOKEN
      // -----------------------------------------------

      if (!token) {
        if (mounted) {
          setAuthenticated(false);
          setChecking(false);
        }

        return;
      }

      // -----------------------------------------------
      // VERIFY TOKEN WITH BACKEND
      // -----------------------------------------------

      try {
        await axios.get(
          "http://localhost:5000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (mounted) {
          setAuthenticated(true);
        }
      } catch (error) {
        console.error(
          "Admin authentication failed:",
          error
        );

        // -------------------------------------------
        // REMOVE INVALID AUTH DATA
        // -------------------------------------------

        localStorage.removeItem("adminToken");
        localStorage.removeItem("isAdminLoggedIn");

        if (mounted) {
          setAuthenticated(false);
        }
      } finally {
        if (mounted) {
          setChecking(false);
        }
      }
    };

    verifyAdmin();

    return () => {
      mounted = false;
    };
  }, [location.pathname]);

  // ===================================================
  // CHECKING AUTHENTICATION
  // ===================================================

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">

        <div className="text-center">

          <div
            className="
              w-12
              h-12
              border-4
              border-red-100
              border-t-[#c82b2b]
              rounded-full
              animate-spin
              mx-auto
              mb-4
            "
          />

          <p className="text-gray-500 font-medium">
            Verifying admin access...
          </p>

        </div>

      </div>
    );
  }

  // ===================================================
  // NOT AUTHENTICATED
  // ===================================================

  if (!authenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  // ===================================================
  // AUTHENTICATED
  // ===================================================

  return children;
}


// =====================================================
// ADMIN PLACEHOLDER
// =====================================================

function AdminPlaceholder({
  title,
  message,
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

      <div
        className="
          bg-white
          rounded-2xl
          shadow-sm
          border
          border-gray-100
          p-10
          text-center
          max-w-lg
          w-full
        "
      >

        <div
          className="
            w-16
            h-16
            bg-red-50
            text-[#c82b2b]
            rounded-2xl
            flex
            items-center
            justify-center
            mx-auto
            mb-5
            text-2xl
            font-bold
          "
        >
          Q
        </div>

        <h1 className="text-3xl font-bold text-gray-800">
          {title}
        </h1>

        <p className="text-gray-500 mt-3">
          {message}
        </p>

        <button
          onClick={() => window.history.back()}
          className="
            mt-7
            px-6
            py-3
            rounded-xl
            bg-[#c82b2b]
            hover:bg-red-700
            text-white
            font-semibold
            transition
          "
        >
          Go Back
        </button>

      </div>

    </div>
  );
}


// =====================================================
// APP
// =====================================================

function App() {
  return (
    <Routes>

      {/* =================================================
          PUBLIC WEBSITE
      ================================================= */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/products"
        element={<Products />}
      />

      <Route
        path="/products/:id"
        element={<ProductDetails />}
      />


      {/* =================================================
          ADMIN LOGIN
          PUBLIC ROUTE
      ================================================= */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />


      {/* =================================================
          ADMIN ROOT
      ================================================= */}

      <Route
        path="/admin"
        element={
          <Navigate
            to="/admin/dashboard"
            replace
          />
        }
      />


      {/* =================================================
          PROTECTED ADMIN DASHBOARD
      ================================================= */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />


      {/* =================================================
          PROTECTED ADMIN PRODUCTS
      ================================================= */}

      <Route
        path="/admin/products"
        element={
          <ProtectedAdminRoute>
            <AdminProducts />
          </ProtectedAdminRoute>
        }
      />


      {/* =================================================
          PROTECTED ADMIN ORDERS
      ================================================= */}

      <Route
        path="/admin/orders"
        element={
          <ProtectedAdminRoute>
            <AdminPlaceholder
              title="Orders"
              message="Order management will be available here."
            />
          </ProtectedAdminRoute>
        }
      />


      {/* =================================================
          PROTECTED ADMIN USERS
      ================================================= */}

      <Route
        path="/admin/users"
        element={
          <ProtectedAdminRoute>
            <AdminPlaceholder
              title="Users"
              message="User management will be available here."
            />
          </ProtectedAdminRoute>
        }
      />


      {/* =================================================
          PROTECTED ADMIN ANALYTICS
      ================================================= */}

      <Route
        path="/admin/analytics"
        element={
          <ProtectedAdminRoute>
            <AdminPlaceholder
              title="Analytics"
              message="Analytics will be available here."
            />
          </ProtectedAdminRoute>
        }
      />


      {/* =================================================
          404
      ================================================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}

export default App;