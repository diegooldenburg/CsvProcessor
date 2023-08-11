import React, { useContext } from "react";
import UploadContext from "../../UploadContext";

function NullDropper() {
  const { dropNull, setDropNull } = useContext(UploadContext);

  const handleDropNullChange = (event) => {
    setDropNull(event.target.checked);
  };
  return (
    <label class="font-display text-white">
      <input
        type="checkbox"
        class="bg-black border-black focus:ring-3 focus:ring-orange-500 h-4 w-4 rounded mr-2"
        checked={dropNull}
        onChange={handleDropNullChange}
      />
      Drop rows with containing null values?
    </label>
  );
}
export default NullDropper;
