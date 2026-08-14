import { FaBell } from "react-icons/fa";

function Header() {
  return (
    <header className="admin-header">

      <div className="header-left">

        <p className="header-eyebrow">
          QIZAR SOLUTIONS
        </p>

        <h1>
          Admin Panel
        </h1>

        <p className="header-description">
          Manage your products and business information.
        </p>

      </div>

      <div className="header-right">

        <button
          type="button"
          className="header-icon-button"
          title="Notifications"
        >
          <FaBell />
        </button>

        <div className="header-user">

          <div className="header-avatar">
            A
          </div>

          <div className="header-user-info">

            <strong>
              Admin
            </strong>

            <span>
              Administrator
            </span>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;