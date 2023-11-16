import { createSlice } from "@reduxjs/toolkit";

// Topic: Creating the Account Slice (1) 🍀
// (2) in AccountOperations.js
// 1) It's automatically create action creators from our reducers.
// 2) It makes writing these reducers a lot easier because we no longer need that switch statement, and also the default case is automatically handled.
// 3) We can actually mutate now our 'state' inside reducers. We will use a library called Immer which will actually convert our logic back to immutable logic.

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account", // account/deposit
  initialState,
  reducers: {
    deposit(state, action) {
      console.log(action); // {type: 'account/deposit', payload: 200}
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    // Redux toolkit is an opinionated approach, so it can't receive more than 1 argument.
    // Use 'prepare' for receiving more than 1 argument
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = action.balance + action.payload.amount;
      },
    },
    payLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

console.log(accountSlice);

// NOTE Remove 'deposit'
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

// Topic: Back to Thunks
// Redux knows that this is an action creator for reducer.
// We didn't use the automatic action creator that has been created by createSlice.
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await res.json();
    const converted = data.rates.USD;

    dispatch({ type: "account/deposit", payload: converted });
  };
}

export default accountSlice.reducer;

/*
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    // Old Redux will write uppercase ex. SET_BALANCE
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false, // 😛
      };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      // LATER
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case "account/convertingCurrency":
      return { ...state, isLoading: true }; // 😛

    default:
      // In Redux, not throw error.
      return state;
  }
}

// Topic: Making an API Call With Redux Thunks (2) 😛
// (3) in AccountOperation.js
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  // IMPT If we return a function here, Redux knows that this is the asynchronous action that we want to execute before dispatching anything.
  // NOTE This function is sitting between the initial dispatching and the reducer in the store receiving the action
  // A function can get access to dispatch and getState
  
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    // API call
    // https://www.frankfurter.app/docs/
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await res.json();
    console.log(data);
    const converted = data.rates.USD;

    // return action
    dispatch({ type: "account/deposit", payload: converted });
  };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
*/
