import React, { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RoutesTypes from 'constants/routes-types';
import { useAppDispatch, useAppSelector } from 'redux-setup/hooks';
import UserSuggestionType from 'types/userSuggestionType';
import Modal from 'components/modal/Modal';
import AreYouSureModal from 'components/modal/AreYouSureModal';
import addToFollowing from "redux-setup/features/signed-user/thunks/addToFollowing";
import removeFromFollowing from "redux-setup/features/signed-user/thunks/removeFromFollowing";

interface ISuggestionProps extends UserSuggestionType {
    isFollowing: boolean;
}

const Suggestion: React.FC<ISuggestionProps> = React.memo(({ profileImage, username, fullName, userId, isFollowing }) => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const { uid } = useParams();

    const [isUnfollowModalOpen, setIsUnfollowModalOpen] = useState<boolean>(false);

    const handleFollowClick = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        dispatch(addToFollowing({ userId, uid: uid as string }));
    }, [userId, uid])

    const handleFollowingClick = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        setIsUnfollowModalOpen(true);
    }, [])

    const areYouSureEvent = useCallback(() => {
        setIsUnfollowModalOpen(false)
        dispatch(removeFromFollowing({ userId, uid: uid as string }))
    }, [userId, uid])

    const navigateToProfile = useCallback(() => {
        navigate(RoutesTypes.DASHBOARD + userId)
    }, [userId])

    const closeUnfollowModal = useCallback(() => {
        setIsUnfollowModalOpen(false)
    }, [])

    return (
        <div className="flex w-full h-8 mb-1 justify-between items-center my-[4px]">
            <button 
                className="w-full h-full py-[0.5px] gap-2 flex items-center"
                onClick={navigateToProfile}
            >
                <img
                    src={profileImage.length ? profileImage : process.env.PUBLIC_URL + "/images/default-avatar-gray.jpg"}
                    className="h-8 w-8 rounded-full object-cover"
                />
                <div className="flex flex-col items-start">
                    <p className="font-medium text-sm tracking-wide whitespace-nowrap">{username}</p>
                    <p className="text-gray-400 text-sm whitespace-nowrap">
                        {isFollowing ? "Follows you" : fullName}
                    </p>
                </div>
            </button>
            {
                loggedUser.following.some(data => data.userId === userId) ?
                    <button
                        className="rounded text-gray-800 text-sm font-medium cursor-pointer"
                        onClick={handleFollowingClick}
                    >
                        Following
                    </button> :
                    <button
                        className="font-medium text-cyan-500 rounded cursor-pointer text-sm tracking-wide"
                        onClick={handleFollowClick}
                    >
                        Follow
                    </button>
            }
            {
                isUnfollowModalOpen ?
                    <Modal
                        closeEvent={closeUnfollowModal}
                        styles="h-72 top-[26.5%]"
                    >
                        <AreYouSureModal
                            areYouSureEvent={areYouSureEvent}
                            profileImage={profileImage}
                            closeEvent={closeUnfollowModal}
                            questionText={`Unfollow ${username}`}
                            buttonText="Unfollow"
                        />
                    </Modal> :
                    null
            }
        </div>
    )
})

export default Suggestion