import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import RoutesTypes from 'constants/routes-types'
import { db } from 'firebase-setup/firebaseConfig'
import convertUnixTime from 'helpers/other/convertUnixTime'

type ChatLinkProps = {
    userId: string,
    chatId: string,
    lastMessage: {
        text: string,
        userId: string
    },
    lastEdited: number;
}

type UserInfoType = { 
    profileImage: string, 
    username: string 
}

const ChatLink: React.FC<ChatLinkProps> = ({ userId, chatId, lastMessage, lastEdited }) => {
    const navigate = useNavigate();
    const { chatId: chatParam } = useParams();

    const [userInfo, setUserInfo] = useState<UserInfoType>({
        profileImage: "",
        username: "",
    })

    useEffect(() => {
        const getUser = async () => {
            const user = await getDoc(doc(db, "users", userId));
            setUserInfo({
                profileImage: (user.data() as UserInfoType).profileImage,
                username: (user.data() as UserInfoType).username,
            })
        }

        getUser();
    }, [])

    return (
        <button
            className={`flex h-20 px-2 pr-6 items-center justify-center py-1 ${chatParam === chatId && "back"}`}
            onClick={() => navigate(RoutesTypes.DIRECT + "/" + chatId)}
        >
            <div className="w-full h-16 py-[0.5px] gap-4 flex items-center px-3">
                <img
                    src={userInfo.profileImage.length ? userInfo.profileImage : "../images/default-avatar-gray.jpg"}
                    className="h-[60px] w-[60px] rounded-full object-cover"
                />
                <div className="flex flex-col justify-center text-left w-full">
                    <p className="w-[165px] truncate text-sm tracking-wide">{userInfo.username}</p>
                    <div className="flex gap-1">
                        <p className="font-medium text-sm tracking-wide whitespace-nowrap">
                            {`${lastMessage.userId !== userId && lastMessage.text.length ? "You:" : " "}`}
                        </p>
                        <p className="max-w-[125px] truncate text-gray-400 text-sm">{lastMessage.text}</p>
                        {
                            lastMessage.userId.length !== 0 ?
                                <>
                                    <p className="text-sm text-gray-400">•</p>
                                    <p className="text-sm text-gray-400">
                                        {(() => {
                                            let time = convertUnixTime(lastEdited)
                                            return time === "Now" ? time : time.split(" ")[0] + time.split(" ")[1][0]
                                        })()}
                                    </p>
                                </> :
                                null
                        }
                    </div>
                </div>
            </div>
        </button>
    )
}

export default ChatLink