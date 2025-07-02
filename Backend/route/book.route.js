import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { getBook, addBook, deleteBook } from "../controller/book.controller.js";

const router = express.Router();

// Configure multer for file uploads
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Fix path to remove extra C: and normalize for Windows
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const uploadPath = path.join(__dirname, '../uploads');
    // Ensure uploads directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.get("/", getBook);
router.post("/", upload.single('image'), addBook);
router.delete("/:id", deleteBook);

export default router;
