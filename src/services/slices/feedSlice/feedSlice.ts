import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

type TInitialState = {
  feed: TOrdersData;
  isLoading: boolean;
  currentOrder: TOrder | null;
  error: string | null;
};

const initialState: TInitialState = {
  isLoading: false,
  currentOrder: null,
  error: null,
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

export const getFeed = createAsyncThunk('feed/getAll', async () => {
  const res = await getFeedsApi();
  return {
    orders: res.orders,
    total: res.total,
    totalToday: res.totalToday
  };
});

export const getOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  (number: number) => getOrderByNumberApi(number)
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feed = action.payload;
      })
      .addCase(getFeed.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message || 'Unknown error';
      })

      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload.orders.pop() || null;
      })
      .addCase(getOrderByNumber.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message || 'Unknown error';
      });
  }
});

export default feedSlice.reducer;
