import React, { useContext } from "react";
import UploadContext from "../../UploadContext";

function OutputTypeSelector() {
  const { outputType, setOutputType } = useContext(UploadContext);

  const handleOutputTypeChange = (event) => {
    setOutputType(event.target.value);
  };
  return (
    <>
      <span class="font-display text-white">Select output type.</span>
      <select
        class="font-display text-white rounded-md border-2 border-black bg-neutral-500 p-2 w-32 shadow-md"
        value={outputType}
        onChange={handleOutputTypeChange}
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
    </>
  );
}
export default OutputTypeSelector;
