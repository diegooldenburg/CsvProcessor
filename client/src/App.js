import React from "react";
import FileUpload from "./components/S3Upload/S3Upload";
import axios from "axios";

axios.defaults.baseURL = "https://localhost:5001";

function App() {
  return (
    <div className="App">
      <h1 class="mb-4 mt-2 text-center font-display text-2xl text-white">
        CSV Processor
      </h1>
      <FileUpload />
    </div>
  );
}

export default App;
