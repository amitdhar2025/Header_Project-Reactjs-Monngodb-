import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthProvider";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [authUser] = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const fetchCart = async () => {
      if (authUser && authUser.token) {
        try {
          console.log("Fetching cart for user:", authUser._id);
          const response = await fetch("http://localhost:4002/cart", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authUser.token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            console.log("Cart fetched:", data);
            const itemsArray = data.items || [];
            const items = itemsArray.map((item) => ({
              id: item.productId._id,
              name: item.productId.name,
              price: item.productId.price,
              image: item.productId.image,
              quantity: item.quantity,
            }));
            setCartItems(items);
          }
        } catch (error) {
          console.error("Failed to fetch cart:", error);
        }
      } else {
        setCartItems([]);
      }
    };
    fetchCart();
  }, [authUser]);

  const addToCart = async (item) => {
    console.log("addToCart called with authUser:", authUser);
    // Use token from authUser stored in localStorage "Users"
    let token = null;
    if (authUser && authUser.token) {
      token = authUser.token;
    } else {
      const storedUser = localStorage.getItem("Users");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser.token || parsedUser.accessToken || null;
        } catch {
          token = null;
        }
      }
    }
    console.log("Token used for addToCart:", token);
    if (!authUser || !authUser._id || !token) {
      console.log("Add to cart ignored: user not signed in or token missing", authUser);
      return;
    }
    try {
      console.log("Adding to cart:", item);
      const response = await fetch("http://localhost:4002/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: item._id, quantity: 1 }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Add to cart response:", data);
        const items = data.items.map((item) => ({
          id: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          image: item.productId.image,
          quantity: item.quantity,
        }));
        setCartItems(items);
      } else {
        console.error("Add to cart failed with status:", response.status);
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    if (!authUser || !authUser.token) {
      setCartItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
      return;
    }
    try {
      const response = await fetch("http://localhost:4002/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser.token}`,
        },
        body: JSON.stringify({ productId: itemId }),
      });
      if (response.ok) {
        const data = await response.json();
        const items = data.items.map((item) => ({
          id: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          image: item.productId.image,
          quantity: item.quantity,
        }));
        setCartItems(items);
      }
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  const clearCart = async () => {
    if (!authUser || !authUser.token) {
      setCartItems([]);
      return;
    }
    try {
      const response = await fetch("http://localhost:4002/cart/clear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser.token}`,
        },
      });
      if (response.ok) {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
