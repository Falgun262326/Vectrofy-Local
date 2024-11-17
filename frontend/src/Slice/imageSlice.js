import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch images for a user
export const fetchImages = createAsyncThunk(
  "images/fetchImages",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v2/get-image?id=${userId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data.images; // Return the fetched images
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const imageSlice = createSlice({
  name: "images",
  initialState: {
    allImages: [], // Initial state is an empty array
    clickedImage: null,
    loading: false,
    error: null,
  },
  reducers: {
    setImages: (state, action) => {
      state.allImages = action.payload; // Set all images
    },
    addImage: (state, action) => {
      state.allImages.push(action.payload); // Add new image
    },
    deleteImage: (state, action) => {
      state.allImages = state.allImages.filter(
        (image) => image._id !== action.payload
      );
    },
    setClickedImage: (state, action) => {
      state.clickedImage = action.payload;
    },
    setClickedImageId: (state, action) => {
      state.clickedImageId = action.payload;
    },
    setClickedImageRange: (state, action) => {
      state.clickedImageRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.allImages = action.payload;
        state.loading = false;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setImages,
  addImage,
  deleteImage,
  setClickedImage,
  setClickedImageId,
  setClickedImageRange,
} = imageSlice.actions;
export default imageSlice.reducer;
