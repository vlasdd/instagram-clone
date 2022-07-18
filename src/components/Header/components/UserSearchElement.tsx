import React from 'react';
import { Link } from 'react-router-dom';
import RoutesTypes from 'constants/routes-types';
import UserSuggestionType from 'types/user-suggestion-type';

const UserSearchElement: React.FC<UserSuggestionType> = React.memo(({ profileImage, username, fullName, userId }) => {
    return (
        <Link 
            className="flex h-13 mb-1 px-2 items-center py-1"
            to={RoutesTypes.DASHBOARD + userId}
        >
            <div className="w-full h-full py-[0.5px] gap-2 flex items-center">
                <img
                    src={profileImage.length ? profileImage : process.env.PUBLIC_URL + "/images/default-avatar-image.jpg"}
                    className="h-12 w-12 rounded-full object-cover"
                />
                <div className="flex flex-col justify-center">
                    <p className="font-medium text-sm tracking-wide whitespace-nowrap">{username}</p>
                    <p className="text-gray-400 text-sm whitespace-nowrap">{fullName}</p>
                </div>
            </div>
        </Link>
    )
})

export default UserSearchElement