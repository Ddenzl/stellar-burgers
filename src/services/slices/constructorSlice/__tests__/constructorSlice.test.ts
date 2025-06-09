import { TConstructorIngredient, TIngredient } from '@utils-types';
import constructorSlice, {
  clearConstructor,
  constructorAdd,
  ingredientRemove,
  moveIngredientDown,
  moveIngredientUp
} from '../constructorSlice';

const mockBun: TIngredient = {
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
};

const mockMain: TIngredient = {
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
};

const mockSauce: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Соус фирменный Space Sauce',
  type: 'sauce',
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
};

const initialState = {
  bun: null,
  ingredients: []
};

const preloadedState = {
  bun: null,
  ingredients: [
    { ...mockMain, id: '123' } as TConstructorIngredient,
    { ...mockSauce, id: '456' } as TConstructorIngredient
  ]
};

describe('Тест редьюсера constructorSlice', () => {
  describe('обработка экшена constructorAdd', () => {
    test('добавление булки в state.bun', () => {
      const newState = constructorSlice(initialState, constructorAdd(mockBun));

      expect(newState.bun).toEqual(
        expect.objectContaining({
          ...mockBun,
          id: expect.any(String)
        })
      );
      expect(newState.ingredients).toEqual([]);
    });

    test('добавление начинки в state.ingredients', () => {
      const newState = constructorSlice(initialState, constructorAdd(mockMain));

      expect(newState.bun).toBeNull();
      expect(newState.ingredients).toEqual([
        expect.objectContaining({
          ...mockMain,
          id: expect.any(String)
        })
      ]);
    });

    test('добавление соуса в state.ingredients', () => {
      const newState = constructorSlice(
        initialState,
        constructorAdd(mockSauce)
      );

      expect(newState.bun).toBeNull();
      expect(newState.ingredients).toEqual([
        expect.objectContaining({
          ...mockSauce,
          id: expect.any(String)
        })
      ]);
    });
  });

  describe('тест экшена ingredientRemove', () => {
    test('удаление ингредиента по id', () => {
      const newState = constructorSlice(
        preloadedState,
        ingredientRemove({ ...mockMain, id: '123' })
      );

      expect(newState.bun).toBeNull();
      expect(newState.ingredients).toEqual([
        expect.objectContaining({
          ...mockSauce,
          id: '456'
        })
      ]);
    });
  });

  describe('тест экшенов изменения порядка ингредиентов', () => {
    test('перемещение ингредиента вверх', () => {
      const newState = constructorSlice(preloadedState, moveIngredientUp(1));

      expect(newState.ingredients).toEqual([
        expect.objectContaining(mockSauce),
        expect.objectContaining(mockMain)
      ]);
    });

    test('перемещение ингредиента вниз', () => {
      const newState = constructorSlice(preloadedState, moveIngredientDown(0));

      expect(newState.ingredients).toEqual([
        expect.objectContaining(mockSauce),
        expect.objectContaining(mockMain)
      ]);
    });
  });

  describe('тест экшена clearConstructor', () => {
    test('очистка конструктора', () => {
      const filledState = {
        bun: { ...mockBun, id: 'bun-123' } as TConstructorIngredient,
        ingredients: [
          { ...mockMain, id: '123' } as TConstructorIngredient,
          { ...mockSauce, id: '456' } as TConstructorIngredient
        ]
      };

      const newState = constructorSlice(filledState, clearConstructor());

      expect(newState.bun).toBeNull();
      expect(newState.ingredients).toEqual([]);
      expect(newState).toEqual(initialState);
    });
  });
});
