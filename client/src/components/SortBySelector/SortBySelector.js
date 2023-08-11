import React, { useContext } from "react";
import UploadContext from "../../UploadContext";

function SortBySelector() {
  const { sortBy, setSortBy } = useContext(UploadContext);
  return (
    <>
      <span class="font-display text-white">Select sorting options.</span>
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
    </>
  );
}
export default SortBySelector;
