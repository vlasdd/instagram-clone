import React, { lazy, Suspense, FC } from "react";
import { Route, Routes } from 'react-router-dom';
import RoutesTypes from "./constants/routes-types"

const Dashboard: React.LazyExoticComponent<React.FC<{}>> = lazy(() => import("./pages/Dashboard"));
const Login: React.LazyExoticComponent<React.FC<{}>> = lazy(() => import("./pages/Login"));
const SignUp: React.LazyExoticComponent<React.FC<{}>> = lazy(() => import("./pages/SignUp"));
const NotFound: React.LazyExoticComponent<React.FC<{}>> = lazy(() => import("./pages/NotFound"));

const App: FC = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route
          path={RoutesTypes.DASHBOARD}
          element={<Dashboard />}
        />
        <Route
          path={RoutesTypes.LOGIN}
          element={<Login />}
        />
        <Route
          path={RoutesTypes.SIGN_UP}
          element={<SignUp />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </Suspense>
  )
}

export default App;
