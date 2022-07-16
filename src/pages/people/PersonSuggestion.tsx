import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoutesTypes from 'constants/routes-types';
import useFollowers from 'helpers/hooks/useFollowers';
import { useAppSelector } from 'redux-setup/hooks';
import UserSuggestionType from 'types/user-suggestion-type';
import Modal from 'components/modal/Modal';
import AreYouSureModal from 'components/modal/AreYouSureModal';

const PersonSuggestion: React.FC<UserSuggestionType> = React.memo(({ profileImage, username, fullName, userId }) => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const navigate = useNavigate();

    const [isUnfollowModalOpen, setIsUnfollowModalOpen] = useState<boolean>(false);
    const { addToFollowing, removeFromFollowing } = useFollowers({ userId })

    return (
        <div className="flex w-full h-13 mb-1 px-2 justify-between items-center my-[4px]">
            <button 
                className="w-full h-full py-[0.5px] gap-2 flex items-center"
                onClick={() => navigate(RoutesTypes.DASHBOARD + userId)}
            >
                <img
                    src={profileImage.length ? profileImage : "../images/default-avatar-image.jpg"}
                    className="h-12 w-12 rounded-full object-cover"
                />
                <div className="flex flex-col items-start">
                    <p className="font-medium text-sm tracking-wide whitespace-nowrap">{username}</p>
                    <p className="text-gray-400 text-sm whitespace-nowrap">{fullName}</p>
                    <p className="text-gray-400 text-xs">Popular</p>
                </div>
            </button>
            {
                userId === loggedUser.userId || !loggedUser.userId.length ?
                    null :
                    loggedUser.following.some(data => data.userId === userId) ?
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
            {
                isUnfollowModalOpen ?
                    <Modal
                        closeEvent={() => setIsUnfollowModalOpen(false)}
                        styles="h-72 top-[26.5%]"
                    >
                        <AreYouSureModal
                            areYouSureEvent={() => {
                                setIsUnfollowModalOpen(false)
                                removeFromFollowing()
                            }}
                            profileImage={profileImage}
                            closeEvent={() => setIsUnfollowModalOpen(false)}
                            questionText={`Unfollow ${username}`}
                            buttonText="Unfollow"
                        />
                    </Modal> :
                    null
            }
        </div>
    )
})

export default PersonSuggestion