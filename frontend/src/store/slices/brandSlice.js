import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import brandAPI from "../../services/brandService";

const initialState = {
  brands: [],
  currentBrand: null,
  isLoading: false,
  error: null,
};

export const fetchBrands = createAsyncThunk(
  "brands/fetchBrands",
  async (params, { rejectWithValue }) => {
    try {
      const response = await brandAPI.getAll(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch brands";
      });
  },
});

export default brandSlice.reducer;
