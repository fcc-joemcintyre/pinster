import { Navigate, useLocation } from 'react-router';
import { useAppSelector } from '../../store/hooks';

type Props = {
  children: JSX.Element,
};

export const AuthRoute = ({ children }: Props) => {
  const authenticated = useAppSelector ((a) => a.user.authenticated);
  const location = useLocation ();

  if (!authenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
