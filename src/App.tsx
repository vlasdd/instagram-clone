import React, { lazy, Suspense } from "react";
import { Route, Routes } from 'react-router-dom';
import AccountsRoutes from "./constants/accounts-routes";
import ProfileRoutes from "./constants/profile-routes";
import RoutesTypes from "./constants/routes-types"
import EditProfile from "./components/Accounts/EditProfile";
import Profile from "./pages/Profile";

const Dashboard: React.LazyExoticComponent<React.FC<{}>> = lazy(() => import("./pages/Dashboard"));
const Login: React.LazyExoticComponent<React.FC<{}>> = lazy(() => import("./pages/Login"));
const SignUp: React.LazyExoticComponent<React.FC<{}>> = lazy(() => import("./pages/SignUp"));
const NotFound: React.LazyExoticComponent<React.FC<{}>> = lazy(() => import("./pages/NotFound"));
const Accounts: React.LazyExoticComponent<React.FC<{}>> = lazy(() => import("./pages/Accounts"));

const App: React.FC = () => {
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
          path={`${RoutesTypes.DASHBOARD}:username`}
          element={<Profile />}
        >
          <Route 
            path={ProfileRoutes.POSTS}
            element={<div>posts</div>}
          />
          <Route
            path={ProfileRoutes.SAVED}
            element={<div>saved</div>}
          />
          <Route
            path={ProfileRoutes.TAGGED}
            element={<div>tagged</div>}
          />
        </Route>
        <Route
          path={RoutesTypes.ACOUNTS}
          element={<Accounts />}
        >
          <Route
            path={AccountsRoutes.EDIT_PROFILE}
            element={<EditProfile/>}
          />
        </Route>
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </Suspense>
  )
}

export default App;
