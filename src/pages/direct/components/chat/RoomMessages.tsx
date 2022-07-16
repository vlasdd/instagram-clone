import React, { useMemo, useRef } from 'react'
import MessageType from 'types/message-type'
import ImageMessage from './ImageMessage';
import Message from './Message';
import PostMessage from './PostMessage';
import TextMessage from './TextMessage';

type RoomMessagesProps = {
    messages: MessageType[],
    loggedUserId: string,
    profileImage: string,
}

export interface IMessageProps extends MessageType {
    loggedUserId: string,
    profileImage: string,
}

const RoomMessages: React.FC<RoomMessagesProps> = React.memo(({ messages, loggedUserId, profileImage }) => {
    const messagesToRender = useMemo(() => messages.map(message => {
        if (!message.media && !message.post) {
            return (
                <TextMessage {...message}
                    loggedUserId={loggedUserId}
                    profileImage={profileImage}
                    key={message.createdAt}
                />
            )
        }

        if(message.post){
            return (
                <PostMessage {...message}
                    loggedUserId={loggedUserId}
                    profileImage={profileImage}
                    key={message.createdAt}
                />
            )
        }
        
        if (message.media) {
            return (
                <ImageMessage {...message}
                    loggedUserId={loggedUserId}
                    profileImage={profileImage}
                    key={message.createdAt}
                />
            )
        }
    }), [messages])

    return (
        <div
            className="max-h-[calc(100%-45px-18px)] overflow-hidden overflow-y-auto w-full no-bar flex flex-col items-center"
        >
            {messagesToRender}
        </div>
    )
})

export default RoomMessages