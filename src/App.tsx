import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useNavigate} from 'react-router-dom';
import AccountsRoutes from "./constants/accounts-routes";
import ProfileRoutes from "./constants/profile-routes";
import RoutesTypes from "./constants/routes-types"
import EditProfile from "./components/accounts/EditProfile";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { AnimatePresence } from "framer-motion";
import UsersListModal from "./components/profile/UsersListModal";
import Modal from "./components/Modal";
import Posts from "./components/Posts";
import { setSignedUser } from "./redux/features/signedUser";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase/firebaseConfig";
import UserState from "./types/user-state-type";
import { doc, getDoc } from "firebase/firestore";
import PrivateRoute from "./helpers/PrivateRoute";
import ChatRoom from "./components/direct/ChatRoom";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Accounts = lazy(() => import("./pages/Accounts"));
const DefineProfile = lazy(() => import("./pages/DefineProfile"));
const Direct = lazy(() => import("./pages/Direct"));

const App: React.FC = () => {
  const userOnPage = useAppSelector(state => state.userOnPage.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (data) => {
      if (data) {
        const user = await getDoc(doc(db, "users", data.uid));
        dispatch(setSignedUser(user.data() as UserState))
      }
    })
  }, [])

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
            element={
              <PrivateRoute>
                <Login />
              </PrivateRoute>
            }
          />
          <Route
            path={RoutesTypes.SIGN_UP}
            element={
              <PrivateRoute>
                <SignUp />
              </PrivateRoute>
            }
          />
          <Route
            path={`${RoutesTypes.DASHBOARD}:uid`}
            element={<DefineProfile />}
          >
            <Route
              path={ProfileRoutes.POSTS}
              element={<Posts posts={userOnPage.posts} />}
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
                <Modal
                  closeEvent={() => navigate(-1)}
                  styles="h-96 top-[20%]"
                >
                  <UsersListModal
                    uid={userOnPage.userId}
                    descriptionLine="Followers"
                    usersList={userOnPage.followers}
                  />
                </Modal>
              }
            />
            <Route
              path={ProfileRoutes.FOLLOWING}
              element={
                <Modal
                  closeEvent={() => navigate(-1)}
                  styles="h-96 top-[20%]"
                >
                  <UsersListModal
                    uid={userOnPage.userId}
                    descriptionLine="Following"
                    usersList={userOnPage.following}
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
            path={RoutesTypes.DIRECT}
            element={<Direct />}
          >
            <Route
              path={`${RoutesTypes.DIRECT}:chatId`}
              element={<ChatRoom />}
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
