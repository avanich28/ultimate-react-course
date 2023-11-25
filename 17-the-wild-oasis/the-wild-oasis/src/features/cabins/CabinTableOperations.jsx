import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

// Topic: Client-Side Filtering: Filtering Cabins (1)
// (2) in Cabins.jsx
// (3) in Filter.jsx
// (4) in CabinTable.jsx
function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      {/* Topic: Client-Side Sorting: Sorting Cabins (2) 
      (1) in SortBy.jsx, (3) in Select.jsx, (4) in CabinTable.jsx */}
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by  price (low first)" },
          { value: "regularPrice-desc", label: "Sort by  price (high first)" },
          { value: "maxCapacity-asc", label: "Sort by  capacity (low first)" },
          {
            value: "maxCapacity-desc",
            label: "Sort by capacity (high first)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
