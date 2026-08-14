import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";

import { getProduct } from "../api/productApi";

import "./ProductDetails.css";


function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // =====================================================
  // LOAD PRODUCT
  // =====================================================

  useEffect(() => {

    const loadProduct = async () => {

      try {

        setLoading(true);

        setError("");

        const response =
          await getProduct(id);

        setProduct(response.data);

      } catch (error) {

        console.error(
          "Error loading product:",
          error
        );

        setError(
          error?.response?.data?.message ||
          "Unable to load product."
        );

      } finally {

        setLoading(false);

      }

    };


    loadProduct();

  }, [id]);


  // =====================================================
  // OPEN EXTERNAL PRODUCT WEBSITE
  // =====================================================

  const handleVisitProduct = () => {

    if (!product?.purchaseUrl) {

      alert(
        "Product link is currently unavailable."
      );

      return;

    }


    window.open(
      product.purchaseUrl,
      "_blank",
      "noopener,noreferrer"
    );

  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="product-details-loading">

        <div className="product-details-spinner"></div>

        <p>
          Loading product...
        </p>

      </div>

    );

  }


  // =====================================================
  // ERROR
  // =====================================================

  if (error || !product) {

    return (

      <div className="product-details-error">

        <div className="product-error-icon">
          📦
        </div>


        <h2>
          Product Not Found
        </h2>


        <p>
          {error ||
            "The requested product could not be found."}
        </p>


        <button
          onClick={() =>
            navigate("/products")
          }
          className="product-back-button"
        >

          <FaArrowLeft />

          Back to Products

        </button>

      </div>

    );

  }


  return (

    <main className="product-details-page">

      {/* =================================================
          BACK BUTTON
      ================================================= */}

      <div className="product-details-container">

        <button
          className="product-details-back"
          onClick={() =>
            navigate("/products")
          }
        >

          <FaArrowLeft />

          Back to Products

        </button>


        {/* =================================================
            PRODUCT CONTENT
        ================================================= */}

        <div className="product-details-grid">


          {/* =================================================
              PRODUCT IMAGE
          ================================================= */}

          <div className="product-details-image-section">

            <div className="product-details-image-wrapper">

              <img
                src={product.image}
                alt={product.name}
                className="product-details-image"
              />

            </div>

          </div>


          {/* =================================================
              PRODUCT INFORMATION
          ================================================= */}

          <div className="product-details-content">


            {/* BRAND */}

            {product.brand && (

              <span className="product-details-brand">

                {product.brand}

              </span>

            )}


            {/* CATEGORY */}

            {product.category && (

              <span className="product-details-category">

                {product.category}

              </span>

            )}


            {/* PRODUCT NAME */}

            <h1>
              {product.name}
            </h1>


            {/* DESCRIPTION */}

            <p className="product-details-description">

              {product.description ||
                "Professional technology solution designed for broadcast, media and enterprise applications."}

            </p>


            {/* =================================================
                PRODUCT META
            ================================================= */}

            <div className="product-details-meta">


              {product.brand && (

                <div className="product-meta-item">

                  <span>
                    Brand
                  </span>

                  <strong>
                    {product.brand}
                  </strong>

                </div>

              )}


              {product.category && (

                <div className="product-meta-item">

                  <span>
                    Category
                  </span>

                  <strong>
                    {product.category}
                  </strong>

                </div>

              )}


            </div>


            {/* =================================================
                SPECIFICATIONS
            ================================================= */}

            {product.specifications && (

              <div className="product-specifications">

                <h3>
                  Key Specifications
                </h3>

                <div className="specifications-text">

                  {product.specifications}

                </div>

              </div>

            )}


            {/* =================================================
                CTA
            ================================================= */}

            <div className="product-details-actions">

              {product.purchaseUrl ? (

                <button
                  className="product-visit-button"
                  onClick={handleVisitProduct}
                >

                  Explore Product

                  <FaExternalLinkAlt />

                </button>

              ) : (

                <button
                  className="product-visit-button product-button-disabled"
                  disabled
                >

                  Product Link Unavailable

                </button>

              )}

            </div>


            {/* =================================================
                COMPANY MESSAGE
            ================================================= */}

            <p className="product-company-note">

              Interested in this product?
              Explore the official product
              page for complete information,
              availability and purchase options.

            </p>

          </div>

        </div>

      </div>

    </main>

  );

}


export default ProductDetails;