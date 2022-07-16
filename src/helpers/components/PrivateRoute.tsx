import { Navigate } from 'react-router-dom';
import RoutesTypes from 'constants/routes-types';

type PrivateRouteProps = {
  children: JSX.Element,
  condition: boolean,
  link: string;
}

const PrivateRoute = ({ children, condition, link }: PrivateRouteProps) => {
  if (condition) {
    return <Navigate to={link} />
  }

  return children
}

export default PrivateRoute