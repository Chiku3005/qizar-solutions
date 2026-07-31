import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productApi";

import Sidebar from "./Sidebar";
import Header from "./Header";
import DashboardCards from "./DashboardCards";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: "",
  });

  // Load Products
  const loadProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add / Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateProduct(editingId, formData);
        alert("✅ Product updated successfully!");
      } else {
        await createProduct(formData);
        alert("✅ Product added successfully!");
      }

      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        stock: "",
      });

      setEditingId(null);
      loadProducts();

    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };


  // Edit Product
  const handleEdit = (product) => {
    setEditingId(product._id);

    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.stock,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // Delete Product
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      alert("🗑 Product deleted successfully!");
      loadProducts();

    } catch (error) {
      console.error(error);
    }
  };


  return (

    <div className="flex">

      {/* Sidebar */}
      <Sidebar />


      {/* Main Content */}
      <div className="ml-64 flex-1 bg-gray-100 min-h-screen p-8">


        {/* Header */}
        <Header />


        {/* Dashboard Cards */}
        <DashboardCards products={products} />


        <div className="max-w-7xl mx-auto mt-8">

          <h1 style={{ textAlign: "center" }}>
            Admin Dashboard
          </h1>


          {/* Product Form */}

          


          <hr />


          <h2>
            All Products
          </h2>



          {
            products.length === 0 ? (

              <p>
                No products found.
              </p>

            ) : (

              products.map((product) => (

                <div
                  key={product._id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "20px",
                    marginBottom: "20px",
                    borderRadius: "10px",
                  }}
                >


                  <img
                    src={product.image}
                    alt={product.name}
                    width="180"
                    style={{
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />


                  <h3>
                    {product.name}
                  </h3>


                  <p>
                    {product.description}
                  </p>


                  <h4>
                    ₹ {product.price}
                  </h4>


                  <p>
                    <strong>
                      Category:
                    </strong>{" "}
                    {product.category}
                  </p>


                  <p>
                    <strong>
                      Stock:
                    </strong>{" "}
                    {product.stock}
                  </p>



                  <button
                    onClick={() => handleEdit(product)}
                    style={{
                      marginRight: "10px"
                    }}
                  >
                    ✏️ Edit
                  </button>



                  <button
                    onClick={() => handleDelete(product._id)}
                  >
                    🗑 Delete
                  </button>


                </div>

              ))

            )
          }


        </div>


      </div>


    </div>

  );
}


export default AdminDashboard;