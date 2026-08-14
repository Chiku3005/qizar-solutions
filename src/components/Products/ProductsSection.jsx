import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { getProducts } from "../../api/productApi";

import "./ProductsSection.css";


function ProductsSection() {

  const [products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [loading, setLoading] = useState(true);


  // =====================================================
  // LOAD PRODUCTS
  // =====================================================

  useEffect(() => {

    const loadProducts = async () => {

      try {

        setLoading(true);

        const response = await getProducts();

        console.log("Products received:", response.data);

        setProducts(
          Array.isArray(response.data)
            ? response.data
            : []
        );

      } catch (error) {

        console.error(
          "Error fetching products:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    loadProducts();

  }, []);


  // =====================================================
  // GET UNIQUE BRANDS
  // =====================================================

  const brands = [
    ...new Set(
      products
        .map((product) => product.brand)
        .filter(
          (brand) =>
            brand &&
            brand.trim() !== ""
        )
    ),
  ];


  // =====================================================
  // FILTER PRODUCTS BY BRAND
  // =====================================================

  const filteredProducts = selectedBrand
    ? products.filter(
        (product) =>
          product.brand?.toLowerCase() ===
          selectedBrand.toLowerCase()
      )
    : [];


  // =====================================================
  // GET BRAND IMAGE
  // =====================================================

  const getBrandImage = (brand) => {

    const brandProduct = products.find(
      (product) =>
        product.brand?.toLowerCase() ===
          brand.toLowerCase() &&
        product.image
    );

    return brandProduct?.image || "";

  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <section className="products-section">

        <div className="products-loading">

          <div className="products-spinner"></div>

          <p>
            Loading products...
          </p>

        </div>

      </section>

    );

  }


  return (

    <section
      id="products"
      className="products-section"
    >

      {/* =================================================
          SECTION HEADER
      ================================================= */}

      <div className="products-header">

        <span className="products-small-title">
          OUR PRODUCTS
        </span>


        <h2>
          Explore Our <span>Technology</span>
        </h2>


        <p>
          Discover professional broadcast, media
          and enterprise technology solutions from
          leading technology brands.
        </p>

      </div>


      {/* =================================================
          BRAND VIEW
      ================================================= */}

      {!selectedBrand && (

        <div className="brand-grid">

          {brands.length === 0 ? (

            <div className="no-products">

              <p>
                No product brands available.
              </p>

            </div>

          ) : (

            brands.map(
              (brand, index) => (

                <motion.div
                  key={brand}

                  className="brand-card"

                  initial={{
                    opacity: 0,
                    y: 30,
                  }}

                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}

                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}

                  viewport={{
                    once: true,
                  }}

                  whileHover={{
                    y: -8,
                  }}

                  onClick={() =>
                    setSelectedBrand(brand)
                  }
                >

                  <div className="brand-image-wrapper">

                    <img
                      src={getBrandImage(brand)}
                      alt={brand}
                      className="brand-image"
                    />

                  </div>


                  <div className="brand-content">

                    <h3>
                      {brand}
                    </h3>


                    <span>

                      Explore Products

                      <FaArrowRight />

                    </span>

                  </div>

                </motion.div>

              )
            )

          )}

        </div>

      )}


      {/* =================================================
          SELECTED BRAND PRODUCTS
      ================================================= */}

      {selectedBrand && (

        <motion.div
          className="brand-products"

          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          transition={{
            duration: 0.4,
          }}
        >

          {/* BACK BUTTON */}

          <button
            className="back-brand-button"

            onClick={() =>
              setSelectedBrand(null)
            }
          >

            <FaArrowLeft />

            Back to Brands

          </button>


          {/* BRAND HEADER */}

          <div className="selected-brand-header">

            <span>
              PRODUCTS
            </span>


            <h2>
              {selectedBrand}
            </h2>


            <p>
              Explore our {selectedBrand}
              products and professional
              technology solutions.
            </p>

          </div>


          {/* PRODUCT GRID */}

          <div className="product-grid">

            {filteredProducts.map(
              (product, index) => (

                <motion.div
                  key={product._id}

                  className="product-card"

                  initial={{
                    opacity: 0,
                    y: 30,
                  }}

                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}

                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}

                  viewport={{
                    once: true,
                  }}
                >

                  {/* PRODUCT IMAGE */}

                  <div className="product-image-wrapper">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />

                  </div>


                  {/* PRODUCT CONTENT */}

                  <div className="product-content">

                    <span className="product-category">

                      {product.category ||
                        "Technology"}

                    </span>


                    <h3>
                      {product.name}
                    </h3>


                    <p>

                      {product.description ||
                        "Professional technology solution for broadcast and enterprise applications."}

                    </p>


                    {/* =================================================
                        EXTERNAL PRODUCT LINK
                    ================================================= */}

                    {product.purchaseUrl ? (

                      <a
                        href={product.purchaseUrl}

                        target="_blank"

                        rel="noopener noreferrer"

                        className="view-product-button"
                      >

                        Explore Product

                        <FaArrowRight />

                      </a>

                    ) : (

                      <button
                        type="button"

                        className="view-product-button disabled-product-button"

                        onClick={() =>
                          alert(
                            "Product link is currently unavailable."
                          )
                        }
                      >

                        Product Link Unavailable

                      </button>

                    )}

                  </div>

                </motion.div>

              )
            )}

          </div>

        </motion.div>

      )}

    </section>

  );

}


export default ProductsSection;