import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectors } from '@selectors';

export const IngredientDetails: FC = () => {
  const { id } = useParams();

  if (!id) {
    return <Preloader />;
  }

  const ingredientData = useSelector(selectors.ingredients.findById(id));

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
