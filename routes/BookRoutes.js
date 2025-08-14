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
const route = Router();

route.post("/",authorize,validateBook, postBooks);
route.get("/", getBooks);
route.get("/:id", getBooksById);
route.put("/:id",authorize,validateBook,editBook);
route.delete("/:id",authorize,deleteBook);

export default route;
