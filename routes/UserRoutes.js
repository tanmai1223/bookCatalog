import { Router } from "express";
import { getUser, login, register } from "../controllers/UserControllers.js";
import { validateUser } from "../middlewares/userMiddleware.js";
const routes = Router();

routes.get("/", getUser);
routes.post("/register",validateUser, register);
routes.post("/login",login);

export default routes;
