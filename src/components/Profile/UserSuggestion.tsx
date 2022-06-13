import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoutesTypes from '../../constants/routes-types';
import useFollowers from '../../helpers/useFollowers';
import { useAppSelector } from '../../redux/hooks';
import UserSuggestionType from '../../types/user-suggestion-type';
import Modal from '../Modal';
import UnfollowModal from './UnfollowModal';

const UserSuggestion: React.FC<UserSuggestionType> = ({ profileImage, username, fullName, userId }) => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const navigate = useNavigate();

    const { addToFollowing, removeFromFollowing } = useFollowers({ profileImage, username, fullName, userId })
    const [isUnfollowModalOpen, setIsUnfollowModalOpen] = useState<boolean>(false);

    return (
        <button
            className="flex w-full h-13 mb-1 px-2 justify-between items-center"
            onClick={() => navigate(RoutesTypes.DASHBOARD + userId)}
        >
            <div className="w-full h-full py-[0.5px] gap-2 flex items-center">
                <img
                    src={profileImage.length ? profileImage : "../images/default-avatar-image.jpg"}
                    className="h-11 w-11 rounded-full object-cover"
                />
                <div className="flex flex-col items-start">
                    <p className="font-medium text-sm tracking-wide whitespace-nowrap">{username}</p>
                    <p className="text-gray-400 text-sm whitespace-nowrap">{fullName}</p>
                </div>
            </div>
            {userId === loggedUser.userId ?
                null :
                loggedUser.following.some(data => data.username === username) ?
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
            {isUnfollowModalOpen ?
                <Modal
                    closeEvent={() => setIsUnfollowModalOpen(false)}
                    styles="h-72 top-[26.5%]"
                >
                    <UnfollowModal
                        unfollowEvent={() => {
                            setIsUnfollowModalOpen(false)
                            removeFromFollowing()
                        }}
                        username={username}
                        profileImage={profileImage}
                        closeEvent={() => setIsUnfollowModalOpen(false)}
                    />
                </Modal> :
                null
            }
        </button>
    )
}

export default UserSuggestion