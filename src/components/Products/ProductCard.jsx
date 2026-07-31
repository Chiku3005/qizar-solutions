import "./ProductsSection.css";

function ProductCard({ image, title, description }) {
  return (
    <div className="product-card">
      <div className="product-image-box">
        <img src={image} alt={title} className="product-image" />
      </div>

      <div className="product-content">
        <h3>{title}</h3>

        <p>{description}</p>

       <button className="product-btn">
  Learn More
</button>
      </div>
    </div>
  );
}

export default ProductCard;