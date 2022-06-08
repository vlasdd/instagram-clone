import { doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { db } from '../firebase/firebase-config';
import { setActiveUser } from '../redux/features/user';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import UserSuggestionType from '../types/user-suggestion-type';

const UserSuggestion: React.FC<UserSuggestionType> = ({ profileImage, username, fullName, userId }) => {
    const user = useAppSelector(state => state.currentUser.user);
    const dispatch = useAppDispatch();

    const removeFromFollowing = async () => {
        const filteredUsers = user.following.filter(data => data.username !== username)

        await updateDoc(doc(db, "users", user.userId), {
            following: filteredUsers
        })

        dispatch(setActiveUser({ ...user, following: filteredUsers }))
    }

    const addToFollowing = async () => {
        const newUser = { profileImage, username, fullName, userId }

        await updateDoc(doc(db, "users", user.userId), {
            following: [...user.following, newUser]
        })

        dispatch(setActiveUser({ ...user, following: [...user.following, newUser] }))
    }

    return (
        <div className="flex h-13 mb-1 px-2 items-center">
            <div className="w-full h-full py-[0.5px] gap-2 flex items-center">
                <img
                    src={profileImage}
                    className="h-12 rounded-full"
                />
                <div className="flex flex-col justify-center">
                    <p className="font-medium text-sm tracking-wide whitespace-nowrap">{username}</p>
                    <p className="text-gray-400 text-sm whitespace-nowrap">{fullName}</p>
                </div>
            </div>
            {user.following.some(data => data.username === username) ?
                <button
                    className="h-7 w-28 rounded border text-sm font-medium cursor-pointer"
                    onClick={(event) => {
                        event.stopPropagation();
                        removeFromFollowing();
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
        </div>
    )
}

export default UserSuggestion