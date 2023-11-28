import { Book } from "../models/bookModel.js";

//get all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

//get single book
export const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        message: "Book Not Founded",
      });
    }
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

//create a book record
export const postBook = async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;
    if (!title || !author || !publishedYear) {
      return res.status(400).json({
        message: "Send all request fields: title, author, publishedYear",
      });
    }
    const newBook = { title, author, publishedYear };
    const book = await Book.create(newBook);
    return res.status(201).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

//update a book record
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishedYear } = req.body;
    const book = await Book.findByIdAndUpdate(id, {
      title,
      author,
      publishedYear,
    });
    if (!book) {
      return res.status(404).json({
        message: "Book Not Founded",
      });
    }
    return res.status(201).json({
      message: "Book updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

//delete book record
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({
        message: "Book Not Founded",
      });
    }
    return res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
