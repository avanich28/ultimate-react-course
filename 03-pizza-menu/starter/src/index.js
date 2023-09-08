// Topic: Rendering the Root Component and Strict Mode (write react from scratch)

// Link pure react in html
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

// React always be a capital letter
function App() {
  // Each component can only return exactly 1 element
  // return <h1>Hello React!</h1><Pizza/>; // error
  return (
    // Call component inside app
    // Nesting component
    // Use className in JSX
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

// Topic: Creating More Components
function Header() {
  // Topic: Styling React Applications

  // Don't rarely do this in real world
  // className and css file -> global style

  // const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  const style = {};

  // Need to use JS syntax in style
  return (
    <header className="header">
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}

// Topic: Passing and Receiving Props
// Props is like a communication channel between a parent and a child component
// Props = property

// 2 steps
// 1. Pass the props into the component
// 2. Receive the props in the component that we pass into

// props can pass race, objects, react component, ...
function Menu() {
  const pizzas = pizzaData;
  // const pizzas = []; // true -> still render ul
  const numPizzas = pizzas.length; // false -> render 0 -> Don't want to render 0 -> numPizzas < 0

  // Topic: Rendering Lists
  // Rendering a list is when we have an array and we want to create one component for each element of the array
  // add key prop for optimization ?
  return (
    <main className="menu">
      <h2>Our menu</h2>

      {/* React will not render boolean! */}
      {/* Topic: Conditional Rendering With Ternaries 
      // Cannot write if else in JSX bcs it doesn't produce value 🔥 */}
      {numPizzas > 0 ? (
        // JSX expression must have one root element -> solved by react fragment
        // Topic: React Fragment
        // React Fragment lets us group some elements without leaving any trace in HTML tree, so in the DOM.
        // <></> or <React.Fragment></React.Fragment>
        // May be add a key in react fragment
        <React.Fragment>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {/* Cannot use forEach bcs react needs array 🔥 to render the component in the UI */}
            {pizzas.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </React.Fragment>
      ) : (
        <p>We're still working on our menu. Please come back later : )</p>
      )}

      {/* <Pizza
        name="Pizza Spinaci"
        ingredients="Tomato, mozarella, spinach, and ricotta cheese"
        photoName="pizzas/spinaci.jpg"
        price={10}
      />

      <Pizza
        name="Pizza Funghi"
        ingredients="Tomato, mushroom"
        photoName="pizzas/funghi.jpg"
        price={12}
      /> */}
    </main>
  );
}

// Topic: Creating and Reusing a Component

// In react, we write reusing component as function
// function needs to be uppercase letter and  return some markup in the form of JSX
// Topic: Destructuring Props
function Pizza({ pizzaObj }) {
  console.log(pizzaObj); // {pizzaObj} 👀

  // Topic: Conditional Rendering with Multiple Returns
  // if (pizzaObj.soldOut) return null;

  return (
    // str -> JS mode
    // Topic: Setting Classes and Text Conditionally
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>

        {/* For change HTML element type */}
        {/* {pizzaObj.soldOut ? <span>SOLD</span> : <span>{pizzaObj.price}</span>} */}

        <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
      </div>
    </li>
  );
}

function Footer(props) {
  console.log(props); // NOTE {} props always exist 👀
  // Topic: Javascript Logic in Components
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);

  // alert twice bcs strict mode
  // if (hour >= openHour && hour <= closeHour) alert("We're currently open!");
  // else alert("Sorry we're closed");

  // if (!isOpen) return <p>CLOSED</p>; // no footer

  // Combine JS
  return (
    <footer className="footer">
      {/* Topic: Conditional Rendering With && */}
      {/* {isOpen && (
        <div className="order">
          <p>We're open until {closeHour}:00. Come visit us or order online.</p>
          <button className="btn">Order</button>
        </div>
      )} */}
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
    </footer>
  );
  // Not using JSX
  // return React.createElement("footer", null, "We're currently open!");
}

// Topic: Extracting JSX into a New Component
function Order({ closeHour, openHour }) {
  return (
    <div className="order">
      <p>
        We're open from {openHour}:00 to {closeHour}:00. Come visit us or order
        online.
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

// IMPT Never nest the function declaration, but can nesting component by calling!

// React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// strict mode is basically a component that is the part of React and that we can take from React
// The only thing that strict mode does is that during development it will render components twice 🔥 in order to find certain bugs.
// React also check if we're using outdated parts of the React API.

// React before 18
// ReactDOM.render(<App />); (document.getElementById("root"))

// Topic: Components as Building Blocks
// In slide

// Topic: What is JSX
// In slide

// Topic: Separation of Concerns
// In slide

// Topic: Props, Immutability, and One-Way Data Flow
// In slide

// Topic: The Rules of JSX
// In slide

// Topic: Conditional Rendering with Multiple Returns
