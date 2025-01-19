"use client"; // IMPT For using state

import Logo from "./Logo";
import { useState } from "react";

function TextExpander({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, 40).join(" ") + "...";

  return (
    <span>
      {displayText}{" "}
      <button
        className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
      {/* Topic: Client Components in Server Components */}
      {/* NOTE This server component changes to client component instance because <Logo/> called inside client component. */}
      {/* <Logo /> */}
    </span>
  );
}

export default TextExpander;
