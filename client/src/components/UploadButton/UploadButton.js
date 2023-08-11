import React, { useContext } from "react";
import UploadContext from "../../UploadContext";

function UploadButton() {
  const { handleFileUpload } = useContext(UploadContext);
  return (
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
  );
}
export default UploadButton;