import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const modules = {
  toolbar: [
    [{ 'font': [] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }, { 'align': [] }],
    ['link', 'image', 'video', 'formula'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false,
  }
};

const formats = [
  'font', 'size',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'script',
  'header', 'blockquote', 'code-block',
  'list', 'bullet', 'indent',
  'direction', 'align',
  'link', 'image', 'video', 'formula'
];

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RichTextEditor = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [allRichTexts, setAllRichTexts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Removed redirect logic to allow public access to /richtext
  // useEffect(() => {
  //   // Check if navigation came from AdminDashboard via state
  //   if (!location.state || !location.state.fromAdmin) {
  //     // Redirect to adminpanel if accessed directly
  //     navigate("/adminpanel", { replace: true });
  //   }
  // }, [location, navigate]);

  const handleSave = async () => {
    if (!name.trim() || !content.trim()) {
      alert("Name and content cannot be empty.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("content", content);

      // Removed image upload handling as per user request

      const response = await axios.post("http://localhost:4002/richtext/save", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      alert("Content saved successfully!");
      setName("");
      setContent("");
    } catch (error) {
      alert("Error saving content: " + error.message);
    }
  };

  const provideAllTextData = async () => {
    try {
      const response = await axios.get("http://localhost:4002/richtext");
      setAllRichTexts(response.data);
    } catch (error) {
      alert("Error fetching all rich text data: " + error.message);
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) {
      return;
    }
    try {
      await axios.delete(`http://localhost:4002/richtext/${id}`);
      alert("Entry deleted successfully!");
      // Refresh the list after deletion
      provideAllTextData();
    } catch (error) {
      alert("Error deleting entry: " + error.message);
    }
  };

  return (
    <div className="container mx-auto pt-12 p-4" style={{ marginTop: "60px", width: "100%", border: "none", outline: "none" }}>
      <h2 className="text-2xl font-bold mb-4">Rich Text Editor</h2>
      <input
        type="text"
        placeholder="Name"
        className="border p-2 mb-4 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {/* Removed browse or choose file input as per user request */}
      <div style={{ width: "100%", border: "none", outline: "none" }}>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          className="custom-quill"
          style={{ height: "300px", marginBottom: "50px" }}
        />
      </div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={provideAllTextData}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Provide All Text Data
        </button>
        <button
          onClick={() => {
            console.log("Remove Table Format button clicked");
            // Remove all <table> elements from the content
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = content;
            const tables = tempDiv.getElementsByTagName("table");
            while (tables.length > 0) {
              const table = tables[0];
              // Replace table with its inner text content
              const textNode = document.createTextNode(table.textContent);
              table.parentNode.replaceChild(textNode, table);
            }
            const newContent = tempDiv.innerHTML;
            console.log("New content after removing tables:", newContent);
            setContent(newContent);
          }}
          hidden
        >
          Remove Table Format
        </button>
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
      {allRichTexts.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">All Rich Text Entries</h3>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Content</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allRichTexts.map((entry) => (
                <tr key={entry._id}>
                  <td className="border border-gray-300 px-4 py-2">{entry.name}</td>
                  <td className="border border-gray-300 px-4 py-2" dangerouslySetInnerHTML={{ __html: entry.content }}></td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleDelete(entry._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
