import { useState } from "react";

function SlowComponent() {
  // If this is too slow on your matching, reduce the `length`
  const words = Array.from({ length: 100_000 }, () => "WORD");
  return (
    <ul>
      {words.map((word, i) => (
        <li key={i}>
          {i}: {word}
        </li>
      ))}
    </ul>
  );
}

// Topic: A Surprising Optimization Trick With children (2)
function Counter({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      {/* NOTE Use children instead of <SlowComponent /> */}
      {/* NOTE React no longer re-rendering the component bcs the SlowComponent is already created before the Counter component re-rendered */}
      {children}
    </div>
  );
}

export default function Test() {
  // const [count, setCount] = useState(0);
  // return (
  //   <div>
  //     <h1>Slow counter?!?</h1>
  //     <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
  //     {/* NOTE NOT OPTIMIZE -> Re-render bcs it is inside the Test component */}
  //     <SlowComponent />
  //   </div>
  // );

  return (
    <div>
      <h1>Slow Component</h1>
      <Counter>
        {/* NOTE SlowComponent has already created before and pass as a prop into the Counter. So it can't be affected by that state update (in Counter) */}
        <SlowComponent />
      </Counter>
    </div>
  );
}
