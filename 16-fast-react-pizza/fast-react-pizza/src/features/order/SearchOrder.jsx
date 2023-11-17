import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Topic: Fetching Orders (1)
// (2) in Header.jsx
// (3) in Order.jsx
// (4) in App.jsx
function SearchOrder() {
  const [query, setQuery] = useState();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
