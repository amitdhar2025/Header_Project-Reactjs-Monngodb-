import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import { seedAdminUser } from "./controller/sampleData.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
import bodyParser from "body-parser";

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

// Remove the previous express.json() middleware line
// app.use(express.json());

// Load environment variables from config.env
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "config.env") });

console.log("MongoDB URI from env:", process.env.MongoDBURI);

const PORT = process.env.PORT || 4002;
const URI = process.env.MongoDBURI;

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (URI) {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(async () => {
        console.log("Connected to mongoDB");
        await seedAdminUser();
    }).catch((error) => {
        console.log("Error connecting to mongoDB: ", error);
    });
} else {
    console.log("MongoDB URI not provided, skipping connection.");
}

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

import navigationMenuRoute from "./route/navigationMenu.route.js";
import richTextRoute from "./route/richText.route.js";

app.use("/navigation", navigationMenuRoute);
app.use("/richtext", richTextRoute);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the BookStore API' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
