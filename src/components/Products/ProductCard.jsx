import "./ProductsSection.css";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">

      <div className="product-image-box">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </div>


      <div className="product-content">

        <span className="product-category">
          {product.category || "Technology"}
        </span>

        <h3>{product.name}</h3>

        <p>
          {product.description}
        </p>


        <div className="product-footer">

          <h4>
            ₹ {product.price}
          </h4>

          <span className="stock-status">
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>

        </div>


        <Link to={`/product/${product._id}`}>
          <button className="product-btn">
            View Details
          </button>
        </Link>


      </div>

    </div>
  );
}

export default ProductCard;