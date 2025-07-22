import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Cards({ item }) {
  const { addToCart } = useContext(CartContext);
  const [authUser] = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    if (!authUser) {
      setShowModal(true);
      return;
    }
    addToCart(item);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLoginRedirect = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <>
      <div className="m-4 p-4 max-w-xs bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 dark:bg-slate-900 dark:text-white dark:border border-2 border-pink-600">
        <figure className="overflow-hidden rounded-md">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-300"
          />
        </figure>
        <div className="p-4">
          <h2 className="text-lg font-semibold flex justify-between items-center">
            {item.name}
            <span className="bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded">
              {item.category}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{item.title}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-pink-600 font-bold text-lg">${item.price}</span>
            <button
              onClick={handleAddToCart}
              className="bg-pink-500 text-white px-3 py-1 rounded-full hover:bg-pink-600 transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Please sign in to add items to your cart
            </h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleLoginRedirect}
                className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
              >
                Go to Login
              </button>
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cards;
