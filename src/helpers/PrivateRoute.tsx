import { Navigate } from 'react-router-dom';
import RoutesTypes from '../constants/routes-types';

type PrivateRouteProps = {
  children: JSX.Element,
  condition: boolean,
}

const PrivateRoute = ({ children, condition }: PrivateRouteProps) => {
  if (condition) {
    return <Navigate to={RoutesTypes.DASHBOARD} />
  }

  return children
}

export default PrivateRoute