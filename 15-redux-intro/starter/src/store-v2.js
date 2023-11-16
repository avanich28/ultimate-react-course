import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// Topic: Creating a Reducer: Bank Account
// Move to accountSlice.js

// Topic: Adding More State: Customer
// Move to customerSlice.js

// NOTE Create root reducer for passing many reducers
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// Topic: Creating a Redux Store
// npm i redux

// Topic: Making an API Call With Redux Thunks (1)
// (2) in accountSlice.js
// IMPT 3 steps
// 1) Install middleware package (npm i redux-thunk)
// 2) Apply that middleware to our store
// 3) Use middleware in our action creator functions

// Topic: The Redux Devtools
// 1) Install Redux Devtools from Chrome extensions
// 2) Install the corresponding NPM package (npm i redux-devtools-extension)
// 3) Wrap applyMiddleware in the composeWithDevTools
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// Topic: Working With Action Creators
// Move to accountSlice.js and customerSlice.js

// Topic: Professional Redux File Structure: State Slices
// 1) Organize App into features folder (accounts, customers)
// 2) Create file with including 'Slice' name for redux (accountSlice.js, customerSlice.js)
// 3) Move reducer and action creators from store.js to the slice file

export default store;

// Topic: Redux Middleware and Thunks
// In slide

// Topic: What is Redux Toolkit (RTK)?
// In slide
