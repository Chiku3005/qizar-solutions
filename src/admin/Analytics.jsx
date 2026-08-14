import { useEffect, useState } from "react";
import {
  FaRupeeSign,
  FaShoppingCart,
  FaBoxOpen,
  FaClock,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaTrophy,
} from "react-icons/fa";

import { getOrders } from "../api/orderApi";

function Analytics() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const response = await getOrders();

      console.log("Analytics Orders:", response.data);

      setOrders(response.data || []);
    } catch (error) {
      console.error("Error loading analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // -----------------------------
  // TOTAL ORDERS
  // -----------------------------

  const totalOrders = orders.length;

  // -----------------------------
  // TOTAL REVENUE
  // -----------------------------

  const totalRevenue = orders.reduce((sum, order) => {
    if (order.orderStatus === "Cancelled") {
      return sum;
    }

    if (order.totalAmount) {
      return sum + Number(order.totalAmount);
    }

    const orderTotal = (order.products || []).reduce(
      (productSum, product) =>
        productSum +
        Number(product.price || 0) *
          Number(product.quantity || 1),
      0
    );

    return sum + orderTotal;
  }, 0);

  // -----------------------------
  // TOTAL PRODUCTS SOLD
  // -----------------------------

  const totalProductsSold = orders.reduce(
    (sum, order) => {
      if (order.orderStatus === "Cancelled") {
        return sum;
      }

      return (
        sum +
        (order.products || []).reduce(
          (productSum, product) =>
            productSum + Number(product.quantity || 1),
          0
        )
      );
    },
    0
  );

  // -----------------------------
  // ORDER STATUS
  // -----------------------------

  const pendingOrders = orders.filter(
    (order) =>
      !order.orderStatus ||
      order.orderStatus === "Pending"
  ).length;

  const processingOrders = orders.filter(
    (order) => order.orderStatus === "Processing"
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.orderStatus === "Shipped"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "Delivered"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.orderStatus === "Cancelled"
  ).length;

  // -----------------------------
  // BEST SELLING PRODUCTS
  // -----------------------------

  const productSales = {};

  orders.forEach((order) => {
    if (order.orderStatus === "Cancelled") {
      return;
    }

    (order.products || []).forEach((product) => {
      if (!productSales[product.name]) {
        productSales[product.name] = 0;
      }

      productSales[product.name] += Number(
        product.quantity || 1
      );
    });
  });

  const bestSellingProducts = Object.entries(
    productSales
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // -----------------------------
  // ANALYTICS CARDS
  // -----------------------------

  const cards = [
    {
      title: "Total Revenue",
      value: `₹ ${totalRevenue.toLocaleString()}`,
      icon: <FaRupeeSign />,
      color: "bg-purple-600",
    },

    {
      title: "Total Orders",
      value: totalOrders,
      icon: <FaShoppingCart />,
      color: "bg-blue-600",
    },

    {
      title: "Products Sold",
      value: totalProductsSold,
      icon: <FaBoxOpen />,
      color: "bg-green-600",
    },

    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: <FaClock />,
      color: "bg-orange-500",
    },

    {
      title: "Delivered",
      value: deliveredOrders,
      icon: <FaCheckCircle />,
      color: "bg-emerald-600",
    },

    {
      title: "Cancelled",
      value: cancelledOrders,
      icon: <FaTimesCircle />,
      color: "bg-red-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-500">
          Loading analytics...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-slate-800">
            Analytics
          </h1>

          <p className="text-gray-500 mt-2">
            Overview of your store performance
          </p>

        </div>

        {/* CARDS */}

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
          mb-8
        ">

          {cards.map((card, index) => (

            <div
              key={index}
              className={`
                ${card.color}
                text-white
                rounded-2xl
                p-6
                shadow-lg
                hover:-translate-y-1
                transition-all
                duration-300
              `}
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm opacity-80">
                    {card.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-3">
                    {card.value}
                  </h2>

                </div>

                <div className="
                  bg-white/20
                  p-4
                  rounded-full
                  text-2xl
                ">
                  {card.icon}
                </div>

              </div>

            </div>

          ))}

        </div>

        {/* ORDER STATUS */}

        <div className="
          bg-white
          rounded-3xl
          shadow-lg
          p-8
          mb-8
        ">

          <h2 className="
            text-2xl
            font-bold
            text-slate-800
            mb-6
          ">
            Order Status Overview
          </h2>

          <div className="
            grid
            grid-cols-2
            md:grid-cols-4
            gap-5
          ">

            <div className="bg-orange-50 rounded-2xl p-5">
              <p className="text-gray-500">
                Pending
              </p>

              <h3 className="text-3xl font-bold text-orange-500 mt-2">
                {pendingOrders}
              </h3>
            </div>

            <div className="bg-blue-50 rounded-2xl p-5">
              <p className="text-gray-500">
                Processing
              </p>

              <h3 className="text-3xl font-bold text-blue-600 mt-2">
                {processingOrders}
              </h3>
            </div>

            <div className="bg-purple-50 rounded-2xl p-5">
              <p className="text-gray-500">
                Shipped
              </p>

              <h3 className="text-3xl font-bold text-purple-600 mt-2">
                {shippedOrders}
              </h3>
            </div>

            <div className="bg-green-50 rounded-2xl p-5">
              <p className="text-gray-500">
                Delivered
              </p>

              <h3 className="text-3xl font-bold text-green-600 mt-2">
                {deliveredOrders}
              </h3>
            </div>

          </div>

        </div>

        {/* BEST SELLING PRODUCTS */}

        <div className="
          bg-white
          rounded-3xl
          shadow-lg
          p-8
        ">

          <div className="flex items-center gap-3 mb-6">

            <div className="
              bg-yellow-100
              text-yellow-600
              p-3
              rounded-xl
            ">
              <FaTrophy />
            </div>

            <div>

              <h2 className="
                text-2xl
                font-bold
                text-slate-800
              ">
                Best Selling Products
              </h2>

              <p className="text-gray-500">
                Products with the highest sales
              </p>

            </div>

          </div>

          {bestSellingProducts.length === 0 ? (

            <div className="text-center py-10">

              <p className="text-gray-500">
                No sales data available yet.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {bestSellingProducts.map(
                ([name, quantity], index) => (

                  <div
                    key={name}
                    className="
                      flex
                      items-center
                      justify-between
                      bg-gray-50
                      rounded-xl
                      p-4
                    "
                  >

                    <div className="flex items-center gap-4">

                      <div className="
                        w-10
                        h-10
                        rounded-full
                        bg-red-100
                        text-red-600
                        flex
                        items-center
                        justify-center
                        font-bold
                      ">
                        {index + 1}
                      </div>

                      <p className="
                        font-semibold
                        text-slate-800
                      ">
                        {name}
                      </p>

                    </div>

                    <span className="
                      bg-green-100
                      text-green-700
                      px-4
                      py-2
                      rounded-full
                      font-semibold
                    ">
                      {quantity} sold
                    </span>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Analytics;