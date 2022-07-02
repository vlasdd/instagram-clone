import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RoutesTypes from '../../../constants/routes-types';
import MessageType from '../../../types/message-type';

interface IMessageProps extends MessageType{
    loggedUserId: string,
    profileImage: string,
}

const Message: React.FC<IMessageProps> = ({ text, from, loggedUserId, media, profileImage }) => {
    const navigate = useNavigate();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({"behavior": "auto"})
        }
    }, [])

    return (
        <div
            className={`flex items-center gap-2 w-11/12 sm:w-5/6 xl:w-3/4 ${from.userId === loggedUserId ? "justify-end" : "justify-start"}`}
            ref={scrollRef}
        >
            {
                from.userId !== loggedUserId ?
                    <button
                        className="flex gap-4"
                        onClick={() => navigate(RoutesTypes.DASHBOARD + from.userId)}
                    >
                        <img
                            src={profileImage.length ? profileImage : "../images/default-avatar-gray.jpg"}
                            className="h-8 w-8 rounded-full object-cover"
                        />
                    </button> :
                    null
            }
            <div className={`
                inline-block max-w-[200px] 
                ${from.userId === loggedUserId ? "bg-gray-200" : "border"}
                ${media ? `rounded-[10px] ${text.length ? "pb-1" : ""}` :"rounded-[25px] py-2 px-2"} 
            `}>
                {
                    media.length ?
                        <img
                            src={media}
                            className="w-[190px] rounded"
                        /> :
                        null
                }
                {
                    text.length ?
                        <p className="break-words mx-1">{text}</p> :
                        null
                }
            </div>
        </div>
    )
}

export default Message