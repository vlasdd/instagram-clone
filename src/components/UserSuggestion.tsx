import React from 'react'
import { useAppSelector } from '../redux/hooks'
import UserSuggestionType from '../types/user-suggestion-type'

/*type UserSuggestion = {
    profileImage: string,
    username: string,
    fullName: string,
    additionalInfo?: string, 
    isFollowed: bollean,
}*/

const UserSuggestion: React.FC<UserSuggestionType> = ({ profileImage, username, fullName, additionalInfo, isFollowed }) => {
    const user = useAppSelector(state => state.currentUser.user);

    return (
        <div className="flex h-16 mb-1 px-2 items-center">
            <div className="w-full h-full py-[0.5px] flex">
                <img
                    src={profileImage}
                    className="h-13 rounded-full"
                />
                <div className="flex flex-col justify-center">
                    <p className="font-medium text-sm tracking-wide whitespace-nowrap">{username}</p>
                    <p className="text-gray-400 text-sm whitespace-nowrap">{fullName}</p>
                    {additionalInfo &&
                        <p className="text-gray-400 text-sm whitespace-nowrap">{additionalInfo}</p>
                    }
                </div>
            </div>
            {isFollowed ?
                <button
                    className="h-7 w-28 rounded border text-sm font-medium cursor-pointer"
                >
                    Following
                </button> :
                <button
                    className="h-7 w-20 bg-blue-500 font-medium text-white rounded cursor-pointer text-sm tracking-wide"
                >
                    Follow
                </button>
            }
        </div>
    )
}

export default UserSuggestion