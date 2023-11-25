import { useSearchParams } from "react-router-dom";
import Select from "./Select";

// Topic: Client-Side Sorting: Sorting Cabins (1)
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  // Can abstract to custom hook
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      value={sortBy} // NOTE When reload, it's still the same value
      onChange={handleChange}
    />
  );
}

export default SortBy;
