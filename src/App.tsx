import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import AccountsRoutes from "constants/accounts-routes";
import ProfileRoutes from "constants/profile-routes";
import RoutesTypes from "constants/routes-types"
import { useAppDispatch, useAppSelector } from "redux-setup/hooks";
import { AnimatePresence } from "framer-motion";
import { fetchSignedUser } from "redux-setup/features/signedUser";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-setup/firebaseConfig";
import { setIsBeingLoaded } from "redux-setup/features/isBeingLoaded";

const EditProfile = lazy(() => import("pages/accounts/components/EditProfile"));
const UsersListModal = lazy(() => import("pages/profile/components/users-list/UsersListModal"));
const Modal = lazy(() => import("components/modal/Modal"));
const PostsContainer = lazy(() => import("pages/profile/components/posts/PostsContainer"));
const PrivateRoute = lazy(() => import("helpers/components/PrivateRoute"));
const ChatRoom = lazy(() => import("pages/direct/components/chat/ChatRoom"));
const PostModalPage = lazy(() => import("pages/profile/components/post-modal-page/PostModalPage"));
const SavedPosts = lazy(() => import("pages/profile/components/posts/SavedPosts"));
const ChangePassword = lazy(() => import("pages/accounts/components/ChangePassword"));
const Dashboard = lazy(() => import("pages/dashboard/Dashboard"));
const Login = lazy(() => import("pages/login/Login"));
const SignUp = lazy(() => import("pages/sign-up/SignUp"));
const NotFound = lazy(() => import("pages/not-found/NotFound"));
const Accounts = lazy(() => import("pages/accounts/Accounts"));
const DefineProfile = lazy(() => import("pages/profile/DefineProfile"));
const Direct = lazy(() => import("pages/direct/Direct"));
const Loading = lazy(() => import("pages/loading/Loading"));
const People = lazy(() => import("./pages/people/People"));

const App: React.FC = () => {
  const loggedUser = useAppSelector(state => state.signedUser.user);
  const userOnPage = useAppSelector(state => state.userOnPage.user);
  const isBeingLoaded = useAppSelector(state => state.isBeingLoaded.isBeingLoaded);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (data) => {
      dispatch(setIsBeingLoaded(true));

      if (data) {
        dispatch(fetchSignedUser(data.uid))
      }

      dispatch(setIsBeingLoaded(false));
    })
  }, [])

  return (
    isBeingLoaded ?
      <Loading /> :
      <AnimatePresence>
        <Suspense fallback={<Loading />}>
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
                  link={RoutesTypes.DASHBOARD}
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
                  link={RoutesTypes.DASHBOARD}
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
                        descriptionLine="Followers"
                        usersList={userOnPage.followers}
                        closeEvent={() => navigate(-1)}
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
                        descriptionLine="Following"
                        usersList={userOnPage.following}
                        closeEvent={() => navigate(-1)}
                      />
                    </Modal>
                  }
                />
                <Route
                  path={`${ProfileRoutes.POST}:postId`}
                  element={
                    <Modal
                      closeEvent={() => navigate(RoutesTypes.DASHBOARD + userOnPage.userId)}
                      styles="w-[70%] sm:w-5/6 h-[70%] lg:h-[90%] top-[15%] lg:top-[5%]"
                    >
                      <PostModalPage />
                    </Modal>
                  }
                />
              </Route>
              <Route
                path={ProfileRoutes.SAVED}
                element={<SavedPosts savedPosts={loggedUser.savedPosts} />}
              >
                <Route
                  path={`${ProfileRoutes.POST}:postId`}
                  element={
                    <Modal
                      closeEvent={() => navigate(RoutesTypes.DASHBOARD + userOnPage.userId)}
                      styles="w-[70%] sm:w-5/6 h-[60%] lg:h-[90%] top-[20%] lg:top-[5%]"
                    >
                      <PostModalPage />
                    </Modal>
                  }
                />
              </Route>
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
              <Route
                path={AccountsRoutes.PASSWORD}
                element={<ChangePassword />}
              />
            </Route>
            <Route
              path={RoutesTypes.DIRECT}
              element={<Direct />}
            >
              <Route
                path={`${RoutesTypes.DIRECT}:chatId`}
                element={<ChatRoom />}
              >
                {/* <Route
                  path={`${ProfileRoutes.POST}:postId`}
                  element={
                    <Modal
                      closeEvent={() => navigate(-1)}
                      styles="w-[70%] sm:w-5/6 h-[60%] lg:h-[90%] top-[20%] lg:top-[5%]"
                    >
                      <PostModalPage />
                    </Modal>
                  }
                /> */}
              </Route>
            </Route>
            <Route
              path={RoutesTypes.PEOPLE}
              element={<People />}
            />
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
