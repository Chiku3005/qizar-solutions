import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import axios from "axios";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        },

        products: cartItems.map((item) => ({
          productId: item._id,
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity || 1),
          image: item.image,
        })),
      };

      console.log("Sending order:", orderData);

      const response = await axios.post(
        "https://api.qizarsolutions.in/api/orders",
        orderData
      );

      console.log("Order created:", response.data);

      clearCart();

      alert("🎉 Order placed successfully!");

      navigate("/");
    } catch (error) {
      console.error("Order error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          Your Cart is Empty
        </h1>

        <button
          onClick={() => navigate("/")}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-slate-800 mb-10">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* CUSTOMER FORM */}

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              Customer Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block font-semibold mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your complete address"
                  rows="4"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-4 rounded-xl transition"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>

            </form>

          </div>


          {/* ORDER SUMMARY */}

          <div className="bg-white rounded-2xl shadow-lg p-8 h-fit">

            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-5">

              {cartItems.map((item) => (

                <div
                  key={item._id}
                  className="flex items-center gap-4 border-b pb-4"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />

                  <div className="flex-1">

                    <h3 className="font-semibold text-slate-800">
                      {item.name}
                    </h3>

                    <p className="text-gray-500">
                      Quantity: {item.quantity || 1}
                    </p>

                    <p className="text-red-600 font-bold">
                      ₹ {Number(item.price).toLocaleString()}
                    </p>

                  </div>

                </div>

              ))}

            </div>

            <div className="border-t mt-6 pt-6">

              <div className="flex justify-between text-lg mb-3">
                <span>Subtotal</span>

                <span>
                  ₹ {totalAmount.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-lg mb-3">
                <span>Shipping</span>

                <span className="text-green-600">
                  Free
                </span>
              </div>

              <div className="border-t pt-4 flex justify-between text-2xl font-bold">

                <span>Total</span>

                <span className="text-red-600">
                  ₹ {totalAmount.toLocaleString()}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;