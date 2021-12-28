import { configureStore } from "@reduxjs/toolkit";

import userAuthSlice from "./userAuthSlice";

const store = configureStore({
  reducer: userAuthSlice.reducer,
})

export default store;