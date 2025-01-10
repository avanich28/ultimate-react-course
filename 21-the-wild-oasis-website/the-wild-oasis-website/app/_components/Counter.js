// Topic: Adding Interactivity With Client Components
"use client"; // IMPT Define as client component!

import { useState } from "react";

function Counter({ users }) {
  const [count, setCount] = useState(0);

  console.log(users);

  // NOTE Occurs hydration
  return (
    <div>
      {/* initial render */}
      <p>There are {users.length} users</p>

      {/* react bundle is just being download */}
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </div>
  );
}

export default Counter;
