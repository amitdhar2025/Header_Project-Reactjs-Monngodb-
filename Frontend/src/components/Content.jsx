import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Content() {
  const [text, setText] = useState("");
  const quillRef = useRef(null);

  const handleChange = (value) => {
    setText(value);
  };

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        // For demo, convert image to base64 and insert
        const reader = new FileReader();
        reader.onload = () => {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range.index, "image", reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  };

  const modules = {
    toolbar: {
      container: [
        [{ font: [] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ align: [] }],
        ["link", "image", "video"],
        ["clean"],
        ["save"] // custom save button
      ],
      handlers: {
        image: handleImageUpload,
        save: () => {
          alert("Content saved:\n" + text);
          // Implement actual save logic here
        }
      }
    }
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-3xl font-bold mb-6">Content Rich Text Editor</h2>
      <ReactQuill
        ref={quillRef}
        value={text}
        onChange={handleChange}
        theme="snow"
        modules={modules}
        formats={[
          "font",
          "size",
          "bold",
          "italic",
          "underline",
          "strike",
          "color",
          "background",
          "script",
          "header",
          "list",
          "bullet",
          "indent",
          "direction",
          "align",
          "link",
          "image",
          "video"
        ]}
        className="custom-quill"
        style={{ width: "100%" }}
      />
    </div>
  );
}

export default Content;
