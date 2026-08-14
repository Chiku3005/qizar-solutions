import { useEffect, useMemo, useState } from "react";
import {
  FaUsers,
  FaUserCheck,
  FaUserClock,
  FaUserTimes,
  FaEye,
  FaTrash,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import {
  getUsers,
  getUser,
  deleteUser,
} from "../api/userApi";

function UsersPage() {
  // =====================================================
  // STATES
  // =====================================================

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);

  const [viewLoading, setViewLoading] = useState(false);

  // =====================================================
  // LOAD USERS
  // =====================================================

  const loadUsers = async () => {
    try {
      setLoading(true);

      const response = await getUsers();

      console.log("Users received:", response.data);

      setUsers(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error("Error loading users:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // =====================================================
  // USER STATISTICS
  // =====================================================

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) =>
      user.status === "Active" ||
      user.isActive === true
  ).length;

  const inactiveUsers = users.filter(
    (user) =>
      user.status === "Inactive" ||
      user.isActive === false
  ).length;

  // Users created recently
  const newUsers = users.filter((user) => {
    if (!user.createdAt) return false;

    const createdDate = new Date(user.createdAt);

    const sevenDaysAgo = new Date();

    sevenDaysAgo.setDate(
      sevenDaysAgo.getDate() - 7
    );

    return createdDate >= sevenDaysAgo;
  }).length;

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredUsers = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    if (!searchValue) {
      return users;
    }

    return users.filter((user) => {
      return (
        user.name
          ?.toLowerCase()
          .includes(searchValue) ||

        user.email
          ?.toLowerCase()
          .includes(searchValue)
      );
    });
  }, [users, search]);

  // =====================================================
  // VIEW USER
  // =====================================================

  const handleViewUser = async (id) => {
    try {
      setViewLoading(true);

      const response = await getUser(id);

      setSelectedUser(response.data);
    } catch (error) {
      console.error(
        "Error loading user:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Unable to load user details."
      );
    } finally {
      setViewLoading(false);
    }
  };

  // =====================================================
  // DELETE USER
  // =====================================================

  const handleDeleteUser = async (user) => {
    const result = await Swal.fire({
      title: "Delete User?",
      text: `Are you sure you want to delete "${user.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#c82b2b",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete user",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await deleteUser(user._id);

      toast.success(
        "User deleted successfully!"
      );

      if (
        selectedUser &&
        selectedUser._id === user._id
      ) {
        setSelectedUser(null);
      }

      await loadUsers();
    } catch (error) {
      console.error(
        "Delete user error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Unable to delete user."
      );
    }
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (user) => {
    const isActive =
      user.status === "Active" ||
      user.isActive === true;

    if (isActive) {
      return "bg-green-50 text-green-600";
    }

    return "bg-gray-100 text-gray-500";
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div
            className="
              w-12
              h-12
              border-4
              border-red-100
              border-t-red-600
              rounded-full
              animate-spin
              mx-auto
              mb-4
            "
          />

          <p className="text-gray-500">
            Loading users...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="space-y-7">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Users
        </h1>

        <p className="text-gray-500 mt-1">
          Manage registered users and customer accounts.
        </p>
      </div>


      {/* =================================================
          USER SUMMARY
      ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* TOTAL */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Users
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {totalUsers}
              </h2>
            </div>

            <div className="
              w-12
              h-12
              rounded-xl
              bg-red-50
              text-red-600
              flex
              items-center
              justify-center
            ">
              <FaUsers />
            </div>

          </div>

        </div>


        {/* ACTIVE */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Active Users
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {activeUsers}
              </h2>
            </div>

            <div className="
              w-12
              h-12
              rounded-xl
              bg-green-50
              text-green-600
              flex
              items-center
              justify-center
            ">
              <FaUserCheck />
            </div>

          </div>

        </div>


        {/* NEW */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                New Users
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {newUsers}
              </h2>
            </div>

            <div className="
              w-12
              h-12
              rounded-xl
              bg-blue-50
              text-blue-600
              flex
              items-center
              justify-center
            ">
              <FaUserClock />
            </div>

          </div>

        </div>


        {/* INACTIVE */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Inactive Users
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {inactiveUsers}
              </h2>
            </div>

            <div className="
              w-12
              h-12
              rounded-xl
              bg-gray-100
              text-gray-500
              flex
              items-center
              justify-center
            ">
              <FaUserTimes />
            </div>

          </div>

        </div>

      </div>


      {/* =================================================
          USER TABLE
      ================================================= */}

      <div className="
        bg-white
        rounded-2xl
        shadow-sm
        border
        border-gray-100
        p-6
      ">

        {/* HEADER */}

        <div className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-4
          mb-6
        ">

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Customer Accounts
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {users.length} registered user
              {users.length !== 1 ? "s" : ""}
            </p>
          </div>


          {/* SEARCH */}

          <div className="relative w-full md:w-80">

            <FaSearch
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search users..."
              className="
                w-full
                pl-11
                pr-4
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


        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {filteredUsers.length === 0 ? (

          <div className="py-16 text-center">

            <div className="text-5xl mb-4">
              👤
            </div>

            <h3 className="text-xl font-semibold text-gray-700">
              No users found
            </h3>

            <p className="text-gray-500 mt-2">
              {search
                ? "Try a different search."
                : "No registered users are available."}
            </p>

          </div>

        ) : (

          /* =================================================
             TABLE
          ================================================= */

          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px]">

              <thead>

                <tr className="
                  border-b
                  border-gray-200
                  text-left
                ">

                  <th className="
                    px-4
                    py-4
                    text-sm
                    font-semibold
                    text-gray-600
                  ">
                    User
                  </th>

                  <th className="
                    px-4
                    py-4
                    text-sm
                    font-semibold
                    text-gray-600
                  ">
                    Email
                  </th>

                  <th className="
                    px-4
                    py-4
                    text-sm
                    font-semibold
                    text-gray-600
                  ">
                    Status
                  </th>

                  <th className="
                    px-4
                    py-4
                    text-sm
                    font-semibold
                    text-gray-600
                  ">
                    Joined
                  </th>

                  <th className="
                    px-4
                    py-4
                    text-sm
                    font-semibold
                    text-gray-600
                  ">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredUsers.map((user) => (

                  <tr
                    key={user._id}
                    className="
                      border-b
                      border-gray-100
                      hover:bg-gray-50
                      transition
                    "
                  >

                    {/* USER */}

                    <td className="px-4 py-4">

                      <div className="flex items-center gap-3">

                        <div className="
                          w-10
                          h-10
                          rounded-full
                          bg-red-50
                          text-red-600
                          flex
                          items-center
                          justify-center
                          font-semibold
                        ">
                          {user.name
                            ?.charAt(0)
                            ?.toUpperCase() || "U"}
                        </div>

                        <div>

                          <p className="
                            font-semibold
                            text-gray-800
                          ">
                            {user.name || "Unknown User"}
                          </p>

                          <p className="
                            text-xs
                            text-gray-400
                          ">
                            {user._id}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* EMAIL */}

                    <td className="
                      px-4
                      py-4
                      text-gray-600
                    ">
                      {user.email || "—"}
                    </td>


                    {/* STATUS */}

                    <td className="px-4 py-4">

                      <span
                        className={`
                          inline-flex
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          font-medium
                          ${getStatusStyle(user)}
                        `}
                      >
                        {user.status ||
                          (user.isActive === false
                            ? "Inactive"
                            : "Active")}
                      </span>

                    </td>


                    {/* JOINED */}

                    <td className="
                      px-4
                      py-4
                      text-gray-500
                    ">
                      {user.createdAt
                        ? new Date(
                            user.createdAt
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "—"}
                    </td>


                    {/* ACTIONS */}

                    <td className="px-4 py-4">

                      <div className="flex gap-2">

                        {/* VIEW */}

                        <button
                          type="button"
                          onClick={() =>
                            handleViewUser(
                              user._id
                            )
                          }
                          className="
                            px-4
                            py-2
                            rounded-lg
                            border
                            border-blue-500
                            text-blue-600
                            hover:bg-blue-50
                            font-medium
                            transition
                            flex
                            items-center
                            gap-2
                          "
                        >
                          <FaEye />
                          View
                        </button>


                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteUser(
                              user
                            )
                          }
                          className="
                            px-4
                            py-2
                            rounded-lg
                            border
                            border-red-500
                            text-red-600
                            hover:bg-red-50
                            font-medium
                            transition
                            flex
                            items-center
                            gap-2
                          "
                        >
                          <FaTrash />
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* =================================================
          USER DETAILS MODAL
      ================================================= */}

      {selectedUser && (

        <div className="
          fixed
          inset-0
          z-50
          bg-black/50
          flex
          items-center
          justify-center
          p-4
        ">

          <div className="
            bg-white
            w-full
            max-w-lg
            rounded-2xl
            shadow-2xl
            overflow-hidden
          ">

            {/* MODAL HEADER */}

            <div className="
              px-6
              py-5
              border-b
              border-gray-100
              flex
              items-center
              justify-between
            ">

              <h2 className="text-xl font-bold text-gray-800">
                User Details
              </h2>

              <button
                type="button"
                onClick={() =>
                  setSelectedUser(null)
                }
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-gray-100
                  hover:bg-gray-200
                  flex
                  items-center
                  justify-center
                  text-gray-600
                "
              >
                <FaTimes />
              </button>

            </div>


            {/* MODAL BODY */}

            <div className="p-6">

              {viewLoading ? (

                <div className="py-10 text-center">

                  <div className="
                    w-10
                    h-10
                    border-4
                    border-red-100
                    border-t-red-600
                    rounded-full
                    animate-spin
                    mx-auto
                    mb-3
                  " />

                  <p className="text-gray-500">
                    Loading user...
                  </p>

                </div>

              ) : (

                <div className="space-y-5">

                  <div className="
                    flex
                    items-center
                    gap-4
                  ">

                    <div className="
                      w-16
                      h-16
                      rounded-full
                      bg-red-50
                      text-red-600
                      flex
                      items-center
                      justify-center
                      text-2xl
                      font-bold
                    ">
                      {selectedUser.name
                        ?.charAt(0)
                        ?.toUpperCase() || "U"}
                    </div>

                    <div>

                      <h3 className="
                        text-xl
                        font-bold
                        text-gray-800
                      ">
                        {selectedUser.name ||
                          "Unknown User"}
                      </h3>

                      <p className="text-gray-500">
                        {selectedUser.email ||
                          "No email"}
                      </p>

                    </div>

                  </div>


                  <div className="
                    bg-gray-50
                    rounded-xl
                    p-5
                    space-y-3
                  ">

                    <p className="text-gray-700">
                      <strong>User ID:</strong>{" "}
                      {selectedUser._id}
                    </p>

                    <p className="text-gray-700">
                      <strong>Status:</strong>{" "}
                      {selectedUser.status ||
                        (selectedUser.isActive === false
                          ? "Inactive"
                          : "Active")}
                    </p>

                    <p className="text-gray-700">
                      <strong>Joined:</strong>{" "}
                      {selectedUser.createdAt
                        ? new Date(
                            selectedUser.createdAt
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : "—"}
                    </p>

                  </div>

                </div>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default UsersPage;