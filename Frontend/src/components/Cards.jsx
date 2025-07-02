import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cards({ item }) {
  const { addToCart } = useContext(CartContext);

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
              onClick={() => addToCart(item)}
              className="bg-pink-500 text-white px-3 py-1 rounded-full hover:bg-pink-600 transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
