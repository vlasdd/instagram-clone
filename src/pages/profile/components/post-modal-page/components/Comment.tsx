import RoutesTypes from 'constants/routes-types';
import { db } from 'firebase-setup/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CommentsType from 'types/comments-type'
import UserState from 'types/user-state-type';

const Comment: React.FC<CommentsType> = ({ userId, text, likes }) => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState<{
        username: string,
        profileImage: string,
    }>({
        username: "",
        profileImage: "",
    })

    useEffect(() => {
        const getUser = async () => {
            const user = (await getDoc(doc(db, "users", userId))).data() as UserState;
            setUserInfo({ ...user })
        }

        getUser();
    }, [])

    return (
        <>
            <button
                className="h-12 py-[0.5px] flex items-center"
                onClick={() => navigate(RoutesTypes.DASHBOARD + userId)}
            >
                <img
                    src={userInfo.profileImage.length ? userInfo.profileImage : "../images/default-avatar-image.jpg"}
                    className="h-9 w-9 rounded-full object-cover"
                />
            </button>
            <div className="inline-block w-[calc(100%-52px)] pt-3">
                <p className="break-words text-[14px]">
                    <span
                        className="font-medium text-sm tracking-wide whitespace-nowrap cursor-pointer"
                        onClick={() => navigate(RoutesTypes.DASHBOARD + userId)}
                    >
                        {userInfo.username}
                    </span>
                    <span className="ml-2">{text}</span>
                </p>
            </div>
        </>
    )
}

export default Comment