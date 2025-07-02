import React, { useEffect, useState } from "react";
import axios from "axios";

const RichTextContent = () => {
  const [contents, setContents] = useState([]);

  const fetchContents = async () => {
    try {
      const res = await axios.get("http://localhost:4002/richtext");
      setContents(res.data);
    } catch (error) {
      console.error("Failed to fetch rich text contents:", error);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  return (
    <div className="w-full container mx-auto px-4 my-8 max-w-full" style={{ paddingLeft: "-2px", paddingRight: "-2px" }}>
      {contents.length > 0 ? (
        contents.map((item) => (
          <div
            key={item._id}
            className="w-full mb-6 rounded bg-white dark:bg-gray-800"
            style={{ maxWidth: "100%" }}
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        ))
      ) : (
        <p>No rich text content available.</p>
      )}
    </div>
  );
};

export default RichTextContent;
