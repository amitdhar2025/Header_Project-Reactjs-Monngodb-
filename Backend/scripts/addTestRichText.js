import mongoose from "mongoose";
import dotenv from "dotenv";
import RichText from "../model/richText.model.js";

dotenv.config();

const URI = process.env.MongoDBURI || "mongodb://localhost:27017";

async function addTestRichText() {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const testEntry = new RichText({
      name: "Test Entry",
      content: "<p>This is a test content added programmatically.</p>",
    });

    await testEntry.save();
    console.log("Test rich text entry saved successfully");

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error adding test rich text entry:", error);
  }
}

addTestRichText();
