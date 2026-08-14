import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./Admin.css";

function AdminLayout() {
  return (
    <div className="admin-dashboard">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="admin-main">

        {/* HEADER */}
        <Header />

        {/* PAGE CONTENT */}
        <main className="admin-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;