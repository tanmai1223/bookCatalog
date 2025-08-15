import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { uploadImage } from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: "error",
        field: "email",
        message: "User with this email already exists.",
      });
    }

    const result = await uploadImage(req.file.path);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profileImage: result.secure_url,
      cloudinary_id: result.public_id,
    });

    await newUser.save();

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error registering user",
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: "error",
      message: "Request body is missing. Please send user details.",
    });
  }
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        status: "error",
        message: "Incorrect password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: "success",
      message: "Login successful",
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error logging in",
      error: err.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json({
      status: "success",
      message: "All users fetched successfully",
      data,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error fetching users",
      error: err.message,
    });
  }
};
