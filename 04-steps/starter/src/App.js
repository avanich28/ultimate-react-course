import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <div>
      <Steps />
      {/* 🍁 */}
      <StepMessage step={1}>
        <p>Pass in content</p>
        <p>✌️</p>
      </StepMessage>
      <StepMessage step={2}>
        <p>Read children prop</p>
        <p>😎</p>
      </StepMessage>
    </div>
  );
}

// Parent component
function Steps() {
  // Topic: Let's Build a Steps Component
  // const step = 1;

  // Topic: Creating a State Variable With useState
  // 3 steps
  // 1. add a new state Variable
  // 2. Use it in the code and usually in JSX
  // 3. Update the piece of state
  // useState() or start with 'use' -> we call a hook.
  // hook can call only in react component
  // cannot call in if else, function in component
  // useState sets the default value of component variable
  const [step, setStep] = useState(1);
  // const [test, setTest] = useState({ name: "Jonas" });

  // Topic: Adding Another Piece of State
  const [isOpen, setIsOpen] = useState(true);

  // Topic: Handling Events the React Way
  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNext() {
    // Topic: Updating State Based on Current State
    // pass callback in setter function instead of state/value when we want to update the state 🔥 -> more safe
    if (step < 3) {
      // Update state only one time if we pass as current state 'value', not callback
      // callback updates twice
      setStep((s) => s + 1);
      // setStep((s) => s + 1);
    }

    // Topic: Don't Set State Manually!
    // step = step + 1; // react don't update
    // react use function setStep to update instead
    // IMPT setter function is a functional way of updating the state value without mutating the state like state = state + 1.
    // React is all about immutability

    // BAD PRACTICE 🔥
    // test.name = "Fred"; // mutate obj -> re-render in UI

    // Always treat state immutable in react or sth that cannot change directly
    // Or change by using the tool that react gives us.
    // setTest({ name: "Fred" }); // send complete new obj instead of mutate it
  }

  return (
    <div>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>

      {/* state is a memory of component! */}
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            {/* copy line: shift alt up/down */}
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          {/* 🍁 */}
          <StepMessage step={step}>
            {messages[step - 1]}
            <div className="buttons">
              <Button
                bgColor="#e7e7e7"
                textColor="#333"
                onClick={() => alert(`Learn how to ${messages[step - 1]}`)}
              >
                Learn how
              </Button>
            </div>
          </StepMessage>

          {/* In HTML, onclick="" */}
          {/* In event, if we don't put function, react will read and call the code immediately. Ex. onMouseEnter={alert('TEST')} */}
          <div className="buttons">
            <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrevious}>
              {/* 🍀 children prop */}
              <span>👈</span> Previous
            </Button>

            <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}>
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Topic: More Reusability With the 'children' Prop 🍁
function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>Step {step}</h3>
      {children}
    </div>
  );
}

// Topic: The "children" Prop: Making a Reusable Button 🍀
// The children prop is a prop that each React component automatically receives.
// The value of children prop is exactly what is between the opening and the closing tag of the component.
function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Topic: What is State in React?
// In slide

// Topic: React Developer Tools
// Loading React Developer Tools extension in Chrome

// Topic: More Thoughts about state + state guidelines
// In slide

// Topic: A Vanilla Javascript Implementation
// Compare with vanilla JS in vanilla.html file
// Prove that although both of calling are Steps component. The state in each of them is completely isolated.
