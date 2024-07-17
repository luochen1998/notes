import { configureStore } from "@reduxjs/toolkit"
import todoListReducer from "./slice"
export const store = configureStore({
  reducer: {
    list: todoListReducer,
  },
})
