import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "../Slice/imageSlice"; // Import the slice we will create

const store = configureStore({
  reducer: {
    images: imageReducer,
  },
});

export default store;
