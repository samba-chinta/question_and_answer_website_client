import { createSlice } from "@reduxjs/toolkit";

const userAuthSlice = createSlice({
  name: "User Authentication",
  initialState: {
    email: "",
    isLoggedIn: false
  },
  reducers: {
    login(state, action) {
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.email = "";
      state.isLoggedIn = false;
    },
  },
});

export const authActions = userAuthSlice.actions;
export default userAuthSlice;