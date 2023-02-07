import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getUsersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    getUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    deleteUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.splice(
        state.users.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // updateProductStart: (state) => {
    //   state.isFetching = true;
    //   state.error = false;
    // },
    // updateProductSuccess: (state, action) => {
    //   state.isFetching = false;
    //   state.products[
    //     state.products.findIndex((item) => item._id === action.payload.id)
    //   ] = action.payload.product;
    // },
    // updateProductFailure: (state) => {
    //   state.isFetching = false;
    //   state.error = true;
    // },

    // addProductStart: (state) => {
    //   state.isFetching = true;
    //   state.error = false;
    // },
    // addProductSuccess: (state, action) => {
    //   state.isFetching = false;
    //   state.products.push(action.payload);
    // },
    // addProductFailure: (state) => {
    //   state.isFetching = false;
    //   state.error = true;
    // },
  },
});

export const {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} = usersSlice.actions;
export default usersSlice.reducer;
