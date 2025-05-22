import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getConstructor = (state: RootState) => state.constructorSlice;

const getFeedOrders = (state: RootState) => state.feedSlice.feed.orders;
const getFeedInfo = (state: RootState) => state.feedSlice.feed;
const getFeedCurrentOrder = (state: RootState) => state.feedSlice.currentOrder;

const getIngredients = (state: RootState) => state.ingredientsSlice.ingredients;

const getBuns = createSelector(getIngredients, (ingredients) =>
  ingredients.filter((ingredient) => ingredient.type === 'bun')
);

const getSauces = createSelector(getIngredients, (ingredients) =>
  ingredients.filter((ingredient) => ingredient.type === 'sauce')
);

const getMains = createSelector(getIngredients, (ingredients) =>
  ingredients.filter((ingredient) => ingredient.type === 'main')
);

const getIngredientById = (id: string) => (state: RootState) =>
  state.ingredientsSlice.ingredients.find(
    (ingredient) => ingredient._id === id
  );

const getIngredientsIsLoading = (state: RootState) =>
  state.ingredientsSlice.isLoading;

const getOrderIsLoading = (state: RootState) => state.orderSlice.isLoading;
const getCurrentOrder = (state: RootState) => state.orderSlice.currentOrder;
const getOrders = (state: RootState) => state.orderSlice.orders;

const getUser = (state: RootState) => state.userSlice.user;
const getIsAuthChecked = (state: RootState) => state.userSlice.isAuthChecked;

export const selectors = {
  constructor: {
    all: getConstructor
  },
  feed: {
    orders: getFeedOrders,
    info: getFeedInfo,
    currentOrder: getFeedCurrentOrder
  },
  ingredients: {
    all: getIngredients,
    buns: getBuns,
    sauces: getSauces,
    mains: getMains,
    findById: getIngredientById,
    isLoading: getIngredientsIsLoading
  },
  order: {
    isLoading: getOrderIsLoading,
    currentOrder: getCurrentOrder,
    orders: getOrders
  },
  user: {
    user: getUser,
    isAuthChecked: getIsAuthChecked
  }
};
