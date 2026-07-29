import React from "react";

function ProductCard({image,title,description}){

return(
<div className="product-card">

<img
  src={image}
  alt={title}
  style={{
    width: "300px",
    height: "220px",
    border: "2px solid red",
    objectFit: "contain"
  }}
/>

<h3>{title}</h3>

<p>{description}</p>

</div>
)

}

export default ProductCard;