import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

/*
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];
*/

// Topic: Building the Layout
export default function App() {
  // 🌈
  const [items, setItems] = useState([]);
  // const [numItems, setNumItems] = useState(0); // Don't use useState. You need to use derived state instead

  // - Child to parent communication -
  // 🌈
  function handleAddItems(item) {
    // Always send new data
    setItems((items) => [...items, item]);
    // BUG Cannot do this bcs we will mutating the state. React only allow immutability.
    // setItems((item) => item.push(item))
  }

  // Topic: Deleting an Item: More Child-to-Parent Communication!
  function handleDeleteItem(id) {
    // console.log(id);
    setItems((items) => items.filter((item) => item.id !== id));
  }

  // Topic: Updating an Item: Complex Immutable Data Operation
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  // Topic: Clearing the List
  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItems={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

// Topic: State vs. Props
// In slide

///////////////////////////////

// Topic: What is "Thinking in React"?
// In slide

// Topic: Fundamentals of State Management
// In slide

// Topic: Reviewing "Lifting Up State"
// In slide

// Topic: Derived State
// In slide
