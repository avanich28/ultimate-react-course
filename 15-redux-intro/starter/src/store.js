// import { applyMiddleware, combineReducers, createStore } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// Topic: Creating the Store with RTK
// 1) npm i @reduxjs/toolkit
// 2) import configureStore
// IMPT Using configureStore is better than createStore bcs it will automatically combine reducers, add Thunk middleware, and set up the developer tools. Then, store is created and returned.

// 1. Classic Redux
// const rootReducer = combineReducers({
//   account: accountReducer,
//   customer: customerReducer,
// });

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

// 2. RTK
const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;

// Topic: Redux Middleware and Thunks
// In slide

// Topic: What is Redux Toolkit (RTK)?
// In slide

// Topic: Redux vs. Context API
// In slide
