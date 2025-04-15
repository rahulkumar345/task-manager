import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./boardsSlice";
import { saveToLocalStorage } from "./localStorage";

const store = configureStore({
  reducer: {
    boards: boardsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveToLocalStorage),
});

export default store;
