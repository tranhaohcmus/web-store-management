import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import addressAPI from "../../services/addressService";
import toast from "react-hot-toast";

const initialState = {
  addresses: [],
  currentAddress: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchAddresses = createAsyncThunk(
  "addresses/fetchAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await addressAPI.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createAddress = createAsyncThunk(
  "addresses/createAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await addressAPI.create(addressData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "addresses/updateAddress",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await addressAPI.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "addresses/deleteAddress",
  async (id, { rejectWithValue }) => {
    try {
      await addressAPI.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const setDefaultAddress = createAsyncThunk(
  "addresses/setDefaultAddress",
  async (id, { rejectWithValue }) => {
    try {
      const response = await addressAPI.setDefault(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    clearCurrentAddress: (state) => {
      state.currentAddress = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Addresses
      .addCase(fetchAddresses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch addresses";
      })
      // Create Address
      .addCase(createAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses.push(action.payload);
        toast.success("Đã thêm địa chỉ mới!");
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to create address";
        toast.error(state.error);
      })
      // Update Address
      .addCase(updateAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.addresses.findIndex(
          (addr) => addr.id === action.payload.id
        );
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
        toast.success("Đã cập nhật địa chỉ!");
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to update address";
        toast.error(state.error);
      })
      // Delete Address
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(
          (addr) => addr.id !== action.payload
        );
        toast.success("Đã xóa địa chỉ!");
      })
      // Set Default Address
      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.map((addr) => ({
          ...addr,
          is_default: addr.id === action.payload.id,
        }));
        toast.success("Đã đặt làm địa chỉ mặc định!");
      });
  },
});

export const { clearCurrentAddress } = addressSlice.actions;
export default addressSlice.reducer;
