import express from "express";
import Books from "../models/Book.js";

export const postBooks = async (req, res) => {
  try {
    const { title, author, genre, price, inStock } = req.body;

    const newBook = new Books({
      title,
      author,
      price,
      genre,
      inStock,
    });

    await newBook.save();

    res.status(201).json({ message: "Added Sucessfully!", details: newBook });
  } catch (err) {
    res.status(500).json({ message: "Error occured!", err });
  }
};

export const getBooks = async (req, res) => {
  try {
    const data = await Books.find();
    res.status(200).json({ message: "All Books", data });
  } catch (err) {
    res.status(500).json({ message: "Error occured!", err });
  }
};

export const getBooksById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Books.findById(id);
    res.status(200).json({ message: "Bookof particular id", data });
  } catch (err) {
    res.status(500).json({ message: "Error occured!", err });
  }
};

export const editBook = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, author, genre, price, inStock } = req.body;

    const updatedBook = await Books.findByIdAndUpdate(
      id,
      { title, author, genre, price, inStock },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res
      .status(200)
      .json({ message: "Book updated successfully", book: updatedBook });
  } catch (err) {
    res.status(500).json({ message: "Error occurred!", error: err.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Books.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ message: "Book not found" });
    }
    res
      .status(200)
      .json({ message: "Book deleted sucessfully", details: data });
  } catch (err) {
    res.status(500).json({ message: "Error occured!", err });
  }
};
