import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// Topic: Redux Thunks With createAsyncThunk (1) 🍖
// (2) in CreateOrder.jsx
// NOTE We can't call async function directly in Redux 's reducer
// By nature, Redux is completely synchronous.
// Thunks is a middleware sitting between the dispatching and the reducer. (Doing sth before updating the store)
// In redux-intro project, we manually create the Thunk by using action creator, but we can use a createAsyncThunk from RTK.
// IMPT Should not be call 'get'Address bcs those names are reserved for selectors!
export const fetchAddress = createAsyncThunk(
  // Action name
  'user/fetchAddress',
  // Async func returns payload for reducer
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    // NOTE Payload of the FULFILLED state
    return { position, address };
  },
);

// Topic: Modeling the 'User' State With Redux Toolkit (1)
// (2) in Username.jsx
const initialState = {
  username: '',
  // 🍖
  status: 'idle',
  position: {},
  address: '',
  error: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  // Access reducer
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  // NOTE createAsyncThunk will produce 3 additional action types. 🍖
  // 1) Pending promise state
  // 2) fulfilled state
  // 3) rejected state
  extraReducers: (builder) =>
    builder
      .addCase(
        fetchAddress.pending,
        // Reducer
        (state, action) => {
          state.status = 'loading';
        },
      )
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = 'idle';
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error =
          'There was a problem getting your address. Make sure to fill this field!';
      }),
});
// Access action creators
export const { updateName } = userSlice.actions;

export default userSlice.reducer;
