import { useState } from "react";

// 🌈
export default function Form({ onAddItems }) {
  // Topic: Controlled Elements
  // React controls and owns the state of these input fields and no longer the DOM.
  // 3 steps
  // 1. Create a piece of state
  // 2. Use the state as the value of input field
  // 3. Connect/update the state with the value we are going to type in input/select/... .
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Topic: Thinking About State and Lifting State Up
  // const [items, setItems] = useState([]);
  // Not re-render yet bcs PackingList component will render this items state!
  // How to pass state to sibling component? 'Lift up state' -> Move to the closest component -> App component 🌈

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(e);

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    // console.log(newItem);

    // 🌈
    onAddItems(newItem);

    // Back to initial state
    setDescription("");
    setQuantity(1);
  }

  return (
    // Topic: Building a Form and Handling Submissions
    // add onClick on button can submit the form too, but cannot submit when press enter
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        // Need both value and onChange element
        value={description}
        onChange={(e) => {
          // console.log(e.target.value);
          // Input sync with state
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}
