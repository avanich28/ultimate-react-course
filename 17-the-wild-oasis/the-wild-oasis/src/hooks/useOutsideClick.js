import { useEffect, useRef } from "react";

// Topic: Detecting a Click Outside the Modal (2)
// (1) in Modal.jsx
export function useOutsideClick(handler, listenCapturing = true) {
  // Topic: Detecting a Click Outside the Modal (2)
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        // IMPT 'contains' method
        // console.log(ref.current, e.target);
        if (ref.current && !ref.current.contains(e.target)) {
          // console.log("Click outside");
          handler();
        }
      }

      // BUG Prevent bubble when click 'Add new cabin' (Issue: open modal -> close() again)
      document.addEventListener("click", handleClick, listenCapturing); // IMPT Event handle only capturing phrase

      // Unmount -> Cleanup
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
