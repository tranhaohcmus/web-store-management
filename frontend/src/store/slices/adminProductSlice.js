import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminAPI from "../../services/adminService";
import toast from "react-hot-toast";

const initialState = {
  products: [],
  currentProduct: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  },
};

// Async thunks
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchAll",
  async (params, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getAllProducts(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAdminProductById = createAsyncThunk(
  "adminProducts/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getProductById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createAdminProduct = createAsyncThunk(
  "adminProducts/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await adminAPI.createProduct(formData);
      toast.success("Product created successfully!");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create product");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateAdminProduct = createAsyncThunk(
  "adminProducts/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await adminAPI.updateProduct(id, formData);
      toast.success("Product updated successfully!");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update product");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteAdminProduct = createAsyncThunk(
  "adminProducts/delete",
  async (id, { rejectWithValue }) => {
    try {
      await adminAPI.deleteProduct(id);
      toast.success("Product deleted successfully!");
      return id;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addProductVariant = createAsyncThunk(
  "adminProducts/addVariant",
  async ({ productId, formData }, { rejectWithValue }) => {
    try {
      const response = await adminAPI.addVariant(productId, formData);
      toast.success("Variant added successfully!");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add variant");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProductVariant = createAsyncThunk(
  "adminProducts/updateVariant",
  async ({ productId, variantId, formData }, { rejectWithValue }) => {
    try {
      const response = await adminAPI.updateVariant(
        productId,
        variantId,
        formData
      );
      toast.success("Variant updated successfully!");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update variant");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteProductVariant = createAsyncThunk(
  "adminProducts/deleteVariant",
  async ({ productId, variantId }, { rejectWithValue }) => {
    try {
      await adminAPI.deleteVariant(productId, variantId);
      toast.success("Variant deleted successfully!");
      return variantId;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete variant");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchAdminProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch products";
      })

      // Fetch product by ID
      .addCase(fetchAdminProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAdminProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchAdminProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch product";
      })

      // Create product
      .addCase(createAdminProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAdminProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.unshift(action.payload);
      })
      .addCase(createAdminProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to create product";
      })

      // Update product
      .addCase(updateAdminProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAdminProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        if (state.currentProduct?.id === action.payload.id) {
          state.currentProduct = action.payload;
        }
      })
      .addCase(updateAdminProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to update product";
      })

      // Delete product
      .addCase(deleteAdminProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAdminProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteAdminProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to delete product";
      });
  },
});

export const { clearCurrentProduct, clearError } = adminProductSlice.actions;
export default adminProductSlice.reducer;
