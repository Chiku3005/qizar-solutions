import {
  FaSave,
  FaTimes,
  FaPlus,
  FaImage,
  FaLink,
  FaBoxOpen,
} from "react-icons/fa";

function ProductForm({
  formData,
  handleChange,
  handleSubmit,
  editingId,
  resetForm,
  saving = false,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

      {/* ================================
          FORM HEADER
      ================================= */}

      <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-red-50 text-[#c82b2b] flex items-center justify-center">
            {editingId ? (
              <FaSave size={18} />
            ) : (
              <FaPlus size={18} />
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {editingId ? "Edit Product" : "Add New Product"}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {editingId
                ? "Update the product information below."
                : "Add a new product to your Qizar Solutions catalogue."}
            </p>
          </div>

        </div>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            disabled={saving}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-gray-600 border border-gray-200 hover:bg-gray-50 transition text-sm font-semibold disabled:opacity-50"
          >
            <FaTimes />
            Cancel Editing
          </button>
        )}

      </div>


      {/* ================================
          FORM
      ================================= */}

      <form
        onSubmit={handleSubmit}
        className="p-6"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* PRODUCT NAME */}

          <FormField
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
            icon={<FaBoxOpen />}
          />


          {/* BRAND */}

          <FormField
            label="Brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Enter brand name"
          />


          {/* CATEGORY */}

          <FormField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Storage, Broadcast, Networking..."
          />
          

          {/* STOCK */}

          <FormField
            label="Stock Quantity"
            name="stock"
            type="number"
            min="0"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter available stock"
            required
          />


          {/* IMAGE URL */}

          <FormField
            label="Product Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/product.jpg"
            icon={<FaImage />}
          />


          {/* PURCHASE URL */}

          <div className="md:col-span-2">

            <FormField
              label="Purchase / Referral URL"
              name="purchaseUrl"
              value={formData.purchaseUrl}
              onChange={handleChange}
              placeholder="https://example.com/product"
              icon={<FaLink />}
            />

            <p className="text-xs text-gray-400 mt-2">
              Add the external product or referral page where users
              can explore or purchase this product.
            </p>

          </div>


          {/* DESCRIPTION */}

          <div className="md:col-span-2">

            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description ?? ""}
              onChange={handleChange}
              rows={5}
              placeholder="Enter a clear description of the product..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 outline-none resize-none transition focus:bg-white focus:border-[#c82b2b] focus:ring-4 focus:ring-red-50"
            />

          </div>


          {/* SPECIFICATIONS */}

          <div className="md:col-span-2">

            <label
              htmlFor="specifications"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Specifications
            </label>

            <textarea
              id="specifications"
              name="specifications"
              value={formData.specifications ?? ""}
              onChange={handleChange}
              rows={5}
              placeholder="Enter product specifications..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 outline-none resize-none transition focus:bg-white focus:border-[#c82b2b] focus:ring-4 focus:ring-red-50"
            />

          </div>

        </div>


        {/* ================================
            BUTTONS
        ================================= */}

        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:justify-end">

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              disabled={saving}
              className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition font-semibold disabled:opacity-50"
            >
              Cancel
            </button>
          )}


          <button
            type="submit"
            disabled={saving}
            className="px-7 py-3 rounded-xl bg-[#c82b2b] hover:bg-red-700 disabled:bg-gray-400 text-white flex items-center justify-center gap-2 transition font-semibold shadow-sm hover:shadow-md disabled:cursor-not-allowed"
          >

            {saving ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />

                {editingId ? "Updating..." : "Adding..."}
              </>
            ) : editingId ? (
              <>
                <FaSave />
                Update Product
              </>
            ) : (
              <>
                <FaPlus />
                Add Product
              </>
            )}

          </button>

        </div>

      </form>

    </div>
  );
}


/* =========================================
   REUSABLE INPUT FIELD
========================================= */

function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  min,
  icon,
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 mb-2"
      >

        {label}

        {required && (
          <span className="text-red-500 ml-1">
            *
          </span>
        )}

      </label>


      <div className="relative">

        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}

        <input
          id={name}
          type={type}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          min={min}
          className={`w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 outline-none transition focus:bg-white focus:border-[#c82b2b] focus:ring-4 focus:ring-red-50 ${
            icon ? "pl-11" : ""
          }`}
        />

      </div>

    </div>
  );
}


export default ProductForm;