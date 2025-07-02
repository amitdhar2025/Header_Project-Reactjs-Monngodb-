import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import Cards from "./Cards";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [authUser, setAuthUser] = useAuth();
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    name: "",
    category: "",
    title: "",
    price: "",
    imageFile: null,
    imagePreview: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Removed login redirect to allow direct access to /adminpanel
  // useEffect(() => {
  //   if (!authUser) {
  //     // Redirect to login if not authenticated
  //     window.location.href = "/login";
  //   }
  // }, [authUser]);

  const handleLogout = () => {
    setAuthUser(undefined);
    localStorage.removeItem("Users");
    window.location.href = "/login";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setNewBook((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: preview,
      }));
    }
  };

  const addBook = async () => {
    if (
      newBook.name &&
      newBook.category &&
      newBook.title &&
      newBook.price &&
      newBook.imageFile
    ) {
      try {
        const formData = new FormData();
        formData.append("name", newBook.name);
        formData.append("category", newBook.category);
        formData.append("title", newBook.title);
        formData.append("price", parseFloat(newBook.price));
        formData.append("image", newBook.imageFile);

        const response = await fetch("http://localhost:4002/book", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          const addedBook = await response.json();
          setBooks((prev) => [...prev, addedBook]);
          setNewBook({
            name: "",
            category: "",
            title: "",
            price: "",
            imageFile: null,
            imagePreview: "",
          });
        } else {
          const errorText = await response.text();
          console.error("Failed to add book:", response.status, errorText);
          alert("Failed to add book: " + response.status + " " + errorText);
        }
      } catch (error) {
        console.error("Error adding book:", error);
        alert("Error adding book: " + error.message);
      }
    } else {
      alert("Please fill all book details");
    }
  };

  const [showAllBooks, setShowAllBooks] = useState(false);
  const [allBooks, setAllBooks] = useState([]);

  const fetchAllBooks = async () => {
    try {
      const response = await fetch("http://localhost:4002/book");
      if (response.ok) {
        const data = await response.json();
        // Prepend image URL path for each book
        const booksWithImageUrl = data.map((book) => ({
          ...book,
          image: `http://localhost:4001/uploads/${book.image}`,
        }));
        setAllBooks(booksWithImageUrl);
        setShowAllBooks(true);
      } else {
        alert("Failed to fetch books");
      }
    } catch (error) {
      alert("Error fetching books: " + error.message);
    }
  };

  const removeBook = async (id) => {
    try {
      const response = await fetch(`http://localhost:4002/book/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setAllBooks((prev) => prev.filter((book) => book._id !== id));
      } else {
        alert("Failed to delete book");
      }
    } catch (error) {
      alert("Error deleting book: " + error.message);
    }
  };

  if (!authUser) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h2>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Add New Book
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newBook.name}
              onChange={handleInputChange}
              className="px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={newBook.category}
              onChange={handleInputChange}
              className="px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              name="title"
              placeholder="Short Description"
              value={newBook.title}
              onChange={handleInputChange}
              className="px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={newBook.price}
              onChange={handleInputChange}
              className="px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
            />
            <input
              type="file"
              accept="image/*"
              name="imageFile"
              onChange={handleImageChange}
              className="px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
            />
            {newBook.imagePreview && (
              <img
                src={newBook.imagePreview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded"
              />
            )}
          </div>
          <button
            onClick={addBook}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Add Book
          </button>
        </div>
        <button
          onClick={fetchAllBooks}
          className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Show All Books
        </button>
        <button
          onClick={() => navigate("/adminpanel", { state: { fromAdmin: true } })}
          className="ml-4 mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add Menu
        </button>
        {showAllBooks && (
          <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                  Name
                </th>
                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                  Category
                </th>
                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                  Title
                </th>
                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                  Price
                </th>
                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allBooks.map((book) => (
                <tr
                  key={book._id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                    {book.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                    {book.category}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                    {book.title}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                    ${book.price}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => removeBook(book._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Admin;
