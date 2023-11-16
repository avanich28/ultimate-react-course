import { connect } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

// Topic: The Legacy Way of Connecting Components to Redux
// Old code base -> use connect API to get the state
function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}

// Before we had hook
function mapStateToProps(state) {
  // Define name of the props that the component received
  return {
    balance: state.account.balance,
  };
}

// connect will return the new function which is a new component
export default connect(mapStateToProps)(BalanceDisplay);
