import { configureStore } from "@reduxjs/toolkit";
import customizationSlice from "./slices/customization/customization";
const store = configureStore({
  reducer: {
    customization: customizationSlice.reducer,
  },
});

export default store;
