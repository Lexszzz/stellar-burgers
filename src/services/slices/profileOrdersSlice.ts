import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

type TProfileOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TProfileOrdersState = {
  orders: [],
  isLoading: false,
  error: null
};

export const getProfileOrdersThunk = createAsyncThunk(
  'profileOrders/getOrders',
  getOrdersApi
);

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getProfileOrdersThunk.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getProfileOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })

      .addCase(getProfileOrdersThunk.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const profileOrdersReducer = profileOrdersSlice.reducer;
