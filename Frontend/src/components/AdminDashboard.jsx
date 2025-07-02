import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";

function AdminDashboard() {
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Enforce dependent access: allow only if navigated from /admin
  useEffect(() => {
    if (!location.state || !location.state.fromAdmin) {
      navigate("/admin");
    }
  }, [location, navigate]);

  // Fetch menu from backend API on mount
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("http://localhost:4002/navigation/menu");
        setMenu(response.data);
      } catch (error) {
        console.error("Failed to fetch menu:", error);
      }
    };
    fetchMenu();
  }, []);

  // Update menu in backend API
  const updateMenuBackend = async (newMenu) => {
    try {
      await axios.put("http://localhost:4002/navigation/menu", newMenu);
    } catch (error) {
      console.error("Failed to update menu:", error);
    }
  };

  const addMenuItem = () => {
    const title = prompt("Enter menu item title:");
    if (!title) return;
    const link = prompt("Enter menu item link (optional):");
    const newMenu = [...menu, { title, link }];
    setMenu(newMenu);
    updateMenuBackend(newMenu);
  };

  const addSubMenuItem = (index) => {
    const title = prompt("Enter sub-menu item title:");
    if (!title) return;
    const link = prompt("Enter sub-menu item link (optional):");
    const newMenu = [...menu];
    if (!newMenu[index].subMenu) {
      newMenu[index].subMenu = [];
    }
    newMenu[index].subMenu.push({ title, link });
    setMenu(newMenu);
    updateMenuBackend(newMenu);
  };

  const removeMenuItem = (index) => {
    if (window.confirm("Are you sure you want to remove this menu item?")) {
      const newMenu = [...menu];
      newMenu.splice(index, 1);
      setMenu(newMenu);
      updateMenuBackend(newMenu);
    }
  };

  const removeSubMenuItem = (menuIndex, subIndex) => {
    if (window.confirm("Are you sure you want to remove this sub-menu item?")) {
      const newMenu = [...menu];
      newMenu[menuIndex].subMenu.splice(subIndex, 1);
      if (newMenu[menuIndex].subMenu.length === 0) {
        delete newMenu[menuIndex].subMenu;
      }
      setMenu(newMenu);
      updateMenuBackend(newMenu);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg" style={{ paddingTop: "6rem", marginTop: "40px" }}>
      <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">Admin Dashboard - Manage Navigation Menu</h2>
      <button
        className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
        onClick={addMenuItem}
      >
        Add Main Menu Item
      </button>
      <button
        className="ml-4 mb-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
        onClick={() => navigate("/richtext", { state: { fromAdmin: true } })}
      >
        Text
      </button>
      <ul className="space-y-6">
        {menu.map((item, index) => (
          <li key={index} className="border border-gray-300 dark:border-gray-700 p-6 rounded-lg shadow-md bg-gray-50 dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {item.title} {item.link && <span className="text-sm text-gray-500 dark:text-gray-400">({item.link})</span>}
              </div>
              <div className="space-x-3">
                <button
                  className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                  onClick={() => addSubMenuItem(index)}
                >
                  Add Sub-Menu
                </button>
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
                  onClick={() => removeMenuItem(index)}
                >
                  Remove
                </button>
              </div>
            </div>
            {item.subMenu && (
              <ul className="pl-6 border-l border-gray-300 dark:border-gray-700 space-y-3">
                {item.subMenu.map((subItem, subIndex) => (
                  <li key={subIndex} className="flex justify-between items-center text-gray-800 dark:text-gray-300">
                    <span>
                      {subItem.title} {subItem.link && <span className="text-sm text-gray-500 dark:text-gray-400">({subItem.link})</span>}
                    </span>
                    <button
                      className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
                      onClick={() => removeSubMenuItem(index, subIndex)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
