import { TIngredient } from '@utils-types';
import ingredientsSlice, { getIngredientsThunk } from '../ingredientsSlice';

const mockIngredients: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa093f',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
  }
];

const initialState = {
  ingredients: [],
  isLoading: false,
  error: null
};

describe('Тест редьюсера ingredientsSlice', () => {
  describe('обработка асинхронного экшена getIngredientsThunk', () => {
    test('устанавливает isLoading в true при pending', () => {
      const newState = ingredientsSlice(
        initialState,
        getIngredientsThunk.pending('')
      );

      expect(newState.isLoading).toBe(true);
      expect(newState.ingredients).toEqual([]);
      expect(newState.error).toBeNull();
    });

    test('записывает данные и сбрасывает isLoading при fulfilled', () => {
      const newState = ingredientsSlice(
        { ...initialState, isLoading: true },
        getIngredientsThunk.fulfilled(mockIngredients, '')
      );

      expect(newState.isLoading).toBe(false);
      expect(newState.ingredients).toEqual(mockIngredients);
      expect(newState.error).toBeNull();
    });

    test('записывает ошибку в error и сбрасывает isLoading при rejected', () => {
      const errorMessage = 'Unknown error';
      const newState = ingredientsSlice(
        { ...initialState, isLoading: true },
        getIngredientsThunk.rejected(new Error(errorMessage), '')
      );

      expect(newState.isLoading).toBe(false);
      expect(newState.ingredients).toEqual([]);
      expect(newState.error).toBe(errorMessage);
    });
  });
});
