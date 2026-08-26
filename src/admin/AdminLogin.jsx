import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      console.log("LOGIN STARTED");

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email.trim(),
          password,
        }
      );

      console.log("LOGIN SUCCESS:", response.data);

      const token = response?.data?.token;

      // =================================================
      // CHECK TOKEN
      // =================================================

      if (!token) {
        console.error(
          "No authentication token received from backend."
        );

        setError(
          "Login succeeded, but no authentication token was received."
        );

        return;
      }

      // =================================================
      // SAVE ADMIN TOKEN
      // =================================================

      localStorage.setItem("adminToken", token);

      console.log(
        "TOKEN SAVED:",
        localStorage.getItem("adminToken")
      );

      // =================================================
      // OPTIONAL LEGACY FLAG
      // =================================================
      // Keeping this for compatibility with any older
      // component that may still use it.

      localStorage.setItem(
        "isAdminLoggedIn",
        "true"
      );

      console.log(
        "LOGIN STATUS:",
        localStorage.getItem("isAdminLoggedIn")
      );

      // =================================================
      // REDIRECT
      // =================================================

      const destination =
        location.state?.from ||
        "/admin/dashboard";

      console.log(
        "REDIRECTING TO:",
        destination
      );

      navigate(destination, {
        replace: true,
      });

    } catch (error) {
      console.error(
        "LOGIN ERROR:",
        error
      );

      console.log(
        "Backend response:",
        error?.response?.data
      );

      setError(
        error?.response?.data?.message ||
          "Unable to login. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-[#c82b2b]">
            Qizar Solutions
          </h1>

          <p className="text-gray-500 mt-2">
            Admin Panel
          </p>

        </div>

        {/* =================================================
            LOGIN CARD
        ================================================= */}

        <div className="bg-white rounded-2xl shadow-xl p-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Admin Login
          </h2>

          <p className="text-gray-500 mb-7">
            Sign in to access the administration dashboard.
          </p>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* =================================================
              FORM
          ================================================= */}

          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="mb-5">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter admin email"
                required
                autoComplete="email"
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:border-[#c82b2b]
                  focus:ring-2
                  focus:ring-red-100
                "
              />

            </div>

            {/* PASSWORD */}

            <div className="mb-6">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter admin password"
                required
                autoComplete="current-password"
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:border-[#c82b2b]
                  focus:ring-2
                  focus:ring-red-100
                "
              />

            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-[#c82b2b]
                hover:bg-red-700
                disabled:bg-gray-400
                disabled:cursor-not-allowed
                text-white
                font-semibold
                py-3
                rounded-xl
                transition
              "
            >
              {loading
                ? "Signing in..."
                : "Login"}
            </button>

          </form>

        </div>

        {/* FOOTER */}

        <p className="text-center text-gray-400 text-sm mt-6">
          © {new Date().getFullYear()} Qizar Solutions Pvt. Ltd.
        </p>

      </div>

    </div>
  );
}

export default AdminLogin;