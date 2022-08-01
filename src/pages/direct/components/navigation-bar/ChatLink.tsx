import React, { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import RoutesTypes from 'constants/routes-types'
import convertUnixTime from 'helpers/other/convert-unix-time/convertUnixTime'
import useUserInfo from 'helpers/hooks/useUserInfo'

type ChatLinkProps = {
    userId: string,
    chatId: string,
    lastMessage: {
        text: string,
        userId: string
    },
    lastEdited: number;
}

const ChatLink: React.FC<ChatLinkProps> = React.memo(({ userId, chatId, lastMessage, lastEdited }) => {
    const navigate = useNavigate();
    const { chatId: chatParam } = useParams();

    const userInfo = useUserInfo(userId)

    const generateTime = useCallback(() => {
        let time = convertUnixTime(lastEdited)
        return time === "Now" ? time : time.split(" ")[0] + time.split(" ")[1][0]
    }, [lastEdited])

    const navigateToChat = useCallback(() => {
        navigate(RoutesTypes.DIRECT + "/" + chatId)
    }, [chatId])

    return (
        <button
            className={`flex h-20 px-2 pr-6 items-center justify-center py-1 ${chatParam === chatId && "back"}`}
            onClick={navigateToChat}
        >
            <div className="w-full h-16 py-[0.5px] gap-4 flex items-center px-3">
                <img
                    src={
                        userInfo.profileImage.length ?
                            userInfo.profileImage :
                            process.env.PUBLIC_URL + "/images/default-avatar-gray.jpg"
                    }
                    className="h-[60px] w-[60px] rounded-full object-cover"
                />
                <div className="flex flex-col justify-center text-left">
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
                                        {generateTime()}
                                    </p>
                                </> :
                                null
                        }
                    </div>
                </div>
            </div>
        </button>
    )
})

export default ChatLink