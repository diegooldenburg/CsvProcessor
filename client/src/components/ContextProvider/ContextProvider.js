import React, { useState } from "react";
import UploadContext from "../../UploadContext";
import axios from "axios";

function UploadProvider({ children }) {
  const now = new Date();
  const [selectedFile, setSelectedFile] = useState(null);
  const [outputType, setOutputType] = useState("csv");
  const [sortBy, setSortBy] = useState([
    { column: "", type: "default", order: "default" },
    { column: "", type: "default", order: "default" },
    { column: "", type: "default", order: "default" },
  ]);
  const [dropNull, setDropNull] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      if (!selectedFile) {
        alert("Please select a file to upload.");
        return;
      }

      const options = {
        FileName: `${now.getTime()}-${selectedFile.name}`,
        OutputType: outputType,
        SortBy: sortBy,
        DropNull: dropNull,
      };

      await axios.post("upload-options", options);

      const formData = new FormData();
      formData.append("File", selectedFile);
      formData.append("FileName", `${now.getTime()}-${selectedFile.name}`);

      const response = await axios.post("upload-csv", formData, {
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
    <UploadContext.Provider
      value={{
        selectedFile,
        setSelectedFile,
        outputType,
        setOutputType,
        sortBy,
        setSortBy,
        dropNull,
        setDropNull,
        handleFileChange,
        handleFileUpload,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
}

export default UploadProvider;
