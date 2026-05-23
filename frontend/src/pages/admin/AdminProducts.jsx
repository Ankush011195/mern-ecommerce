// src/pages/admin/AdminProducts.jsx
import { useEffect, useState } from "react";
import API from "../../api";

const emptyForm = {
  name: "", price: "", description: "", image: "",
  category: "", countInStock: "", brand: ""
};

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const token = sessionStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get("/products");
        setProducts(data);
      } catch (e) { console.log(e); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editId) {
        const { data } = await API.put(`/admin/products/${editId}`, form, { headers });
        setProducts(prev => prev.map(p => p._id === editId ? data : p));
      } else {
        const { data } = await API.post("/admin/products", form, { headers });
        setProducts(prev => [...prev, data]);
      }
      setShowForm(false);
      setForm(emptyForm);
      setEditId(null);
    } catch (e) { console.log(e); }
    finally { setSaving(false); }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name, price: product.price,
      description: product.description, image: product.image,
      category: product.category, countInStock: product.countInStock,
      brand: product.brand || ""
    });
    setEditId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await API.delete(`/admin/products/${id}`, { headers });
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (e) { console.log(e); }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10"
         style={{ animation: "fadeIn 0.4s ease" }}>
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-medium text-gray-900">
            Products <span className="text-gray-400 text-lg font-normal">({products.length})</span>
          </h1>
          <button onClick={() => { setShowForm(true); setForm(emptyForm); setEditId(null); }}
                  className="px-4 py-2.5 bg-black text-white text-sm font-medium
                             rounded-xl hover:opacity-85 transition-all">
            + Add Product
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8"
               style={{ animation: "fadeUp 0.3s ease" }}>
            <h3 className="text-sm font-medium text-gray-900 mb-5">
              {editId ? "Edit Product" : "Add New Product"}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["name","Product Name","text"],
                ["price","Price (₹)","number"],
                ["brand","Brand","text"],
                ["countInStock","Stock Count","number"],
                ["image","Image URL","text"],
                ["category","Category","text"],
              ].map(([key, label, type]) => (
                <div key={key}>
                  <label className="text-xs text-gray-400 mb-1 block">{label}</label>
                  <input type={type} value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200
                               rounded-xl text-sm focus:outline-none focus:border-indigo-500
                               focus:ring-4 focus:ring-indigo-500/10 transition-all"/>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label className="text-xs text-gray-400 mb-1 block">Description</label>
              <textarea value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200
                           rounded-xl text-sm focus:outline-none focus:border-indigo-500
                           focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none"/>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={handleSave} disabled={saving}
                      className="px-5 py-2.5 bg-black text-white text-sm font-medium
                                 rounded-xl hover:opacity-85 transition-all">
                {saving ? "Saving..." : editId ? "Update" : "Add Product"}
              </button>
              <button onClick={() => { setShowForm(false); setEditId(null); }}
                      className="px-5 py-2.5 border border-gray-200 text-sm font-medium
                                 rounded-xl hover:bg-gray-50 transition-all">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Image","Name","Price","Stock","Category","Actions"].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-gray-500 px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product, i) => (
                <tr key={product._id} className="hover:bg-gray-50 transition"
                    style={{ animation: `fadeUp 0.4s ${i*0.03}s both` }}>
                  <td className="px-5 py-3">
                    <img src={product.image} alt={product.name}
                         className="w-12 h-12 rounded-xl object-cover bg-gray-100"/>
                  </td>
                  <td className="px-5 py-3 text-sm font-medium text-gray-900 max-w-[160px] truncate">
                    {product.name}
                  </td>
                  <td className="px-5 py-3 text-sm font-semibold text-gray-900">
                    ₹{product.price?.toLocaleString()}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full
                      ${product.countInStock === 0
                        ? "bg-red-50 text-red-600 border border-red-200"
                        : product.countInStock <= 5
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-green-50 text-green-700 border border-green-200"}`}>
                      {product.countInStock === 0 ? "Out of stock" : `${product.countInStock} left`}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-500">{product.category}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(product)}
                              className="text-xs px-3 py-1.5 rounded-lg border border-gray-200
                                         text-gray-600 hover:bg-gray-50 transition">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(product._id)}
                              className="text-xs px-3 py-1.5 rounded-lg border border-red-200
                                         text-red-500 hover:bg-red-50 transition">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}

export default AdminProducts;