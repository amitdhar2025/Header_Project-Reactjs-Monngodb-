import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, clearCart, removeItemByIndex } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-8 relative min-h-[500px]">
      <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
            <tr className="bg-gray-100 dark:bg-[#EC4899]">
                <th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Image</th>
                <th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Name</th>
                <th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Price</th>
                <th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={`${item.id}-${index}`} className="border-b border-gray-300">
                  <td className="border border-gray-300 p-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover"
                    />
                  </td>
                  <td className="border border-gray-300 p-2 font-semibold">{item.name}</td>
                  <td className="border border-gray-300 p-2">${item.price}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => removeItemByIndex(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 flex justify-between items-center">
            <h3 className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</h3>
            <button
              onClick={clearCart}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
            >
              Clear Cart
            </button>
          </div>
          <button
            className="fixed bottom-4 left-4 px-6 py-3 bg-blue-600 text-white rounded shadow-lg hover:bg-blue-700"
            onClick={() => alert('Proceed to Buy clicked')}
          >
            Proceed to Buy
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
