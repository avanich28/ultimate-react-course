import { useState, useEffect } from "react";

// Topic: Creating useLocalStorageState 🎒

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value)); // Can use 'value' bcs this effect run when the component was first mounted.
    },
    [value, key]
  );

  return [value, setValue];
}
