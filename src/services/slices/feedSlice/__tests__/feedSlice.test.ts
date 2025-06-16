import { TOrder } from '@utils-types';
import feedSlice, { getFeed, getOrderByNumber } from '../feedSlice';

jest.mock('@api', () => ({
  getFeedsApi: jest.fn(),
  getOrderByNumberApi: jest.fn()
}));

const mockOrder: TOrder = {
  _id: '643d69a5c3f7b9001cfa0940',
  status: 'done',
  name: 'Space Burger',
  createdAt: '2025-06-08T12:00:00.000Z',
  updatedAt: '2025-06-08T12:01:00.000Z',
  number: 12345,
  ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093f']
};

const mockFeedApiResponse = {
  success: true,
  orders: [mockOrder],
  total: 100,
  totalToday: 10
};

const mockFeedPayload = {
  orders: mockFeedApiResponse.orders,
  total: mockFeedApiResponse.total,
  totalToday: mockFeedApiResponse.totalToday
};

const initialState = {
  isLoading: false,
  currentOrder: null,
  error: null,
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

describe('Тест редьюсера feedSlice', () => {
  describe('обработка асинхронного экшена getFeed', () => {
    test('устанавливает isLoading в true при pending', () => {
      const newState = feedSlice(initialState, getFeed.pending(''));

      expect(newState.isLoading).toBe(true);
      expect(newState.feed).toEqual(initialState.feed);
      expect(newState.currentOrder).toBeNull();
      expect(newState.error).toBeNull();
    });

    test('записывает данные ленты и сбрасывает isLoading при fulfilled', () => {
      const newState = feedSlice(
        { ...initialState, isLoading: true },
        getFeed.fulfilled(mockFeedPayload, '')
      );

      expect(newState.isLoading).toBe(false);
      expect(newState.feed).toEqual({
        orders: mockFeedPayload.orders,
        total: mockFeedPayload.total,
        totalToday: mockFeedPayload.totalToday
      });
      expect(newState.currentOrder).toBeNull();
      expect(newState.error).toBeNull();
    });

    test('записывает ошибку и сбрасывает isLoading при rejected', () => {
      const errorMessage = 'Unknown error';
      const newState = feedSlice(
        { ...initialState, isLoading: true },
        getFeed.rejected(new Error(errorMessage), '')
      );

      expect(newState.isLoading).toBe(false);
      expect(newState.feed).toEqual(initialState.feed);
      expect(newState.currentOrder).toBeNull();
      expect(newState.error).toBe(errorMessage);
    });
  });

  describe('обработка асинхронного экшена getOrderByNumber', () => {
    test('устанавливает isLoading в true при pending', () => {
      const newState = feedSlice(
        initialState,
        getOrderByNumber.pending('', 12345)
      );

      expect(newState.isLoading).toBe(true);
      expect(newState.feed).toEqual(initialState.feed);
      expect(newState.currentOrder).toBeNull();
      expect(newState.error).toBeNull();
    });

    test('записывает текущий заказ и сбрасывает isLoading при fulfilled', () => {
      const payload = { success: true, orders: [mockOrder] };
      const newState = feedSlice(
        { ...initialState, isLoading: true },
        getOrderByNumber.fulfilled(payload, '', 12345)
      );

      expect(newState.isLoading).toBe(false);
      expect(newState.feed).toEqual(initialState.feed);
      expect(newState.currentOrder).toEqual(mockOrder);
      expect(newState.error).toBeNull();
    });

    test('записывает ошибку и сбрасывает isLoading при rejected', () => {
      const errorMessage = 'Unknown error';
      const newState = feedSlice(
        { ...initialState, isLoading: true },
        getOrderByNumber.rejected(new Error(errorMessage), '', 12345)
      );

      expect(newState.isLoading).toBe(false);
      expect(newState.feed).toEqual(initialState.feed);
      expect(newState.currentOrder).toBeNull();
      expect(newState.error).toBe(errorMessage);
    });
  });
});
