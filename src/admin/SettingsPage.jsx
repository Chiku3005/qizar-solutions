import { useState } from "react";
import {
  FaUser,
  FaBell,
  FaStore,
  FaLock,
  FaSave,
} from "react-icons/fa";

function SettingsPage() {

  const [settings, setSettings] = useState({
    storeName: "Qizar Solutions",
    email: "admin@qizarsolutions.com",
    phone: "",
    notifications: true,
    orderNotifications: true,
    lowStockNotifications: true,
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

  };


  const handleSave = async (e) => {

    e.preventDefault();

    setSaving(true);

    // Temporary save.
    // Later this will be connected to backend.

    setTimeout(() => {

      setSaving(false);

      alert("Settings saved successfully!");

    }, 800);

  };


  return (
    <div className="space-y-7">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Settings
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your store and admin panel settings.
        </p>

      </div>


      <form onSubmit={handleSave} className="space-y-6">


        {/* =========================================
            STORE INFORMATION
        ========================================= */}

        <div className="
          bg-white
          rounded-2xl
          border
          border-gray-100
          shadow-sm
          p-6
        ">

          <div className="flex items-center gap-3 mb-6">

            <div className="
              w-11
              h-11
              rounded-xl
              bg-red-50
              text-red-600
              flex
              items-center
              justify-center
            ">
              <FaStore />
            </div>

            <div>

              <h2 className="text-xl font-bold text-gray-800">
                Store Information
              </h2>

              <p className="text-sm text-gray-500">
                Basic information about your business.
              </p>

            </div>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


            {/* STORE NAME */}

            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-gray-700
                mb-2
              ">
                Store Name
              </label>

              <input
                type="text"
                name="storeName"
                value={settings.storeName}
                onChange={handleChange}
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  outline-none
                  focus:bg-white
                  focus:border-red-500
                  focus:ring-2
                  focus:ring-red-100
                "
              />

            </div>


            {/* EMAIL */}

            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-gray-700
                mb-2
              ">
                Admin Email
              </label>

              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  outline-none
                  focus:bg-white
                  focus:border-red-500
                  focus:ring-2
                  focus:ring-red-100
                "
              />

            </div>


            {/* PHONE */}

            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-gray-700
                mb-2
              ">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  outline-none
                  focus:bg-white
                  focus:border-red-500
                  focus:ring-2
                  focus:ring-red-100
                "
              />

            </div>

          </div>

        </div>


        {/* =========================================
            NOTIFICATIONS
        ========================================= */}

        <div className="
          bg-white
          rounded-2xl
          border
          border-gray-100
          shadow-sm
          p-6
        ">

          <div className="flex items-center gap-3 mb-6">

            <div className="
              w-11
              h-11
              rounded-xl
              bg-blue-50
              text-blue-600
              flex
              items-center
              justify-center
            ">
              <FaBell />
            </div>

            <div>

              <h2 className="text-xl font-bold text-gray-800">
                Notifications
              </h2>

              <p className="text-sm text-gray-500">
                Choose which notifications you want to receive.
              </p>

            </div>

          </div>


          <div className="space-y-5">


            {/* GENERAL */}

            <label className="
              flex
              items-center
              justify-between
              gap-4
              cursor-pointer
            ">

              <div>

                <p className="font-semibold text-gray-800">
                  General Notifications
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Receive important admin notifications.
                </p>

              </div>

              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
                className="
                  w-5
                  h-5
                  accent-red-600
                "
              />

            </label>


            {/* ORDERS */}

            <label className="
              flex
              items-center
              justify-between
              gap-4
              cursor-pointer
              border-t
              border-gray-100
              pt-5
            ">

              <div>

                <p className="font-semibold text-gray-800">
                  Order Notifications
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Get notified when a new order is received.
                </p>

              </div>

              <input
                type="checkbox"
                name="orderNotifications"
                checked={settings.orderNotifications}
                onChange={handleChange}
                className="
                  w-5
                  h-5
                  accent-red-600
                "
              />

            </label>


            {/* LOW STOCK */}

            <label className="
              flex
              items-center
              justify-between
              gap-4
              cursor-pointer
              border-t
              border-gray-100
              pt-5
            ">

              <div>

                <p className="font-semibold text-gray-800">
                  Low Stock Notifications
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Get notified when products have low stock.
                </p>

              </div>

              <input
                type="checkbox"
                name="lowStockNotifications"
                checked={settings.lowStockNotifications}
                onChange={handleChange}
                className="
                  w-5
                  h-5
                  accent-red-600
                "
              />

            </label>

          </div>

        </div>


        {/* =========================================
            SECURITY
        ========================================= */}

        <div className="
          bg-white
          rounded-2xl
          border
          border-gray-100
          shadow-sm
          p-6
        ">

          <div className="flex items-center gap-3 mb-6">

            <div className="
              w-11
              h-11
              rounded-xl
              bg-purple-50
              text-purple-600
              flex
              items-center
              justify-center
            ">
              <FaLock />
            </div>

            <div>

              <h2 className="text-xl font-bold text-gray-800">
                Security
              </h2>

              <p className="text-sm text-gray-500">
                Manage your administrator account security.
              </p>

            </div>

          </div>


          <button
            type="button"
            className="
              px-5
              py-3
              rounded-xl
              border
              border-gray-200
              text-gray-700
              font-semibold
              hover:bg-gray-50
              transition
            "
          >
            Change Password
          </button>

        </div>


        {/* =========================================
            SAVE BUTTON
        ========================================= */}

        <div className="
          flex
          justify-end
          pb-4
        ">

          <button
            type="submit"
            disabled={saving}
            className="
              flex
              items-center
              gap-2
              px-6
              py-3
              rounded-xl
              bg-red-600
              hover:bg-red-700
              disabled:opacity-60
              disabled:cursor-not-allowed
              text-white
              font-semibold
              shadow-lg
              shadow-red-200
              transition
            "
          >

            <FaSave />

            {saving ? "Saving..." : "Save Changes"}

          </button>

        </div>

      </form>

    </div>
  );
}

export default SettingsPage;