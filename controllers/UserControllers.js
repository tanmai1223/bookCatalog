import express from "express"
import bcrypt, { genSalt } from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"; 


export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;    

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

    const newUser = new User({ name, email, password:hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });

  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all details" });
    }

    const user=await User.findOne({email})

    if(!user){
      return res.status(404).json({message:"User not found"})
    }

    const isPasswordValid=await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
      return res.status(400).json({message:"Password incorrect"})
    }

   const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"})
    res.status(201).json({ message: "User created successfully", user,token });

  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json({ message: "All User data", data });
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
};
