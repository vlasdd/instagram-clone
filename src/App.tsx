import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from 'react-router-dom';
import AccountsRoutes from "./constants/accounts-routes";
import ProfileRoutes from "./constants/profile-routes";
import RoutesTypes from "./constants/routes-types"
import EditProfile from "./components/accounts/EditProfile";
import Profile from "./pages/Profile";
import { setIsWindowOpen } from "./redux/features/isWindowOpen";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { AnimatePresence } from "framer-motion";
import UsersListModal from "./components/UsersListModal";
import { setIsModalOpen } from "./redux/features/isModalOpen";

const Dashboard: React.LazyExoticComponent<React.FC<{}>> = lazy(() => import("./pages/Dashboard"));
const Login: React.LazyExoticComponent<React.FC<{}>> = lazy(() => import("./pages/Login"));
const SignUp: React.LazyExoticComponent<React.FC<{}>> = lazy(() => import("./pages/SignUp"));
const NotFound: React.LazyExoticComponent<React.FC<{}>> = lazy(() => import("./pages/NotFound"));
const Accounts: React.LazyExoticComponent<React.FC<{}>> = lazy(() => import("./pages/Accounts"));

const App: React.FC = () => {
  const user = useAppSelector(state => state.currentUser.user);
  const isModalOpen = useAppSelector(state => state.isModalOpen.isModalOpen);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if(location.pathname.split("/").some(text => text === ProfileRoutes.FOLLOWERS || text === ProfileRoutes.FOLLOWING)){
      dispatch(setIsModalOpen(true));
    }
  }, [])

  return (
    <div 
        onClick={() => dispatch(setIsWindowOpen(false))}
        className={`relative ${isModalOpen && "disabled-page"}`}
      >
      <AnimatePresence>
        <Suspense
          fallback={<p>Loading...</p>}
        >
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
              <Route
                path={ProfileRoutes.FOLLOWERS}
                element={<UsersListModal
                  username={user.username}
                  descriptionLine="Followers"
                  usersList={user.followers}
                />}
              />
              <Route
                path={ProfileRoutes.FOLLOWING}
                element={<UsersListModal
                  username={user.username}
                  descriptionLine="Following"
                  usersList={user.following}
                />}
              />
            </Route>
            <Route
              path={RoutesTypes.ACOUNTS}
              element={<Accounts />}
            >
              <Route
                path={AccountsRoutes.EDIT_PROFILE}
                element={<EditProfile />}
              />
            </Route>
            <Route
              path={RoutesTypes.NOT_FOUND}
              element={<NotFound />}
            />
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </div>
  )
}

export default App;
