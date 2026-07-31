import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

function Header() {
  return (
    <div className="flex justify-between items-center bg-white shadow p-5 rounded-lg">

      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <div className="flex items-center gap-5">

        <div className="flex items-center border rounded-lg px-3 py-2">

          <FaSearch />

          <input
            type="text"
            placeholder="Search..."
            className="outline-none ml-2"
          />

        </div>

        <FaBell size={22} className="cursor-pointer" />

        <FaUserCircle size={35} className="cursor-pointer" />

      </div>

    </div>
  );
}

export default Header;