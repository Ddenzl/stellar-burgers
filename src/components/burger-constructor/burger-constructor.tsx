import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { selectors } from '@selectors';
import { useDispatch, useSelector } from '../../services/store';
import { clearConstructor, closeOrder, createOrder } from '@slices';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectors.user.user);
  const constructorItems = useSelector(selectors.constructor.all);
  const orderRequest = useSelector(selectors.order.isLoading);
  const orderModalData = useSelector(selectors.order.currentOrder);

  const onOrderClick = () => {
    if (!user) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;
    const order = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingridient) => ingridient._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(order));
  };

  const closeOrderModal = () => {
    dispatch(closeOrder());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
