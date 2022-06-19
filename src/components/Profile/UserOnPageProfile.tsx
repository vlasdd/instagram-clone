import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate, useParams } from 'react-router-dom';
import ProfileRoutes from '../../constants/profile-routes';
import RoutesTypes from '../../constants/routes-types';
import { db } from '../../firebase/firebaseConfig';
import useFollowers from '../../helpers/useFollowers';
import { setUserOnPage } from '../../redux/features/userOnPage';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Additional from '../../svgs/Additional';
import UserState from '../../types/user-state-type';
import Modal from '../Modal';
import ProfileNavBar from './ProfileNavBar';
import UnfollowModal from './UnfollowModal';

const UserOnPageProfile: React.FC = () => {
    const userOnPage = useAppSelector(state => state.userOnPage.user);
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const dispatch = useAppDispatch();
    const { uid } = useParams();
    const navigate = useNavigate();

    const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
    const [isUnfollowModalOpen, setIsUnfollowModalOpen] = useState<boolean>(false);

    const { addToFollowing, removeFromFollowing } = useFollowers({ 
        profileImage: userOnPage.profileImage, 
        username: userOnPage.username, 
        fullName: userOnPage.fullName, 
        userId: userOnPage.userId 
    })

    useEffect(() => {
        const getUser = async () => {
            const loggedUser = await getDoc(doc(db, "users", uid as string));

            if (!loggedUser.data()) {
                setShouldRedirect(true);
                return;
            }

            dispatch(setUserOnPage(loggedUser.data() as UserState))
        }

        getUser();
    }, [uid])

    return (
        shouldRedirect ?
            <Navigate to={RoutesTypes.NOT_FOUND} /> :
            <div className="h-[calc(100vh-60px)] w-screen flex flex-col items-center back">
                <div className="flex items-center flex-col sm:flex-row w-full sm:w-3/4 lg:w-5/6 xl:w-4/5 justify-center gap-2 pt-4 pb-3 px-1">
                    <div className="w-full sm:w-2/5 sm:h-60 flex justify-center items-center">
                        <img
                            src={userOnPage.profileImage.length ? userOnPage.profileImage : "../images/default-avatar-gray.jpg"}
                            className="rounded-full w-[170px] h-[170px] object-cover"
                        />
                    </div>
                    <div className="flex flex-col w-5/6 sm:w-3/5 py-4 gap-6">
                        <div className="flex gap-4">
                            <p className="text-3xl font-extralight">{userOnPage.username}</p>
                            <div className="flex items-center gap-4">
                                {
                                    !loggedUser.username.length ?
                                        null :
                                        loggedUser.following.some(data => data.userId === userOnPage.userId) ?
                                            <button
                                                className="h-7 w-28 rounded border text-sm font-medium cursor-pointer"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    setIsUnfollowModalOpen(true);
                                                }}
                                            >
                                                Following
                                            </button> :
                                            <button
                                                className="h-7 w-20 bg-blue-500 font-medium text-white rounded cursor-pointer text-sm tracking-wide"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    addToFollowing();
                                                }}
                                            >
                                                Follow
                                            </button>
                                }
                                <button>
                                    <Additional />
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-2 sm:gap-8">
                            <div className="flex gap-1 items-center flex-col sm:flex-row">
                                <p className="font-medium">{userOnPage.posts.length}</p>
                                <p>{`post${userOnPage.posts.length === 1 ? "" : "s"}`}</p>
                            </div>
                            <button
                                onClick={(event) => {
                                    event.stopPropagation();
                                    navigate(ProfileRoutes.FOLLOWERS)
                                }}
                                className="flex gap-1 items-center flex-col sm:flex-row"
                            >
                                <p className="font-medium">{userOnPage.followers.length}</p>
                                <p>{`follower${userOnPage.followers.length === 1 ? "" : "s"}`}</p>
                            </button>
                            <button
                                onClick={(event) => {
                                    event.stopPropagation();
                                    navigate(ProfileRoutes.FOLLOWING)
                                }}
                                className="flex gap-1 items-center flex-col sm:flex-row"
                            >
                                <p className="font-medium">{userOnPage.following.length}</p>
                                <p>following</p>
                            </button>
                        </div>
                        <p className="font-medium">{userOnPage.fullName}</p>
                        <div className="flex"></div>
                    </div>
                </div>
                {
                    isUnfollowModalOpen ?
                        <Modal
                            closeEvent={() => setIsUnfollowModalOpen(false)}
                            styles="h-72 top-[26.5%]"
                        >
                            <UnfollowModal
                                unfollowEvent={() => {
                                    setIsUnfollowModalOpen(false)
                                    removeFromFollowing()
                                }}
                                username={userOnPage.username}
                                profileImage={userOnPage.profileImage}
                                closeEvent={() => setIsUnfollowModalOpen(false)}
                            />
                        </Modal> :
                        null
                }
                <ProfileNavBar isUsersPage={false} />
                <Outlet />
            </div>
    )
}

export default UserOnPageProfile