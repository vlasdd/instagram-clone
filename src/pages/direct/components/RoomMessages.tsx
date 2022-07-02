import { nanoid } from '@reduxjs/toolkit'
import React, { useMemo } from 'react'
import MessageType from '../../../types/message-type'
import Message from './Message';

type RoomMessagesProps = {
    messages: MessageType[],
    loggedUserId: string,
    profileImage: string,
}

const RoomMessages: React.FC<RoomMessagesProps> = ({ messages, loggedUserId, profileImage }) => {
    const messagesToRender = useMemo(() => messages.map(message => <Message
        {...message}
        loggedUserId={loggedUserId}
        profileImage={profileImage}
        key={nanoid()}
    />), [messages])

    return (
        <div className="max-h-[calc(100%-45px-18px)] py-3 overflow-hidden overflow-y-auto w-full no-bar flex flex-col items-center gap-3">
            {messagesToRender}
        </div>
    )
}

export default RoomMessages