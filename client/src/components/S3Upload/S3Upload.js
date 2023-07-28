import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      if (!selectedFile) {
        alert("Please select a file to upload.");
        return;
      }

      const formData = new FormData();
      formData.append("File", selectedFile);

      const response = await axios.post("/upload-csv", formData, {
        maxRedirects: 0,
        withCredentials: false,
      });
      console.log(response.data.Message);
      alert("File successfully uploaded.");
    } catch (error) {
      console.error(error);
      alert("An error occurred while uploading the file.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
