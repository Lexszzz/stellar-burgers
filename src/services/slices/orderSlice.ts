import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';

type TOrderState = {
  orderRequest: boolean;
  orderModalData: {
    number: number;
  } | null;
};

const initialState: TOrderState = {
  orderRequest: false,
  orderModalData: null
};

export const createOrderThunk = createAsyncThunk(
  'order/create',
  orderBurgerApi
);

const orderSlice = createSlice({
  name: 'order',
  initialState,

  reducers: {
    clearOrderModal(state) {
      state.orderModalData = null;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.orderRequest = true;
      })

      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.orderRequest = false;

        state.orderModalData = {
          number: action.payload.order.number
        };
      })

      .addCase(createOrderThunk.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const { clearOrderModal } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
