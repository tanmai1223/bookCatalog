import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import UserRoutes from "./routes/UserRoutes.js";
import BookRoutes from "./routes/BookRoutes.js";
const app = express();
dotenv.config();
const PORT=process.env.PORT||5000

db();
app.use(express.json());

app.use("/api/users", UserRoutes);
app.use("/api/books", BookRoutes);
app.use("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Your project is running on http://localhost:${PORT}/`);
});
