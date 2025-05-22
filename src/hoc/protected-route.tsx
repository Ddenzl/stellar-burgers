import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../services/store';
import { selectors } from '@selectors';

type Props = {
  children?: React.ReactNode;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({ onlyUnAuth = false, children }: Props) => {
  const isAuthChecked = useSelector(selectors.user.isAuthChecked);
  const user = useSelector(selectors.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return children;
};
