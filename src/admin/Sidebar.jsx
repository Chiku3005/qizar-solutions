import {
  FaTachometerAlt,
  FaBoxOpen,
  FaUsers,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white fixed left-0 top-0">

      <div className="text-2xl font-bold p-6 border-b border-slate-700">
        Qizar Admin
      </div>

      <ul className="mt-8 space-y-2">

        <li className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800 cursor-pointer">
          <FaTachometerAlt />
          Dashboard
        </li>

        <li className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800 cursor-pointer">
          <FaBoxOpen />
          Products
        </li>

        <li className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800 cursor-pointer">
          <FaShoppingCart />
          Orders
        </li>

        <li className="flex items-center gap-3 px-6 py-3 hover:bg-slate-800 cursor-pointer">
          <FaUsers />
          Users
        </li>

      </ul>

      <div className="absolute bottom-0 w-full border-t border-slate-700">

        <button className="flex items-center gap-3 w-full px-6 py-4 hover:bg-red-600">
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;