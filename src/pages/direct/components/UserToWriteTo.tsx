import React from 'react';
import UserSuggestionType from 'types/user-suggestion-type';

interface IUserToWriteToProps extends UserSuggestionType {
    addUserToList: () => void
    removeUserFromList: () => void
    isUserInList: boolean
}

const UserToWriteTo: React.FC<IUserToWriteToProps> = ({
    profileImage,
    username,
    fullName,
    addUserToList,
    removeUserFromList,
    isUserInList
}) => {
    return (
        <button
            className="flex h-13 mb-1 px-2 pr-6 items-center justify-center py-1"
            onClick={isUserInList ? removeUserFromList : addUserToList}
        >
            <div className="w-full h-full py-[0.5px] gap-2 flex items-center">
                <img
                    src={profileImage.length ? profileImage : "../images/default-avatar-image.jpg"}
                    className="h-12 w-12 rounded-full object-cover"
                />
                <div className="flex flex-col justify-center text-left">
                    <p className="font-medium text-sm tracking-[1px] whitespace-nowrap">{username}</p>
                    <p className="text-gray-400 text-sm tracking-[0px] whitespace-nowrap">{fullName}</p>
                </div>
            </div>
            {
                isUserInList ?
                    <div className="w-6 h-6 rounded-full bg-blue-500">
                        <div className="h-[2px] w-[7px] bg-white mt-3 ml-1 rotate-[45deg]"></div>
                        <div className="h-[2px] w-3 bg-white mt-[-3px] ml-2 rotate-[-45deg]"></div>
                    </div> :
                    <div className="w-6 h-6 rounded-full border-2 border-black"></div>
            }
        </button>
    )
}

export default UserToWriteTo