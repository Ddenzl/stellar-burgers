import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { selectors } from '@selectors';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector(selectors.user.user);

  return <AppHeaderUI userName={user?.name} />;
};
