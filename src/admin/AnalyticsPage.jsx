import {
  FaChartLine,
  FaShoppingCart,
  FaRupeeSign,
  FaBoxOpen,
  FaArrowUp,
} from "react-icons/fa";

function AnalyticsPage() {

  const monthlySales = [
    { month: "Jan", value: 35 },
    { month: "Feb", value: 48 },
    { month: "Mar", value: 42 },
    { month: "Apr", value: 60 },
    { month: "May", value: 55 },
    { month: "Jun", value: 72 },
    { month: "Jul", value: 82 },
    { month: "Aug", value: 68 },
  ];

  const topProducts = [
    {
      name: "Professional RAID Storage",
      sales: 42,
      revenue: 1049958,
    },
    {
      name: "Atom EX20 External SSD",
      sales: 31,
      revenue: 278969,
    },
    {
      name: "Atom EX40 External SSD",
      sales: 24,
      revenue: 311976,
    },
    {
      name: "Atom EX80 External SSD",
      sales: 18,
      revenue: 269982,
    },
  ];

  return (
    <div className="space-y-7">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Analytics
        </h1>

        <p className="text-gray-500 mt-1">
          Track your store performance and sales insights.
        </p>

      </div>


      {/* =========================================
          ANALYTICS CARDS
      ========================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* REVENUE */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Revenue
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-2">
                ₹18,42,500
              </h2>

              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <FaArrowUp />
                <span>12.5%</span>
                <span className="text-gray-400">
                  this month
                </span>
              </div>

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
              <FaRupeeSign />
            </div>

          </div>

        </div>


        {/* ORDERS */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Orders
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-2">
                128
              </h2>

              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <FaArrowUp />
                <span>8.4%</span>
                <span className="text-gray-400">
                  this month
                </span>
              </div>

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
              <FaShoppingCart />
            </div>

          </div>

        </div>


        {/* PRODUCTS SOLD */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Products Sold
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-2">
                342
              </h2>

              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <FaArrowUp />
                <span>15.2%</span>
                <span className="text-gray-400">
                  this month
                </span>
              </div>

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
              <FaBoxOpen />
            </div>

          </div>

        </div>


        {/* CONVERSION */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Conversion Rate
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-2">
                6.8%
              </h2>

              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <FaArrowUp />
                <span>2.1%</span>
                <span className="text-gray-400">
                  this month
                </span>
              </div>

            </div>

            <div className="
              w-12
              h-12
              rounded-xl
              bg-purple-50
              text-purple-600
              flex
              items-center
              justify-center
            ">
              <FaChartLine />
            </div>

          </div>

        </div>

      </div>


      {/* =========================================
          SALES CHART
      ========================================= */}

      <div className="
        bg-white
        rounded-2xl
        border
        border-gray-100
        shadow-sm
        p-6
      ">

        <div className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-3
          mb-8
        ">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              Sales Overview
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Monthly sales performance.
            </p>

          </div>

          <select
            className="
              px-4
              py-2.5
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              outline-none
              text-sm
              focus:border-red-500
            "
          >
            <option>Last 8 Months</option>
            <option>This Year</option>
            <option>Last Year</option>
          </select>

        </div>


        {/* BAR CHART */}

        <div className="
          h-72
          flex
          items-end
          gap-3
          sm:gap-6
          border-b
          border-gray-200
          px-2
        ">

          {monthlySales.map((item) => (

            <div
              key={item.month}
              className="
                flex-1
                h-full
                flex
                flex-col
                justify-end
                items-center
                gap-2
              "
            >

              <div className="text-xs text-gray-500">
                {item.value}%
              </div>

              <div
                className="
                  w-full
                  max-w-[48px]
                  bg-red-500
                  rounded-t-lg
                  hover:bg-red-600
                  transition
                "
                style={{
                  height: `${item.value}%`,
                }}
              />

              <span className="text-xs text-gray-500 mb-2">
                {item.month}
              </span>

            </div>

          ))}

        </div>

      </div>


      {/* =========================================
          TOP PRODUCTS
      ========================================= */}

      <div className="
        bg-white
        rounded-2xl
        border
        border-gray-100
        shadow-sm
        p-6
      ">

        <div className="mb-6">

          <h2 className="text-2xl font-bold text-gray-800">
            Top Products
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Best performing products by sales.
          </p>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full min-w-[650px]">

            <thead>

              <tr className="border-b border-gray-200 text-left">

                <th className="px-4 py-4 text-sm font-semibold text-gray-600">
                  Product
                </th>

                <th className="px-4 py-4 text-sm font-semibold text-gray-600">
                  Units Sold
                </th>

                <th className="px-4 py-4 text-sm font-semibold text-gray-600">
                  Revenue
                </th>

              </tr>

            </thead>

            <tbody>

              {topProducts.map((product, index) => (

                <tr
                  key={product.name}
                  className="
                    border-b
                    border-gray-100
                    hover:bg-gray-50
                    transition
                  "
                >

                  <td className="px-4 py-4">

                    <div className="flex items-center gap-3">

                      <div className="
                        w-9
                        h-9
                        rounded-lg
                        bg-red-50
                        text-red-600
                        flex
                        items-center
                        justify-center
                        font-semibold
                      ">
                        {index + 1}
                      </div>

                      <span className="
                        font-medium
                        text-gray-800
                      ">
                        {product.name}
                      </span>

                    </div>

                  </td>

                  <td className="
                    px-4
                    py-4
                    font-semibold
                    text-gray-700
                  ">
                    {product.sales}
                  </td>

                  <td className="
                    px-4
                    py-4
                    font-semibold
                    text-gray-800
                  ">
                    ₹{" "}
                    {product.revenue.toLocaleString("en-IN")}
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

export default AnalyticsPage;