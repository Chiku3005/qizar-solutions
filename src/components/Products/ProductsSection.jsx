import "./ProductsSection.css";
import React from "react";
import ProductCard from "./ProductCard";

import product1 from "../../assets/images/product1.jpg";
import product2 from "../../assets/images/product2.jpg";
import product3 from "../../assets/images/product3.jpg";


function ProductsSection() {

  const products = [
    {
      image: product1,
      title: "Product 1",
      description: "Technology solution"
    },
    {
      image: product2,
      title: "Product 2",
      description: "Digital solution"
    },
    {
      image: product3,
      title: "Product 3",
      description: "Innovative product"
    }
  ];


  return (
   <section className="products-section">

  <h2>Our Products</h2>

  <p className="products-subtitle">
    Discover our innovative technology products designed to empower businesses.
  </p>

  <div className="product-container">

        {
          products.map((item,index)=>(
            <ProductCard
              key={index}
              image={item.image}
              title={item.title}
              description={item.description}
            />
          ))
        }

      </div>

    </section>
  );
}

export default ProductsSection;