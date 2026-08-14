import { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
} from "../api/orderApi";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const response = await getOrders();

      console.log("Orders:", response.data);

      setOrders(response.data);
    } catch (error) {
      console.error("Error loading orders:", error);

      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);
  const handleViewOrder = (order) => {
  Swal.fire({
    title: "Order Details",

    html: `
      <div style="text-align:left">

        <h3 style="font-weight:bold; margin-bottom:10px;">
          Customer Information
        </h3>

        <p>
          <strong>Name:</strong>
          ${order.customer?.name || "N/A"}
        </p>

        <p>
          <strong>Email:</strong>
          ${order.customer?.email || "N/A"}
        </p>

        <p>
          <strong>Phone:</strong>
          ${order.customer?.phone || "N/A"}
        </p>

        <p>
          <strong>Address:</strong>
          ${order.customer?.address || "N/A"}
        </p>

        <hr style="margin:15px 0;" />

        <h3 style="font-weight:bold; margin-bottom:10px;">
          Order Information
        </h3>

        <p>
          <strong>Order ID:</strong>
          ${order._id}
        </p>

        <p>
          <strong>Total:</strong>
          ₹ ${Number(order.totalAmount || 0).toLocaleString()}
        </p>

        <p>
          <strong>Payment:</strong>
          ${order.paymentMethod || "COD"}
        </p>

        <p>
          <strong>Payment Status:</strong>
          ${order.paymentStatus || "Pending"}
        </p>

        <p>
          <strong>Order Status:</strong>
          ${order.orderStatus || "Pending"}
        </p>

        <hr style="margin:15px 0;" />

        <h3 style="font-weight:bold; margin-bottom:10px;">
          Products
        </h3>

        ${order.products
          ?.map(
            (product) => `
              <div style="margin-bottom:10px;">
                <p>
                  <strong>${product.name}</strong>
                </p>

                <p>
                  Quantity: ${product.quantity}
                </p>

                <p>
                  Price: ₹ ${Number(product.price).toLocaleString()}
                </p>
              </div>
            `
          )
          .join("")}

      </div>
    `,

    width: "600px",

    confirmButtonColor: "#c82b2b",

    confirmButtonText: "Close",
  });
};

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);

      toast.success("Order status updated");

      loadOrders();
    } catch (error) {
      console.error(error);

      toast.error("Failed to update order");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Order?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await deleteOrder(id);

      toast.success("Order deleted");

      loadOrders();
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete order");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-500">
          Loading orders...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Orders
          </h1>

          <p className="text-gray-500 mt-2">
            Manage customer orders
          </p>
        </div>

        <div className="bg-red-100 text-red-600 px-5 py-3 rounded-xl font-semibold">
          {orders.length} Orders
        </div>

      </div>

      {orders.length === 0 ? (

        <div className="text-center py-16">

          <h2 className="text-2xl font-semibold text-gray-700">
            No Orders Found
          </h2>

          <p className="text-gray-500 mt-2">
            Orders placed by customers will appear here.
          </p>

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-slate-900 text-white">

                <th className="p-4 text-left">
                  Customer
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Products
                </th>

                <th className="p-4 text-left">
                  Total
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {orders.map((order) => {

                const total = order.products.reduce(
                  (sum, product) =>
                    sum +
                    Number(product.price || 0) *
                      Number(product.quantity || 1),
                  0
                );

                return (

                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-4">

                      <p className="font-semibold">
                        {order.customer?.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {order.customer?.phone}
                      </p>

                    </td>

                    <td className="p-4">
                      {order.customer?.email}
                    </td>

                    <td className="p-4">

                      {order.products.map((product, index) => (

                        <div
                          key={index}
                          className="mb-2"
                        >

                          <p className="font-medium">
                            {product.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            Qty: {product.quantity}
                          </p>

                        </div>

                      ))}

                    </td>

                    <td className="p-4">

                      <span className="font-bold text-red-600">
                        ₹ {total.toLocaleString()}
                      </span>

                    </td>

                    <td className="p-4">

                      <select
                        value={order.status || "Pending"}
                        onChange={(e) =>
                          handleStatusChange(
                            order._id,
                            e.target.value
                          )
                        }
                        className="border border-gray-300 rounded-lg px-3 py-2 outline-none"
                      >

                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Processing">
                          Processing
                        </option>

                        <option value="Shipped">
                          Shipped
                        </option>

                        <option value="Delivered">
                          Delivered
                        </option>

                        <option value="Cancelled">
                          Cancelled
                        </option>

                      </select>

                    </td>

                    <td className="p-4">

                      <div className="flex justify-center gap-2">

                        <button
  onClick={() => handleViewOrder(order)}
  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
  title="View Order"
>
  <FaEye />
</button>

                        <button
                          onClick={() =>
                            handleDelete(order._id)
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>

                      </div>

                    </td>

                  </tr>

                );
              })}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}

export default Orders;