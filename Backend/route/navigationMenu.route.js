import express from "express";
import { getMenu, updateMenu } from "../controller/navigationMenu.controller.js";

const router = express.Router();

router.get("/menu", getMenu);
router.put("/menu", updateMenu);

export default router;
