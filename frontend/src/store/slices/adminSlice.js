import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminAPI from "../../services/adminService";
import toast from "react-hot-toast";

const initialState = {
  // Dashboard
  dashboardStats: null,

  // Orders
  orders: [],
  currentOrder: null,

  // Users
  users: [],

  // Stock
  stockReservations: [],

  // UI States
  isLoading: false,
  error: null,

  // Pagination
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  },
};

// Async thunks
export const fetchDashboardStats = createAsyncThunk(
  "admin/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getDashboardStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  "admin/fetchAllOrders",
  async (params, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getAllOrders(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAdminOrderById = createAsyncThunk(
  "admin/fetchOrderById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getOrderById(id);
      return response.data;
    } catch (error) {
      toast.error("Không tìm thấy đơn hàng");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await adminAPI.updateOrderStatus(id, status);
      toast.success("Cập nhật trạng thái đơn hàng thành công!");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Cập nhật trạng thái thất bại";
      toast.error(message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (params, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getAllUsers(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateUserRole = createAsyncThunk(
  "admin/updateUserRole",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const response = await adminAPI.updateUserRole(id, role);
      toast.success("Cập nhật vai trò người dùng thành công!");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Cập nhật vai trò thất bại";
      toast.error(message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchStockReservations = createAsyncThunk(
  "admin/fetchStockReservations",
  async (params, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getStockReservations(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Dashboard Stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboardStats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message || "Failed to fetch dashboard stats";
      })

      // Fetch All Orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch orders";
      })

      // Fetch Order By ID (Admin)
      .addCase(fetchAdminOrderById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.currentOrder = null;
      })
      .addCase(fetchAdminOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchAdminOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch order";
        state.currentOrder = null;
      })

      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update order in list if it exists
        const index = state.orders.findIndex((o) => o.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        // Update current order if viewing it
        if (state.currentOrder?.id === action.payload.id) {
          state.currentOrder = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message || "Failed to update order status";
      })

      // Fetch All Users
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch users";
      })

      // Fetch Stock Reservations
      .addCase(fetchStockReservations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStockReservations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stockReservations = action.payload.data;
      })
      .addCase(fetchStockReservations.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message || "Failed to fetch stock reservations";
      });
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;
