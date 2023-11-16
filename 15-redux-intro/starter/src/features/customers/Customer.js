import { useSelector } from "react-redux";

function Customer() {
  // Topic: Back to React! Connecting our Redux App With React (2)
  // NOTE useSelector hook for reading the data
  // store change -> this component that is subscribed to that store will re-render
  // Redux includes some optimization?
  const customer = useSelector((store) => store.customer.fullName);

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
