import { Router } from "express";
import { getUser, login, register } from "../controllers/UserControllers.js";
import { validateUser } from "../middlewares/userMiddleware.js";
import upload from "../middlewares/multer.js";
const routes = Router();

routes.get("/", getUser);
routes.post("/register", upload.single("profileImage") ,validateUser, register);
routes.post("/login",login);

export default routes;
