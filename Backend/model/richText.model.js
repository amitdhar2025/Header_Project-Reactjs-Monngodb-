import mongoose from "mongoose";

const richTextSchema = mongoose.Schema({
    name: String,
    content: String,
});

const RichText = mongoose.model("RichText", richTextSchema);

export default RichText;
