import { useState } from "react";

const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}
// 🐔 Can look at a component instance simply by using the component and logging it to the console.
// Return 'React element" {} -> use for creating DOM element
console.log(<DifferentContent test={23} />); // Call internally
console.log(DifferentContent()); // Don't do this bcs no longer has the type of different content. (type: 'div')
// Instead, it is a div which is basically just the content of that component. So, this div is now the type of this React element. -> React isn't see component instance, but see the raw React element

// NOTE $$typeof: Symbol(react.element)
// This is simply a security feature that React has implemented in order to protect us against cross-site scripting attacks.
// Symbol is one of Javascript primitives, which can't be transmitted via JSON, or means that a symbol like this cannot come from an API call.
// If some hacker would try to send us a fake React element from that API, then React would not see this $$typeof symbol and then not include this fake React element into the DOM.

function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />

        {/* Reset state -> diff rule: same position, different element */}
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>

      {/* Topic: Diffing Rules in Practice
      BUG Not reset Show detail and likes because the state preserve across renders */}
      {/* Just prop change -> diff rule: same position, same element */}
      {/* Want to reset state -> use key prop */}

      {activeTab <= 2 ? (
        <TabContent
          item={content.at(activeTab)}
          // Topic: Resetting State With the Key Prop
          key={content.at(activeTab).summary}
        />
      ) : (
        <DifferentContent />
      )}

      {/* Topic: Instances and Elements in Practice 🐔 */}
      {/* When we call the component directly, React will no longer sees it as a component instance. -> Show in hook instead of Tabbed component -> Always render inside the JSX (blueprint) 💥 */}
      {/* {TabContent({ item: content.at(0) })} */}
    </div>
  );
}

function Tab({ num, activeTab, onClick }) {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  );
}

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  // current state === updated state -> NO RENDER
  console.log("RENDER");

  function handleInc() {
    // setLikes(likes + 1); // 🐛 Not secure
    setLikes((likes) => likes + 1); // Secure
  }

  // Topic: State Update Batching in Practice
  function handleTripleInc() {
    // Stale State (Increase only 1 time, not 3)
    // setLikes(likes + 1);
    // console.log(likes); // 0
    // setLikes(likes + 1);
    // setLikes(likes + 1);

    // Use callback func when we based on previous state
    setLikes((likes) => likes + 1);
    setLikes((likes) => likes + 1);
    setLikes((likes) => likes + 1);

    // 🐛
    // handleInc();
    // handleInc();
    // handleInc();
  }

  function handleUndo() {
    // These 2 states updates are batch.
    // (Batch) Call one component when re-render
    setShowDetails(true);
    setLikes(0);
    // State is updated after the re-rendering or during the re-rendering, but not immediately after we call this handler function.
    // Solve this by using callback func
    console.log(likes); // Ex get 5 not 0
  }

  function handleUndoLater() {
    // No batching in handleUndo before React 18
    setTimeout(handleUndo, 5000);
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button onClick={handleTripleInc}>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleUndoLater}>Undo in 2s</button>
      </div>
    </div>
  );
}

function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}

// Topic: Components, Instances, and Elements
// In slide

// Topic: How Rendering Works: Overview
// In slide

// Topic: How Rendering Works: The Render Phase
// In slide

// Topic: How Rendering Works: The Commit Phase
// In slide

// Topic: How Diffing Works
// In slide

// Topic: Using the Key Prop to Fix Our Eat-'N-Split App
// In Eat-'N-Split App project

// Topic: Rules for Render Logic: Pure Components
// In slide

// Topic: State Update Batching
// In slide

// Topic: How Events Work in React
// In slide

// Topic: Libraries vs. Frameworks & The React Ecosystem
// In slide
