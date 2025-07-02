import express from "express";
import { saveRichText, getRichTextContents, deleteRichText, deleteAllRichText } from "../controller/richText.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/save", upload.single("image"), saveRichText);
router.get("/", getRichTextContents);
router.delete("/:id", deleteRichText);
router.delete("/", deleteAllRichText);

export default router;
