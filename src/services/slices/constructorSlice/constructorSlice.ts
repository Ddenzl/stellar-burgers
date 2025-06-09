import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

type TInitialState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TInitialState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    constructorAdd: {
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: uuidv4()
        }
      }),
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      }
    },
    ingredientRemove(
      state,
      { payload }: PayloadAction<TConstructorIngredient>
    ) {
      state.ingredients = state.ingredients.filter(
        (ingedient) => ingedient.id !== payload.id
      );
    },
    moveIngredientUp(state, { payload }: PayloadAction<number>) {
      if (payload > 0) {
        [state.ingredients[payload], state.ingredients[payload - 1]] = [
          state.ingredients[payload - 1],
          state.ingredients[payload]
        ];
      }
    },
    moveIngredientDown(state, { payload }: PayloadAction<number>) {
      if (payload < state.ingredients.length - 1) {
        [state.ingredients[payload], state.ingredients[payload + 1]] = [
          state.ingredients[payload + 1],
          state.ingredients[payload]
        ];
      }
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  constructorAdd,
  ingredientRemove,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} = constructorSlice.actions;
export default constructorSlice.reducer;
