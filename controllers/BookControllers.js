import express from "express";
import mongoose from "mongoose";
import Books from "../models/Book.js";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";

export const postBooks = async (req, res) => {
  try {
    const { title, author, genre, price, inStock } = req.body;

    const existingBook = await Books.findOne({ title });
    if (existingBook) {
      return res.status(409).json({
        status: "error",
        message: "Book already exists."
      });
    }

    const result = await uploadImage(req.file.path);

    const newBook = new Books({
      title,
      author,
      price,
      genre,
      inStock,
      image: result.secure_url,
      cloudinary_id: result.public_id,
    });

    await newBook.save();

    return res.status(201).json({
      status: "success",
      message: "Book added successfully.",
      data: newBook
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Server error while adding book.",
      error: err.message
    });
  }
};

export const getBooks = async (req, res) => {
  try {
    const data = await Books.find();
    return res.status(200).json({
      status: "success",
      message: "All books retrieved.",
      data
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Server error while fetching books.",
      error: err.message
    });
  }
};

export const getBooksById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid book ID format."
      });
    }

    const data = await Books.findById(id);
    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Book not found."
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Book retrieved successfully.",
      data
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Server error while fetching book.",
      error: err.message
    });
  }
};

export const editBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, price, inStock } = req.body;
    const file = req.file;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid book ID format."
      });
    }

    const book = await Books.findById(id);
    if (!book) {
      return res.status(404).json({
        status: "error",
        message: "Book not found."
      });
    }

    // Handle image update
    if (file) {
      const result = await uploadImage(file.path);
      if (book.cloudinary_id) {
        await deleteImage(book.cloudinary_id);
      }
      book.image = result.secure_url;
      book.cloudinary_id = result.public_id;
    }

    // Update only provided fields
    book.title = title ?? book.title;
    book.author = author ?? book.author;
    book.genre = genre ?? book.genre;
    book.price = price ?? book.price;
    book.inStock = inStock ?? book.inStock;

    await book.save();

    return res.status(200).json({
      status: "success",
      message: "Book updated successfully.",
      data: book
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Server error while updating book.",
      error: err.message
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid book ID format."
      });
    }

    const book = await Books.findById(id);
    if (!book) {
      return res.status(404).json({
        status: "error",
        message: "Book not found."
      });
    }

    if (book.cloudinary_id) {
      await deleteImage(book.cloudinary_id);
    }

    await Books.findByIdAndDelete(id);
    return res.status(200).json({
      status: "success",
      message: "Book deleted successfully.",
      data: book
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Server error while deleting book.",
      error: err.message
    });
  }
};
