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
    <div class="flex">
      <div class="rounded-md border border-gray-100 bg-white p-4 shadow-md">
        <label
          for="upload"
          class="flex flex-col items-center gap-2 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 fill-white stroke-indigo-500"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span class="text-gray-600 font-display">Select file</span>
        </label>
        <input
          id="upload"
          type="file"
          class="hidden"
          onChange={handleFileChange}
        />
      </div>
      <button
        onClick={handleFileUpload}
        className="flex flex-col items-center gap-2 bg-white border border-gray-100 p-4 shadow-md rounded-md cursor-pointer hover:bg-gray-50"
      >
        <span className="text-gray-600 font-display">Upload</span>
      </button>
    </div>
  );
};

export default FileUpload;
