import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react"; 
import { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import GetProduct from "./pages/GetProduct";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import DeleteProduct from "./pages/DeleteProduct";
import CartPage from "./pages/CartPage";
import { CartProvider, useCart } from "./context/CartContext"; 

function Navbar() {
  const { cart } = useCart(); 
  const cartCount = cart.length; 

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center shadow-lg">
      
      <Link to="/" className="text-xl font-bold hover:text-gray-300">Home</Link>

     
      <Link to="/cart" className="relative">
        <ShoppingCart size={28} className="hover:text-gray-300 transition" />
        
        
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2">
            {cartCount}
          </span>
        )}
      </Link>
    </nav>
  );
}

function PageTitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "Home - Your Store",
      "/get-product": "Get Product - Your Store",
      "/add-product": "Add Product - Your Store",
      "/update-product": "Update Product - Your Store",
      "/delete-product": "Delete Product - Your Store",
      "/cart": "Cart - Your Store",
    };

    document.title = titles[location.pathname] || "Your Store";
  }, [location]);

  return null; 
}

function App() {
  return (
    <CartProvider>
      <Router>
        <PageTitleUpdater /> 
        <Navbar />

        <div className="flex">
         
          <Sidebar />

          
          <div className="flex-grow p-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/get-product" element={<GetProduct />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/update-product" element={<UpdateProduct />} />
              <Route path="/delete-product" element={<DeleteProduct />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
