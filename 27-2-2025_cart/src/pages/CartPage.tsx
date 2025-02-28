import React from "react";
import { useCart } from "../context/CartContext";

const CartPage: React.FC = () => {
  const { cart, removeFromCart } = useCart();

  const handleRemove = (productId: number, productTitle: string) => {
    removeFromCart(productId);
    alert(`Removed "${productTitle}" from cart!`); // Show alert
  };

  return (
    <div className="p-6 ml-64">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {cart.map((product) => (
            <div key={product.id} className="bg-white p-4 shadow rounded flex items-center">
              <img src={product.image} alt={product.title} className="w-24 h-24 object-contain mr-4" />
              <div>
                <h2 className="text-lg font-bold text-black">{product.title}</h2>
                <p className="text-gray-500">${product.price}</p>
                <button
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => handleRemove(product.id, product.title)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
