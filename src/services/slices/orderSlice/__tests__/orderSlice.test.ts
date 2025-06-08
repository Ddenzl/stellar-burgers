import orderSlice, { createOrder, getOrder, closeOrder } from '../orderSlice';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: '123',
  status: 'done',
  name: 'Test Burger',
  createdAt: '2025-06-08T13:30:00.000Z',
  updatedAt: '2025-06-08T13:30:00.000Z',
  number: 456,
  ingredients: ['bun', 'main']
};

const initialState = {
  orders: [],
  isLoading: false,
  currentOrder: null,
  error: null
};

describe('Тест редьюсера orderSlice', () => {
  describe('обработка экшена closeOrder', () => {
    test('очищает currentOrder', () => {
      const newState = orderSlice(
        { ...initialState, currentOrder: mockOrder },
        closeOrder()
      );
      expect(newState.currentOrder).toBeNull();
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBeNull();
      expect(newState.orders).toEqual([]);
    });
  });

  describe('обработка экшена createOrder', () => {
    test('устанавливает isLoading в true при pending', () => {
      const newState = orderSlice(
        { ...initialState, error: 'Some error' },
        createOrder.pending('', ['bun', 'main'])
      );
      expect(newState.isLoading).toBe(true);
      expect(newState.currentOrder).toBeNull();
      expect(newState.orders).toEqual([]);
    });

    test('записывает заказ в currentOrder при fulfilled', () => {
      const newState = orderSlice(
        { ...initialState, isLoading: true },
        createOrder.fulfilled(
          { order: mockOrder, success: false, name: '' },
          '',
          ['bun', 'main']
        )
      );
      expect(newState.currentOrder).toEqual(mockOrder);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBeNull();
      expect(newState.orders).toEqual([]);
    });

    test('записывает ошибку при rejected', () => {
      const errorMessage = 'Unknown error';
      const newState = orderSlice(
        { ...initialState, isLoading: true },
        createOrder.rejected(new Error(errorMessage), '', ['bun', 'main'])
      );
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(errorMessage);
      expect(newState.currentOrder).toBeNull();
      expect(newState.orders).toEqual([]);
    });
  });

  describe('обработка экшена getOrder', () => {
    test('устанавливает isLoading в true при pending', () => {
      const newState = orderSlice(
        { ...initialState, error: 'Some error' },
        getOrder.pending('')
      );
      expect(newState.isLoading).toBe(true);
      expect(newState.currentOrder).toBeNull();
      expect(newState.orders).toEqual([]);
    });

    test('записывает заказы при fulfilled', () => {
      const mockOrders = [mockOrder];
      const newState = orderSlice(
        { ...initialState, isLoading: true },
        getOrder.fulfilled(mockOrders, '')
      );
      expect(newState.orders).toEqual(mockOrders);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBeNull();
      expect(newState.currentOrder).toBeNull();
    });

    test('записывает ошибку при rejected', () => {
      const errorMessage = 'Unknown error';
      const newState = orderSlice(
        { ...initialState, isLoading: true },
        getOrder.rejected(new Error(errorMessage), '')
      );
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(errorMessage);
      expect(newState.currentOrder).toBeNull();
      expect(newState.orders).toEqual([]);
    });
  });
});
