import React from "react";

// Topic: Our First Class Component
// Before 2019, in React, we write component by using Javascript ES6 classes, not function.
// JS class extend from react component
class Counter extends React.Component {
  constructor(props) {
    super(props);

    // Initialize state
    // Call each time when obj instantiate from this class
    this.state = { count: 5 };
    // In class component, we have only have on huge state object, not multiple state variable like use state hook..

    // 😛 Fix losing binding 'this' in JSX
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  // Topic: Working with Event Handlers 😛
  handleDecrement() {
    // console.log(this);

    // Updated state based on current state
    this.setState((curState) => {
      return { count: curState.count - 1 };
    });
    // this.setState({ count: 10 });
  }

  handleIncrement() {
    this.setState((curState) => {
      return { count: curState.count + 1 };
    });
  }

  // render method === function body of a function component
  // render returns som JSX
  render() {
    const date = new Date("june 21, 2027");
    date.setDate(date.getDate() + this.state.count);

    return (
      <div>
        {/* 'this' points to the current component instance  */}
        {/* BUG All handlers that put in the JSX will lose their binding to the 'this'. -> fix by .bind(this) in constructor */}
        <button onClick={this.handleDecrement}>-</button>
        <span>
          {date.toDateString()} [{this.state.count}]
        </span>
        <button onClick={this.handleIncrement}>+</button>
      </div>
    );
  }
}

export default Counter;

// Topic: Class Components vs. Function Components
// In slide
