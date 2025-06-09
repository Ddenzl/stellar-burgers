import { rootReducer } from './store';

describe('Тестирование rootReducer', () => {
  test('Вызов rootReducer с undefined и UNKNOWN_ACTION возвращает корректное начальное состояние', () => {
    const result = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    const expectedInitialState = {
      ingredientsSlice: {
        ingredients: [],
        isLoading: false,
        error: null
      },
      userSlice: {
        user: null,
        isAuthChecked: false,
        error: null
      },
      constructorSlice: {
        bun: null,
        ingredients: []
      },
      feedSlice: {
        isLoading: false,
        currentOrder: null,
        error: null,
        feed: {
          orders: [],
          total: 0,
          totalToday: 0
        }
      },
      orderSlice: {
        isLoading: false,
        error: null,
        currentOrder: null,
        orders: []
      }
    };

    expect(result).toEqual(expectedInitialState);
  });
});
