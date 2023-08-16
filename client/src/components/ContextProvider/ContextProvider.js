import React, { useState, useEffect } from "react";
import UploadContext from "../../UploadContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [connectionId, setConnectionId] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onmessage = (event) => {
      let message;
      try {
        message = JSON.parse(event.data);
      } catch (error) {
        console.error("Failed to parse message:", event.data);
        return;
      }

      if (message.type === "connectionId") {
        setConnectionId(message.connectionId);
      } else if (message.type === "downloadUrl") {
        const downloadUrl = message.downloadUrl;

        const link = document.createElement("a");
        link.href = downloadUrl;

        const fileNameWithoutExtension = selectedFile.name
          .split(".")
          .slice(0, -1)
          .join(".");
        link.download = `${fileNameWithoutExtension}.${outputType}`;

        link.click();
      } else {
        console.error("Unknown message type:", message.type);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      if (!selectedFile) {
        toast.error("Please select a file to upload.", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }

      const options = {
        FileName: `${now.getTime()}-${connectionId}-${selectedFile.name}`,
        OutputType: outputType,
        SortBy: sortBy,
        DropNull: dropNull,
      };

      await axios.post("upload-options", options);

      const formData = new FormData();
      formData.append("File", selectedFile);
      formData.append(
        "FileName",
        `${now.getTime()}-${connectionId}-${selectedFile.name}`
      );

      const response = await axios.post("upload-csv", formData, {
        maxRedirects: 0,
        withCredentials: false,
      });
      console.log(response.data.Message);
      toast.success("File successfully uploaded.", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while uploading the file.", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
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
