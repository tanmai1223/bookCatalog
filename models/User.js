import mongoose from "mongoose";

const User = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  profileImage: {
    type: String,
    required: true,
    trim: true,
  },
  cloudinary_id: {
    type: String,
  },
});

const users = mongoose.model("users", User);

export default users;
