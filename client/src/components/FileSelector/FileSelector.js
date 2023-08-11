import React, { useContext } from "react";
import UploadContext from "../../UploadContext";

function FileSelector() {
  const { setSelectedFile } = useContext(UploadContext);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
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
  );
}
export default FileSelector;
