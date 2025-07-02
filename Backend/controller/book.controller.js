import Book from "../model/book.model.js";

export const getBook = async (req, res) => {
  try {
    const books = await Book.find();
    console.log("Sending books:", books);
    res.status(200).json(books);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};

export const addBook = async (req, res) => {
  try {
    console.log("Received addBook request with body:", req.body);
    console.log("Received file:", req.file);

    const { name, category, title, price } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name || !category || !title || !price || !image) {
      console.log("Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook = new Book({
      name,
      category,
      title,
      price,
      image,
    });

    const savedBook = await newBook.save();
    console.log("Book saved:", savedBook);
    res.status(201).json(savedBook);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};

export const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};
