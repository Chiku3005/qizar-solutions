import { useMemo, useRef, useState } from "react";

import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaBoxOpen,
  FaExternalLinkAlt,
  FaUpload,
  FaFileCsv,
  FaDownload,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";

import { toast } from "react-toastify";
import Swal from "sweetalert2";

import {
  createProduct,
  updateProduct,
  deleteProduct,
  bulkUploadProducts,
} from "../api/productApi";

import ProductForm from "./ProductForm";

function ProductsPage({
  products = [],
  editingProduct,
  setEditingProduct,
  loadProducts,
}) {
  // =====================================================
  // STATES
  // =====================================================

  const [search, setSearch] = useState("");

  const [saving, setSaving] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  // =====================================================
  // FORM STATE
  // =====================================================

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    image: "",
    specifications: "",
    purchaseUrl: "",
    stock: "",
  });

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setFormData({
      name: "",
      brand: "",
      category: "",
      description: "",
      image: "",
      specifications: "",
      purchaseUrl: "",
      stock: "",
    });

    setEditingProduct(null);
  };

  // =====================================================
  // EDIT PRODUCT
  // =====================================================

  const handleEdit = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name || "",
      brand: product.brand || "",
      category: product.category || "",
      description: product.description || "",
      image: product.image || "",
      specifications: product.specifications || "",
      purchaseUrl: product.purchaseUrl || "",
      stock: product.stock ?? "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // ADD / UPDATE PRODUCT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      if (editingProduct) {
        await updateProduct(
          editingProduct._id,
          formData
        );

        toast.success("Product updated successfully!");
      } else {
        await createProduct(formData);

        toast.success("Product added successfully!");
      }

      resetForm();

      await loadProducts();
    } catch (error) {
      console.error("Product save error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while saving the product."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE PRODUCT
  // =====================================================

  const handleDelete = async (product) => {
    const result = await Swal.fire({
      title: "Delete Product?",
      text: `Are you sure you want to delete "${product.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#c82b2b",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await deleteProduct(product._id);

      toast.success("Product deleted successfully!");

      if (
        editingProduct &&
        editingProduct._id === product._id
      ) {
        resetForm();
      }

      await loadProducts();
    } catch (error) {
      console.error("Delete product error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to delete product."
      );
    }
  };

  // =====================================================
  // CSV FILE SELECT
  // =====================================================

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // Check CSV extension
    if (!file.name.toLowerCase().endsWith(".csv")) {
      toast.error("Please select a CSV file.");

      e.target.value = "";

      return;
    }

    // Maximum 5 MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error(
        "CSV file must be smaller than 5 MB."
      );

      e.target.value = "";

      return;
    }

    setSelectedFile(file);
  };

  // =====================================================
  // REMOVE SELECTED FILE
  // =====================================================

  const removeSelectedFile = () => {
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =====================================================
  // BULK CSV UPLOAD
  // =====================================================

  const handleBulkUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a CSV file first.");
      return;
    }

    try {
      setUploading(true);

      const response = await bulkUploadProducts(
        selectedFile
      );

      const count = response?.data?.count || 0;

      toast.success(
        `${count} product${
          count === 1 ? "" : "s"
        } uploaded successfully!`
      );

      removeSelectedFile();

      await loadProducts();
    } catch (error) {
      console.error(
        "Bulk upload error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Unable to upload CSV file."
      );
    } finally {
      setUploading(false);
    }
  };

  // =====================================================
  // DOWNLOAD CSV TEMPLATE
  // =====================================================

  const downloadTemplate = () => {
    const headers = [
      "name",
      "brand",
      "category",
      "description",
      "image",
      "specifications",
      "purchaseUrl",
      "price",
      "stock",
    ];

    const example = [
      "Example Product",
      "GLYPH",
      "Storage",
      "Professional storage solution",
      "https://example.com/product.jpg",
      "USB4 NVMe SSD",
      "https://example.com/product",
      "24999",
      "10",
    ];

    const csvContent =
      headers.join(",") +
      "\n" +
      example
        .map((value) => {
          const escaped = String(value).replace(
            /"/g,
            '""'
          );

          return `"${escaped}"`;
        })
        .join(",");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "qizar-products-template.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // =====================================================
  // SEARCH PRODUCTS
  // =====================================================

  const filteredProducts = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    if (!searchValue) {
      return products;
    }

    return products.filter((product) => {
      return (
        product.name
          ?.toLowerCase()
          .includes(searchValue) ||

        product.brand
          ?.toLowerCase()
          .includes(searchValue) ||

        product.category
          ?.toLowerCase()
          .includes(searchValue)
      );
    });
  }, [products, search]);

  // =====================================================
  // STOCK STATUS
  // =====================================================

  const getStockStatus = (stock) => {
    const quantity = Number(stock || 0);

    if (quantity === 0) {
      return {
        label: "Out of Stock",
        className:
          "bg-red-50 text-red-700 border-red-200",
      };
    }

    if (quantity <= 5) {
      return {
        label: "Low Stock",
        className:
          "bg-orange-50 text-orange-700 border-orange-200",
      };
    }

    return {
      label: "In Stock",
      className:
        "bg-green-50 text-green-700 border-green-200",
    };
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="space-y-7">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Products
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your Qizar Solutions product catalogue.
          </p>
        </div>

        <div className="flex items-center gap-3">

          {/* TOTAL PRODUCTS */}

          <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
            <p className="text-xs text-gray-500">
              Total Products
            </p>

            <p className="text-xl font-bold text-slate-800">
              {products.length}
            </p>
          </div>

          {/* SHOWING */}

          <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
            <p className="text-xs text-gray-500">
              Showing
            </p>

            <p className="text-xl font-bold text-[#c82b2b]">
              {filteredProducts.length}
            </p>
          </div>

        </div>
      </div>

      {/* =================================================
          BULK CSV UPLOAD
      ================================================= */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

        {/* HEADER */}

        <div className="p-6 border-b border-gray-100">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>
              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-red-50 text-[#c82b2b] flex items-center justify-center">
                  <FaFileCsv />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Bulk Product Upload
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Add multiple products at once using a CSV file.
                  </p>
                </div>

              </div>
            </div>

            {/* DOWNLOAD TEMPLATE */}

            <button
              type="button"
              onClick={downloadTemplate}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                bg-gray-100
                text-gray-700
                font-semibold
                text-sm
                hover:bg-gray-200
                transition
              "
            >
              <FaDownload />

              Download CSV Template
            </button>

          </div>
        </div>

        {/* UPLOAD AREA */}

        <div className="p-6">

          <div
            className="
              border-2
              border-dashed
              border-gray-200
              rounded-2xl
              p-6
              hover:border-red-300
              transition
            "
          >

            <div className="flex flex-col lg:flex-row lg:items-center gap-5">

              {/* FILE ICON */}

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-green-50
                  text-green-600
                  flex
                  items-center
                  justify-center
                  text-2xl
                  flex-shrink-0
                "
              >
                <FaFileCsv />
              </div>

              {/* FILE INFORMATION */}

              <div className="flex-1">

                {!selectedFile ? (
                  <>
                    <h3 className="font-bold text-gray-800">
                      Upload your CSV file
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Maximum file size: 5 MB
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">

                      <FaCheckCircle className="text-green-500" />

                      <h3 className="font-bold text-gray-800 break-all">
                        {selectedFile.name}
                      </h3>

                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                      {(
                        selectedFile.size / 1024
                      ).toFixed(1)}
                      {" KB"}
                    </p>
                  </>
                )}

              </div>

              {/* FILE INPUT */}

              <label
                htmlFor="bulk-csv-input"
                className="
                  cursor-pointer
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-3
                  rounded-xl
                  bg-gray-900
                  text-white
                  font-bold
                  text-sm
                  hover:bg-gray-800
                  transition
                "
              >
                <FaUpload />

                Choose CSV
              </label>

              <input
                ref={fileInputRef}
                id="bulk-csv-input"
                type="file"
                accept=".csv,text/csv"
                onChange={handleFileSelect}
                className="hidden"
              />

            </div>

            {/* SELECTED FILE ACTIONS */}

            {selectedFile && (
              <div
                className="
                  mt-5
                  pt-5
                  border-t
                  border-gray-100
                  flex
                  flex-col
                  sm:flex-row
                  gap-3
                "
              >

                <button
                  type="button"
                  onClick={handleBulkUpload}
                  disabled={uploading}
                  className="
                    flex-1
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-5
                    py-3
                    rounded-xl
                    bg-[#c82b2b]
                    text-white
                    font-bold
                    hover:bg-red-700
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                    transition
                  "
                >

                  {uploading ? (
                    <>
                      <span
                        className="
                          w-4
                          h-4
                          border-2
                          border-white
                          border-t-transparent
                          rounded-full
                          animate-spin
                        "
                      />

                      Uploading Products...
                    </>
                  ) : (
                    <>
                      <FaUpload />

                      Upload Products
                    </>
                  )}

                </button>

                <button
                  type="button"
                  onClick={removeSelectedFile}
                  disabled={uploading}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-5
                    py-3
                    rounded-xl
                    bg-gray-100
                    text-gray-700
                    font-bold
                    hover:bg-gray-200
                    disabled:opacity-50
                    transition
                  "
                >
                  <FaTimes />

                  Remove
                </button>

              </div>
            )}

          </div>

          {/* CSV FORMAT INFORMATION */}

          <div
            className="
              mt-4
              bg-blue-50
              border
              border-blue-100
              rounded-xl
              px-4
              py-3
            "
          >
            <p className="text-xs text-blue-700 leading-relaxed">
              <strong>CSV columns:</strong>{" "}
              name, brand, category, description,
              image, specifications, purchaseUrl,
              price and stock.
            </p>
          </div>

        </div>
      </div>

      {/* =================================================
          PRODUCT FORM
      ================================================= */}

      <ProductForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        editingId={editingProduct?._id || null}
        resetForm={resetForm}
        saving={saving}
      />

      {/* =================================================
          PRODUCT CATALOGUE
      ================================================= */}

      <div
        className="
          bg-white
          rounded-2xl
          shadow-sm
          border
          border-gray-100
          overflow-hidden
        "
      >

        {/* TABLE HEADER */}

        <div className="p-6 border-b border-gray-100">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            <div>

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-red-50 text-[#c82b2b] flex items-center justify-center">
                  <FaBoxOpen />
                </div>

                <div>

                  <h2 className="text-2xl font-bold text-gray-800">
                    Product Catalogue
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    View and manage all products.
                  </p>

                </div>

              </div>

            </div>

            {/* SEARCH */}

            <div className="relative w-full lg:w-96">

              <FaSearch
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search by name, brand or category..."
                className="
                  w-full
                  pl-11
                  pr-4
                  py-3
                  border
                  border-gray-200
                  rounded-xl
                  bg-gray-50
                  text-gray-800
                  outline-none
                  transition
                  focus:bg-white
                  focus:border-[#c82b2b]
                  focus:ring-4
                  focus:ring-red-50
                "
              />

            </div>

          </div>

        </div>

        {/* EMPTY STATE */}

        {filteredProducts.length === 0 ? (

          <div className="py-20 px-6 text-center">

            <div
              className="
                w-20
                h-20
                mx-auto
                rounded-2xl
                bg-gray-100
                flex
                items-center
                justify-center
                text-gray-400
                text-3xl
              "
            >
              <FaBoxOpen />
            </div>

            <h3 className="text-xl font-bold text-gray-700 mt-5">
              No products found
            </h3>

            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              {search
                ? "We couldn't find any product matching your search. Try another name, brand or category."
                : "Your product catalogue is empty. Add your first product using the form above."}
            </p>

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="
                  mt-5
                  px-5
                  py-2.5
                  rounded-xl
                  bg-red-50
                  text-[#c82b2b]
                  font-semibold
                  hover:bg-red-100
                  transition
                "
              >
                Clear Search
              </button>
            )}

          </div>

        ) : (

          /* =================================================
             TABLE
          ================================================= */

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1050px]">

              <thead>

                <tr className="bg-gray-50 border-b border-gray-200">

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    Product
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    Brand
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    Stock
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredProducts.map((product) => {

                  const stockStatus =
                    getStockStatus(
                      product.stock
                    );

                  return (
                    <tr
                      key={product._id}
                      className="
                        hover:bg-gray-50/80
                        transition
                        duration-200
                      "
                    >

                      {/* PRODUCT */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-4">

                          {product.image ? (

                            <img
  src={product.image}
  alt={product.name}
  className="
    w-20
    h-20
    object-contain
    rounded-xl
    border
    border-gray-200
    bg-white
    p-2
    shadow-sm
  "
  onError={(e) => {
    e.currentTarget.style.display = "none";
  }}
/>

                          ) : (

                            <div
  className="
    w-20
    h-20
    rounded-xl
    bg-gray-50
    border
    border-gray-200
    flex
    items-center
    justify-center
    text-gray-400
    text-2xl
  "
>
  <FaBoxOpen />
</div>

                          )}

                          <div className="min-w-0">

                            <p
                              className="
                                font-bold
                                text-gray-800
                                truncate
                                max-w-[230px]
                              "
                            >
                              {product.name}
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                              ID: {product._id}
                            </p>

                            {product.description && (
                              <p
                                className="
                                  text-xs
                                  text-gray-500
                                  mt-1
                                  truncate
                                  max-w-[230px]
                                "
                              >
                                {product.description}
                              </p>
                            )}

                          </div>

                        </div>

                      </td>

                      {/* BRAND */}

                      <td className="px-6 py-5">

                        <span className="text-gray-600 font-medium">
                          {product.brand || "—"}
                        </span>

                      </td>

                      {/* CATEGORY */}

                      <td className="px-6 py-5">

                        {product.category ? (

                          <span
                            className="
                              inline-flex
                              px-3
                              py-1.5
                              rounded-full
                              bg-red-50
                              text-[#c82b2b]
                              border
                              border-red-100
                              text-xs
                              font-bold
                            "
                          >
                            {product.category}
                          </span>

                        ) : (

                          <span className="text-gray-400">
                            —
                          </span>

                        )}

                      </td>


                      {/* STOCK */}

                      <td className="px-6 py-5">

                        <span className="font-bold text-gray-800">
                          {Number(
                            product.stock || 0
                          )}
                        </span>

                        <span className="text-xs text-gray-400 ml-1">
                          units
                        </span>

                      </td>

                      {/* STATUS */}

                      <td className="px-6 py-5">

                        <span
                          className={`
                            inline-flex
                            items-center
                            px-3
                            py-1.5
                            rounded-full
                            border
                            text-xs
                            font-bold
                            ${stockStatus.className}
                          `}
                        >
                          <span
                            className="
                              w-1.5
                              h-1.5
                              rounded-full
                              bg-current
                              mr-2
                            "
                          />

                          {stockStatus.label}
                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td className="px-6 py-5">

                        <div className="flex justify-end gap-2">

                          {/* EDIT */}

                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(product)
                            }
                            title="Edit product"
                            className="
                              w-10
                              h-10
                              rounded-xl
                              bg-blue-50
                              text-blue-600
                              flex
                              items-center
                              justify-center
                              hover:bg-blue-100
                              transition
                            "
                          >
                            <FaEdit />
                          </button>

                          {/* EXTERNAL LINK */}

                          {product.purchaseUrl && (
                            <a
                              href={product.purchaseUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Open product link"
                              className="
                                w-10
                                h-10
                                rounded-xl
                                bg-gray-100
                                text-gray-600
                                flex
                                items-center
                                justify-center
                                hover:bg-gray-200
                                transition
                              "
                            >
                              <FaExternalLinkAlt />
                            </a>
                          )}

                          {/* DELETE */}

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(product)
                            }
                            title="Delete product"
                            className="
                              w-10
                              h-10
                              rounded-xl
                              bg-red-50
                              text-[#c82b2b]
                              flex
                              items-center
                              justify-center
                              hover:bg-red-100
                              transition
                            "
                          >
                            <FaTrash />
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default ProductsPage;