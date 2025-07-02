import express from "express";
import { signup, login, listUsers } from "../controller/user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/list", listUsers);

export default router;
