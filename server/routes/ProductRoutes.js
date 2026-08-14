const express = require("express");
const router = express.Router();

const multer = require("multer");
const csv = require("csv-parser");
const stream = require("stream");

const Product = require("../models/Product");
const protect = require("../middleware/authMiddleware");

// =====================================================
// MULTER CONFIGURATION
// =====================================================

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

// =====================================================
// CREATE SINGLE PRODUCT - ADMIN ONLY
// =====================================================

router.post("/", protect, async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    console.error("Create product error:", error);

    res.status(500).json({
      message: error.message || "Unable to create product.",
    });
  }
});

// =====================================================
// BULK CREATE PRODUCTS FROM CSV - ADMIN ONLY
// =====================================================

router.post(
  "/bulk-upload",
  protect,
  upload.single("file"),
  async (req, res) => {
    try {
      // =================================================
      // CHECK FILE
      // =================================================

      if (!req.file) {
        return res.status(400).json({
          message: "Please upload a CSV file.",
        });
      }

      // =================================================
      // CHECK FILE NAME
      // =================================================

      const originalName =
        req.file.originalname || "";

      if (!originalName.toLowerCase().endsWith(".csv")) {
        return res.status(400).json({
          message: "Only CSV files are supported.",
        });
      }

      // =================================================
      // CHECK FILE SIZE
      // =================================================

      if (!req.file.buffer || req.file.buffer.length === 0) {
        return res.status(400).json({
          message: "The uploaded CSV file is empty.",
        });
      }

      // =================================================
      // PARSE CSV
      // =================================================

      const products = [];

      await new Promise((resolve, reject) => {
        const readableStream = stream.Readable.from([
          req.file.buffer,
        ]);

        readableStream
          .pipe(
            csv({
              // -----------------------------------------
              // NORMALIZE CSV HEADERS
              // -----------------------------------------

              mapHeaders: ({ header }) => {
                return String(header || "")
                  .replace(/^\uFEFF/, "")
                  .trim()
                  .toLowerCase();
              },

              // -----------------------------------------
              // SKIP EMPTY LINES
              // -----------------------------------------

              skipLines: 0,
            })
          )

          // =============================================
          // CSV ROW
          // =============================================

          .on("data", (row) => {
            try {
              console.log("CSV ROW:", row);

              // -----------------------------------------
              // GET VALUES SAFELY
              // -----------------------------------------

              const name = String(
                row.name || ""
              ).trim();

              const brand = String(
                row.brand || ""
              ).trim();

              const category = String(
                row.category || ""
              ).trim();

              const description = String(
                row.description || ""
              ).trim();

              const image = String(
                row.image || ""
              ).trim();

              const specifications = String(
                row.specifications || ""
              ).trim();

              const purchaseUrl = String(
                row.purchaseurl ||
                  row.purchase_url ||
                  row["purchase url"] ||
                  ""
              ).trim();

              // -----------------------------------------
              // CLEAN PRICE
              // -----------------------------------------

              const cleanedPrice = String(
                row.price || "0"
              )
                .replace(/₹/g, "")
                .replace(/\$/g, "")
                .replace(/,/g, "")
                .trim();

              const price =
                Number(cleanedPrice) || 0;

              // -----------------------------------------
              // CLEAN STOCK
              // -----------------------------------------

              const cleanedStock = String(
                row.stock || "0"
              )
                .replace(/,/g, "")
                .trim();

              const stock =
                Number(cleanedStock) || 0;

              // -----------------------------------------
              // CREATE PRODUCT OBJECT
              // -----------------------------------------

              const product = {
                name,
                brand,
                category,
                description,
                image,
                specifications,
                purchaseUrl,
                price,
                stock,
              };

              // -----------------------------------------
              // ONLY ADD PRODUCTS WITH NAME
              // -----------------------------------------

              if (name) {
                products.push(product);
              }
            } catch (rowError) {
              console.error(
                "CSV row processing error:",
                rowError
              );
            }
          })

          // =============================================
          // CSV COMPLETE
          // =============================================

          .on("end", () => {
            resolve();
          })

          // =============================================
          // CSV ERROR
          // =============================================

          .on("error", (error) => {
            reject(error);
          });
      });

      // =================================================
      // LOG CSV RESULTS
      // =================================================

      console.log(
        "======================================"
      );

      console.log(
        "TOTAL VALID CSV PRODUCTS:",
        products.length
      );

      console.log(
        "CSV PRODUCTS:",
        products
      );

      console.log(
        "======================================"
      );

      // =================================================
      // CHECK PRODUCTS
      // =================================================

      if (products.length === 0) {
        return res.status(400).json({
          message:
            "No valid products found in the CSV file.",

          hint:
            "Make sure your CSV contains a 'name' column and at least one product row.",
        });
      }

      // =================================================
      // INSERT PRODUCTS INTO MONGODB
      // =================================================

      const insertedProducts =
        await Product.insertMany(products);

      // =================================================
      // SUCCESS RESPONSE
      // =================================================

      return res.status(201).json({
        message:
          "Products uploaded successfully.",

        count: insertedProducts.length,

        products: insertedProducts,
      });
    } catch (error) {
      console.error(
        "Bulk upload error:",
        error
      );

      // =================================================
      // MULTER FILE SIZE ERROR
      // =================================================

      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message:
            "CSV file is too large. Maximum allowed size is 5 MB.",
        });
      }

      // =================================================
      // GENERAL ERROR
      // =================================================

      return res.status(500).json({
        message:
          error.message ||
          "Unable to upload products.",
      });
    }
  }
);

// =====================================================
// GET ALL PRODUCTS - PUBLIC
// =====================================================

router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    console.error(
      "Get products error:",
      error
    );

    res.status(500).json({
      message:
        error.message ||
        "Unable to fetch products.",
    });
  }
});

// =====================================================
// GET SINGLE PRODUCT - PUBLIC
// =====================================================

router.get("/:id", async (req, res) => {
  try {
    const product =
      await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(
      "Get single product error:",
      error
    );

    res.status(500).json({
      message:
        error.message ||
        "Unable to fetch product.",
    });
  }
});

// =====================================================
// UPDATE PRODUCT - ADMIN ONLY
// =====================================================

router.put("/:id", protect, async (req, res) => {
  try {
    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message:
        "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(
      "Update product error:",
      error
    );

    res.status(500).json({
      message:
        error.message ||
        "Unable to update product.",
    });
  }
});

// =====================================================
// DELETE PRODUCT - ADMIN ONLY
// =====================================================

router.delete(
  "/:id",
  protect,
  async (req, res) => {
    try {
      const deletedProduct =
        await Product.findByIdAndDelete(
          req.params.id
        );

      if (!deletedProduct) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.status(200).json({
        message:
          "Product deleted successfully.",
        product: deletedProduct,
      });
    } catch (error) {
      console.error(
        "Delete product error:",
        error
      );

      res.status(500).json({
        message:
          error.message ||
          "Unable to delete product.",
      });
    }
  }
);

// =====================================================
// EXPORT ROUTER
// =====================================================

module.exports = router;