import React, { useEffect, useState } from "react";
import "./ProductsSection.css";
import ProductCard from "./ProductCard";
import { getProducts } from "../../api/productApi";


function ProductsSection() {
 const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await getProducts();

      console.log("Products received:", response.data);

      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  fetchProducts();
}, []);

  return (
    <section className="products-section" id="products">

      <h2>Our Products</h2>

      <p className="products-subtitle">
        Explore our innovative technology solutions designed to accelerate business growth.
      </p>

      <div className="product-container">
  {products.map((product) => (
    <div key={product._id} style={{ border: "1px solid black", padding: "20px", margin: "10px" }}>
      <h2>{product.name}</h2>
      <img
        src={product.image}
        alt={product.name}
        width="200"
      />
      <p>{product.description}</p>
      <p>₹{product.price}</p>
    </div>
  ))}
</div>

    </section>
  );
}

export default ProductsSection;