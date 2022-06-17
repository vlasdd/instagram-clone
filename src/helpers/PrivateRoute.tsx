import React from 'react'
import { useAppSelector } from '../redux/hooks';
import { Navigate } from 'react-router-dom';
import RoutesTypes from '../constants/routes-types';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const loggedUser = useAppSelector(state => state.signedUser.user);

  if (loggedUser.userId.length) {
    return <Navigate to={RoutesTypes.DASHBOARD} />
  }

  return children
}

export default PrivateRoute