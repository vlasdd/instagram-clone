import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate, useParams } from 'react-router-dom';
import ProfileRoutes from 'constants/profile-routes';
import RoutesTypes from 'constants/routes-types';
import { clearErrors } from 'redux-setup/features/user-on-page/userOnPage';
import fetchUserOnPage from 'redux-setup/features/user-on-page/thunks/fetchUserOnPage';
import { useAppDispatch, useAppSelector } from 'redux-setup/hooks';
import Additional from 'svgs/empty/Additional';
import Modal from 'components/modal/Modal';
import ProfileNavBar from '../other/ProfileNavBar';
import AreYouSureModal from 'components/modal/AreYouSureModal';
import useChatRoom from 'helpers/hooks/useChatRoom';
import addToFollowing from "redux-setup/features/signed-user/thunks/addToFollowing";
import removeFromFollowing from "redux-setup/features/signed-user/thunks/removeFromFollowing";

const UserOnPageProfile: React.FC = React.memo(() => {
    const { user: userOnPage, status } = useAppSelector(state => state.userOnPage);
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const dispatch = useAppDispatch();

    const { uid } = useParams();
    const navigate = useNavigate();

    const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
    const [isUnfollowModalOpen, setIsUnfollowModalOpen] = useState<boolean>(false);

    const { createChatRoom } = useChatRoom();

    useEffect(() => {
        dispatch(fetchUserOnPage(uid as string))
    }, [uid])

    useEffect(() => {
        if (status === "rejected") {
            dispatch(clearErrors());
            setShouldRedirect(true);
        }
    }, [status])

    const handleMessageClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        createChatRoom({ chosenUserId: userOnPage.userId });
    }

    const handleFollowingClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        setIsUnfollowModalOpen(true);
    }

    const handleFollowClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        dispatch(addToFollowing({ userId: userOnPage.userId, uid: uid as string }));
    }

    const handleNavigateFollowers = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        navigate(ProfileRoutes.FOLLOWERS)
    }

    const handleNavigateFollowing = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        navigate(ProfileRoutes.FOLLOWING)
    }

    const areYouSureEvent = () => {
        setIsUnfollowModalOpen(false)
        dispatch(removeFromFollowing({ userId: userOnPage.userId, uid: uid as string }))
    }

    return (
        shouldRedirect ?
            <Navigate to={RoutesTypes.NOT_FOUND} /> :
            <div className="min-h-[calc(100vh-60px)] w-screen flex flex-col items-center back">
                <div className="flex items-center flex-col sm:flex-row w-full sm:w-3/4 lg:w-5/6 xl:w-4/5 justify-center gap-2 pt-4 pb-3 px-1 max-w-[1000px]">
                    <div className="w-full sm:w-2/5 sm:h-60 flex justify-center items-center">
                        <img
                            src={userOnPage.profileImage.length ? userOnPage.profileImage : process.env.PUBLIC_URL + "/images/default-avatar-gray.jpg"}
                            className="rounded-full w-[170px] h-[170px] object-cover"
                        />
                    </div>
                    <div className="flex flex-col w-5/6 sm:w-3/5 py-4 gap-6">
                        <div className="flex gap-4">
                            <p className="text-3xl font-extralight">{userOnPage.username}</p>
                            <div className="flex items-center gap-2">
                                <button
                                    className="h-7 w-20 rounded border text-sm font-medium cursor-pointer"
                                    onClick={(event) => handleMessageClick(event)}
                                >
                                    Message
                                </button>
                                {
                                    !loggedUser.username.length ?
                                        null :
                                        loggedUser.following.some(data => data.userId === userOnPage.userId) ?
                                            <button
                                                className="h-7 w-28 rounded border text-sm font-medium cursor-pointer"
                                                onClick={(event) => handleFollowingClick(event)}
                                            >
                                                Following
                                            </button> :
                                            <button
                                                className="h-7 w-20 bg-blue-500 font-medium text-white rounded cursor-pointer text-sm tracking-wide"
                                                onClick={(event) => handleFollowClick(event)}
                                            >
                                                Follow
                                            </button>
                                }
                                <button>
                                    <Additional styles="h-7 w-7"/>
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-2 sm:gap-8">
                            <div className="flex gap-1 items-center flex-col sm:flex-row">
                                <p className="font-medium">{userOnPage.posts.length}</p>
                                <p>{`post${userOnPage.posts.length === 1 ? "" : "s"}`}</p>
                            </div>
                            <button
                                onClick={(event) => handleNavigateFollowers(event)}
                                className="flex gap-1 items-center flex-col sm:flex-row"
                            >
                                <p className="font-medium">{userOnPage.followers.length}</p>
                                <p>{`follower${userOnPage.followers.length === 1 ? "" : "s"}`}</p>
                            </button>
                            <button
                                onClick={(event) => handleNavigateFollowing(event)}
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
                            <AreYouSureModal
                                areYouSureEvent={areYouSureEvent}
                                profileImage={userOnPage.profileImage}
                                closeEvent={() => setIsUnfollowModalOpen(false)}
                                questionText={`Unfollow @${userOnPage.username}`}
                                buttonText="Unfollow"
                            />
                        </Modal> :
                        null
                }
                <ProfileNavBar isUsersPage={false} />
                <Outlet />
            </div>
    )
})

export default UserOnPageProfile