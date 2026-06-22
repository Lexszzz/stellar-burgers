import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';

type TFeedState = {
  orders: TOrder[];
  currentOrder: TOrder | null;
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  currentOrder: null,
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const getOrderByNumberThunk = createAsyncThunk(
  'feed/getOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);

    return response.orders[0];
  }
);

export const getFeedsThunk = createAsyncThunk('feed/getFeed', getFeedsApi);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getFeedsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })

      .addCase(getFeedsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки';
      })

      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
      })

      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки заказа';
      });
  }
});

export const feedReducer = feedSlice.reducer;
