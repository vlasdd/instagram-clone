import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useNavigate} from 'react-router-dom';
import AccountsRoutes from "./constants/accounts-routes";
import ProfileRoutes from "./constants/profile-routes";
import RoutesTypes from "./constants/routes-types"
import EditProfile from "./pages/accounts/components/EditProfile";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { AnimatePresence } from "framer-motion";
import UsersListModal from "./pages/profile/components/UsersListModal";
import Modal from "./components/modal/Modal";
import PostsContainer from "./pages/profile/components/PostsContainer";
import { setSignedUser } from "./redux/features/signedUser";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase/firebaseConfig";
import UserState from "./types/user-state-type";
import { doc, getDoc } from "firebase/firestore";
import PrivateRoute from "./helpers/PrivateRoute";
import ChatRoom from "./pages/direct/components/ChatRoom";
import PostModalPage from "./pages/profile/components/post-modal-page/PostModalPage";

const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Login = lazy(() => import("./pages/login/Login"));
const SignUp = lazy(() => import("./pages/sign-up/SignUp"));
const NotFound = lazy(() => import("./pages/not-found/NotFound"));
const Accounts = lazy(() => import("./pages/accounts/Accounts"));
const DefineProfile = lazy(() => import("./pages/profile/DefineProfile"));
const Direct = lazy(() => import("./pages/direct/Direct"));

const App: React.FC = () => {
  const loggedUser = useAppSelector(state => state.signedUser.user);
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
              <PrivateRoute
                condition={loggedUser.userId.length !== 0}
              >
                <Login />
              </PrivateRoute>
            }
          />
          <Route
            path={RoutesTypes.SIGN_UP}
            element={
              <PrivateRoute
                condition={loggedUser.userId.length !== 0}
              >
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
              element={<PostsContainer posts={userOnPage.posts} />}
            >
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
              <Route
                path={`${ProfileRoutes.POST}:postId`}
                element={
                  <Modal
                    closeEvent={() => navigate(RoutesTypes.DASHBOARD + userOnPage.userId)}
                    styles="w-[70%] sm:w-5/6 h-[60%] lg:h-[90%] top-[20%] lg:top-[5%]"
                  >
                    <PostModalPage { ...userOnPage } />
                  </Modal>
                }
              />
            </Route>
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
