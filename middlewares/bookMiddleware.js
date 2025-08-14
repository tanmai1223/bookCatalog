import express from "express";

export const validateBook = (req, res, next) => {
  const { title, author, genre, price, inStock } = req.body;

  if (!title || !title.length <= 2) {
    return res.status(400).json({ message: "Title is not valid" });
  }

  if (!author || !author.length <= 2) {
    return res.status(400).json({ message: "Author is not valid" });
  }
  if (!genre || !genre.length <= 2) {
    return res.status(400).json({ message: "Genre is not valid " });
  }
  if (!price || !price > 0) {
    return res.status(400).json({ message: "Price is not valid " });
  }
  if (!inStock) {
    return res.status(400).json({ message: "InStock is not valid " });
  }
  next();
};
