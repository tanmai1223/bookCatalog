import mongoose from "mongoose";

const Book = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  genre: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    trim: true,
    required: true,
  },
  inStock: {
    type: Boolean,
    default:true,
    required: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  cloudinary_id: {
    type: String,
  },
});

const Books = mongoose.model("Books", Book);

export default Books;
