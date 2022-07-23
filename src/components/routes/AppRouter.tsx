import ProfileRoutes from 'constants/profile-routes';
import RoutesTypes from 'constants/routes-types';
import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from 'redux-setup/hooks';
import AccountsRoutes from 'constants/accounts-routes';

const ListModalRoute = lazy(() => import("components/routes/ListModalRoute"));
const PrivateRoute = lazy(() => import("components/routes/PrivateRoute"));
const PostsContainer = lazy(() => import("pages/profile/components/posts/PostsContainer"));
const PostModalPageRoute = lazy(() => import("components/routes/PostModalPageRoute"));
const SavedPosts = lazy(() => import("pages/profile/components/posts/SavedPosts"));
const EditProfile = lazy(() => import("pages/accounts/components/EditProfile"));
const ChangePassword = lazy(() => import("pages/accounts/components/ChangePassword"));
const ChatRoom = lazy(() => import("pages/direct/components/chat/ChatRoom"));
const Dashboard = lazy(() => import("pages/dashboard/Dashboard"));
const Login = lazy(() => import("pages/login/Login"));
const SignUp = lazy(() => import("pages/sign-up/SignUp"));
const NotFound = lazy(() => import("pages/not-found/NotFound"));
const Accounts = lazy(() => import("pages/accounts/Accounts"));
const DefineProfile = lazy(() => import("pages/profile/DefineProfile"));
const Direct = lazy(() => import("pages/direct/Direct"));
const People = lazy(() => import("pages/people/People"));
const Explore = lazy(() => import("pages/explore/Explore"));

const AppRouter: React.FC = () => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const userOnPage = useAppSelector(state => state.userOnPage.user);

    return (
        <Routes>
            <Route
                path={RoutesTypes.DASHBOARD}
                element={<Dashboard />}
            >
                <Route
                    path={`${ProfileRoutes.POST}:postId`}
                    element={<PostModalPageRoute/>}
                />
            </Route>
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
                        element={<ListModalRoute usersList={userOnPage.followers} descriptionLine="Followers" />}
                    />
                    <Route
                        path={ProfileRoutes.FOLLOWING}
                        element={<ListModalRoute usersList={userOnPage.following} descriptionLine="Following" />}
                    />
                    <Route
                        path={`${ProfileRoutes.POST}:postId`}
                        element={<PostModalPageRoute />}
                    />
                </Route>
                <Route
                    path={ProfileRoutes.SAVED}
                    element={<SavedPosts savedPosts={loggedUser.savedPosts} />}
                >
                    <Route
                        path={`${ProfileRoutes.POST}:postId`}
                        element={<PostModalPageRoute/>}
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
                />
            </Route>
            <Route
                path={RoutesTypes.PEOPLE}
                element={<People />}
            />
            <Route
                path={RoutesTypes.EXPLORE}
                element={<Explore />}
            >
                <Route
                    path={`${ProfileRoutes.POST}:postId`}
                    element={<PostModalPageRoute/>}
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
    )
}

export default AppRouter