import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [outputType, setOutputType] = useState("csv");
  const [sortBy, setSortBy] = useState([
    { column: "", type: "default", order: "default" },
    { column: "", type: "default", order: "default" },
    { column: "", type: "default", order: "default" },
  ]);
  const [dropNull, setDropNull] = useState(false);
  const now = new Date();

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
    <div class=" flex flex-col items-center justify-center gap-4 mx-auto">
      <div class="rounded-md border-2 border-black bg-neutral-500 p-4 shadow-md hover:bg-neutral-400 w-32">
        <label
          for="upload"
          class="flex flex-col items-center gap-2 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 fill-transparent stroke-orange-500"
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
          <span class="text-white font-display">Select file</span>
        </label>
        <input
          id="upload"
          type="file"
          class="hidden"
          onChange={handleFileChange}
        />
      </div>
      <span class="font-display text-white">Select output type.</span>
      <select
        class="rounded-md border-2 border-black bg-neutral-500 p-2 shadow-md hover:bg-neutral-400 w-32 text-white font-display"
        value={outputType}
        onChange={(e) => setOutputType(e.target.value)}
      >
        <option class="font-display" value="csv">
          CSV
        </option>
        <option class="font-display" value="json">
          JSON
        </option>
        <option class="font-display" value="xml">
          XML
        </option>
        <option class="font-display" value="yaml">
          YAML
        </option>
        <option class="font-display" value="sqlinsert">
          SQL Insert
        </option>
      </select>
      <span class="font-display text-white">Select sort options.</span>
      <div class="flex gap-4">
        {sortBy.map((sort, index) => (
          <div
            key={index}
            class="rounded-md border-2 border-black bg-neutral-500 p-4 shadow-md w-64 flex flex-col gap-2"
          >
            <input
              class="font-display rounded-md border-2 border-black bg-neutral-200 p-1 shadow-md"
              type="text"
              placeholder={index === 0 ? "Sort by" : "Then sort by"}
              value={sort.column}
              onChange={(e) => {
                const newSortBy = [...sortBy];
                newSortBy[index].column = e.target.value;
                setSortBy(newSortBy);
              }}
            />
            <select
              class="font-display rounded-md border-2 border-black bg-neutral-200 p-1 shadow-md"
              value={sort.type}
              onChange={(e) => {
                const newSortBy = [...sortBy];
                newSortBy[index].type = e.target.value;
                setSortBy(newSortBy);
              }}
            >
              <option value="default">Default</option>
              <option value="string">String</option>
              <option value="numeric">Numeric</option>
            </select>
            <select
              class="font-display rounded-md border-2 border-black bg-neutral-200 p-1 shadow-md"
              value={sort.order}
              onChange={(e) => {
                const newSortBy = [...sortBy];
                newSortBy[index].order = e.target.value;
                setSortBy(newSortBy);
              }}
            >
              <option value="default">Default</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        ))}
      </div>
      <label class="font-display text-white">
        <input
          type="checkbox"
          class="bg-black border-black focus:ring-3 focus:ring-orange-500 h-4 w-4 rounded mr-2"
          checked={dropNull}
          onChange={(e) => setDropNull(e.target.checked)}
        />
        Drop rows with containing null values?
      </label>
      <button
        onClick={handleFileUpload}
        className="flex flex-col items-center gap-2 bg-neutral-500 border-2 border-black p-4 shadow-md rounded-md cursor-pointer hover:bg-neutral-400 w-32"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 fill-transparent stroke-orange-500"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M12 17L12 10M12 10L15 13M12 10L9 13"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path d="M16 7H12H8" stroke-width="1.5" stroke-linecap="round" />
          <path
            d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
            stroke-width="1.5"
          />
        </svg>
        <span className="text-white font-display ">Upload</span>
      </button>
    </div>
  );
};

export default FileUpload;
