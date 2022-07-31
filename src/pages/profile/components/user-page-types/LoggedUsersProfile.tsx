import React, { useCallback, useEffect, useState } from 'react'
import { Link, Navigate, Outlet, useNavigate, useParams } from 'react-router-dom';
import ProfileRoutes from 'constants/profile-routes';
import RoutesTypes from 'constants/routes-types';
import { clearErrors } from 'redux-setup/features/signed-user/signedUser';
import fetchSignedUser from 'redux-setup/features/signed-user/thunks/fetchSignedUser';
import { useAppDispatch, useAppSelector } from 'redux-setup/hooks';
import Modal from 'components/modal/Modal';
import ChangeImageModal from '../other/ChangeImageModal';
import ProfileNavBar from '../other/ProfileNavBar';

const LoggedUsersProfile: React.FC = React.memo(() => {
    const {user: signedUser, status } = useAppSelector(state => state.signedUser);
    const dispatch = useAppDispatch();

    const { uid } = useParams();
    const navigate = useNavigate();

    const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchSignedUser(uid as string));
    }, [uid])

    useEffect(() => {
        if (status === "rejected") {
            dispatch(clearErrors());
            setShouldRedirect(true);
        }
    }, [status])

    const handleNavigateFollowers = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        navigate(ProfileRoutes.FOLLOWERS)
    }, [])

    const handleNavigateFollowing = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        navigate(ProfileRoutes.FOLLOWING)
    }, [])

    const openImageModal = useCallback(() => {
        setIsImageModalOpen(true)
    }, [])

    const closeImageModal = useCallback(() => {
        setIsImageModalOpen(false)
    }, [])

    return (
        shouldRedirect ?
            <Navigate to={RoutesTypes.NOT_FOUND} /> :
            <div className="min-h-[calc(100vh-60px)] w-screen flex flex-col items-center back">
                <div className="flex items-center flex-col sm:flex-row w-full sm:w-3/4 lg:w-5/6 xl:w-4/5 justify-center gap-2 pt-4 pb-3 px-1 max-w-[1000px]">
                    <div className="w-full sm:w-2/5 sm:h-60 flex justify-center items-center">
                        <img
                            src={
                                signedUser.profileImage.length ?
                                    signedUser.profileImage :
                                    process.env.PUBLIC_URL + "/images/default-avatar-gray.jpg"
                            }
                            className="rounded-full w-[170px] h-[170px] object-cover cursor-pointer"
                            onClick={openImageModal}
                        />
                    </div>
                    <div className="flex flex-col w-5/6 sm:w-3/5 pt-4 gap-3 sm:gap-6">
                        <div className="flex gap-4 justify-center sm:justify-start">
                            <p className="text-3xl font-extralight">{signedUser.username}</p>
                        </div>
                        <div className="flex gap-8 justify-center sm:justify-start">
                            <div className="flex gap-1 items-center">
                                <p className="font-medium">{signedUser.posts.length}</p>
                                <p>{`post${signedUser.posts.length === 1 ? "" : "s"}`}</p>
                            </div>
                            <button
                                onClick={handleNavigateFollowers}
                                className="flex gap-1 items-center"
                            >
                                <p className="font-medium">{signedUser.followers.length}</p>
                                <p>{`follower${signedUser.followers.length === 1 ? "" : "s"}`}</p>
                            </button>
                            <button
                                onClick={handleNavigateFollowing}
                                className="flex gap-1 items-center"
                            >
                                <p className="font-medium">{signedUser.following.length}</p>
                                <p>following</p>
                            </button>
                        </div>
                        <div className="flex px-8 sm:px-0">
                            <p className="font-medium">{signedUser.fullName}</p>
                        </div>
                    </div>
                </div>
                {
                    isImageModalOpen ?
                        <Modal
                            closeEvent={closeImageModal}
                            styles={`top-[35%] ${signedUser.profileImage.length ? "h-72" : "h-60"}`}
                        >
                            <ChangeImageModal
                                closeEvent={closeImageModal}
                            />
                        </Modal> :
                        null
                }
                <ProfileNavBar isUsersPage={true} />
                <Outlet />
            </div>
    )
})

export default LoggedUsersProfile