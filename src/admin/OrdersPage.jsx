import {
  FaShoppingCart,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

function OrdersPage() {
  // Temporary order data.
  // Later we will replace this with MongoDB data.
  const orders = [
    {
      id: "ORD-1001",
      customer: "Rahul Sharma",
      product: "Professional RAID Storage",
      amount: 24999,
      status: "Completed",
      date: "06 Aug 2026",
    },
    {
      id: "ORD-1002",
      customer: "Amit Verma",
      product: "Atom EX20 External SSD",
      amount: 8999,
      status: "Pending",
      date: "05 Aug 2026",
    },
    {
      id: "ORD-1003",
      customer: "Neha Singh",
      product: "Atom EX40 External SSD",
      amount: 12999,
      status: "Completed",
      date: "04 Aug 2026",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "Completed") {
      return "bg-green-50 text-green-600";
    }

    if (status === "Pending") {
      return "bg-yellow-50 text-yellow-600";
    }

    if (status === "Cancelled") {
      return "bg-red-50 text-red-600";
    }

    return "bg-gray-50 text-gray-600";
  };

  return (
    <div className="space-y-7">

      {/* PAGE HEADER */}

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Orders
        </h1>

        <p className="text-gray-500 mt-1">
          Track and manage customer orders.
        </p>
      </div>


      {/* ORDER SUMMARY */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* TOTAL */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Orders
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                128
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <FaShoppingCart />
            </div>

          </div>

        </div>


        {/* PENDING */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Pending
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                12
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center">
              <FaClock />
            </div>

          </div>

        </div>


        {/* COMPLETED */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Completed
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                109
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <FaCheckCircle />
            </div>

          </div>

        </div>


        {/* CANCELLED */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Cancelled
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                7
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <FaTimesCircle />
            </div>

          </div>

        </div>

      </div>


      {/* ORDERS TABLE */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Recent Orders
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Overview of recent customer orders.
            </p>
          </div>


          {/* FILTER */}

          <select
            className="
              px-4
              py-3
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              outline-none
              focus:border-red-500
            "
          >
            <option>All Orders</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </select>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px]">

            <thead>

              <tr className="border-b border-gray-200 text-left">

                <th className="px-4 py-4 text-sm font-semibold text-gray-600">
                  Order ID
                </th>

                <th className="px-4 py-4 text-sm font-semibold text-gray-600">
                  Customer
                </th>

                <th className="px-4 py-4 text-sm font-semibold text-gray-600">
                  Product
                </th>

                <th className="px-4 py-4 text-sm font-semibold text-gray-600">
                  Amount
                </th>

                <th className="px-4 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="px-4 py-4 text-sm font-semibold text-gray-600">
                  Date
                </th>

              </tr>

            </thead>


            <tbody>

              {orders.map((order) => (

                <tr
                  key={order.id}
                  className="
                    border-b
                    border-gray-100
                    hover:bg-gray-50
                    transition
                  "
                >

                  <td className="px-4 py-4 font-semibold text-gray-800">
                    {order.id}
                  </td>

                  <td className="px-4 py-4 text-gray-600">
                    {order.customer}
                  </td>

                  <td className="px-4 py-4 text-gray-600">
                    {order.product}
                  </td>

                  <td className="px-4 py-4 font-semibold text-gray-800">
                    ₹{" "}
                    {order.amount.toLocaleString("en-IN")}
                  </td>

                  <td className="px-4 py-4">

                    <span
                      className={`
                        inline-flex
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-medium
                        ${getStatusStyle(order.status)}
                      `}
                    >
                      {order.status}
                    </span>

                  </td>

                  <td className="px-4 py-4 text-gray-500">
                    {order.date}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default OrdersPage;