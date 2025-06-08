import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectors } from '@selectors';
import { getOrder } from '@slices';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectors.order.orders);

  useEffect(() => {
    dispatch(getOrder());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
