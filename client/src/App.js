import React from "react";
import FileUpload from "./components/S3Upload/S3Upload";
import axios from "axios";

axios.defaults.baseURL = "https://localhost:5001";

function App() {
  return (
    <div className="App">
      <h1>CSV File Upload</h1>
      <FileUpload />
    </div>
  );
}

export default App;
