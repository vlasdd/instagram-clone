import React, { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import AccountsRoutes from "./constants/accounts-routes";
import ProfileRoutes from "./constants/profile-routes";
import RoutesTypes from "./constants/routes-types"
import EditProfile from "./components/accounts/EditProfile";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { AnimatePresence } from "framer-motion";
import UsersListModal from "./components/UsersListModal";
import UserState from "./types/user-state-type";
import { initialState as initialUser } from './redux/features/user';
import Modal from "./components/Modal";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Accounts = lazy(() => import("./pages/Accounts"));
const Profile = lazy(() => import("./pages/Profile"));

const App: React.FC = () => {
  //const user = useAppSelector(state => state.currentUser.user);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate(); 
  
  const [globalUser, setGlobalUser] = useState<UserState>(initialUser.user)

  /*useEffect(() => {
    if(location.pathname.split("/").some(text => text === ProfileRoutes.FOLLOWERS || text === ProfileRoutes.FOLLOWING)){
      dispatch(setIsModalOpen(true));
    }
  }, [])*/

  return (
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
            path={`${RoutesTypes.DASHBOARD}:uid`}
            element={<Profile
              setGlobalUser={setGlobalUser}
              globalUser={globalUser}
            />}
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
              element={
                <Modal>
                  <UsersListModal
                    uid={globalUser.userId}
                    descriptionLine="Followers"
                    usersList={globalUser.followers}
                  />
                </Modal>
              }
            />
            <Route
              path={ProfileRoutes.FOLLOWING}
              element={
                <Modal>
                  <UsersListModal
                    uid={globalUser.userId}
                    descriptionLine="Following"
                    usersList={globalUser.following}
                  />
                </Modal>
              }
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
  )
}

export default App;
