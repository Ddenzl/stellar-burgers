import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

type Order = {
  orders: TOrder[];
  isLoading: boolean;
  currentOrder: TOrder | null;
  error: string | null;
};

const initialState: Order = {
  orders: [],
  isLoading: false,
  currentOrder: null,
  error: null
};

export const createOrder = createAsyncThunk(
  'order/getOrder',
  (data: string[]) => orderBurgerApi(data)
);

export const getOrder = createAsyncThunk('order/order', () => getOrdersApi());

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeOrder(state) {
      state.currentOrder = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, { payload }) => {
        state.currentOrder = payload.order;
        state.isLoading = false;
      })
      .addCase(createOrder.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message || 'Unknown error';
      })

      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrder.fulfilled, (state, { payload }) => {
        state.orders = payload;
        state.isLoading = false;
      })
      .addCase(getOrder.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message || 'Unknown error';
      });
  }
});

export const { closeOrder } = orderSlice.actions;
export default orderSlice.reducer;
