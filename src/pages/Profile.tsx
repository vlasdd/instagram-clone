import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, Link, useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProfileNavBar from '../components/profile/ProfileNavBar';
import AccountsRoutes from '../constants/accounts-routes';
import ProfileRoutes from '../constants/profile-routes';
import RoutesTypes from '../constants/routes-types';
import { db } from '../firebase/firebase-config';
import { setActiveUser } from '../redux/features/user';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import UserState from '../types/user-state-type';
import { initialState as initialUser } from '../redux/features/user';

type ProfileProps = {
    setGlobalUser: React.Dispatch<React.SetStateAction<UserState>>
    globalUser: UserState
}

const Profile: React.FC<ProfileProps> = ({ setGlobalUser, globalUser }) => {
    const currentUser = useAppSelector(state => state.currentUser.user);
    const dispatch = useAppDispatch();

    const { uid } = useParams();
    const navigate = useNavigate();

    const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);

    useEffect(() => {
        console.log("use effect 1")
        const getUser = async () => {
            const userOnPage = await getDoc(doc(db, "users", uid as string));

            if (!userOnPage.data()) {
                setShouldRedirect(true);
                return;
            }

            setGlobalUser(userOnPage.data() as UserState);

            if (uid === currentUser.userId) {
                dispatch(setActiveUser(userOnPage.data() as UserState));
            }
        }

        getUser();
    }, [])

    useEffect(() => {
        console.log("use effect 2");

        if (uid === currentUser.userId) {
            setGlobalUser(currentUser);
        }
    }, [currentUser])

    return (
        shouldRedirect ?
            <Navigate to={RoutesTypes.NOT_FOUND} /> :
            <div 
                className=" h-screen w-screen flex flex-col items-center back">
                <Header />
                <div className="flex w-full sm:w-3/4 lg:w-5/6 xl:w-4/5 justify-center h-60 gap-4 pt-4 pb-3 px-1">
                    <div className="w-2/5 max-w-xs h-full flex items-start justify-center mt-4">
                        <img
                            src={globalUser.profileImage.length ? globalUser.profileImage : "../images/default-avatar-gray.jpg"}
                            className="rounded-full w-full sm:w-3/5 max-w-[190px]"
                        />
                    </div>
                    <div className="flex flex-col w-3/5 py-4 gap-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <p className="text-2xl font-light">{globalUser.username}</p>
                            <div className="flex items-center gap-4">
                                <Link
                                    to={RoutesTypes.ACOUNTS + "/" + AccountsRoutes.EDIT_PROFILE}
                                    className="p-1 border rounded font-medium text-sm tracking-wide"
                                >
                                    Edit Profile
                                </Link>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-2 sm:gap-8">
                            <div className="flex gap-1 items-center flex-col sm:flex-row">
                                <p className="font-medium">{globalUser.posts.length}</p>
                                <p>{`post${globalUser.posts.length === 1 ? "" : "s"}`}</p>
                            </div>
                            <button 
                                onClick={(event) => {
                                    event.stopPropagation();
                                    navigate(ProfileRoutes.FOLLOWERS)
                                }}
                                className="flex gap-1 items-center flex-col sm:flex-row"
                            >
                                <p className="font-medium">{globalUser.followers.length}</p>
                                <p>{`follower${globalUser.followers.length === 1 ? "" : "s"}`}</p>
                            </button>
                            <button
                                onClick={(event) => {
                                    event.stopPropagation();
                                    navigate(ProfileRoutes.FOLLOWING)
                                }}
                                className="flex gap-1 items-center flex-col sm:flex-row"
                            >
                                <p className="font-medium">{globalUser.following.length}</p>
                                <p>following</p>
                            </button>
                        </div>
                        <p className="font-medium">{globalUser.fullName}</p>
                        <div className="flex"></div>
                    </div>
                </div>
                <ProfileNavBar />
                <Outlet />
            </div>
    )
}

export default Profile