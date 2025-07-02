import RichText from "../model/richText.model.js";
import path from "path";

export const saveRichText = async (req, res) => {
    try {
        const { name, content } = req.body;
        let imagePath = null;
        if (req.file) {
            imagePath = req.file.filename; // Save the filename or path as needed
        }
        const richText = new RichText({ name, content, image: imagePath });
        await richText.save();
        res.status(201).json({ message: "Rich text saved successfully", richText });
    } catch (error) {
        res.status(500).json({ message: "Error saving rich text", error: error.message });
    }
};

export const getRichTextContents = async (req, res) => {
    try {
        const contents = await RichText.find({});
        res.status(200).json(contents);
    } catch (error) {
        res.status(500).json({ message: "Error fetching rich text contents", error: error.message });
    }
};

export const deleteRichText = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await RichText.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Rich text entry not found" });
        }
        res.status(200).json({ message: "Rich text entry deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting rich text entry", error: error.message });
    }
};

export const deleteAllRichText = async (req, res) => {
    try {
        await RichText.deleteMany({});
        res.status(200).json({ message: "All rich text entries deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting all rich text entries", error: error.message });
    }
};
