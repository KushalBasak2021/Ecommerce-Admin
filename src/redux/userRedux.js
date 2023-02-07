import { createSlice } from "@reduxjs/toolkit";

const adminUserSlice = createSlice({
  name: "adminUser",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },

    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },

    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    logout: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  adminUserSlice.actions;
export default adminUserSlice.reducer;
