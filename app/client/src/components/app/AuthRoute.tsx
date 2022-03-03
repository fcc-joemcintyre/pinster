import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
import { RootState } from '../../store/configureStore';

type Props = {
  children: JSX.Element,
};

export const AuthRoute = ({ children }: Props) => {
  const authenticated = useSelector ((a: RootState) => a.user.authenticated);
  const location = useLocation ();

  if (!authenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
