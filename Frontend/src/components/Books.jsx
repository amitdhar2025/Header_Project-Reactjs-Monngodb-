import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("http://localhost:4002/book");
        // Prepend the image URL path for each book
        const booksWithImageUrl = res.data.map(book => ({
          ...book,
          image: `http://localhost:4002/uploads/${book.image}`
        }));
        setBooks(booksWithImageUrl);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };
    getBooks();
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 my-8">
      <h1 className="font-semibold text-2xl mb-4 flex justify-between items-center">
        All Books
        <button
          onClick={() => {
            // Refresh books list
            const getBooks = async () => {
              try {
                const res = await axios.get("http://localhost:4002/book");
                const booksWithImageUrl = res.data.map(book => ({
                  ...book,
                  image: `http://localhost:4002/uploads/${book.image}`
                }));
                setBooks(booksWithImageUrl);
              } catch (error) {
                console.error("Failed to fetch books:", error);
              }
            };
            getBooks();
          }}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          Refresh Books
        </button>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((item) => (
          <Cards item={item} key={item._id} />
        ))}
      </div>
      <RichTextContent />
    </div>
  );
}

import RichTextContent from "./RichTextContent";

export default Books;
