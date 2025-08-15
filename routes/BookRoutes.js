import { Router } from "express";
import {
  deleteBook,
  editBook,
  getBooks,
  getBooksById,
  postBooks,
} from "../controllers/BookControllers.js";
import { authorize } from "../middlewares/authorization.js";
import { validateBook } from "../middlewares/bookMiddleware.js";
import upload from "../middlewares/multer.js";
import { validateUpdateBook } from "../middlewares/updateMiddleware.js";
const route = Router();

route.get("/", getBooks);
route.get("/:id", getBooksById);
route.post("/", authorize, upload.single("image"), validateBook, postBooks);
route.put("/:id", authorize, upload.single("image"), validateUpdateBook , editBook);
route.delete("/:id", authorize, deleteBook);

export default route;
