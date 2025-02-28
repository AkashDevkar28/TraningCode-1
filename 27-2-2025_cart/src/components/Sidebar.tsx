import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen fixed left-0 top-0 bg-gray-900 text-white p-4">
      <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
      <ul className="space-y-4">
        <li><Link to="/" className="block p-2 hover:bg-gray-700 rounded">Home</Link></li>
        <li><Link to="/get-product" className="block p-2 hover:bg-gray-700 rounded">Get Product</Link></li>
        <li><Link to="/add-product" className="block p-2 hover:bg-gray-700 rounded">Add Product</Link></li>
        <li><Link to="/update-product" className="block p-2 hover:bg-gray-700 rounded">Update Product</Link></li>
        <li><Link to="/delete-product" className="block p-2 hover:bg-gray-700 rounded">Delete Product</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
