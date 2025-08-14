import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected sucessfully!!");
  } catch (err) {
    console.log("Error : ", err);
    process.exit(1);
  }
};

export default db;
