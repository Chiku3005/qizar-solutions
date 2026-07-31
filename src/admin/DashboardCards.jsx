
import { useEffect, useMemo, useState } from "react";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productApi";
import Sidebar from "./Sidebar";
import Header from "./Header";
import DashboardCards from "./DashboardCards";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    name:"",
    description:"",
    price:"",
    image:"",
    category:"",
    stock:"",
  });

  const loadProducts = async () => {
    const res = await getProducts();
    setProducts(res.data || []);
  };

  useEffect(() => { loadProducts(); }, []);

  const filtered = useMemo(() =>
    products.filter(p =>
      (p.name || "").toLowerCase().includes(search.toLowerCase())
    ), [products, search]);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (editingId) await updateProduct(editingId, formData);
    else await createProduct(formData);
    setEditingId(null);
    setFormData({
      name:"",description:"",price:"",
      image:"",category:"",stock:""
    });
    loadProducts();
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <Header />
        <DashboardCards products={products} />

        <div className="bg-white rounded-2xl shadow p-6 mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Product Management</h2>
            <input
              className="border rounded-lg px-4 py-2 w-72"
              placeholder="Search products..."
              value={search}
              onChange={e=>setSearch(e.target.value)}
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-4"
          >
            <input className="border p-3 rounded-lg" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange}/>
            <input className="border p-3 rounded-lg" name="price" placeholder="Price" value={formData.price} onChange={handleChange}/>
            <input className="border p-3 rounded-lg" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange}/>
            <input className="border p-3 rounded-lg" name="category" placeholder="Category" value={formData.category} onChange={handleChange}/>
            <input className="border p-3 rounded-lg md:col-span-2" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange}/>
            <textarea className="border p-3 rounded-lg md:col-span-2" rows={4} name="description" placeholder="Description" value={formData.description} onChange={handleChange}/>
            <button className="md:col-span-2 bg-red-600 hover:bg-red-700 text-white rounded-lg py-3">
              {editingId ? "Update Product" : "Add Product"}
            </button>
          </form>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            {filtered.map(product=>(
              <div key={product._id} className="bg-slate-50 rounded-xl shadow overflow-hidden">
                <img src={product.image} alt={product.name} className="h-56 w-full object-cover"/>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-sm text-slate-600 mt-2">{product.description}</p>
                  <p className="mt-3 font-semibold text-red-600">₹ {product.price}</p>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 bg-blue-600 text-white rounded py-2">Edit</button>
                    <button className="flex-1 bg-red-600 text-white rounded py-2">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
